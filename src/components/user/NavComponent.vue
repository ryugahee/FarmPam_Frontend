<template>
  <div class="nav-bar">
    <div>
      <div class="modal-bg" v-if="!modal" @click="modal=!modal"></div>
      <transition name="slide-up">
        <div class="modal" v-if="!modal">
          <div class="search">
            <div class="search-bar">
              <input class="search-box" placeholder="검색할 물품을 입력하세요." />
            </div>
          </div>
          <div class="item-post">
            <ItemPost v-for="post in 10" :key="post" />
          </div>
        </div>
      </transition>
    </div>
    <div class="nav-menu">
      <img @click="modal=!modal" src="../../../public/assets/img/search.png" alt="" />
      <img src="../../../public/assets/img/home.png" alt="" />
      <img src="../../../public/assets/img/add_box.png" alt="" />
      <img src="../../../public/assets/img/chat.png" alt="" />
      <img src="../../../public/assets/img/person.png" alt="" />
    </div>
  </div>
</template>

<script>
import ItemPost from "@/components/item/ItemPostComponent.vue";

export default {
  name: "NavBar",
  components: {
    ItemPost
  },
  data() {
    return {
      modal: true,
    }
  },
  methods: {
  }
}
</script>

<style scoped>
@import "../../../public/assets/css/nav.css";
</style>