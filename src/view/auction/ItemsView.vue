<template>
  <div>
    <LOGO/>
    <div class="search-fix">
      <div class="search-bar">
        <input v-model="searchValue" class="search-box" placeholder="검색할 물품을 입력하세요."/>
        <button class="search-btn" @click="btnClick"><img src="../../../public/assets/img/search-green.png" alt="" /></button>
      </div>
    </div>
    <div class="select-box">
      <select class="select">
        <option value="join" selected>참여순</option>
        <option value="latest">최신순</option>
        <option value="ending">종료임박순</option>
      </select>
    </div>
    <div>
<!--      <ItemPost v-for="post in 10" :key="post"/>-->
      <ItemPost />
    </div>
    <NavBar/>
  </div>
</template>

<script>
import LOGO from "@/components/user/LogoComponent.vue";
import ItemPost from "@/components/item/ItemPostComponent.vue";
import NavBar from "@/components/user/NavComponent.vue";

export default {
  name: "ItemView",
  data() {
    return {
      searchValue: '',
    }
  },
  components: {
    LOGO,
    ItemPost,
    NavBar
  },

  methods: {

    btnClick() {
      if (this.searchValue.trim() !== '') {
        this.$router.push({ path: "/items", query: { search: encodeURIComponent(this.searchValue) } });
      } else {
        this.$router.push("/items");
      }
    }
  }

}
</script>

<style scoped>
@import "../../../public/assets/css/items-page.css";
</style>