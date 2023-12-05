<template>
  <div class="post" @click="detail">
    <div class="post-img-box" v-for="(item, i) in items" :key="i">
      <div class="post-img">
<!--        {{item.itemImgDtoList[0].imgUrl}}-->
        <img src="" class="thumbnail-img"/>
        <div class="remaining-time">
          <div class="time-bg">
            <p> {{ formatTime(item.remainingTime) }} </p>
          </div>
        </div>
      </div>
      <div class="post-content">
        <h5> {{ item.itemTitle }} {{ item.weight }}kg  </h5>
        <img src="../../../public/assets/img/users.png" class="users-img" alt=""/>
        <p></p>
        <p class="current-bid-price">현재 입찰가</p>
        <h3 class="price"> 원 </h3>
      </div>
    </div>
    <infinite-loading @infinite="infiniteHandler"></infinite-loading>
  </div>
</template>

<script>
import InfiniteLoading from "v3-infinite-loading";

export default {
  name: 'ItemPost',
  components: {
    InfiniteLoading,
  },

  data() {
    return {
      items: [],
      page: 1,
    }
  },

  inject:["$http"],
  methods: {

/*    loadData() {
      this.$http.get("/item/list", {
        params: {
          // cursorId: this.cursorId,
          size: 2,
        },
      }).then((res) => {
        if (res.data.length > 0) {
          this.cursorId = res.data[res.data.length - 1].id;
          this.items = this.items.push(...res.data);
          console.log("라스트아이디: " + this.cursorId)
        }

        this.items.forEach(item => {
          item.remainingTime = item.time;
          this.startStopwatch(item);
        });
      }).catch((error) => {
        console.error("Error loading data:", error);
      });

    },*/

    infiniteHandler($state) {
      this.$http.get("/item/list", {
        params: {
          page: this.page,
        },
      }).then((res) => {
        if (res.data.length) {
          this.page++;
          console.log("페이지: " + this.page)
          this.items = this.items.push(...res.data);
          $state.loaded();
        } else {
          $state.complete();
        }

        this.items = res.data;
        this.items.forEach(item => {
          item.remainingTime = item.time;
          this.startStopwatch(item);
        });
      }).catch((error) => {
        console.error(error);
      });
    },

/*    loadItemList() {
      this.$http.get("/item/list").then((res) => {
        this.items = res.data;
        this.items.forEach(item => {
          item.remainingTime = item.time;
          this.startStopwatch(item);
        });
      }).catch((error) => {
        console.error(error);
      });
    },*/
    startStopwatch(item) {
      item.timer = setInterval(() => {
        if (item.remainingTime > 0) {
          item.remainingTime -= 1000;
        } else {
          item.remainingTime = 0;
          clearInterval(item.timer);
        }
      }, 1000);

    },
    formatTime(remainingTime) {
      const hours = Math.floor(remainingTime / 3600000);
      const minutes = Math.floor((remainingTime % 3600000) / 60000);
      const seconds = Math.floor((remainingTime % 60000) / 1000);
      return `${this.padTime(hours)}:${this.padTime(minutes)}:${this.padTime(seconds)}`;
    },
    padTime(time) {
      return (time < 10 ? '0' : '') + time;
    },

    detail() {
      this.$router.push("/detail")
    },
  }
}
</script>

<style scoped>
@import "../../../public/assets/css/item-post-component.css";
</style>