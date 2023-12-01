<template>
  <div>
    <LOGO />
    <HeaderComponent>
      <p>판매 내역</p>
    </HeaderComponent>
    <ItemPostTabComponent>
      <template v-slot:tab-num1>
        <ItemPost/>
      </template>
      <template v-slot:tab-num2>
        <h3>없으면 기본</h3>
      </template>
    </ItemPostTabComponent>

    <NavBar/>
    </div>
</template>

<script>
import LOGO from "@/components/user/LogoComponent.vue";
import HeaderComponent from "@/components/user/HeaderComponent.vue";
import NavBar from "@/components/user/NavComponent.vue";
import ItemPost from "@/components/item/ItemPostComponent.vue";
import ItemPostTabComponent from "@/components/item/ItemPostTabComponent.vue";

export default {
  name: "AuctionSaleHistoryView",
  components: {
    ItemPost,
    NavBar,
    HeaderComponent,
    LOGO,
    ItemPostTabComponent
  },

}
</script>

<style scoped>
@import "../../../public/assets/css/tab-component.css";

.header-fix {
  z-index: 1;
  position: fixed;
}
</style>