<template>
  <div>
    <Logo />
    <HeaderComponent>
      <p>{{ title }}</p>
    </HeaderComponent>
    <row>
      <div class="chats_container">
        <ChatPreview v-for="chatId in chatIds" :key="chatId" :chatId="chatId" />
      </div>
      <NavComponent />
    </row>
  </div>
</template>
<script>
import Logo from "@/components/user/LogoComponent.vue";
import ChatPreview from "@/components/chat/ChatPreviewComponent.vue";
import NavComponent from "@/components/user/NavComponent.vue";
import HeaderComponent from "@/components/user/HeaderComponent.vue";

export default {
  name: "ChatListView",
  components: { Logo, ChatPreview, NavComponent, HeaderComponent },
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
