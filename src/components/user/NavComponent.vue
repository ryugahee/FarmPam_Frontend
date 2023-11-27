<template>
  <div class="nav-bar">
    <div>
      <div class="modal-bg" v-if="!modal" @click="modal=!modal"></div>
      <transition name="slide-up">
        <div class="modal" v-if="!modal">
          <SearchBar class="search"/>
          <div class="nav-item-post">
            <ItemPost v-for="post in 10" :key="post" />
          </div>
        </div>
      </transition>
    </div>
    <div class="nav-menu">
      <img @click="modal=!modal" src="../../../public/assets/img/search.png" alt="" />
      <img @click="home" src="../../../public/assets/img/home.png" alt="" />
      <img src="../../../public/assets/img/add_box.png" alt="" />
      <img src="../../../public/assets/img/chat.png" alt="" />
      <img @click="user" src="../../../public/assets/img/person.png" alt="" />
    </div>
  </div>
</template>

<script>
import ItemPost from "@/components/item/ItemPostComponent.vue";
import SearchBar from "@/components/user/SearchBarComponent.vue";

export default {
  name: "NavBar",
  components: {
    SearchBar,
    ItemPost
  },
  data() {
    return {
      modal: true,
    }
  },
  methods: {
    home() {
      this.$router.push("/home");
    },
    user() {
      this.$router.push("/user");
    }
  }
}
</script>

<style scoped>
@import "../../../public/assets/css/nav-component.css";
</style>