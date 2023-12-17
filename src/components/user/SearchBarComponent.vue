<template>
  <div class="search-fix">
    <div class="search-bar">
      <input
        v-model="keyword"
        class="search-box"
        @keyup.enter="btnClick"
        placeholder="검색할 물품을 입력하세요."
      />
      <button class="search-btn" @click="btnClick">
        <img src="../../../public/assets/img/search-green.png" alt="" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  data() {
    return {
      keyword: "",
    };
  },

  inject: ["$http"],
  methods: {
    btnClick() {
      if (this.keyword.trim() !== "") {
        this.$router.push({ path: "/items", query: { keyword: this.keyword } });
      } else {
        this.$router.push("/items");
      }
    },
  },
};
</script>

<style scoped>
.search-fix {
  margin: 0 auto;
  width: 390px;
  height: 55px;
  position: sticky;
  top: 54px;
  text-align: center;
  background-color: #ffffff;
  z-index: 1;
}

.nav-search-fix {
  margin: 0 auto;
  width: 390px;
  height: 75px;
  padding-top: 20px;
  position: sticky;
  top: 0px;
  text-align: center;
  background-color: #ffffff;
  z-index: 1;
}

.search-bar {
  position: relative;
  /*margin-top: 20px;*/
  margin-bottom: 10px;
  background-color: white;
  display: flex;
  justify-content: center;
}

.search-bar .search-box {
  padding-left: 5px;
  width: 350px;
  height: 40px;
  font-size: 20px;
  box-shadow: 2px 2px 5px 1px #98cb98;
  background-color: #ffffff;
  border-radius: 5px;
  border: none;
}

.search-bar .search-btn {
  width: 35px;
  height: 35px;
  position: absolute;
  bottom: 3px;
  right: 25px;
  background-color: #ffffff;
}
</style>
