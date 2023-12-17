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
      <div class="farmer-profile" v-for="fpBox in users" :key="fpBox">
        <div class="fp">
          <img class="farmer-profile-image" :src="fpBox.fpImg" alt="userProfile"/>
          <div class="farmer">
            <span class="farmer-nickname"> {{ fpBox.nickname }} </span>
            <img class="medal" src="../../../public/assets/img/goldmedal.png" alt=""/>
          </div>
        </div>
      </div>
    </div>
    <p>{{users}}</p>
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
      users: [],
    }
  },
  components: {
    LOGO,
    SearchBar,
    NavBar
  },
  created() {
    this.load()
  },
  inject: ["$http"],
  methods: {
    //사용자 랭킹
    load() {
      this.$http.get("/home/rank")
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              this.users = res.data;
              console.log(res);
            }
          })
          .catch(() => {
          })

    },

    //이미지
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