<template>
  <div class="input-box">
    <input v-model="id" class="custom-input inputs" type="text" placeholder="ID 입력.">
    <input v-model="userName" class="custom-input inputs" type="text" placeholder="유저 이름 입력.">
    <input v-model="bidPrice" class="custom-input inputs" type="text" placeholder="입찰가 입력.">
    <button @click="auction" class="custom-button inputs">입찰</button>
  </div>
</template>

<script>
export default {
  name:"AuctionView",
  data(){
    return{
      id:"",
      userName:"",
      bidPrice:""

    }
  },
  created() {
  },
  inject:['$http'],
  methods:{
    async auction(){
      let data = {};
      data.id = this.id;
      data.userName = this.userName;
      data.bidPrice = this.bidPrice;
      this.$http.post('/auction/bid', data).then(res =>{
        console.log(res.data);
      }).catch(err =>{
        console.log(err);
      })
    }

  }
}
</script>


<style scoped>
.input-box .inputs {
  width: 100%;
}
.input-box .custom-input {
  padding-left: 45px;
  height: 45px;
  font-size: 17px;
  border: 1px solid darkgray;
}
.input-box {
  margin: auto;
  width: 70%;
}
.input-box .custom-button {
  margin-top: 60px;
  height: 45px;
  font-size: 20px;
  color: #FFFFFF;
  background: #0037ff;
  cursor: pointer;
  border: none;
}
</style>