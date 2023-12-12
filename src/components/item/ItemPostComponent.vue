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

    }
  },

  inject: ["$http"],
  methods: {
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