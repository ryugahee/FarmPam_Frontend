<template>
  <div class="container">
    <div class="logo">
      <img src="../../../public/assets/img/Logo.png" alt=""/>
    </div>

    <div class="loginForm">
      <input placeholder="아이디"/>
      <br/>
      <input placeholder="비밀번호"/>
    </div>

    <div class="bottons">
      <button>로그인</button>
      <br/>
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
      <img src="../../../public/assets/img/kakao.png" alt=""/>
      <br/>
      <img src="../../../public/assets/img/google.png" alt=""/>
      <br/>
      <img src="../../../public/assets/img/naver.png" alt=""/>
    </div>
  </div>
</template>

<script>

export default {
  setup() {

  }
}
</script>

<style scoped>
@import "../../../public/assets/css/login-page.css";

</style>