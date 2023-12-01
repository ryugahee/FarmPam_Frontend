<template>
  <div class="header">
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-chevron-left"
        @click="goBack"
      >
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
    </div>
    <div class="page-name">
      <slot></slot>
    </div>
    <div style="width: 48px; height: 40px"></div>
  </div>
</template>

<script>
export default {
  name: "HeaderComponent",
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
@import "../../../public/assets/css/header-component.css";
</style>
