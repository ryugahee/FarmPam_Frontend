<template>
  <div class="container">
    <row>
      <div class="advice">회원가입</div>

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
          type="text"
          class="txt-input"
          id="itemnew"
          v-model="state.form.password"
        />
      </div>

      <div class="easyLoginForm">
        <label for="itemnew"><span>* </span>비밀번호 확인</label>
        <input
          type="text"
          class="txt-input"
          id="itemnew"
          v-model="userPWCheck"
        />
      </div>

      <div class="easyLoginForm">
        <label for="itemname"><span>* </span>이메일</label>
        <input
          type="text"
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

      <button @click="submit">회원가입 하기</button>
    </row>
  </div>
</template>

<script>
import { reactive } from "vue";
import axios from "axios";
export default {
  name: "RegisterView",
  inject: ["$http"],
  data() {
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
