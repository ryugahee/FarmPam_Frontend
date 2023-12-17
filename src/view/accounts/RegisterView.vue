<template>
  <div class="container">
    <div class="advice" style="margin-left: 45px">회원가입</div>

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
      <label for="itempw"><span>* </span>아이디</label>
      <input
        type="text"
        class="txt-input"
        id="idInput"
        v-model="state.form.username"
      />
      <button class="mailButton" @click="checkId">아이디 중복체크</button>
    </div>

    <div class="easyLoginForm">
      <label for="itemnew"><span>* </span>비밀번호</label>
      <input
        type="password"
        class="txt-input"
        id="itemnew"
        v-model="state.form.password"
        @input="checkPasswordMatch"
      />
    </div>

    <div class="easyLoginForm">
      <label for="itemnew"><span>* </span>비밀번호 확인</label>
      <input
        type="password"
        class="txt-input"
        id="itemnew"
        v-model="userPWCheck"
        @input="checkPasswordMatch"
      />
    </div>
    <span v-if="!passwordsMatch" style="margin-left: 45px"
      >비밀번호가 일치하지 않습니다.</span
    >
    <div class="easyLoginForm">
      <label for="itemname"><span>* </span>이메일</label>
      <input
        type="email"
        class="txt-input"
        id="itemname"
        v-model="state.form.email"
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
        <div v-show="phoneState !== '인증 진행중'">
          <button @click="sendPhoneNumber" class="phoneButton">
            휴대폰 인증 번호 발송
          </button>
        </div>

        <div class="checkIng" v-show="phoneState == '인증 진행중'">
          <!-- <div class="phoneState">
            {{ phoneState }}
          </div> -->

          <input id="checkCodeInput" type="number" v-model="phoneCheckNum" />

          <button class="checkCodeInputBtn" @click="compareSMSNumber">
            인증하기
          </button>
          <div class="phoneState">
            {{ minutes }}:{{ seconds < 10 ? "0" + seconds : seconds }}
          </div>
        </div>
      </div>
    </div>

    <div class="easyLoginForm">
      <label for="itemnew"><span>* </span>닉네임</label>
      <input
        type="text"
        class="txt-input"
        id="idInput"
        v-model="state.form.nickname"
      />
      <button @click="checkNickname" class="mailButton">닉네임 중복체크</button>
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
      <label for="itemnew"><span> </span>상세주소</label>
      <input
        type="text"
        class="txt-input"
        id="itemnew"
        v-model="state.form.detailAddress"
      />
    </div>

    <!-- <div 
     
      >
        <div style="margin-left: 40px">항목을 모두 작성해주세요</div>
      </div> -->
    <div>
      <button class="registerBtn" @click="submit">회원가입 하기</button>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, ref } from "vue";
import axios from "axios";
import router from "@/router";
import instance from "@/api/http";
export default {
  name: "RegisterView",
  inject: ["$http"],
  data() {
    const passwordsMatch = ref(false);
    onMounted(() => {
      if (localStorage.getItem("username")) {
        router.replace("home");
      }
    });

    const state = reactive({
      form: {
        realName: "",
        username: "",
        userPassword: "",
        userPWCheck: "",
        email: "",
        phoneNumber: "",
        nickname: "",
        userLocal: "",
        mailCode: "",
        streetAddress: "",
        detailAddress: "",
      },
    });

    return {
      state,
      userPWCheck: "",
      passwordsMatch,
      phoneState: "인증 필요",
      minutes: 1,
      seconds: 0,
      phoneCheckNum: null,
      timer: null,
      usernameCheck: false,
      nicknameCheck: false,
      smsCodeCheck: true,
    };
  },
  methods: {
    submit() {
      // if (
      //   !this.state.form.username ||
      //   !this.state.form.realName ||
      //   !this.state.form.userPassword ||
      //   !this.state.form.email ||
      //   !this.state.form.phoneNumber ||
      //   !this.state.form.nickname ||
      //   !this.state.form.mailCode ||
      //   !this.state.form.streetAddress
      // ) {
      //   alert("필수 항목을 작성해주세요.");
      //   return;
      // }

      if(!this.usernameCheck ){
        alert("아이디 중복을 확인하세요.");
        return;
      }

      if(!this.nicknameCheck){
        alert("닉네임 중복을 확인하세요.");
        return;
      }

      if(!this.smsCodeCheck){
        alert("휴대폰 인증을 해주세요.");
        return;
      }
      // let data = {};
      // data.userName = this.userName;
      // data.userPassword = this.userPassword;
      // data.userEmail = this.userEmail;
      // data.userPhoneNumber = this.userPhoneNumber;
      // data.userLocal = this.userLocal;
      axios
        .post("http://localhost:8080/api/user/signup", this.state.form)
        .then(() => {
          alert("회원가입 완료");
          this.$router.push("/login");
        })
        .catch((err) => {
          console.log(err);
          window.alert("회원가입을 진행 할 수 없습니다.");
        });
    },

    checkPasswordMatch() {
      if (this.state.form.password !== this.userPWCheck) {
        this.passwordsMatch = false;
      } else {
        this.passwordsMatch = true;
      }
    },

    //인증번호 발송
    sendPhoneNumber() {
      clearInterval(this.timer);
      console.log("휴대폰 번호 인증 시작");
      instance
      .post("/checkPhoneNumber", this.state.form.phoneNumber)
      .then((res) => {
        alert("인증번호 발송 성공");
      this.phoneState = "인증 진행중";

      // 타이머 설정
      let countdown = setInterval(() => {
        if (this.minutes === 0 && this.seconds === 0) {
          console.log("인증 필요");
          this.phoneState = "인증 필요";
          clearInterval(countdown); // 타이머 종료
        } else {
          if (this.seconds === 0) {
            this.minutes -= 1;
            this.seconds = 59;
          } else {
            this.seconds -= 1;
          }
        }
      }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
    },

    //인증번호 확인
    compareSMSNumber() {
      console.log(
        "smsNumber : ",
        this.phoneCheckNum,
        ", phoneNumber : ",
        this.state.form.phoneNumber
      );
      instance
        .post("/compareSMSNumber", {
          smsNumber: this.phoneCheckNum,
          phoneNumber: this.state.form,
        })
        .then((res) => {
          this.smsCodeCheck = true;
          alert("휴대폰 인증에 성공하였습니다.");
        })
        .catch((err) => {
          console.log(err);
        });
    },

    checkId() {
      instance
        .post("/checkUsername", this.state.form.username)
        .then((res) => {
          console.log(res.data);
          alert("사용 가능한 아이디 입니다.");
          this.usernameCheck = true;
        })
        .catch((err) => {
          console.log(err);
          if (err.response.data) {
            alert(err.response.data);
          }
        });
    },

    checkNickname() {
      instance
        .post("/checkNickname", this.state.form.nickname)
        .then((res) => {
          console.log(res.data);
          alert("사용 가능한 닉네임 입니다.");
          this.nicknameCheck = true;
        })
        .catch((err) => {
          console.log(err);
          if (err.response.data) {
            alert(err.response.data);
          }
        });
    },

    search() {
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

          this.state.form.mailCode = data.zonecode;
          this.state.form.streetAddress = roadAddr;
        },
      }).open();
    },
  },
};
</script>

<style scoped>
@import "../../../public/assets/css/register-page.css";
</style>
