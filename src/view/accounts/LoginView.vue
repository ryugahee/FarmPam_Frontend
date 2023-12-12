<template>
  <div class="container">
    <row>
      <div class="logo">
        <img src="../../../public/assets/img/Logo.png" alt="" />
      </div>

      <div class="loginForm">
        <input
          placeholder="아이디"
          v-model="state.form.username"
          @keyup.enter="login()"
        />
        <br />
        <input
          placeholder="비밀번호"
          v-model="state.form.password"
          @keyup.enter="login()"
        />
      </div>

      <div class="bottons">
        <button @click="login()">로그인</button>
        <br />
        <button @click="goToRegister()">회원가입</button>
      </div>

      <div class="finder">
        <button>아이디 찾기</button> &nbsp; &nbsp; | &nbsp;
        <button>비밀번호 찾기</button>
      </div>

      <div class="line">또는</div>

      <div class="easyLogin">
        <img src="../../../public/assets/img/kakao.png" alt="" />
        <br />
        <img src="../../../public/assets/img/google.png" alt="" />
        <br />
        <img src="../../../public/assets/img/naver.png" alt="" />
      </div>
    </row>
  </div>
</template>

<script>
import { reactive } from "vue";
import axios from "axios";
import router from "@/router";
export default {
  setup() {
    const state = reactive({
      form: {
        username: "",
        password: "",
      },
    });

    const login = () => {
      console.log("로그인 요청");
      axios
        .post("http://localhost:8080/api/login", state.form)
        .then((res) => {
          console.log("로그인 완료");

          console.log(res.data);

          const accessToken = res.data.accessToken;
          const refreshToken = res.data.refreshToken;
          const username = res.data.username;
          const roles = res.data.roles;

          // console.log("응답 : " + JSON.stringify (res));
          console.log("엑세스 토큰: " + res.data.accessToken);
          console.log("리프레시 토큰: " + res.data.refreshToken);
          console.log("유저네임: " + res.data.username);
          console.log("역할 : " + res.data.roles);

          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
          localStorage.setItem("username", username);
          localStorage.setItem("roles", roles);

          function expireCookie(name) {
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
          }

          expireCookie("accessToken");
          expireCookie("refreshToken");
          expireCookie("username");

          router.push(res.data.redirectPage);
        })
        .catch((err) => {
          console.log(err);
          window.alert("로그인 정보가 존재하지 않습니다.");
        });
    };

    const oauthLoigin = () => {
      axios
        .get("http://localhost:8080/oauth2/authorization/google")
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    };

    return {
      state,
      // submit,
      oauthLoigin,
      login,
      // get,
    };
  },
};
</script>
<style scoped>
@import "../../../public/assets/css/login-page.css";
</style>
