<template>
  <div class="main-frame">
    <LogoView v-if="temporary == 0" />
    <div v-if="temporary == 0" class="search-bar">
      <input class="search-box" placeholder="검색할 물품을 입력하세요." />
    </div>
    <div v-if="temporary == 0">
      <!-- <div class="header">
        <div></div>
        <a href=""><img src="../../../public/assets/img/farmpam_logo.jpg" alt="로고" class="logo"></a>
        <span class="menu">
          <img @click="menuButtonClick" src="../../../public/assets/img/yuza.jpg" alt="메뉴" class="menu-button">
        </span>
      </div> -->
      <!-- <div class="search-div">
        <input class="search-box" type="text" placeholder="검색할 물품을 입력하세요.">
        <img src="../../../public/assets/img/yuza.jpg" alt="">
      </div> -->
      <div>
        <p class="carousel-hot">HOT</p>
        <div class="carousel-div">
          <div class="slide-container">
            <div class="slide-box">
              <img src="../../../public/assets/img/sample01.jpg" alt="샘플1">
              <div class="text-over-image">
                <p>당근 국내산 제주 구좌 햇 흙 5kg</p>
              </div>
            </div>
            <div class="slide-box">
              <img src="../../../public/assets/img/sample02.jpg" alt="샘플2">
              <div class="text-over-image">
                <p>바나나 국외산 제주 구좌 햇 흙 5kg</p>
              </div>
            </div>
            <div class="slide-box">
              <img src="../../../public/assets/img/sample03.jpg" alt="샘플3">
              <div class="text-over-image">
                <p>오렌지 국산 제주 구좌 햇 흙 5kg</p>
              </div>
            </div>
          </div>

          <!-- <div class="btns">
            <button>
              <i class="priviousImage"></i>
            </button>
            <button>
              <i class="nextImage"></i>
            </button>
          </div> -->
        </div>

        <!-- <button @click="previousImage" class="login-button">이전사진</button>
        <button @click="nextImage" class="login-button">다음사진</button> -->

        <div class="classification">
          <div>
            <img src="../../../public/assets/img/market.jpg" alt="">
            <p>마켓</p>
          </div>
          <div>
            <img src="../../../public/assets/img/kimchi.jpg" alt="">
            <p>김치</p>
          </div>
          <div>
            <img src="../../../public/assets/img/agricultural_products.jpg" alt="">
            <p>농산물</p>
          </div>
          <div>
            <img src="../../../public/assets/img/marine_products.jpg" alt="">
            <p>수산물</p>
          </div>
        </div>

        <p class="title-of-the-month">이 달의 Farmer</p>
        <div class="farmer-of-the-month">
          <div>
            <img src="../../../public/assets/img/profile1.png" alt="유자">
            <p>그랜드팜<img id="medal" src="../../../public/assets/img/goldmedal.png" alt=""></p>
          </div>
          <div>
            <img src="../../../public/assets/img/profile2.png" alt="사과">
            <p>팜파미(아이콘)<img id="medal" src="../../../public/assets/img/goldmedal.png" alt=""></p>
          </div>
          <div>
            <img src="../../../public/assets/img/profile3.png" alt="복숭아">
            <p>팜쀼(아이콘)<img id="medal" src="../../../public/assets/img/goldmedal.png" alt=""></p>
          </div>
        </div>

        <p class="title-of-the-month">이 달의 팖</p>
        <div class="sale-of-the-month">
          <div>
            <img src="../../../public/assets/img/yuza.jpg" alt="유자">
            <p>유자</p>
          </div>
          <div>
            <img src="../../../public/assets/img/apple.jpg" alt="사과">
            <p>사과</p>
          </div>
          <div>
            <img src="../../../public/assets/img/peach.jpg" alt="복숭아">
            <p>복숭아</p>
          </div>
        </div>
      </div>
    </div>

    <div class="clicked-menubar" v-if="temporary == 1">
      <div class="munu-login-header">
        <div class="munu-login-sub-header">
          <img @click="menuButtonExitClick" src="../../../public/assets/img/close.jpg" alt="엑스" class="close-button">
          <button v-if="loginStatus == 1" class="login-button">로그인</button>
          <button v-if="loginStatus == 0" class="login-button">로그아웃</button>
        </div>
      </div>
      <div class="menu-username-div">
        <img src="../../../public/assets/img/profile1.png" alt="">
        <span class="farmpami-text">팜파미</span>
      </div>
      <div class="munu-login-money">
        <div class="munu-login-sub-money">
          <span>Farm 머니</span>
          <span>150,000원</span>
        </div>
      </div>
      <div>
        <!-- <div>
            <img src="../../../public/assets/img/profile2.png" alt="사과">
            <p>팜파미(아이콘)<img id="medal" src="../../../public/assets/img/goldmedal.png" alt=""></p>
          </div> -->
        <h4 class="concierge-title"><img id="concierge" src="../../../public/assets/img/concierge.png" alt=""> 참여 중인 경매
        </h4>
        <div class="list-of-participating-auctions">
          <div class="list-of-participating-auctions-div">
            <div>
              <img src="../../../public/assets/img/thumbnail1.png" alt="">
            </div>
            <div>
              <p class="auction-time">00:16:30 남음</p>
            </div>
            <div class="list-of-participating-auctions-div-text">
              <p>동욱이네 청송 사과 3kg</p><br>
              <div class="bid-price">
                <span>현재 입찰가</span>
                <span class="bid-price-number">19,000원</span>
              </div>
              <div class="bid-price">
                <span>내 입찰가</span>
                <span class="bid-price-number">18,000원</span>
              </div>
            </div>
          </div>
          <hr>
          <div class="list-of-participating-auctions-div">
            <div>
              <img src="../../../public/assets/img/thumbnail1.png" alt="">
            </div>
            <div>
              <p class="auction-time">00:16:30 남음</p>
            </div>
            <div class="list-of-participating-auctions-div-text">
              <p>동욱이네 청송 사과 3kg</p><br>
              <div class="bid-price">
                <span>현재 입찰가</span>
                <span class="bid-price-number">19,000원</span>
              </div>
              <div class="bid-price">
                <span>내 입찰가</span>
                <span class="bid-price-number">18,000원</span>
              </div>
            </div>
          </div>
          <hr>
        </div>
      </div>
    </div>

    <!-- <div v-if="temporary == 0" class="footer">
      <img src="../../../public/assets/img/chat.png" alt="검색">
      <img src="../../../public/assets/img/chat.png" alt="홈">
      <img src="../../../public/assets/img/chat.png" alt="추가">
      <img src="../../../public/assets/img/chat.png" alt="채팅">
      <img src="../../../public/assets/img/chat.png" alt="개인정보">
    </div> -->
    <NavComponent />
  </div>
</template>

<script>
import LogoView from "@/components/user/LogoComponent.vue";
import NavComponent from "@/components/user/NavComponent.vue";
// import { Carousel, Slide } from 'vue3-carousel';

export default {
  name: "MainView",
  data() {
    return {
      loginStatus: 0,
      temporary: 0,
    }
  },

  components: { NavComponent, LogoView },

  created() {
  },

  inject: ['$http'],

  methods: {
    menuButtonClick() {
      this.temporary = 1;
    },

    menuButtonExitClick() {
      this.temporary = 0;
    },
  },
}
</script>

<style scoped>
@import "../../../public/assets/css/mainView.css";
@import "../../../public/assets/css/items-page.css";
</style>
