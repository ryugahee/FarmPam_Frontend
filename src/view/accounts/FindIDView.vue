<template>
  <div class="container">
    <div class="advice">아이디 찾기</div>

    <div class="easyLoginForm">
      <label for="itemname"><span>* </span>전화번호</label>
      <input type="text" class="txt-input" id="itemname" />
    </div>

    <div class="checkIng" v-show="phoneState !== '인증 진행중'">
      <button @click="sendPhoneNumber">인증하기</button>
    </div>
    <div class="checkIng" v-show="phoneState == '인증 진행중'">
      <!-- <div class="checkIng" v-show="true"> -->
      <!-- <div style="width: 400px" class="checkIng" v-show="true"> -->
      <!-- <div class="phoneState">
        {{ phoneState }}
      </div> -->

      <input
        id="checkCodeInput"
        style="
          border: rgb(179, 179, 179) solid 1px;
          margin-left: 80px;
          width: 90px;
          height: 30px;
        "
        type="number"
        v-model="phoneCheckNum"
      />

      <button
        style="width: 70px; margin-left: 10px !important"
        class="checkCodeInputBtn"
        @click="compareSMSNumber"
      >
        인증하기
      </button>
      {{ username }}
    </div>
    <div
      class="phoneState"
      style="position: absolute; margin-left: 260px; margin-top: 256px"
      v-show="phoneState == '인증 진행중'"
    >
      {{ minutes }}:{{ seconds < 10 ? "0" + seconds : seconds }}
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import instance from "@/api/http";
export default {
  setup() {
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

    const phoneState = ref("");
    const phoneCheckNum = ref(null);
    const minutes = ref(1);
    const seconds = ref(0);
    const timer = ref(null);
    const smsCodeCheck = ref(false);
    const username = ref("");

    //인증번호 발송
    const sendPhoneNumber = () => {
      clearInterval(timer);
      console.log("휴대폰 번호 인증 시작");
      instance
        .post("/checkPhoneNumber", state.form.phoneNumber)
        .then((res) => {
          alert("인증번호 발송 성공");
          phoneState.value = "인증 진행중";

          // 타이머 설정
          let countdown = setInterval(() => {
            if (minutes.value === 0 && seconds.value === 0) {
              console.log("인증 필요");
              phoneState.value = "인증 필요";
              clearInterval(countdown); // 타이머 종료
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
    };

    const compareSMSNumber = () => {
      console.log(
        "smsNumber : ",
        phoneCheckNum,
        ", phoneNumber : ",
        state.form.phoneNumber
      );
      instance
        .post("/compareSMSNumber", {
          smsNumber: phoneCheckNum.value,
          phoneNumber: state.form,
        })
        .then((res) => {
          smsCodeCheck.value = true;
          alert("휴대폰 인증에 성공하였습니다.");
          findUsername();
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const findUsername = () => {
      instance
        .post("/findUsername", state.form.phoneNumber)
        .then((res) => {
          username.value = res.data;
        })
        .catch((err) => {
          console.log(err.data);
        });
    };

    return {
      sendPhoneNumber,
      compareSMSNumber,
      phoneState,
      minutes,
      seconds,
      timer,
      smsCodeCheck,
      username,
    };
  },
};
</script>

<style scoped>
@import "../../../public/assets/css/find-id-page.css";
</style>
