<template>
  <div>
    <LogoView />
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
      <ChatPreview v-for="chatPreview in 10" :key="chatPreview" />
    </div>
    <NavComponent />
  </div>
</template>
<script>
import LogoView from "@/components/user/LogoComponent.vue";
import ChatPreview from "@/components/chat/ChatPreview.vue";
import NavComponent from "@/components/user/NavComponent.vue";

export default {
  name: "ChatListView",
  components: { LogoView, ChatPreview, NavComponent },
  data() {
    return {
      title: "대화 내역",
      username: "그랜드팜",
      time: "오전 09:30",
      chat: "개맛도링",
    };
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeUnmount() {},
  unmounted() {},
  methods: {},
};
</script>

<style scoped>
@import "../../../public/assets/css/chats-page-style.css";
</style>
