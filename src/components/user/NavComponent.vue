<template>
  <div class="nav-bar">
    <div>
      <div class="modal-bg" v-if="!modal" @click="modal = !modal"></div>
      <transition name="slide-up">
        <div class="nav-modal" v-if="!modal">
          <div class="nav-search-fix">
            <div class="search-bar">
              <input
                v-model="keyword"
                class="search-box"
                @keyup.enter="btnClick"
                placeholder="검색할 물품을 입력하세요."
              />
              <button class="search-btn" @click="btnClick">
                <img src="../../../public/assets/img/search-green.png" alt="" />
              </button>
            </div>
          </div>

          <div class="nav-item-post">
            <ItemPost :items="items" />
            <infinite-loading ref="infiniteLoading" @infinite="infiniteHandler">
              <template #spinner>
                <LoadingSpinner />
              </template>
              <template #no-more>
                <LoadComplete></LoadComplete>
              </template>
            </infinite-loading>
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
import { InfiniteLoading } from "infinite-loading-vue3-ts";
import LoadingSpinner from "@/components/user/LoadingSpinner.vue";
import { requireRefreshToken } from "@/api/tokenApi.vue";

export default {
  name: "NavBar",
  components: {
    LoadingSpinner,

    InfiniteLoading,
    ItemPost,
  },
  data() {
    return {
      modal: true,

      keyword: "",
      items: [],
      page: 0,
    };
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
      // this.$router.push("/user");
      location.href = "http://localhost:8081/user";
    },
    auctionRegister() {
      this.$router.push("/auction/register");
    },

    infiniteHandler($state) {
      this.$http
        .get("/nav/item/list", {
          params: {
            page: this.page,
            keyword: this.keyword,
          },
        })
        .then((res) => {
          if (res.data.length) {
            console.log("페이지: " + this.page);

            this.items.push(...res.data);
            this.items.forEach((item) => {
              item.remainingTime = item.time;
              this.startStopwatch(item);
            });

            this.page++;
            $state.loaded();
            if (res.data.length < 1) {
              $state.complete();
            }
          } else {
            $state.complete();
          }
        })
        .catch((err) => {
          if (err.response.data == "please send refreshToken") {
            console.log("리프레시 토큰 요청");
            requireRefreshToken();
          }
        });
    },

    startStopwatch(item) {
      if (item.timer) {
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
    },
    chats() {
      this.$router.push("/chats");
    },
  },
};
</script>

<style scoped>
.nav-bar {
  width: 390px;
  height: 50px;
  position: fixed;
  bottom: -1px;
  border-top: 1px solid #d9d9d9;
  background-color: #ffffff;
  z-index: 3;
}

.modal-bg {
  width: 390px;
  height: 100%;
  position: fixed;
  bottom: 50px;
  background-color: rgba(0, 0, 0, 60%);
}

.nav-modal {
  width: 390px;
  height: 700px;
  overflow-y: auto;
  position: fixed;
  bottom: 50px;
  transform: translateY(0px);
  background-color: #ffffff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}

.nav-modal::-webkit-scrollbar {
  display: none;
}

.nav-modal .search {
  padding: 20px 0 55px 0;
  top: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease-in-out;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(744px);
}

.nav-menu {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
