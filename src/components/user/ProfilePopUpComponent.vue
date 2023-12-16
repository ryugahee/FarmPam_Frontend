<template>
  <div>
    <div class="pop-up-modal offcanvas pop-up-slide" id="offcanvasRight">
      <div class="pop-up-header">
        <img
          class="pop-up-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
          src="../../../public/assets/img/close.png"
          alt=""
        />
        <button class="logoutBtn" @click="logout">로그아웃</button>
      </div>
      <div class="pop-up-profile">
        <div class="pop-up-profile-box">
          <img
            class="pop-up-profile-img"
            src="../../../public/assets/img/profile1.png"
            alt=""
          />
          <span> {{ username }} </span>

        </div>
      </div>
      <div class="pop-up-money-box">
        <h2>Farm머니</h2>
        <p class="pop-up-price">{{ farmMoney.toLocaleString() }}원</p>
      </div>
      <div class="pop-up-join-bid">
        <img
          class="pop-up-join-bid-img"
          src="../../../public/assets/img/concierge.png"
          alt=""
        />
        <span>참여 중인 경매</span>
        <ItemPost v-for="post in 1" :key="post" />
      </div>
      <div></div>
    </div>
    <div class="menu-box">
      <img
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasRight"
        aria-controls="offcanvasRight"
        src="../../../public/assets/img/dehaze.png"
        alt=""
      />
    </div>
  </div>
</template>

<script>
import ItemPost from "@/components/item/ItemPostComponent.vue";
import instance from "@/api/http";

export default {
  name: "ProfilePopUp",
  components: {
    ItemPost,
  },
  data() {
    return {
      username: "그랜드팜파라밤밤",
      farmMoney: 150000,
    };
  },
  methods: {
    logout() {
      localStorage.clear();

      instance.post("/userLogout").catch((err) => {
        console.log(err);
      });

      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
@import "../../../public/assets/css/profile-pop-up-component.css";
</style>
