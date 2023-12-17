<template>
  <div class="logo">
    <img
      @click="home"
      class="logo-img"
      src="../../../public/assets/img/Logo.png"
      alt=""
    />
    <ProfilePopUp />
  </div>
</template>

<script>
import ProfilePopUp from "@/components/user/ProfilePopUpComponent.vue";

export default {
  name: "LOGO",
  components: { ProfilePopUp },
  methods: {
    home() {
      this.$router.push("/home");
    },
  },
};
</script>

<style scoped>
@import "../../../public/assets/css/logo-component.css";
</style>
