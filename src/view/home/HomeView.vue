<template>
  <div>
    <LOGO />
    <SearchBar :style="{ position: 'static' }" />
    <div class="header-title">
      <h1>HOT</h1>
    </div>
    <div
      class="image-slider"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
    >
      <div
        class="image-container"
        :style="{ transform: `translateX(${translateX}%)` }"
      >
        <div v-for="(image, index) in image" :key="index" class="image-slide">
          <img :src="image.carouselImg" alt="Slide" />
        </div>
      </div>
    </div>
    <div class="month-farmer">
      <h2>이 달의 Farmer</h2>
    </div>
    <div class="farmer-profile-wrapper">
      <div class="farmer-profile" v-for="fpBox in farmerProfile" :key="fpBox">
        <div class="fp">
          <img class="farmer-profile-image" :src="fpBox.fpImg" alt="" />
          <div class="farmer">
            <span class="farmer-nickname"> {{ fpBox.fpName }} </span>
            <img class="medal" :src="fpBox.medal" alt="" />
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
    <NavBar />
  </div>
</template>

<script>
import LOGO from "@/components/user/LogoComponent.vue";
import SearchBar from "@/components/user/SearchBarComponent.vue";
import NavBar from "@/components/user/NavComponent.vue";
import router from "@/router";

export default {
  name: "HomeView",
  data() {
    return {
      currentIndex: 0,
      translateX: 0,
      image: [
        {
          carouselImg: require("../../../public/assets/img/sample01.jpg"),
        },
        {
          carouselImg: require("../../../public/assets/img/sample02.jpg"),
        },
        {
          carouselImg: require("../../../public/assets/img/sample03.jpg"),
        },
      ],
      farmerProfile: [
        {
          fpImg: require("../../../public/assets/img/profile1.png"),
          fpName: "그랜드팜",
          medal: require("../../../public/assets/img/goldmedal.png"),
        },
        {
          fpImg: require("../../../public/assets/img/profile2.png"),
          fpName: "팜파미",
          medal: require("../../../public/assets/img/silvermedal.png"),
        },
        {
          fpImg: require("../../../public/assets/img/profile3.png"),
          fpName: "팜쀼",
          medal: require("../../../public/assets/img/bronze.png"),
        },
      ],
      pamThumbnail: [
        {
          pamImg: require("../../../public/assets/img/thumbnail1.png"),
          productName: "샤인머스켓",
        },
        {
          pamImg: require("../../../public/assets/img/thumbnail2.png"),
          productName: "복숭아",
        },
        {
          pamImg: require("../../../public/assets/img/thumbnail3.png"),
          productName: "유자",
        },
      ],
    };
  },
  components: {
    LOGO,
    SearchBar,
    NavBar,
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
      this.currentIndex =
        (this.currentIndex - 1 + this.image.length) % this.image.length;
      this.translateX = -this.currentIndex * 100;
    },
  },
  mounted() {
    if (!localStorage.getItem("username")) {
      router.replace("login");
    }
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.image.length;
      this.translateX = -this.currentIndex * 100;
    }, 2000);
  },
};
</script>

<style scoped>
.header-title h1 {
  margin-left: 20px;
  color: #ff0000;
}

.image-slider {
  margin: 0 auto;
  width: 350px;
  height: 200px;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
}

.image-slider .image-container {
  display: flex;
  transition: transform 0.7s ease;
}

.image-slider .image-container .image-slide img {
  width: 350px;
  height: 250px;
  border-radius: 10px;
}

/*.image-slider .image-container .image-slide p {*/
/*  font-size: 25px;*/
/*  color: #FFFFFF;*/
/*  position: absolute;*/
/*  bottom: 0;*/
/*  left: 50%;*/
/*  transform: translateX(-50%);*/
/*}*/

.month-farmer {
  margin: 20px;
}

.month-farmer h2 {
  margin-bottom: 10px;
}

.farmer-profile-wrapper {
  margin: 0 auto;
  width: 350px;
  display: flex;
}

.farmer-profile-wrapper .farmer-profile {
  margin: 0 auto;
  width: 120px;
  height: 100px;
}

.farmer-profile-wrapper .farmer-profile .fp {
  margin: 0 auto;
  text-align: center;
}

.farmer-profile-wrapper .farmer-profile .fp .farmer-profile-image {
  margin: 5px auto;
  width: 70px;
  height: 70px;
}

.farmer-profile-wrapper .farmer-profile .fp .farm {
  display: flex;
}

.farmer-profile-wrapper .farmer-profile .fp .farmer .farmer-nickname {
  font-size: 20px;
}

.farmer-profile-wrapper .farmer-profile .fp .farmer .medal {
  margin-bottom: -4px;
  width: 16px;
  height: 18px;
}

.month-pam {
  margin: 50px 20px 20px;
}

.pam-box {
  margin: 0 auto;
  width: 350px;
  display: flex;
  justify-content: space-around;
}

.pam-box .pam-image .pam {
  width: 100px;
  text-align: center;
}

.pam-box .pam-image .pam img {
  margin: 5px auto;
  width: 70px;
  height: 70px;
  border-radius: 5px;
}

.pam-box .pam-image .pam p {
  font-size: 20px;
}
</style>
