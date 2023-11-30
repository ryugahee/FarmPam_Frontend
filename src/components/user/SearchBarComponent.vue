<template>
  <div class="search-fix">
    <div class="search-bar">
      <input v-model="searchValue" class="search-box" placeholder="검색할 물품을 입력하세요."/>
      <button class="search-btn" @click="btnClick"><img src="../../../public/assets/img/search-green.png" alt="" /></button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  data() {
    return {
      searchValue: ''
    }
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
@import "../../../public/assets/css/search-bar-component.css";
</style>