<template>
  <div>
    <LOGO/>
    <div class="detail-profile">
      <div class="detail-profile-box" @click="profile">
        <img :src="profileImg" alt="profileImg" />
        <h3> {{ nickName }} </h3>
        <div class="review-avg">
          <img src="../../../public/assets/img/filled-star.png" alt="star" />
          <span> {{ review }} </span>
        </div>
      </div>
    </div>
    <div class="item-img">
      <img :src="itemImg" alt="경매 상품 이미지">
    </div>
    <div class="item-content">
      <p>집에서 직접 재배한 사과입니다.<br />
        아삭하고 맛있읍니다.</p>
    </div>
    <div class="item-footer">
      <div class="current-price">
        <span>현재 입찰가</span>
        <span> {{ currentPrice.toLocaleString() }}원 </span>
      </div>
      <div class="my-price">
        <span>내 입찰가</span>
        <span> {{ myPrice.toLocaleString() }}원 </span>
      </div>

<!--      bid modal-->
      <div class="bid-bg" v-if="!bidModal">
        <div v-for="item in receiveList" :key="item.id">
          <p>유저 이름: {{ item.userName}}</p>
          <p>내용: {{ item.content}}</p>
        </div>
        <div class="bid-btn">
          <div class="current-price-bid-box">
            <span>현재 입찰가</span>
            <span> {{ currentPrice.toLocaleString() }}원 </span>
          </div>

          <div>
            <p class="bid-text">입찰할 금액(직접입력)</p>
          </div>
          <div>
            <input v-model="userName" class="bid-input-box" type="text" placeholder="사용자 이름 입력.">
            <input v-model="bidPrice" class="bid-input-box" type="text" placeholder="입찰가 입력."><span class="bid-won">원</span>
          </div>


        </div>

        <div class="btn-a-bid" @click="sendBidPrice">
          <p class="bid-time"> {{ time }} </p>
          입찰하기
        </div>
      </div>

<!--      아이템 디테일-->
      <div class="make-a-bid" v-if="bidModal" @click="bidModal=!bidModal">
        <p class="bid-time"> {{ time }} </p>
        <p>입찰하기</p>
      </div>
<!--      <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom">Toggle bottom offcanvas</button>-->

<!--      <div class="offcanvas offcanvas-bottom" tabindex="-1" id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel">-->
<!--        <div class="offcanvas-header">-->
<!--          <h5 class="offcanvas-title" id="offcanvasBottomLabel">Offcanvas bottom</h5>-->
<!--          <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>-->
<!--        </div>-->
<!--        <div class="offcanvas-body small">-->
<!--          ...-->
<!--        </div>-->
<!--      </div>-->
    </div>
  </div>
</template>

<script>
import LOGO from "@/components/user/LogoComponent.vue";
import Stomp from 'webstomp-client'
import SocketJS from 'sockjs-client'
import Auction from "@/components/auction/AuctionComponent.vue";
export default {
  name: "ItemDetailView",
  data() {
    return {
      profileImg: require("../../../public/assets/img/profile1.png"),
      nickName: "그랜드팜",
      review: 4.5,
      itemImg: require("../../../public/assets/img/apple.png"),
      currentPrice: 10000,
      myPrice: 9000,
      time: "14:31:29",
      bidModal: true,
      userName:"",
      bidPrice: "",
      receiveList: []
    }
  },
  components: {
    LOGO,
  },
  inject: ["$http"],
  created() {
    this.connect()
  },
  methods: {
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
    profile() {
      this.$router.push("/profile")
    },
    sendBidPrice(){
      console.log("Send bidPrice:" + this.bidPrice);
      if(this.stompClient && this.stompClient.connected){
        const msg = {
          userName: this.userName,
          content: this.bidPrice
        };
        this.stompClient.send("/auction-bid", JSON.stringify(msg), {});
      }
    }
  }
}
</script>

<style scoped>
@import "../../../public/assets/css/item-detail-page.css";
@import "../../../public/assets/css/chat-style.css";
</style>