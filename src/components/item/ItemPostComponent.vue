<template>
  <div class="post" @click="detail">
    <div class="post-img-box" v-for="(item, i) in items" :key="i">
      <div class="post-img">
<!--        {{item.itemImgDtoList[0].imgUrl}}-->
        <img src="" class="thumbnail-img"/>
        <div class="remaining-time">
          <div class="time-bg">
            <p> 00:00:00 남음</p>
          </div>
        </div>
      </div>
      <div class="post-content">
        <h3> {{ item.itemTitle }} {{ item.weight }}kg </h3>
        <img src="../../../public/assets/img/users.png" class="users-img" alt=""/>
        <span class="participants">  </span>
        <p class="current-bid-price">현재 입찰가</p>
        <h3 class="price"> 원 </h3>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'ItemPost',
  data() {
    return {
      items: [],
    }
  },
  created() {
    this.loadItemList();

  },
  inject:["$http"],
  methods: {
    loadItemList() {
      this.$http.get("/item/list").then((res) => {
        this.items = res.data;
      }).catch((error) => {
        // 오류가 발생했을 때
        console.error(error);
      });

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