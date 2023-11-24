<template>
  <div class="profile-post">
    <div class="profile-post-img">
      <img class="profile-thumbnail-img" src="../../../public/assets/img/thumbnail1.png" alt="" />
      <div class="profile-remaining-time">
        <div class="profile-time-bg">
          <p> {{ time }} 남음</p>
        </div>
      </div>
    </div>
    <div class="profile-post-content">
      <h5> {{ title }} </h5>
      <h4 class="price"> {{ price.toLocaleString() }}원</h4>
    </div>
    <div class="profile-state">
      <h4> {{ state[0] }} </h4>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileItemPost",
  data() {
    return {
      time: "00:00:51",
      title: "가희네 고당도 샤인머스켓 4kg",
      price: 40000,
      state: ["경매 중", "종료", "낙찰"]
    }
  }
}
</script>

<style scoped>
@import "../../../public/assets/css/profile-item-post-component.css";
</style>