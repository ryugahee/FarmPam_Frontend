<template>
  <div>
    <LOGO />
    <HeaderComponent>
      <p>구내 내역</p>
    </HeaderComponent>
    <ItemPost  v-for="post in 10" :key="post"/>
    <NavBar/>
  </div>
</template>

<script>
import LOGO from "@/components/user/LogoComponent.vue";
import HeaderComponent from "@/components/user/HeaderComponent.vue";
import NavBar from "@/components/user/NavComponent.vue";
import ItemPost from "@/components/item/ItemPostComponent.vue";

export default {
  name: "AuctionPurchaseHistoryView",
  components: {ItemPost, NavBar, HeaderComponent, LOGO},
  methods: {

  }
}
</script>

<style scoped>

</style>
