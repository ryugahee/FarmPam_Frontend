<template>
  <div class="post">
    <div class="post-img">
      <img class="thumbnail-img" src="../../../public/assets/img/thumbnail1.png" alt=""/>
      <div class="remaining-time">
        <div class="time-bg">
          <p> {{ time }} 남음</p>
        </div>
      </div>
    </div>
    <div class="post-content">
      <h3> {{ title }} </h3>
      <img src="../../../public/assets/img/users.png" class="users-img" alt=""/>
      <span class="participants"> {{ users }} </span>
      <p class="current-bid-price">현재 입찰가</p>
      <h3 class="price"> {{ price }}원 </h3>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ItemPost',
  data() {
    return {
      time: "00:00:51",
      title: "가희네 고당도 샤인머스켓 4kg",
      users: 1204,
      price: 40000
    }
  }
}
</script>

<style scoped>
@import "../../../public/assets/css/itempost.css";
</style>