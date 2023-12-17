<template>
  <div>
    <LOGO />
    <div class="user-info">
      <div class="img-profile">
        <div v-if="imageUrl">
          <img class="person-icon" :src="imageUrl" alt="" />
        </div>
        <div v-else>
          <img
            class="person-icon"
            src="../../../public/assets/img/person2.png"
            alt=""
          />
        </div>
      </div>
      <div class="user-nickname">
        <p style="width: 100px; margin-top: 15px">
          &nbsp; {{ nickname }} &nbsp;님
        </p>
      </div>
      <div>
        <button class="btn-user-info" @click="goUserInfo">프로필 수정</button>
      </div>
    </div>

    <div class="container-pay">
      <div class="pay-box">
        <div class="pay-money">
          <div class="farmpay">Farm pay</div>
          <div class="charge">
            {{ Number(this.$store.state.user.farmMoney).toLocaleString() }}
          </div>
        </div>
        <div class="pay-charge">
          <div class="charge" @click="goCharging" style="cursor: pointer">
            충전하기
          </div>
          <div>
            <img
              src="../../../public/assets/img/left2.png"
              alt=""
              class="right"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="container-list">
      <div class="list">
        <div class="icons">
          <img src="../../../public/assets/img/shopping-bag1.png" alt="" />
        </div>
        <div @click="goPurchaseHistory" style="cursor: pointer">구매 내역</div>
      </div>
      <div class="list">
        <div class="icons">
          <img src="../../../public/assets/img/sale1.png" alt="" />
        </div>
        <div @click="goSalesHistory" style="cursor: pointer">판매 내역</div>
      </div>
      <div class="list">
        <div class="icons">
          <img src="../../../public/assets/img/receipt.png" alt="" />
        </div>
        <div @click="goChargingHistory" style="cursor: pointer">충전 내역</div>
      </div>
      <NavComponent />
    </div>
  </div>
</template>

<script>
import LOGO from "@/components/user/LogoComponent.vue";
import NavComponent from "@/components/user/NavComponent.vue";
import router from "@/router";
import AuctionPurchaseHistoryView from "@/view/mypage/AuctionPurchaseHistoryView.vue";
import AuctionSaleHistoryView from "@/view/mypage/AuctionSaleHistoryView.vue";
import instance from "@/api/http";

export default {
  data() {
    return {
      username: "",
      imageUrl: "",
      nickname: "",
    };
  },
  computed: {
    SalesHistory() {
      return AuctionSaleHistoryView;
    },
    PurchaseHistory() {
      return AuctionPurchaseHistoryView;
    },
  },
  components: { NavComponent, LOGO },

  created() {
    if (localStorage.getItem("accessToken") == null) {
      this.$router.replace("/login");
      alert("로그인 후 이용하실 수 있습니다.");
    }

    this.$store.dispatch("findUser", localStorage.getItem("username"));
  },

  mounted() {
    this.getUserInfo();
  },

  methods: {
    goUserInfo() {
      // router.push({ path: "/user/info" });
      location.href = "http://localhost:8081/user/info";
    },
    goPurchaseHistory() {
      router.push({ path: "/user/history/purchase" });
    },
    goSalesHistory() {
      router.push({ path: "/user/history/sales" });
    },
    goCharging() {
      router.push({ path: "/charging" });
    },
    goChargingHistory() {
      router.push({ path: `/chargingHistory` });
    },
    getUserInfo() {
      instance
        .post("/getUserInfo")
        .then((res) => {
          console.log("유저 정보", res.data);
          const data = res.data;
          this.username = data.username;
          this.nickname = data.nickname;
          this.imageUrl = data.imageUrl;
        })
        .catch((err) => {
          console.error("유저 정보 조회 오류:", err);
        });
    },
  },
};
</script>

<style scoped>
@import "../../../public/assets/css/mypage.css";
</style>
