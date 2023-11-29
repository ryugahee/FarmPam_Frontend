<template>
  <div class="container">
    <row>
      <button @click="search()">우편번호 찾기</button>
      <div class="easyLoginForm">
        <label for="itemnew"><span>* </span>우편번호</label>
        <input type="text" class="txt-input" id="itemnew" v-model="zipcode">
      </div>
      <div class="easyLoginForm">
        <label for="itemnew"><span>* </span>도로명주소</label>
        <input type="text" class="txt-input" id="itemnew" v-model="streetadr">
      </div>
      <div class="easyLoginForm">
        <label for="itemnew"><span>* </span>상세주소</label>
        <input type="text" class="txt-input" id="itemnew" v-model="detailadr">
      </div>
    </row>
  </div>
</template>

<script>

export default {
  name: "AddressComponent",

  data() {
    return {
      zipcode: "",
      streetadr: "",
      detailadr: "",
    }
  },

  methods: {
    search(){
      new window.daum.Postcode({
        oncomplete: (data) => {
          var roadAddr = data.roadAddress;
          var extraRoadAddr = '';

          if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
            extraRoadAddr += data.bname;
          }

          if(data.buildingName !== '' && data.apartment === 'Y'){
            extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
          }

          if(extraRoadAddr !== ''){
            extraRoadAddr = ' (' + extraRoadAddr + ')';
          }

          if(roadAddr !== ''){
            roadAddr += extraRoadAddr;
          }

          this.zipcode = data.zonecode;
          this.streetadr = roadAddr;

        }
      }).open();

    },
  }
}
</script>

<style scoped>
@import "../../../public/assets/css/register-page.css";
</style>