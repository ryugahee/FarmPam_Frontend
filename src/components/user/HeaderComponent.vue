<template>
  <div class="header">
    <div>
      <button class="btn-left"><img src="../../../public/assets/img/left%202.png" alt="" /></button>
    </div>
    <div class="page-name">
      <slot></slot>
    </div>
    <div class="none">
      <p>none</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderComponent",
  methods: {

  }
}
</script>

<style scoped>
@import "../../../public/assets/css/header-component.css";
</style>
