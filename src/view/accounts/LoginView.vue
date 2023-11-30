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
          @keyup.enter="submit()"

        />
        <br />
        <input 
          placeholder="비밀번호" 
          v-model="state.form.password"
          @keyup.enter="submit()"
        />
      </div>

      <div class="bottons">
        <button @click="submit()">로그인</button>
        <br />
        <button>회원가입</button>
      </div>

      <div class="finder">
        <button>아이디 찾기</button> &nbsp; &nbsp; | &nbsp;
        <button>비밀번호 찾기</button>
      </div>

      <div class="line">
        또는
      </div>

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
import { reactive } from 'vue';
import axios from 'axios';

export default {
  setup() {
        const state = reactive({
            form: {
                username: "",
                password: ""
            }
        });

        const submit = () => {
            axios.post("/api/login", state.form).then(() => {

                alert("로그인 완료");

            }).catch((err) => {
                console.log(err);
                window.alert("로그인 정보가 존재하지 않습니다.");
            });
        }

        return{
            state,
            submit
        }
    }
}
</script>

<style scoped>
@import "../../../public/assets/css/login-page.css";
</style>