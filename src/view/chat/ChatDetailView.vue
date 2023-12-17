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
        <p class="item-price">{{ formattedBiddingPrice }}원</p>
      </div>
    </div>
    <Chat :chatId="chatId" />
  </div>
</template>
<script>
import Logo from "@/components/user/LogoComponent.vue";
import Chat from "@/components/chat/ChatComponent.vue";
import Header from "@/components/user/HeaderComponent.vue";

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
  },
};
</script>

<style scoped>
.chat-header {
  display: flex;
  border-bottom: 1px solid #d9d9d9;
  padding: 10px;
  position: sticky;
  top: 99px;
  background: #ffffff;
}

.item-img-div {
  margin-right: 10px;
}

.item-img {
  width: 60px;
  height: 60px;
}

.item-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.item-info .item-title {
  font-size: 20px;
}

.item-info .item-price {
  color: #e12905;
  font-size: 20px;
}
</style>
