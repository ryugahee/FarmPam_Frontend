<template>
  <div>
    <LOGO/>
    <ProfilePopUp/>
    <SearchBar/>
    <div class="header-title">
      <h1>HOT</h1>
    </div>
    <div class="image-slider" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd">
      <div class="image-container" :style="{ transform: `translateX(${translateX}%)` }">
        <div v-for="(image, index) in image" :key="index" class="image-slide">
          <img :src="image.carouselImg" alt="Slide"/>
        </div>
      </div>
    </div>
    <div class="month-farmer">
      <h2>이 달의 Farmer</h2>
    </div>
    <div class="farmer-profile-wrapper">
      <div class="farmer-profile" v-for="fpBox in farmerProfile" :key="fpBox">
        <div class="fp">
          <img class="farmer-profile-image" :src="fpBox.fpImg" alt=""/>
          <div class="farmer">
            <span class="farmer-nickname"> {{ fpBox.fpName }} </span>
            <img class="medal" :src="fpBox.medal" alt=""/>
          </div>
        </div>
      </div>
    </div>
    <div class="month-pam">
      <h2>이 달의 팖</h2>
    </div>
    <div class="pam-box">
      <div class="pam-image" v-for="pamBox in pamThumbnail" :key="pamBox">
        <div class="pam">
          <img :src="pamBox.pamImg" alt=""/>
          <p> {{ pamBox.productName }} </p>
        </div>
      </div>
    </div>
    <!--    <div v-if="temporary == 0">-->
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
    <!--      <div>-->
    <!--        <h1 class="carousel-hot">HOT</h1>-->
    <!--        <div class="carousel-div">-->
    <!--          <div class="slide-container">-->
    <!--            <div class="slide-box">-->
    <!--              <img src="../../../public/assets/img/sample01.jpg" alt="샘플1">-->
    <!--              <div class="text-over-image">-->
    <!--                <p>당근 국내산 제주 구좌 햇 흙 5kg</p>-->
    <!--              </div>-->
    <!--            </div>-->
    <!--            <div class="slide-box">-->
    <!--              <img src="../../../public/assets/img/sample02.jpg" alt="샘플2">-->
    <!--              <div class="text-over-image">-->
    <!--                <p>바나나 국외산 제주 구좌 햇 흙 5kg</p>-->
    <!--              </div>-->
    <!--            </div>-->
    <!--            <div class="slide-box">-->
    <!--              <img src="../../../public/assets/img/sample03.jpg" alt="샘플3">-->
    <!--              <div class="text-over-image">-->
    <!--                <p>오렌지 국산 제주 구좌 햇 흙 5kg</p>-->
    <!--              </div>-->
    <!--            </div>-->
    <!--          </div>-->

    <!--          &lt;!&ndash; <div class="btns">-->
    <!--            <button>-->
    <!--              <i class="priviousImage"></i>-->
    <!--            </button>-->
    <!--            <button>-->
    <!--              <i class="nextImage"></i>-->
    <!--            </button>-->
    <!--          </div> &ndash;&gt;-->
    <!--        </div>-->

    <!--        &lt;!&ndash; <button @click="previousImage" class="login-button">이전사진</button>-->
    <!--        <button @click="nextImage" class="login-button">다음사진</button> &ndash;&gt;-->

    <!--&lt;!&ndash;        <div class="classification">&ndash;&gt;-->
    <!--&lt;!&ndash;          <div>&ndash;&gt;-->
    <!--&lt;!&ndash;            <img src="../../../public/assets/img/market.jpg" alt="">&ndash;&gt;-->
    <!--&lt;!&ndash;            <p>마켓</p>&ndash;&gt;-->
    <!--&lt;!&ndash;          </div>&ndash;&gt;-->
    <!--&lt;!&ndash;          <div>&ndash;&gt;-->
    <!--&lt;!&ndash;            <img src="../../../public/assets/img/kimchi.jpg" alt="">&ndash;&gt;-->
    <!--&lt;!&ndash;            <p>김치</p>&ndash;&gt;-->
    <!--&lt;!&ndash;          </div>&ndash;&gt;-->
    <!--&lt;!&ndash;          <div>&ndash;&gt;-->
    <!--&lt;!&ndash;            <img src="../../../public/assets/img/agricultural_products.jpg" alt="">&ndash;&gt;-->
    <!--&lt;!&ndash;            <p>농산물</p>&ndash;&gt;-->
    <!--&lt;!&ndash;          </div>&ndash;&gt;-->
    <!--&lt;!&ndash;          <div>&ndash;&gt;-->
    <!--&lt;!&ndash;            <img src="../../../public/assets/img/marine_products.jpg" alt="">&ndash;&gt;-->
    <!--&lt;!&ndash;            <p>수산물</p>&ndash;&gt;-->
    <!--&lt;!&ndash;          </div>&ndash;&gt;-->
    <!--&lt;!&ndash;        </div>&ndash;&gt;-->

    <!--        <p class="title-of-the-month">이 달의 Farmer</p>-->
    <!--        <div class="farmer-of-the-month">-->
    <!--          <div>-->
    <!--            <img src="../../../public/assets/img/profile1.png" alt="유자">-->
    <!--            <p>그랜드팜<img id="medal" src="../../../public/assets/img/goldmedal.png" alt=""></p>-->
    <!--          </div>-->
    <!--          <div>-->
    <!--            <img src="../../../public/assets/img/profile2.png" alt="사과">-->
    <!--            <p>팜파미(아이콘)<img id="medal" src="../../../public/assets/img/goldmedal.png" alt=""></p>-->
    <!--          </div>-->
    <!--          <div>-->
    <!--            <img src="../../../public/assets/img/profile3.png" alt="복숭아">-->
    <!--            <p>팜쀼(아이콘)<img id="medal" src="../../../public/assets/img/goldmedal.png" alt=""></p>-->
    <!--          </div>-->
    <!--        </div>-->

    <!--        <p class="title-of-the-month">이 달의 팖</p>-->
    <!--        <div class="sale-of-the-month">-->
    <!--          <div>-->
    <!--            <img src="../../../public/assets/img/yuza.jpg" alt="유자">-->
    <!--            <p>유자</p>-->
    <!--          </div>-->
    <!--          <div>-->
    <!--            <img src="../../../public/assets/img/apple.jpg" alt="사과">-->
    <!--            <p>사과</p>-->
    <!--          </div>-->
    <!--          <div>-->
    <!--            <img src="../../../public/assets/img/peach.jpg" alt="복숭아">-->
    <!--            <p>복숭아</p>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->

    <!--    <div class="clicked-menubar" v-if="temporary == 1">-->
    <!--      <div class="munu-login-header">-->
    <!--        <div class="munu-login-sub-header">-->
    <!--          <img @click="menuButtonExitClick" src="../../../public/assets/img/close.jpg" alt="엑스" class="close-button">-->
    <!--          <button v-if="loginStatus == 1" class="login-button">로그인</button>-->
    <!--          <button v-if="loginStatus == 0" class="login-button">로그아웃</button>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--      <div class="menu-username-div">-->
    <!--        <img src="../../../public/assets/img/profile1.png" alt="">-->
    <!--        <span class="farmpami-text">팜파미</span>-->
    <!--      </div>-->
    <!--      <div class="munu-login-money">-->
    <!--        <div class="munu-login-sub-money">-->
    <!--          <span>Farm 머니</span>-->
    <!--          <span>150,000원</span>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--      <div>-->
    <!--        &lt;!&ndash; <div>-->
    <!--            <img src="../../../public/assets/img/profile2.png" alt="사과">-->
    <!--            <p>팜파미(아이콘)<img id="medal" src="../../../public/assets/img/goldmedal.png" alt=""></p>-->
    <!--          </div> &ndash;&gt;-->
    <!--        <h4 class="concierge-title"><img id="concierge" src="../../../public/assets/img/concierge.png" alt=""> 참여 중인 경매-->
    <!--        </h4>-->
    <!--&lt;!&ndash;        <div class="list-of-participating-auctions">&ndash;&gt;-->
    <!--&lt;!&ndash;          <div class="list-of-participating-auctions-div">&ndash;&gt;-->
    <!--&lt;!&ndash;            <div>&ndash;&gt;-->
    <!--&lt;!&ndash;              <img src="../../../public/assets/img/thumbnail1.png" alt="">&ndash;&gt;-->
    <!--&lt;!&ndash;            </div>&ndash;&gt;-->
    <!--&lt;!&ndash;            <div>&ndash;&gt;-->
    <!--&lt;!&ndash;              <p class="auction-time">00:16:30 남음</p>&ndash;&gt;-->
    <!--&lt;!&ndash;            </div>&ndash;&gt;-->
    <!--&lt;!&ndash;            <div class="list-of-participating-auctions-div-text">&ndash;&gt;-->
    <!--&lt;!&ndash;              <p>동욱이네 청송 사과 3kg</p><br>&ndash;&gt;-->
    <!--&lt;!&ndash;              <div class="bid-price">&ndash;&gt;-->
    <!--&lt;!&ndash;                <span>현재 입찰가</span>&ndash;&gt;-->
    <!--&lt;!&ndash;                <span class="bid-price-number">19,000원</span>&ndash;&gt;-->
    <!--&lt;!&ndash;              </div>&ndash;&gt;-->
    <!--&lt;!&ndash;              <div class="bid-price">&ndash;&gt;-->
    <!--&lt;!&ndash;                <span>내 입찰가</span>&ndash;&gt;-->
    <!--&lt;!&ndash;                <span class="bid-price-number">18,000원</span>&ndash;&gt;-->
    <!--&lt;!&ndash;              </div>&ndash;&gt;-->
    <!--&lt;!&ndash;            </div>&ndash;&gt;-->
    <!--&lt;!&ndash;          </div>&ndash;&gt;-->
    <!--&lt;!&ndash;          <hr>&ndash;&gt;-->
    <!--&lt;!&ndash;          <div class="list-of-participating-auctions-div">&ndash;&gt;-->
    <!--&lt;!&ndash;            <div>&ndash;&gt;-->
    <!--&lt;!&ndash;              <img src="../../../public/assets/img/thumbnail1.png" alt="">&ndash;&gt;-->
    <!--&lt;!&ndash;            </div>&ndash;&gt;-->
    <!--&lt;!&ndash;            <div>&ndash;&gt;-->
    <!--&lt;!&ndash;              <p class="auction-time">00:16:30 남음</p>&ndash;&gt;-->
    <!--&lt;!&ndash;            </div>&ndash;&gt;-->
    <!--&lt;!&ndash;            <div class="list-of-participating-auctions-div-text">&ndash;&gt;-->
    <!--&lt;!&ndash;              <p>동욱이네 청송 사과 3kg</p><br>&ndash;&gt;-->
    <!--&lt;!&ndash;              <div class="bid-price">&ndash;&gt;-->
    <!--&lt;!&ndash;                <span>현재 입찰가</span>&ndash;&gt;-->
    <!--&lt;!&ndash;                <span class="bid-price-number">19,000원</span>&ndash;&gt;-->
    <!--&lt;!&ndash;              </div>&ndash;&gt;-->
    <!--&lt;!&ndash;              <div class="bid-price">&ndash;&gt;-->
    <!--&lt;!&ndash;                <span>내 입찰가</span>&ndash;&gt;-->
    <!--&lt;!&ndash;                <span class="bid-price-number">18,000원</span>&ndash;&gt;-->
    <!--&lt;!&ndash;              </div>&ndash;&gt;-->
    <!--&lt;!&ndash;            </div>&ndash;&gt;-->
    <!--&lt;!&ndash;          </div>&ndash;&gt;-->
    <!--&lt;!&ndash;          <hr>&ndash;&gt;-->
    <!--&lt;!&ndash;        </div>&ndash;&gt;-->
    <!--      </div>-->
    <!--    </div>-->

    <!--    &lt;!&ndash; <div v-if="temporary == 0" class="footer">-->
    <!--      <img src="../../../public/assets/img/chat.png" alt="검색">-->
    <!--      <img src="../../../public/assets/img/chat.png" alt="홈">-->
    <!--      <img src="../../../public/assets/img/chat.png" alt="추가">-->
    <!--      <img src="../../../public/assets/img/chat.png" alt="채팅">-->
    <!--      <img src="../../../public/assets/img/chat.png" alt="개인정보">-->
    <!--    </div> &ndash;&gt;-->
    <NavBar/>
  </div>
</template>

<script>
import LOGO from "@/components/user/LogoComponent.vue";
import SearchBar from "@/components/user/SearchBarComponent.vue";
import NavBar from "@/components/user/NavComponent.vue";
import ProfilePopUp from "@/components/user/ProfilePopUpComponent.vue";
// import { Carousel, Slide } from 'vue3-carousel';

export default {
  name: "HomeView",
  data() {
    return {
      // loginStatus: 0,
      // temporary: 0,
      currentIndex: 0,
      translateX: 0,
      image: [
        {
          carouselImg: require("../../../public/assets/img/sample01.jpg")
        },
        {
          carouselImg: require("../../../public/assets/img/sample02.jpg")
        },
        {
          carouselImg: require("../../../public/assets/img/sample03.jpg")
        }
      ],
      farmerProfile: [
        {
          fpImg: require("../../../public/assets/img/profile1.png"),
          fpName: "그랜드팜",
          medal: require("../../../public/assets/img/goldmedal.png")
        },
        {
          fpImg: require("../../../public/assets/img/profile2.png"),
          fpName: "팜파미",
          medal: require("../../../public/assets/img/silvermedal.png")
        },
        {
          fpImg: require("../../../public/assets/img/profile3.png"),
          fpName: "팜쀼",
          medal: require("../../../public/assets/img/bronze.png")
        }
      ],
      pamThumbnail: [
        {
          pamImg: require("../../../public/assets/img/thumbnail1.png"),
          productName: "샤인머스켓"
        },
        {
          pamImg: require("../../../public/assets/img/thumbnail2.png"),
          productName: "복숭아"
        },
        {
          pamImg: require("../../../public/assets/img/thumbnail3.png"),
          productName: "유자"
        }
      ]
    }
  },
  components: {
    ProfilePopUp,
    LOGO,
    SearchBar,
    NavBar
  },
  // methods: {
  // menuButtonClick() {
  //   this.temporary = 1;
  // },
  //
  // menuButtonExitClick() {
  //   this.temporary = 0;
  // },
  // }
  methods: {
    onTouchStart(e) {
      this.touchStartX = e.touches[0].clientX;
    },
    onTouchMove(e) {
      this.touchEndX = e.touches[0].clientX;
    },
    onTouchEnd() {
      const touchDiff = this.touchStartX - this.touchEndX;
      if (touchDiff > 50) {
        this.goNextSlide();
      } else if (touchDiff < -50) {
        this.goPrevSlide();
      }
    },
    goNextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.image.length;
      this.translateX = -this.currentIndex * 100;
    },
    goPrevSlide() {
      this.currentIndex = (this.currentIndex - 1 + this.image.length) % this.image.length;
      this.translateX = -this.currentIndex * 100;
    }
  },
  mounted() {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.image.length;
      this.translateX = -this.currentIndex * 100;
    }, 2000);
  }
}
</script>

<style scoped>
@import "../../../public/assets/css/home-page.css";
</style>
