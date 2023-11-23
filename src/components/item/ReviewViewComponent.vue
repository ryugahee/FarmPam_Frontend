<template>
  <div>
    <div v-for="(item, index) in data" :key="index" class="review-box">
      {{ item }}
    </div>
  </div>
</template>

<script>
export default {
  name: "ReviewPost",
  data() {
    return {
      data: ["신선해요.", "배송이 빨라요.", "프로필이 멋져요."],
      boxWidth: 100
    }
  },
  mounted() {
    this.boxWidth = this.calculateBoxWidth();
  },
  methods: {
    calculateBoxWidth() {
      return Math.max(...this.data.map(item => item.length * 18));
    }
  }
}
</script>

<style scoped>
@import "../../../public/assets/css/review.css";
</style>