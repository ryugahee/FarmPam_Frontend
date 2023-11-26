<template>
  <div class="review-tab">
    <div v-for="review in reviews" :key="review" class="review-box"> {{ review }} </div>
  </div>
</template>

<script>
export default {
  name: "ReviewPost",
  data() {
    return {
      reviews: ["신선해요.", "배송이 빨라요.", "프로필이 멋져요."]
    }
  }
}
</script>

<style scoped>
@import "../../../public/assets/css/review.css";
</style>