<template>
  <div>
    <Logo />
    <HeaderComponent>
      <p>{{ title }}</p>
    </HeaderComponent>
    <div v-if="chatIds.length > 0">
      <div class="chats_container">
        <div v-for="(chatId, index) in chatIds" :key="index" :chatId="chatId">
          <router-link :to="`/chats/${chatId}`" class="router-link">
            <div class="chat_preview">
              <div class="profile_img_div">
                <img
                  v-if="chatPreviewInfo(index).toNickNameThumbnailUrl"
                  class="profile_img"
                  :src="chatPreviewInfo(index).toNickNameThumbnailUrl"
                />
                <img
                  v-else
                  class="profile_img"
                  src="../../../public/assets/img/person2.png"
                  style="background-color: #d9d9d9"
                />
              </div>
              <div class="wrapper_info">
                <div class="chat_info">
                  <div class="chat_info_top">
                    <p class="username">
                      {{ chatPreviewInfo(index).toNickName }}
                    </p>
                    <p class="chat_time">
                      {{ chatPreviewInfo(index).updateTime }}
                    </p>
                  </div>
                  <div class="chat_info_bottom">
                    {{ chatPreviewInfo(index).lastMessage }}
                  </div>
                </div>
                <div class="item_img_div">
                  <img
                    class="item_img"
                    :src="chatPreviewInfo(index).itemThumbnailUrl"
                    alt="엑박"
                  />
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
      <NavComponent />
    </div>
  </div>
</template>
<script>
import Logo from "@/components/user/LogoComponent.vue";
import NavComponent from "@/components/user/NavComponent.vue";
import HeaderComponent from "@/components/user/HeaderComponent.vue";

export default {
  name: "ChatListView",
  components: { Logo, NavComponent, HeaderComponent },
  data() {
    return {
      title: "대화 내역",
      chatIds: [],
      myId: "",
      chatPreviewInfos: [
        {
          toNickName: "",
          toNickNameThumbnailUrl: "",
          lastMessage: "",
          updateTime: "",
          itemThumbnailUrl: "",
        },
      ],
    };
  },

  created() {
    if (localStorage.getItem("accessToken") == null) {
      this.$router.replace("/login");
      alert("로그인 후 이용하실 수 있습니다.");
    }

    this.myId = localStorage.getItem("username");
    // 내가 참여 중인 채팅방 아이디 찾기
    this.$store.dispatch("findChatIds", this.myId).then(() => {
      this.chatIds = this.$store.state.chatIds;

      console.log(this.chatIds);

      // ChatIds를 가져오면서 채팅 리스트에 보여줄 정보 미리 가져오기
      if (this.chatIds.length !== 0) {
        this.$store
          .dispatch("findChatPreviewInfos", {
            chatIds: this.chatIds,
            userId: this.myId,
          })
          .then(() => {
            this.chatPreviewInfos = this.$store.state.chatPreviewInfos;
            console.log(this.chatPreviewInfos);
          });
      }

      // jwt 토큰이 없으면 /home로 리디렉션
      // if (localStorage.getItem("jwt") == null) {
      //   router.replace("/home");
      // }
    });
  },

  methods: {
    chatPreviewInfo(index) {
      console.log(this.$store.state.chatPreviewInfos[index]);
      return this.$store.state.chatPreviewInfos[index] || [];
    },
  },
};
</script>

<style scoped>
.title_header {
  display: flex;
  justify-content: space-between;
  max-height: 50px;
  border-bottom: 1px solid #d9d9d9;
}

.title_text {
  display: flex;
  justify-content: center;
  align-items: center;
}

.chats_container {
  padding-bottom: 50px;
}

.chat_preview {
  padding: 10px;
  display: flex;
  cursor: pointer;
}

.profile_img_div {
  width: 80px;
  height: 80px;
}

.profile_img {
  max-width: inherit;
  max-height: inherit;
  border-radius: 50%;
}

.chat_info {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.chat_info_top {
  display: flex;
  align-items: end;
}

.username {
  color: #000;

  text-align: center;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  padding-right: 5px;
}

.chat_time {
  color: #000;

  text-align: center;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.chat_info_bottom {
  color: #000;

  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.wrapper_info {
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-left: 10px;
}

.item_img_div {
  display: flex;
  align-items: center;
}

.item_img {
  width: 60px;
  height: 60px;
  border-radius: 5px;
}

.router-link {
  text-decoration: none;
  color: inherit;
}
</style>
