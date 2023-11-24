<template>
  <div class="container">
    <div class="advice">
      <p>간편 로그인 완료를 위해</p>
      <p>추가 정보를 입력해주세요</p>
    </div>
    <div class="easyLoginForm">
      <label for="itemname"><span>* </span>이름</label>
      <input type="text" class="txt-input" id="itemname" value="dust">
    </div>

    <div class="easyLoginForm">
      <label for="itempw"><span>* </span>전화번호</label>
      <input type="text" class="txt-input" id="itempw" value="">
    </div>

    <div class="easyLoginForm">
      <label for="itemnew"><span>* </span>닉네임</label>
      <input type="text" class="txt-input" id="itemnew" value="">
    </div>

    <div class="easyLoginForm">
      <label for="itemnew"><span>* </span>지역</label>
      <input type="text" class="txt-input" id="itemnew" value="">
    </div>

    <button>회원가입 하기</button>
  </div>
</template>

<script>
export default {
  setup() {

  },
}
</script>

<style scoped>
@import "../../../public/assets/css/easy-login.css";
</style>