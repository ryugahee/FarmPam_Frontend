<template>
  <div>
    <LOGO />
    <NavBar />
  </div>
</template>

<script>
import NavBar from "@/components/user/NavComponent.vue";
import LOGO from "@/components/user/LogoComponent.vue";

export default {
  name: "HomeView",
  components: {
    LOGO,
    NavBar
  }
}
</script>

<style scoped>

</style>