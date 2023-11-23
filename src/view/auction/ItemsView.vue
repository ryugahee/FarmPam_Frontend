<template>
  <div>
    <LogoView/>
    <div class="search-bar">
      <input class="search-box" placeholder="검색할 물품을 입력하세요."/>
    </div>
    <div class="select-box">
      <select>
        <option>참여순</option>
        <option>최신순</option>
        <option>종료임박순</option>
      </select>
    </div>
    <div>
      <ItemPost v-for="post in 10" :key="post"/>
    </div>
    <NavComponent/>
  </div>
</template>

<script>
import LogoView from "@/components/user/LogoComponent.vue";
import ItemPost from "@/components/item/ItemPostComponent.vue";
import NavComponent from "@/components/user/NavComponent.vue";

export default {
  name: "ItemView",
  components: {NavComponent, ItemPost, LogoView},
  data() {
    return {
    }
  }
}
</script>

<style scoped>
@import "../../../public/assets/css/items-page.css";
</style>