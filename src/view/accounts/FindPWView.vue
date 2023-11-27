<template>
  <div class="container">
    <row>

      <div class="advice">
        비밀번호 찾기
      </div>


      <div class="easyLoginForm">
        <label for="itemname"><span>* </span>아이디</label>
        <input type="text" class="txt-input" id="itemname">
      </div>


      <div class="easyLoginForm">
        <label for="itemname"><span>* </span>전화번호</label>
        <input type="text" class="txt-input" id="itemname">
      </div>



      <button>인증하기</button>
    </row>
  </div>
</template>

<script>
export default {
  setup() {

  },
}
</script>

<style scoped>
@import "../../../public/assets/css/find-pw-page.css";
</style>