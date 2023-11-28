<template>
  <div>
    <Logo />
    <div class="title_header">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-chevron-left"
      >
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
      <h2 class="title_text">{{ title }}</h2>
      <div style="width: 48px; height: 48px"></div>
    </div>
    <div class="chats_container">
      <ChatPreview v-for="chatId in chatIds" :key="chatId" :chatId="chatId" />
    </div>
    <NavComponent />
  </div>
</template>
<script>
import Logo from "@/components/user/LogoComponent.vue";
import ChatPreview from "@/components/chat/ChatPreviewComponent.vue";
import NavComponent from "@/components/user/NavComponent.vue";

export default {
  name: "ChatListView",
  components: { Logo, ChatPreview, NavComponent },
  data() {
    return {
      title: "대화 내역",
      chatIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    };
  },
  created() {
    this.getChats;
  },
  methods: {
    async getChats() {
      this.chats - (await this.$api("/chats", {}));
      console.log(this.chats);
    },
  },
};
</script>

<style scoped>
@import "../../../public/assets/css/chats-page-style.css";
</style>
