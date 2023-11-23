<template>
  <div>
    <LogoView/>
    <div class="profile">
      <img src="../../assets/img/profile1.png" alt=""/>
      <h3> {{ username }} </h3>
      <p> {{ Introduction }} </p>
    </div>
    <div class="pam-index">
      <span>팜 지수</span>
      <img class="sprout" src="../../assets/img/sprout.png" alt=""/>
      <div class="stars">
        <img src="../../assets/img/filled-star.png" alt=""/>
        <img src="../../assets/img/filled-star.png" alt=""/>
        <img src="../../assets/img/filled-star.png" alt=""/>
        <img src="../../assets/img/filled-star.png" alt=""/>
        <img src="../../assets/img/filled-star.png" alt=""/>
      </div>
    </div>
    <div class="tab">
      <div class="tab-nav tab-content">
        <div class="bid" @click="bidClick" :class="{ active: bid }"><p>경매</p></div>
        <div class="review" @click="reviewClick" :class="{ active: review }"><p>판매 후기</p></div>
      </div>
      <div class="tab-content" v-if="bid">
        <ProfileItemPost/>
      </div>
      <div class="tab-content" v-if="review">
        <ReviewPost/>
      </div>
    </div>
    <NavComponent/>
  </div>
</template>

<script>
import LogoView from "@/components/user/LogoComponent.vue";
import NavComponent from "@/components/user/NavComponent.vue";
import ProfileItemPost from "@/components/item/ProfileItemPostComponent.vue";
import ReviewPost from "@/components/item/ReviewViewComponent.vue";

export default {
  name: "ProfileView",
  data() {
    return {
      username: "그랜드팜",
      Introduction: "안녕하세요. 맛있는 농산물 파는 할배입니다. 많은 관심 가져주시면 감사하겠습니다. 항상 신선한 농작물만 드리겠습니다.",
      bid: true,
      review: false,
      time: "00:00:51",
      title: "가희네 고당도 샤인머스켓 4kg",
      users: 1204,
      price: 40000
    }
  },
  components: {ReviewPost, ProfileItemPost, NavComponent, LogoView},
  methods: {
    bidClick() {
      this.bid = true;
      if (this.bid) {
        this.review = false;
      }
    },
    reviewClick() {
      this.review = true;
      if (this.review) {
        this.bid = false;
      }
    },
  }
}
</script>

<style scoped>
@import "../../../public/assets/css/profile-page.css";
</style>