<template>
  <div>
    <LOGO />
    <HeaderComponent>
      <p>경매</p>
    </HeaderComponent>
    <div class="detail-profile">
      <div class="detail-profile-box" @click="profile">
        <img :src="profileImg" alt="profileImg" />
        <h3>{{ nickName }}</h3>
        <div class="review-avg">
          <div>
            <img src="../../../public/assets/img/filled-star.png" alt="star" />
          </div>
          <div>
            <span> {{ review }} </span>
          </div>
        </div>
      </div>
      <div>
        <button class="detail-chat-btn" @click="createdChat">채팅하기</button>
      </div>
    </div>
    <div class="item-detail-img">
      <img :src="itemImg" alt="경매 상품 이미지" />
    </div>
    <div class="item-content">
      <p class="content-title">{{ itemTitle }} {{ weight }}kg</p>
      <!--      <button type="button" class="delete-btn" @click="deleteItem()">삭제</button>-->
      <div>
        <div class="tags-container">
          <span v-for="(tag, index) in tagNames" :key="index" class="tag-item">
            {{ tag }}
          </span>
        </div>
      </div>
      <p class="content-detail" style="white-space: pre-line">
        {{ itemDetail }}
      </p>
    </div>
    <div class="item-footer">
      <div class="current-price">
        <span>현재 입찰가</span>
        <span> {{ currentPrice.content }}원 </span>
      </div>
      <div class="my-price">
        <span>내 입찰가</span>
        <span> {{ myPrice.toLocaleString() }}원 </span>
      </div>

      <!--      bid modal-->
      <div class="bid-bg" v-if="!bidModal">
        <div v-for="(item, index) in receiveList" :key="item.id">
          <p class="bid-Message">
            {{ index + 1 }} 번째 입찰 가격 {{ item.content }}
          </p>
        </div>
        <div class="bid-btn">
          <div class="current-price-bid-box">
            <span>현재 입찰가</span>
            <span> {{ currentPrice.content }}원 </span>
          </div>
          <div>
            <p class="bid-text">입찰할 금액(직접입력)</p>
          </div>
          <div>
            <input
              v-model="bidPrice"
              class="bid-input-box"
              type="text"
              placeholder="입찰가 입력."
            /><span class="bid-won">원</span>
          </div>
        </div>
        <div class="btn-a-bid" @click="sendBidPrice">
          <p class="bid-time">{{ formatTime(remainingTime) }}</p>
          입찰하기
        </div>
      </div>

      <!--      아이템 디테일-->
      <div class="make-a-bid" v-if="bidModal" @click="bidModal = !bidModal">
        <p class="bid-time">{{ formatTime(remainingTime) }}</p>
        <p>입찰하기</p>
      </div>
    </div>
  </div>
</template>

<script>
import LOGO from "@/components/user/LogoComponent.vue";
import Stomp from "webstomp-client";
import SocketJS from "sockjs-client";
import Auction from "@/components/auction/AuctionComponent.vue";
import index from "vuex";
import HeaderComponent from "@/components/user/HeaderComponent.vue";
import data from "bootstrap/js/src/dom/data";

export default {
  name: "ItemDetailView",
  computed: {
    index() {
      return index;
    },
  },
  data() {
    return {
      profileImg: require("../../../public/assets/img/profile1.png"),
      nickName: "그랜드팜",
      review: 4.5,
      itemImg: require("../../../public/assets/img/apple.png"),
      currentPrice: [],
      myPrice: [],
      bidModal: true,
      bidStatus: true,
      bidId: "",
      userName: "chan",
      bidPrice: "",
      bidList: [],
      receiveList: [],
      // 불러온 아이템 정보
      items: [],
      weight: "",
      itemTitle: "",
      itemDetail: "",
      time: "",
      tagNames: [],
      timer: null,
      remainingTime: "",
    };
  },
  components: {
    HeaderComponent,
    LOGO,
  },
  inject: ["$http"],
  created() {
    this.connect();
  },
  methods: {
    connect() {
      this.receiveBidList();

      //소켓 연결
      const serverURL = "http://localhost:8080/bid";
      let socket = new SocketJS(serverURL);
      this.stompClient = Stomp.over(socket);
      this.stompClient.connect(
        {},
        (frame) => {
          this.connected = true;
          this.stompClient.subscribe("/bidList", (res) => {
            this.receiveList = JSON.parse(res.body);
            this.currentPrice = this.receiveList.at(-1);
          });
        },
        (error) => {
          this.connected = false;
        }
      );

      // 디테일 불러오기
      this.$http
        .get(`/item/detail/${this.$route.params.id}`)
        .then((res) => {
          this.itemTitle = res.data.itemTitle;
          this.itemDetail = res.data.itemDetail;
          this.weight = res.data.weight;
          this.time = res.data.time;
          this.tagNames = res.data.tagNames;

          // 시간 출력 디자인
          this.remainingTime = res.data.time;
          this.startTimer();
        })
        .catch((error) => {
          console.error(error);
        });
    },

    sendBidPrice() {
      if (this.stompClient && this.stompClient.connected) {
        const data = {
          userName: this.userName,
          bidPrice: this.bidPrice,
        };
        const content = JSON.stringify(data);
        const msg = {
          bidId: this.bidId,
          content,
        };
        this.stompClient.send("/bid-push", JSON.stringify(msg), {});
        this.stompClient.subscribe("/myBid-price", (res) => {
          this.myPrice = res.body;
        });
      }
    },
    receiveBidList() {
      //입찰내역 호출
      this.bidId = this.$route.params.id;
      const msg = {
        bidId: this.bidId,
      };

      this.$http
        .post("/bid-list", JSON.stringify(msg), {})
        .then((res) => {
          this.receiveList = res.data;
          this.currentPrice = this.receiveList.at(-1);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 경매 삭제
    deleteItem() {
      this.$http
        .delete(`/item/delete/${this.$route.params.id}`)
        .then((res) => {
          if (res.status === 200) {
            console.log(res);
            window.alert("상품이 삭제되었습니다");
            this.$router.go(-1);
          }
        })
        .catch(() => {
          window.alert("상품 삭제에 실패했습니다");
        });
    },
    finishItem() {
      this.$http.post(`/bid-finish/${this.$route.params.id}`).then((res) => {});
    },
    // 시간 디자인 변환
    startTimer() {
      this.timer = setInterval(() => {
        this.remainingTime -= 1000;
        if (this.remainingTime < 0) {
          clearInterval(this.timer);
          this.remainingTime = 0;
        }
      }, 1000);
    },
    formatTime(remainingTime) {
      if (remainingTime <= 0) {
        this.bidStatus = false;
        this.finishItem();
        return "00:00:00";
      }
      const hours = Math.floor(remainingTime / 3600000);
      const minutes = Math.floor((remainingTime % 3600000) / 60000);
      const seconds = Math.floor((remainingTime % 60000) / 1000);
      return `${this.padTime(hours)}:${this.padTime(minutes)}:${this.padTime(
        seconds
      )}`;
    },
    padTime(time) {
      return (time < 10 ? "0" : "") + time;
    },
    createdChat() {
      const currentTime = new Date();
      const createdAt = this.formateCreatedTime(currentTime);

      this.$store.dispatch("findSellerId", this.$route.params.id).then(() => {
        const sellerId = this.$store.state.sellerId;
        const userId = localStorage.getItem("username");

        if (sellerId !== userId && userId !== null && sellerId !== null) {
          const newChatInfo = {
            // TODO: firstUserId : 사용자
            firstUserId: userId,
            // TODO: secondUserId : 판매자
            secondUserId: sellerId,
            createdAt: createdAt,
            itemId: this.$route.params.id,
          };

          console.log(newChatInfo);

          this.$store.dispatch("createChat", newChatInfo).then(() => {
            this.$router.push({
              path: `/chats/${this.$store.state.newChatId}`,
            });
          });
        } else {
          console.log("자기 자신과 채팅할 수 없습니다.");
        }
      });
    },
    formateCreatedTime(time) {
      const year = time.getFullYear();
      const month = (time.getMonth() + 1).toString().padStart(2, "0");
      const day = time.getDate().toString().padStart(2, "0");
      const hours = time.getHours().toString().padStart(2, "0");
      const minutes = time.getMinutes().toString().padStart(2, "0");
      const seconds = time.getSeconds().toString().padStart(2, "0");

      const formattedTime = `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;

      return formattedTime;
    },
  },
};
</script>

<style scoped>
@import "../../../public/assets/css/item-detail-page.css";
@import "../../../public/assets/css/chat-style.css";
.bid-Message {
  text-align: center;
  color: #ffffff;
}
</style>
