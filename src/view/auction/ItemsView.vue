<template>
  <div>
    <LOGO />
    <div class="search-bar">
      <input class="search-box" placeholder="검색할 물품을 입력하세요." />
    </div>
    <div class="select-box">
      <select class="select">
        <option value="join" selected>참여순</option>
        <option value="latest">최신순</option>
        <option value="ending">종료임박순</option>
      </select>
    </div>
    <div>
      <ItemPost v-for="post in 10" :key="post" />
    </div>
    <NavBar />
  </div>
</template>

<script>
import LOGO from "@/components/user/LogoComponent.vue";
import ItemPost from "@/components/item/ItemPostComponent.vue";
import NavBar from "@/components/user/NavComponent.vue";

export default {
  name: "ItemView",
  components: {
    LOGO,
    ItemPost,
    NavBar
  },
  data() {
    return {
    }
  }
}
</script>

<style scoped>
@import "../../../public/assets/css/items-page.css";
</style>