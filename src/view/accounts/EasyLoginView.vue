<template>
  <div class="container">

      <div class="advice">
        <p>간편 로그인 완료를 위해</p>
        <p>추가 정보를 입력해주세요</p>
      </div>
      <div class="easyLoginForm">
        <label for="itemname"><span>* </span>이름</label>
        <input
          type="text"
          class="txt-input"
          id="itemname"
          v-model="state.form.realName"
        />
      </div>

      <div class="easyLoginForm">
        <label for="itempw"><span>* </span>전화번호</label>
        <input
          type="text"
          class="txt-input"
          id="itempw"
          v-model="state.form.phoneNumber"
        />
        <div class="col">
          <button @click="sendPhoneNumber" class="phoneButton">
            휴대폰 인증 번호 발송
          </button>
          <div v-if="phoneState == '인증 진행중'">
            <div class="phoneState">
              {{ phoneState }}
            </div>
            <div class="phoneState">
              {{ minutes }}:{{ seconds < 10 ? "0" + seconds : seconds }}
            </div>
            <input type="number" v-model="phoneCheckNum" />
            <button @click="compareSMSNumber">인증하기</button>
          </div>
        </div>
      </div>

      <div class="easyLoginForm">
        <label for="itemnew"><span>* </span>닉네임</label>
        <input type="text" class="txt-input" id="itempw" value="" />
      </div>

      <div class="colBox">
        <div class="easyLoginForm">
          <label for="itemnew"><span>* </span>우편번호</label>
          <input
            type="text"
            class="txt-input"
            id="mail"
            v-model="state.form.mailCode"
          />

          <button class="mailButton" @click="search">우편번호 찾기</button>
        </div>
      </div>

      <div class="easyLoginForm">
        <label for="itemnew"><span>* </span>도로명주소</label>
        <input
          type="text"
          class="txt-input"
          id="itemnew"
          v-model="state.form.streetAddress"
        />
      </div>
      <div class="easyLoginForm">
        <label for="itemnew"><span>* </span>상세주소</label>
        <input
          type="text"
          class="txt-input"
          id="itemnew"
          v-model="state.form.detailAddress"
        />
      </div>

      <button @click="register">회원가입 하기</button>

  </div>
</template>

<script>
import { onMounted, reactive, ref } from "vue";
import { getCookie } from "@/api/tokenApi.vue";
import instance from "@/api/http";
import router from "@/router";

export default {
  inject: ["$http"],
  setup() {
    onMounted(() => {
      const accessToken = getCookie("accessToken");
      const refreshToken = getCookie("refreshToken");
      const username = getCookie("username");
      const roles = getCookie("roles");

      if (accessToken !== undefined && accessToken.length !== 0) {
        localStorage.setItem("accessToken", accessToken);
      }
      if (refreshToken !== undefined && refreshToken.length !== 0) {
        localStorage.setItem("refreshToken", refreshToken);
      }
      if (username !== undefined && username.length !== 0) {
        localStorage.setItem("username", username);
      }
      if (roles !== undefined && roles.length !== 0) {
        localStorage.setItem("roles", roles);
      }

      // 읽어온 쿠키 값들을 활용하여 원하는 작업 수행
      console.log("Access Token:", accessToken);
      console.log("Refresh Token:", refreshToken);
      console.log("Username:", username);
      console.log("roles:", roles);

      function expireCookie(name) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      }

      expireCookie("accessToken");
      expireCookie("refreshToken");
      expireCookie("username");
      expireCookie("roles");
    });

    const state = reactive({
      form: {
        realName: "",
        phoneNumber: "",
        nickname: "",
        mailCode: "",
        streetAddress: "",
        detailAddress: "",
      },
    });

    const phoneState = ref("인증 필요");
    let timer = ref(null);
    let minutes = ref(1);
    let seconds = ref(0);
    const phoneCheckNum = ref(0);

    const register = () => {
      instance
        .post("/additionalInfo", state.form)
        .then((res) => {
          console.log(res.data);
          router.replace("home");
        })
        .catch((err) => {
          console.log(err);
        });
    };

    //인증 번호 확인
    const compareSMSNumber = () => {
      instance
        .post("/compareSMSNumber", {
          phoneCheckNum: phoneCheckNum,
          phoneNumber: state.form.phoneNumber,
        })
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        });
    };

    //인증 번호 발송
    const sendPhoneNumber = () => {
      console.log("휴대폰 번호 인증 시작");
      instance
        .post("/checkPhoneNumber", state.form.phoneNumber)
        .then((res) => {
          alert("인증번호 발송 성공");
          phoneState.value = "인증 진행중";
          timer = setInterval(() => {
            if (minutes.value === 0 && seconds.value === 0) {
              console.log("인증필요??");
              phoneState.value = "인증 필요";
              clearInterval(timer.value);
            } else {
              if (seconds.value === 0) {
                minutes.value -= 1;
                seconds.value = 59;
              } else {
                seconds.value -= 1;
              }
            }
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
        });

        clearInterval(timer.value);
    };

    const search = () => {
      new window.daum.Postcode({
        oncomplete: (data) => {
          var roadAddr = data.roadAddress;
          var extraRoadAddr = "";

          if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
            extraRoadAddr += data.bname;
          }

          if (data.buildingName !== "" && data.apartment === "Y") {
            extraRoadAddr +=
              extraRoadAddr !== ""
                ? ", " + data.buildingName
                : data.buildingName;
          }

          if (extraRoadAddr !== "") {
            extraRoadAddr = " (" + extraRoadAddr + ")";
          }

          if (roadAddr !== "") {
            roadAddr += extraRoadAddr;
          }

          state.form.mailCode = data.zonecode;
          state.form.streetAddress = roadAddr;
        },
      }).open();
    };

    return {
      state,
      search,
      register,
      phoneState,
      sendPhoneNumber,
      timer,
      minutes,
      seconds,
      phoneCheckNum,
      compareSMSNumber,
    };
  },
};
</script>

<style scoped>
@import "../../../public/assets/css/easy-login.css";
</style>