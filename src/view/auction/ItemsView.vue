<template>
  <div>
    <LOGO/>
    <div class="search">
      <div class="search-bar">
        <input v-model="searchValue" class="search-box" placeholder="검색할 물품을 입력하세요."/>
        <button class="search-btn" @click="btnClick"><img src="../../../public/assets/img/search-green.png" alt=""/>
        </button>
      </div>
    </div>
    <div class="select-box">
      <select class="select" v-model="sortType" @change="fetchData">
        <option value="join" >참여순</option>
        <option value="latest">최신순</option>
        <option value="time">종료임박순</option>
      </select>
    </div>
    <div>
      <ItemPost :items="items"/>
      <infinite-loading ref="infiniteLoading" @infinite="infiniteHandler"></infinite-loading>
    </div>
    <NavBar/>
  </div>
</template>

<script>
import LOGO from "@/components/user/LogoComponent.vue";
import ItemPost from "@/components/item/ItemPostComponent.vue";
import NavBar from "@/components/user/NavComponent.vue";
import {InfiniteLoading} from "infinite-loading-vue3-ts";

export default {
  name: "ItemView",
  components: {
    InfiniteLoading,
    LOGO,
    ItemPost,
    NavBar
  },
  data() {
    return {
      searchValue: '',

      items: [],
      sortType: 'latest',
      page: 0
    }
  },

  created() {

    if(this.$refs.InfiniteLoading){
      this.$refs.InfiniteLoading.stateChanger.reset();
    }
  },

  inject: ["$http"],
  methods: {

    fetchData() {
      if (this.sortType === 'latest') {
        this.sortType = 'latest';
      } else if (this.sortType === 'time') {
        this.sortType = 'time';
      } else if (this.sortType === 'join') {
        this.sortType = 'join';
      }
      this.page = 0;
      this.items = [];
      this.$refs.infiniteLoading.stateChanger.reset();
    },


    infiniteHandler($state) {
      this.$http.get("/item/list", {
        params: {
          page: this.page,
          sortType: this.sortType
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
      if (this.searchValue.trim() !== '') {
        this.$router.push({ path: "/items", query: { search: encodeURIComponent(this.searchValue) } });
      } else {
        this.$router.push("/items");
      }
    }
  }

}
</script>

<style scoped>
@import "../../../public/assets/css/items-page.css";
</style>