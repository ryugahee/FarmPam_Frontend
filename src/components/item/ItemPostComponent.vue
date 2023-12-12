<template>
  <div class="post">
    <div class="post-img-box" v-for="(item, i) in items" :key="i">
      <router-link :to='"/auction/detail/" + item.id'>
      <div class="post-img">
        <img src="" class="thumbnail-img"/>
        <div class="remaining-time">
          <div class="time-bg">
            <p> {{ formatTime(item.remainingTime) }} 남음 </p>
          </div>
        </div>
      </div>
      <div class="post-content">
        <h5> {{ item.itemTitle }} {{ item.weight }}kg</h5>
        <img src="../../../public/assets/img/users.png" class="users-img" alt=""/>
        <p></p>
        <p class="current-bid-price">현재 입찰가</p>
        <h3 class="price"> 원 </h3>
      </div>
      </router-link>
    </div>

  </div>
</template>

<script>
export default {
  name: 'ItemPost',
  components: {

  },
  props: {
    items: Array,
  },

  data() {
    return {
      items: [],
      num: 1,

    }
  },

  inject: ["$http"],
  methods: {
    loadItems($state) {
      this.$http.get("/item/list", {
        params: {
          num: this.num,
        },
      }).then((res) => {
        if (res.data.length) {
          console.log("아이템: " + this.num)

          this.items.push(...res.data);
          this.items.forEach(item => {
            item.remainingTime = item.time;
            this.startStopwatch(item);
          });
          this.num = res.data[res.data.length - 1].id;
          $state.loaded();
          if (res.data.length / 10 < 1) {
            $state.complete();
          }
        } else {
          $state.complete();
        }
      }).catch((error) => {
        console.error(error);
      });
    },

    infiniteHandler($state) {
      this.loadItems($state);
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
    formatTime(remainingTime) {
      if (remainingTime <= 0) {
        return '00:00:00';
      }
      const hours = Math.floor(remainingTime / 3600000);
      const minutes = Math.floor((remainingTime % 3600000) / 60000);
      const seconds = Math.floor((remainingTime % 60000) / 1000);
      return `${this.padTime(hours)}:${this.padTime(minutes)}:${this.padTime(seconds)}`;
    },
    padTime(time) {
      return (time < 10 ? '0' : '') + time;
    },
  }
}
</script>

<style scoped>
@import "../../../public/assets/css/item-post-component.css";
</style>
