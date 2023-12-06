<template>
  <div>
    <LOGO/>
    <div class="user-info">
      <div class="img-profile"><img src="../../../public/assets/img/person2.png" class="person-icon" alt=""/></div>
      <div class="user-nickname"><p>팜파미</p></div>
      <div>
        <button class="btn-user-info" @click="goUserInfo">프로필 수정</button>
      </div>
    </div>

    <div class="container-pay">
      <div class="pay-box">
        <div class="pay-money">
          <div class="farmpay">Farm pay</div>
          <div class="charge">150,000원</div>
        </div>
        <div class="pay-charge">
          <div class="charge">충전하기</div>
          <div><img src="../../../public/assets/img/left2.png" alt="" class="right"/></div>
        </div>
      </div>
    </div>

    <div class="container-list">
      <div class="list">
        <div class="icons"><img src="../../../public/assets/img/shopping-bag1.png" alt=""/></div>
        <div @click="goPurchaseHistory">구매 내역</div>
      </div>
      <div class="list">
        <div class="icons"><img src="../../../public/assets/img/sale1.png" alt=""/></div>
        <div @click="goSalesHistory">판매 내역</div>
      </div>
      <div class="list">
        <div class="icons"><img src="../../../public/assets/img/receipt.png" alt=""/></div>
        <div>참여 이력</div>
      </div>
      <div class="list">
        <div class="icons"><img src="../../../public/assets/img/inquiry.png" alt=""/></div>
        <div>문의 하기</div>
      </div>
      <NavComponent/>
    </div>
  </div>
</template>

<script>
import LOGO from "@/components/user/LogoComponent.vue";
import NavComponent from "@/components/user/NavComponent.vue";
import router from "@/router";
import AuctionPurchaseHistoryView from "@/view/mypage/AuctionPurchaseHistoryView.vue";
import AuctionSaleHistoryView from "@/view/mypage/AuctionSaleHistoryView.vue";

export default {
  computed: {
    SalesHistory() {
      return AuctionSaleHistoryView
    },
    PurchaseHistory() {
      return AuctionPurchaseHistoryView
    }
  },
  components: {NavComponent, LOGO},

  methods: {
    goUserInfo() {
      router.push({path: "/user/info"});
    },
    goPurchaseHistory() {
      router.push({path: "/user/history/purchase"});
    },
    goSalesHistory() {
      router.push({path: "/user/history/sales"});
    },
  }

}
</script>

<style scoped>
@import "../../../public/assets/css/mypage.css";


</style>