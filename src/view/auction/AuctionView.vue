<template>
  <div>


  <div class="input-box">
    <input v-model="userName" class="custom-input inputs" type="text" placeholder="유저 이름 입력.">
    <input v-model="bidPrice" class="custom-input inputs" type="text"  placeholder="입찰가 입력.">
    <button @click="send" @keyup="send" class="custom-button inputs">입찰</button>
  </div>
  <div v-for="item in receiveList" :key="item.id">
    <h3>유저 이름: {{ item.userName}}</h3>
    <h3>내용: {{ item.content}}</h3>
  </div>
  </div>
</template>

<script>
import Stomp from 'webstomp-client'
import SocketJS from "sockjs-client";
export default {
  name:"AuctionView",
  data(){
    return{
      userName:"",
      bidPrice:"",
      receiveList: []
    }
  },
  created() {
    this.connect()
  },
  inject:['$http'],
  methods:{
    send(){
      console.log("Send bidPrice:" + this.bidPrice);
      if(this.stompClient && this.stompClient.connected){
        const msg = {
          userName: this.userName,
          content: this.bidPrice
        };
        this.stompClient.send("/auction-bid", JSON.stringify(msg), {});
      }
    },

    connect(){
      const serverURL = "http://localhost:8080"
      let socket = new SocketJS(serverURL);
      this.stompClient = Stomp.over(socket);
      console.log(`connected try. URL: ${serverURL}`)
      this.stompClient.connect(
          {},
          frame => {
            this.connected = true;
            console.log('connected success', frame);

            this.stompClient.subscribe("/auction/bids", res =>{
              console.log("response message", res.body);
              this.receiveList.push(JSON.parse(res.body))
            });
          },
          error => {
            console.log('connected fail', error);
            this.connected = false;
          }
      );
    },

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