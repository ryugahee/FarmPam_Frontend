<template>
  <div>
    <LOGO />
    <SearchBar :style="{position: 'static'}"/>
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
<!--    <div class="month-pam">
      <h2>이 달의 팖</h2>
    </div>
    <div class="pam-box">
      <div class="pam-image" v-for="pamBox in pamThumbnail" :key="pamBox">
        <div class="pam">
          <img :src="pamBox.pamImg" alt=""/>
          <p> {{ pamBox.productName }} </p>
        </div>
      </div>
    </div>-->
    <NavBar/>
  </div>
</template>

<script>
import LOGO from "@/components/user/LogoComponent.vue";
import SearchBar from "@/components/user/SearchBarComponent.vue";
import NavBar from "@/components/user/NavComponent.vue";

export default {
  name: "HomeView",
  data() {
    return {
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
    LOGO,
    SearchBar,
    NavBar
  },
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
