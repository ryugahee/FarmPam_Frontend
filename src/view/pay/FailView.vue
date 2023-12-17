<template>
  <div class="result wrapper">
    <div class="box_section">
      <h2 style="padding: 20px 0 10px 0">
        <img
          width="25"
          src="https://static.toss.im/3d-emojis/u1F6A8-apng.png"
          alt=""
        />
        결제 실패
      </h2>
      <p>{{ this.$route.query.message }}</p>
      <div class="result wrapper">
        <button
          class="button"
          @click="goMyPage"
          style="margin-top: 30px; margin-right: 10px"
        >
          마이 페이지로 이동
        </button>
        <button
          class="button"
          @click="goCharging"
          style="margin-top: 30px; background-color: #e8f3ff; color: #1b64da"
        >
          충전 페이지로 이동
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "FailView",

  created() {
    if (localStorage.getItem("accessToken") == null) {
      this.$router.replace("/login");
      alert("로그인 후 이용하실 수 있습니다.");
    }
  },

  methods: {
    goMyPage() {
      this.$router.push(`/user`);
    },

    goCharging() {
      this.$router.push(`/charging`);
    },
  },
};
</script>
<style scoped>
@import "../../../public/assets/css/tosspayments-style.css";
</style>
