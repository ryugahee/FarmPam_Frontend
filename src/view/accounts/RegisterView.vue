<template>
  <div class="container">
    <row>

      <div class="advice">
        회원가입
      </div>


      <div class="easyLoginForm">
        <label for="itemname"><span>* </span>이름</label>
        <input type="text" class="txt-input" id="itemname" v-model="userName">
      </div>

      <div class="easyLoginForm">
        <label for="itempw"><span>* </span>아이디</label>
        <input type="text" class="txt-input" id="itempw" v-model="userId">
      </div>

      <div class="easyLoginForm">
        <label for="itemnew"><span>* </span>비밀번호</label>
        <input type="text" class="txt-input" id="itemnew" v-model="userPassword">
      </div>

      <div class="easyLoginForm">
        <label for="itemnew"><span>* </span>비밀번호 확인</label>
        <input type="text" class="txt-input" id="itemnew" v-model="userPWCheck">
      </div>

      <div class="easyLoginForm">
        <label for="itemname"><span>* </span>이메일</label>
        <input type="text" class="txt-input" id="itemname" v-model="userEmail">
      </div>

      <div class="easyLoginForm">
        <label for="itempw"><span>* </span>전화번호</label>
        <input type="text" class="txt-input" id="itempw" v-model="userPhoneNumber">
      </div>

      <div class="easyLoginForm">
        <label for="itemnew"><span>* </span>닉네임</label>
        <input type="text" class="txt-input" id="itemnew" v-model="userNickName">
      </div>

      <div class="easyLoginForm">
        <label for="itemnew"><span>* </span>지역</label>
        <input type="text" class="txt-input" id="itemnew" v-model="userLocal">
      </div>


      <button @click="submit">회원가입 하기</button>
    </row>
  </div>
</template>

<script>
export default {
  name:"RegisterView",
  inject:["$http"],
  data(){
    return{
      userName:"",
      userId:"",
      userPassword:"",
      userPWCheck:"",
      userEmail:"",
      userPhoneNumber:"",
      userNickName:"",
      userLocal:""
    }
  },
  methods:{
    submit (){
      let data = {};
      data.userName = this.userName;
      data.userPassword = this.userPassword;
      data.userEmail = this.userEmail;
      data.userPhoneNumber = this.userPhoneNumber;
      data.userLocal = this.userLocal;
      this.$http.post("/user/signup", data).then(()=>{
        alert("회원가입 완료");
        this.$router.push("/login");
      }).catch((err) => {
        console.log(err);
        window.alert("회원가입을 진행 할 수 없습니다.");
      });
    }
  },

}
</script>

<style scoped>
@import "../../../public/assets/css/register-page.css";
</style>