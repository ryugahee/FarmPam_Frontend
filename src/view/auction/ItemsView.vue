<template>
  <div>
    <LOGO/>
    <SearchBar/>
    <div class="select-box">
      <select class="select">
        <option value="join" selected>참여순</option>
        <option value="latest">최신순</option>
        <option value="ending">종료임박순</option>
      </select>
    </div>
    <div>
      <ItemPost />
    </div>
    <NavBar/>
  </div>
</template>

<script>
import LOGO from "@/components/user/LogoComponent.vue";
import ItemPost from "@/components/item/ItemPostComponent.vue";
import NavBar from "@/components/user/NavComponent.vue";
import SearchBar from "@/components/user/SearchBarComponent.vue";

export default {
  name: "ItemView",
  components: {
    SearchBar,
    LOGO,
    ItemPost,
    NavBar
  },
}
</script>

<style scoped>
@import "../../../public/assets/css/items-page.css";
</style>