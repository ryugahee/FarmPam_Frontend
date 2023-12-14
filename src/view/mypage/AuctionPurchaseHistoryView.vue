<template>
  <div>
    <LOGO />
    <HeaderComponent>
      <p>구내 내역</p>
    </HeaderComponent>
    <ItemPost :items="items"/>
    <infinite-loading ref="infiniteLoading" @infinite="infiniteHandler">
      <template #spinner>
        <LoadingSpinner />
      </template>
      <template #no-more>
        <LoadComplete></LoadComplete>
      </template>
    </infinite-loading>
    <NavBar/>
  </div>
</template>

<script>
import LOGO from "@/components/user/LogoComponent.vue";
import HeaderComponent from "@/components/user/HeaderComponent.vue";
import NavBar from "@/components/user/NavComponent.vue";
import ItemPost from "@/components/item/ItemPostComponent.vue";
import {InfiniteLoading} from "infinite-loading-vue3-ts";
import LoadingSpinner from "@/components/user/LoadingSpinner.vue";

export default {
  name: "AuctionPurchaseHistoryView",
  components: {LoadingSpinner, InfiniteLoading, ItemPost, NavBar, HeaderComponent, LOGO},
  methods: {

  }
}
</script>

<style scoped>

</style>
