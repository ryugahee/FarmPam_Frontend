<template>
  <div>
    <LOGO/>
    <div class="detail-profile">
      <div class="detail-profile-box">
        <img :src="profileImg" alt="profileImg" />
        <h3> {{ nickName }} </h3>
        <div class="review-avg">
          <img src="../../../public/assets/img/filled-star.png" alt="" />
          <span> {{ review }} </span>
        </div>
      </div>
    </div>
    <div class="item-img">
      <img :src="itemImg" alt="경매 상품 이미지">
    </div>
    <div class="item-content">
      <p>집에서 직접 재배한 사과입니다.<br />
        아삭하고 맛있읍니다.</p>
    </div>
    <div class="item-footer">
      <div class="current-price">
        <span>현재 입찰가</span>
        <span> {{ currentPrice.toLocaleString() }}원 </span>
      </div>
      <div class="my-price">
        <span>내 입찰가</span>
        <span> {{ myPrice.toLocaleString() }}원 </span>
      </div>
      <button class="make-a-bid">
        <p> {{ time }} </p>
        <p>입찰하기</p>
      </button>
    </div>
  </div>
</template>

<script>
import LOGO from "@/components/user/LogoComponent.vue";

export default {
  name: "ItemDetailView",
  data() {
    return {
      profileImg: require("../../../public/assets/img/profile1.png"),
      nickName: "그랜드팜",
      review: 4.5,
      itemImg: require("../../../public/assets/img/apple.png"),
      currentPrice: 10000,
      myPrice: 9000,
      time: "14:31:29"
    }
  },
  components: {
    LOGO
  }
}
</script>

<style scoped>
@import "../../../public/assets/css/item-detail-page.css";
</style>