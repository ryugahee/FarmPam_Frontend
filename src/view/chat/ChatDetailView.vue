<template>
  <div>
    <logo />
    <div class="chat-header">
      <div class="item-img-div">
        <img
          class="item-img"
          src="../../../public/assets/img/thumbnail1.png"
          alt=""
        />
      </div>
      <div class="item-info">
        <p class="item-title">{{ itemTitle }}</p>
        <p class="item-price">{{ price.toLocaleString() }}원</p>
      </div>
    </div>
    <Chat :chatId="chatId" />
  </div>
</template>
<script>
import Logo from "@/components/user/LogoComponent.vue";
import Chat from "@/components/chat/ChatComponent.vue";

export default {
  name: "ChatDetailView",
  components: { Logo, Chat },
  data() {
    return {
      itemTitle: "가희네 고당도 샤인머스켓 4kg",
      price: 40000,
    };
  },
  computed: {
    chatId() {
      return this.$route.params.id;
    },
  },
};
</script>

<style scoped>
@import "../../../public/assets/css/chat-page-style.css";
</style>
