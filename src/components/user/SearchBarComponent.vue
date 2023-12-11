<template>
  <div class="search-fix">
    <div class="search-bar">
      <input v-model="keyword" class="search-box" @keyup.enter="btnClick" placeholder="검색할 물품을 입력하세요."/>
      <button class="search-btn" @click="btnClick"><img src="../../../public/assets/img/search-green.png" alt="" /></button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  data() {
    return {
      keyword: '',
    }
  },

  inject: ["$http"],
  methods: {
    btnClick() {
      if (this.keyword !== '') {
        this.$router.push({ path: "/items", query: { keyword: this.keyword } });

      } else {
        this.$router.push("/items");
      }

    },




  }
}
</script>

<style scoped>
@import "../../../public/assets/css/search-bar-component.css";
</style>