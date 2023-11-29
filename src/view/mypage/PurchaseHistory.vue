<template>
  <div>
    <LOGO />
    <HeaderComponent>
      <p>구내 내역</p>
    </HeaderComponent>

  </div>
</template>

<script>
import LOGO from "@/components/user/LogoComponent.vue";
import HeaderComponent from "@/components/user/HeaderComponent.vue";

export default {
  name: "PurchaseHistory",
  components: {HeaderComponent, LOGO},
  methods: {

  }
}
</script>

<style scoped>

</style>
