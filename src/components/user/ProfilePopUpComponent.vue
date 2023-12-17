<template>
  <div>
    <div class="pop-up-modal offcanvas pop-up-slide" id="offcanvasRight">
      <div class="pop-up-header">
        <img
          class="pop-up-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
          src="../../../public/assets/img/close.png"
          alt=""
        />
        <button class="logoutBtn" @click="logout">로그아웃</button>
      </div>
      <div class="pop-up-profile">
        <div class="pop-up-profile-box">
          <div v-if="imageUrl">
            <img class="pop-up-profile-img" :src="imageUrl" alt="" />
          </div>
          <div v-else>
            <img
              class="pop-up-profile-img"
              src="../../../public/assets/img/person2.png"
              style="background-color: grey; border-radius: 100%"
              alt=""
            />
          </div>

          <span> {{ username }} &nbsp; 님</span>
        </div>
      </div>
      <div class="pop-up-money-box">
        <h2>Farm머니</h2>
        <p class="pop-up-price">{{ farmMoney.toLocaleString() }}원</p>
      </div>
      <div class="pop-up-join-bid">
        <img
          class="pop-up-join-bid-img"
          src="../../../public/assets/img/concierge.png"
          alt=""
        />
        <span>참여 중인 경매</span>
        <ItemPost v-for="post in 1" :key="post" />
      </div>
      <div></div>
    </div>
    <div class="menu-box">
      <img
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasRight"
        aria-controls="offcanvasRight"
        src="../../../public/assets/img/dehaze.png"
        alt=""
      />
    </div>
  </div>
</template>

<script>
import ItemPost from "@/components/item/ItemPostComponent.vue";
import instance from "@/api/http";
import router from "@/router";
import { onMounted, ref } from "vue";

export default {
  name: "ProfilePopUp",
  components: {
    ItemPost,
  },

  setup() {
    const farmMoney = ref(1000);
    const username = ref("");
    const imageUrl = ref("");

    const getUserInfo = () => {
      instance
        .post("/getUserInfo")
        .then((res) => {
          console.log("유저 정보", res.data);
          const data = res.data;
          username.value = data.username;
          imageUrl.value = data.imageUrl;
          farmMoney.value = data.farmMoney;
        })
        .catch((err) => {
          console.error("유저 정보 조회 오류:", err);
        });
    };

    const logout = () => {
      localStorage.clear();

      instance.post("/userLogout").catch((err) => {
        console.log(err);
      });

      router.push("/login");
    };

    onMounted(() => {
      getUserInfo();
    });

    return {
      logout,
      farmMoney,
      username,
      imageUrl,
    };
  },
  // data() {
  //   return {
  //     username: "그랜드팜파라밤밤",
  //     farmMoney: 150000,
  //   };
  // },
  // methods: {
  //   logout() {
  //     localStorage.clear();

  //     instance.post("/userLogout").catch((err) => {
  //       console.log(err);
  //     });

  //     this.$router.push("/login");
  //   },
  // },
};
</script>

<style scoped>
.pop-up-modal {
  width: 390px;
  height: 844px;
  position: fixed;
  top: 0;
  background-color: #ffffff;
}

.pop-up-modal .pop-up-header {
  width: 100%;
  height: 70px;
}

.pop-up-modal .pop-up-header .pop-up-close {
  float: left;
  margin-top: 10px;
}

.pop-up-modal .pop-up-header .logoutBtn {
  float: right;
  margin-right: 20px;
  margin-top: 15px;
  width: 80px;
  height: 30px;
  font-weight: bold;
  border: 2px solid #000000;
  border-radius: 8px;
  background-color: #ffffff;
}

.pop-up-modal .pop-up-profile {
  width: 100%;
  height: 80px;
}

.pop-up-modal .pop-up-profile .pop-up-profile-box {
  width: 250px;
  display: flex;
  justify-content: space-between;
}

.pop-up-modal .pop-up-profile .pop-up-profile-box .pop-up-profile-img {
  width: 70px;
  height: 70px;
}

.pop-up-modal .pop-up-profile .pop-up-profile-box span {
  width: 150px;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pop-up-modal .pop-up-money-box {
  padding: 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pop-up-modal .pop-up-money-box .pop-up-price {
  font-size: 20px;
}

.pop-up-modal .pop-up-join-bid {
  width: 100%;
  text-align: left;
}

.pop-up-modal .pop-up-join-bid .pop-up-join-bid-img {
  width: 25px;
  height: 25px;
}

.pop-up-modal .pop-up-join-bid span {
  margin-top: -5px;
  margin-left: 5px;
  font-size: 20px;
}

.menu-box {
  position: absolute;
  top: 17px;
  right: 15px;
}

.menu-box img {
  width: 30px;
  height: 30px;
}

.pop-up-slide {
  transform: translateX(100%);
}
</style>
