<template>
  <div>
    <logo />
    <Header>
      <p>{{ chatDetailInfo.toNickName }}</p>
    </Header>
    <div class="chat-header">
      <div class="item-img-div">
        <img class="item-img" :src="chatDetailInfo.itemThumbnailUrl" alt="" />
      </div>
      <div class="item-info">
        <p class="item-title">{{ chatDetailInfo.itemTitle }}</p>
        <p class="item-price">{{ currentPrice.content }}원</p>
      </div>
    </div>
    <Chat :chatId="chatId" />
  </div>
</template>
<script>
import Logo from "@/components/user/LogoComponent.vue";
import Chat from "@/components/chat/ChatComponent.vue";
import Header from "@/components/user/HeaderComponent.vue";
import SocketJS from "sockjs-client";
import Stomp from "webstomp-client";

export default {
  name: "ChatDetailView",
  components: { Logo, Chat, Header },
  data() {
    return {
      chatDetailInfo: {
        toNickName: "",
        itemTitle: "",
        itemThumbnailUrl: "",
        biddingPrice: 0,


      },
      bidId: "",
      receiveList: [],
      currentPrice: []
    };
  },
  computed: {
    chatId() {
      return this.$route.params.id;
    },
    formattedBiddingPrice() {
      return this.chatDetailInfo.biddingPrice.toLocaleString();
    },
  },
  inject:["$http"],
  created() {
    if (localStorage.getItem("accessToken") == null) {
      this.$router.replace("/login");
      alert("로그인 후 이용하실 수 있습니다.");
    }

    this.myId = localStorage.getItem("username");
    this.$store
      .dispatch("findChatDetailInfo", {
        chatId: this.chatId,
        userId: this.myId,
      })
      .then(() => {
        this.chatDetailInfo = this.$store.state.chatDetailInfo;
      });
    this.bidId = this.chatDetailInfo.bidId;

    this.connect();
  },
  methods:{
    connect(){
      this.receiveBidList();
      const serverURL = "http://localhost:8080/bid";
      let socket = new SocketJS(serverURL);
      this.stompClient = Stomp.over(socket);
      this.stompClient.connect(
          {},
          (frame) => {
            this.connected = true;
            this.stompClient.subscribe("/bidList", (res) => {
              this.receiveList = JSON.parse(res.body);
              this.currentPrice = this.receiveList.at(-1);

            });
          },
          (error) => {
            this.connected = false;
          },
      );
    },
    receiveBidList() {
      //입찰내역 호출
      this.bidId = this.$route.params.id;
      const msg = {
        bidId: this.bidId,
      };

      this.$http
          .post("/bid-list", JSON.stringify(msg), {})
          .then((res) => {
            this.receiveList = res.data;
            this.currentPrice = this.receiveList.at(-1);
          })
          .catch((err) => {
            console.log(err);
          });



    },
  }
};
</script>

<style scoped>
@import "../../../public/assets/css/chat-page-style.css";
</style>
