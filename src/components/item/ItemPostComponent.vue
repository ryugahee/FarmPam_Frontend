<template>
  <div class="post" @click="detail">
    <div class="post-img-box">
      <div class="post-img">
        <img class="thumbnail-img"/>
        <div class="remaining-time">
          <div class="time-bg">
            <p> 00:00:00 남음</p>
          </div>
        </div>
      </div>
      <div class="post-content">
        <h3> {{ itemTitle }} {{ weight }} </h3>
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
      itemTitle: "",
      weight: ""
    }
  },
  created() {
    this.loadItemList();

  },
  methods: {

    loadItemList() {
      axios.get("api/item/list").then((res) => {
        console.log("res데이터: " + res);
        this.itemTitle = res.data.itemTitle;
        this.weight = res.data.weight;
      })

      console.log("데이터: " +this.weight )
    },

    detail() {
      this.$router.push("/detail")
    }
  }
}
</script>

<style scoped>
@import "../../../public/assets/css/item-post-component.css";
</style>