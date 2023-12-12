<template>
  <div class="nav-bar">
    <div>
      <div class="modal-bg" v-if="!modal" @click="modal = !modal"></div>
      <transition name="slide-up">
        <div class="nav-modal" v-if="!modal">

          <div class="search-fix">
            <div class="search-bar">
              <input v-model="keyword" class="search-box" @keyup.enter="btnClick" placeholder="검색할 물품을 입력하세요."/>
              <button class="search-btn" @click="btnClick"><img src="../../../public/assets/img/search-green.png" alt="" /></button>
            </div>
          </div>

          <div class="nav-item-post">
            <ItemPost :items="items"/>
            <infinite-loading ref="infiniteLoading" @infinite="infiniteHandler"></infinite-loading>
          </div>
        </div>
      </transition>
    </div>
    <div class="nav-menu">
      <img
        @click="modal = !modal"
        src="../../../public/assets/img/search.png"
        alt=""
      />
      <img @click="home" src="../../../public/assets/img/home.png" alt="" />
      <img
        @click="auctionRegister"
        src="../../../public/assets/img/add_box.png"
        alt=""
      />
      <img @click="chats" src="../../../public/assets/img/chat.png" alt="" />
      <img @click="user" src="../../../public/assets/img/person.png" alt="" />
    </div>
  </div>
</template>

<script>
import ItemPost from "@/components/item/ItemPostComponent.vue";
import {InfiniteLoading} from "infinite-loading-vue3-ts";

export default {
  name: "NavBar",
  components: {

    InfiniteLoading,
    ItemPost

  },
  data() {
    return {
      modal: true,

      keyword: '',
      items: [],
      page: 0
    }
  },
  created() {
    if (this.$refs.InfiniteLoading) {
      this.$refs.InfiniteLoading.stateChanger.reset();
    }

  },
  inject: ["$http"],
  methods: {
    home() {
      this.$router.push("/home");
    },
    user() {
      this.$router.push("/user");
    },
    auctionRegister() {
      this.$router.push("/auction/register");
    },

    infiniteHandler($state) {
      this.$http.get("/nav/item/list", {
        params: {
          page: this.page,
          keyword: this.keyword
        },
      }).then((res) => {
        if (res.data.length) {
          console.log("페이지: " + this.page)

          this.items.push(...res.data);
          this.items.forEach(item => {
            item.remainingTime = item.time;
            this.startStopwatch(item);
          });

          this.page ++
          $state.loaded();
          if (res.data.length  < 1) {
            $state.complete();
          }
        } else {
          $state.complete();
        }
      }).catch((error) => {
        console.error(error);
      });
    },

    startStopwatch(item) {
      if(item.timer) {
        clearInterval(item.timer);
      }
      item.timer = setInterval(() => {
        if (item.remainingTime > 0) {
          item.remainingTime -= 1000;
        } else {
          clearInterval(item.timer);
          item.remainingTime = 0;
        }
      }, 1000);

    },

    btnClick() {
      this.page = 0;
      this.items = [];
      this.$refs.infiniteLoading.stateChanger.reset();
      this.keyword = '';
    },
    chats() {
      this.$router.push("/chats");
    },
  }
}


</script>

<style scoped>
@import "../../../public/assets/css/nav-component.css";
</style>
