<template>
  <div class="post">
    <div class="post-img-box" v-for="(item, i) in items" :key="i">
      <router-link :to='"/auction/detail/" + item.id'>
        <div class="post-img">
          <img :src="item.itemImgDtoList[0].imgUrl" class="thumbnail-img" alt="thumbnail-img"/>
          <div class="remaining-time" v-if="item.remainingTime > 0">
            <div class="time-bg">
              <p> {{ formatTime(item.remainingTime) }} 남음 </p>
            </div>
          </div>
          <div class="remaining-time" v-else>
            <div class="time-bg">
              <p> 경매 종료 </p>
            </div>
          </div>
        </div>
        <div class="post-content">
          <h5> {{ item.itemTitle }} {{ item.weight }}kg</h5>
          <p class="current-bid-price">현재 입찰가</p>
          <h3 class="price" v-if="currentInfo !== undefined && currentInfo[i] && currentInfo[i].bidPrice !== undefined"> {{ currentInfo[i].bidPrice }}원 </h3>
<!--          <h3 class="price" v-if="currentInfo !== undefined && currentInfo.find(info => info.bidId === item.id) && currentInfo.find(info => info.bidId === item.id).bidPrice !== undefined">-->
<!--            {{ currentInfo.find(info => info.bidId === item.id).bidPrice }}원-->
<!--          </h3>-->
        </div>
        {{currentInfo[i]}}
      </router-link>
    </div>

  </div>
</template>

<script>
import SocketJS from "sockjs-client";
import Stomp from "webstomp-client";

export default {
  name: 'ItemPost',
  components: {},
  props: {
    items: Array,
  },

  data() {
    return {
      currentInfo: [],
      currentPrice: "",
    }
  },
  created() {
    this.connect();
  },

  inject: ["$http"],
  methods: {
    formatTime(remainingTime) {
      if (remainingTime <= 0) {
        return '00:00:00';
      }
      const hours = Math.floor(remainingTime / 3600000);
      const minutes = Math.floor((remainingTime % 3600000) / 60000);
      const seconds = Math.floor((remainingTime % 60000) / 1000);
      return `${this.padTime(hours)}:${this.padTime(minutes)}:${this.padTime(seconds)}`;
    },
    padTime(time) {
      return (time < 10 ? '0' : '') + time;
    },

    connect() {
      this.receiveBidPrice();
      const serverURL = "http://localhost:8080/bid";
      let socket = new SocketJS(serverURL);
      this.stompClient = Stomp.over(socket);
      this.stompClient.connect(
          {},
          (frame) => {
            this.connected = true;
            this.stompClient.subscribe("/bidPost", (res) => {
              this.currentInfo = JSON.parse(res.body);
              this.currentPrice = this.currentInfo;
              console.log(this.currentPrice);
            });
          },
          (error) => {
            this.connected = false;
          }
      );
    },
    receiveBidPrice() {
      this.$http.get("/bidPost").then((res) => {
        this.currentInfo = res.data;
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
@import "../../../public/assets/css/item-post-component.css";
</style>