<template>
  <div class="container">
    <row>
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
          id="itempw"
          v-model="state.form.username"
        />
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
          <button @click="sendPhoneNumber" class="phoneButton">
            휴대폰 인증 번호 발송
          </button>
        </div>
      </div>

      <div class="easyLoginForm">
        <label for="itemnew"><span>* </span>닉네임</label>
        <input
          type="text"
          class="txt-input"
          id="itemnew"
          v-model="state.form.nickname"
        />
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

      <div v-if="!state.form.username || !state.form.realName">
        <div style="margin-left: 40px">항목을 모두 작성해주세요</div>
      </div>
      <div v-else>
        <button class="registerBtn" @click="submit">회원가입 하기</button>
      </div>
    </row>
  </div>
</template>

<script>
import { onMounted, reactive, ref } from "vue";
import axios from "axios";
import router from "@/router";
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
    };
  },
  methods: {
    submit() {
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
