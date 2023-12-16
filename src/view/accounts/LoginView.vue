<template>
  <div class="container">
    <div>
      <div class="login-logo">
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
        <button @click="$router.push('/findId')">아이디 찾기</button> &nbsp; &nbsp; &nbsp; |
        <button @click="$router.push('/findPw')">비밀번호 찾기</button>
      </div>

      <div class="line">또는</div>

      <div class="easyLogin">
        <a href="http://localhost:8080/oauth2/authorization/kakao">
          <img src="../../../public/assets/img/kakao.png" alt="" />
        </a>
        <br />
        <a href="http://localhost:8080/oauth2/authorization/google">
          <img src="../../../public/assets/img/google.png" alt="" />
        </a>
        <br />
        <a href="http://localhost:8080/oauth2/authorization/naver">
          <img src="../../../public/assets/img/naver.png" alt="" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive } from "vue";
import axios from "axios";
import router from "@/router";
export default {
  setup() {
    onMounted(() => {

      function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(";").shift();
      }

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

      if (localStorage.getItem("username")) {
        router.replace("home");
      }
    });

    const state = reactive({
      form: {
        username: "",
        password: "",
      },
    });

    const goToRegister = () => {
      router.push({ name: "Register" });
    };

    const login = () => {
      // console.log("로그인 요청");
      axios
        .post("http://localhost:8080/api/login", state.form)
        .then((res) => {
          // console.log("로그인 완료");

          console.log(res.data);

          // console.log(
          //   "로그인 리다이렉트 페이지 확인 : ",
          //   res.data.redirectPage
          // );

          const accessToken = res.data.accessToken;
          const refreshToken = res.data.refreshToken;
          const username = res.data.username;
          const roles = res.data.roles;

          // console.log("응답 : " + JSON.stringify (res));
          // console.log("엑세스 토큰: " + res.data.accessToken);
          // console.log("리프레시 토큰: " + res.data.refreshToken);
          // console.log("유저네임: " + res.data.username);
          // console.log("역할 : " + res.data.roles);

          if (accessToken) {
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            localStorage.setItem("username", username);
            localStorage.setItem("roles", roles);
          }

          function expireCookie(name) {
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
          }

          expireCookie("accessToken");
          expireCookie("refreshToken");
          expireCookie("username");

          console.log("로그인 결과 확인 : ", res.data.redirectPage);

          if (res.data.redirectPage) {
            router.replace(`${res.data.redirectPage}`);
          } else {
            window.alert("로그인 실패");
          }
        })
        .catch((err) => {
          if (err.response.data.errMsg) {
            window.alert(err.response.data.errMsg);
          } else {
            window.alert("로그인 실패");
          }
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
      goToRegister,
      login,
      // get,
    };
  },
};
</script>
<style scoped>
@import "../../../public/assets/css/login-page.css";
</style>
