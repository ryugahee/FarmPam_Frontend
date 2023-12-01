<template>
  <router-link :to="`/chats/${chatId}`" class="router-link">
    <div class="chat_preview">
      <div class="profile_img_div">
        <img
          class="profile_img"
          src="../../../public/assets/img/profile1.png"
          alt="그랜드팜"
        />
      </div>
      <div class="wrapper_info">
        <div class="chat_info">
          <div class="chat_info_top">
            <p class="username">{{ username }}</p>
            <P class="chat_time">{{ time }}</P>
          </div>
          <div class="chat_info_bottom">{{ chat }}</div>
        </div>
        <div class="item_img_div">
          <img
            class="item_img"
            src="../../../public/assets/img/thumbnail1.png"
            alt="샤인머스캣"
          />
        </div>
      </div>
    </div>
  </router-link>
</template>
<script>
export default {
  name: "ChatPreview",
  props: {
    chatId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      username: "그랜드팜",
      time: "오전 09:30",
      chat: "개맛도링",
    };
  },
};
</script>
<style scoped>
@import "../../../public/assets/css/chat-preview-style.css";
</style>
