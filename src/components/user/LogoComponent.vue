<template>
  <div class="logo">
    <img @click="home" class="logo-img" src="../../../public/assets/img/Logo.png" alt=""/>
  </div>
</template>

<script>
export default {
  name: "LOGO",
  methods: {
    home() {
      this.$router.push("/home");
    }
  }
}
</script>

<style>
@import "../../../public/assets/css/logo-component.css";
</style>