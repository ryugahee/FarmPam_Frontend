<template>
  <div>
    <LOGO />
    <HeaderComponent>
      <p>경매</p>
    </HeaderComponent>
    <div class="detail-profile">
      <div class="detail-profile-box" @click="profile">
        <img :src="profileImg" alt="profileImg" />
        <h3>{{ nickName}}</h3>
        {{ city }}
      </div>
      <div>
        <button type="button" class="delete-btn" @click="deleteItem()" v-if="myBid">삭제</button>
        <button class="detail-chat-btn" @click="createdChat" v-if="!myBid">채팅하기</button>
      </div>
    </div>
    <div class="item-detail-img">
      <div class="image-container" :style="{ transform: `translateX(${translateX}%)` }">
        <div v-for="(image, index) in images" :key="index" class="image-slide">
          <img :src="image.imgUrl" alt="Slide"/>
        </div>
      </div>
    </div>
    <div class="item-content">
      <p class="content-title">{{ itemTitle }} {{ weight }}kg</p>
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
      <div class="my-price" v-if="!myBid">
        <span>내 입찰가</span>
        <span> {{ myPrice.content }}원 </span>
      </div>
      <div class="my-price" v-if="myBid">
        <span>시작 입찰가</span>
        <span> {{ myPrice.content }}원 </span>
      </div>

      <!--      bid modal-->
      <div class="bid-bgList" v-if="!bidModal" ref="chatBox" @click="bidModal = !bidModal">
        <div v-for="(item, index) in receiveList" :key="item.id">
          <div class="bid-container">
            <p class="bid-Message">
              {{ index + 1 }} 번째 입찰 가격 {{ item.content }} 원
            </p>
          </div>
        </div>
      </div>


      <div class="bid-bg" v-if="!bidModal">
        <div class="bid-btn">
          <div class="bid-font">
            <span>현재 입찰가</span>
            <span> {{ currentPrice.content }}원 </span>
          </div>
          <div>
            <p class="bid-text" v-if="!myBid">입찰할 금액(직접입력)</p>
          </div>
          <div>
            <input
              v-model="bidPrice"
              class="bid-input-box"
              type="text"
              placeholder="입찰가 입력."
              v-if="!myBid"
            /><span class="bid-won" v-if="!myBid">원</span>
            <div class="current-price-bid-box" v-if="myBid">
              <span>시작 입찰가</span>
              <span> {{ myPrice.content }}원 </span>
            </div>
          </div>
          <div>

          </div>
        </div>
        <div class="btn-a-bid" @click="sendBidPrice" v-if="!myBid">
          <p class="bid-time">{{ formatTime(remainingTime) }}</p>
          입찰하기
        </div>
        <div class="btn-a-bid" v-if="myBid">
          <p class="bid-time">{{ formatTime(remainingTime) }}</p>
          내 경매 입니다.
        </div>
      </div>
      <!--      아이템 디테일-->
      <div class="make-a-bid" v-if="bidModal" @click="bidModal = !bidModal">
        <p class="bid-time">{{ formatTime(remainingTime) }}</p>
        <p v-if="!myBid">입찰하기</p>
        <p v-if="myBid">입찰내역 보기</p>
      </div>
    </div>
  </div>
</template>

<script>
import LOGO from "@/components/user/LogoComponent.vue";
import Stomp from "webstomp-client";
import SocketJS from "sockjs-client";
import index from "vuex";
import HeaderComponent from "@/components/user/HeaderComponent.vue";
import {requireRefreshToken} from "@/api/tokenApi.vue";
import instance from "@/api/http";

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
      publisherId: "",
      nickName: "",
      itemImg: "",
      currentPrice: [],
      myPriceList: [],
      myPrice:[],
      bidModal: true,
      bidStatus: true,
      myBid: false,
      bidId: "",
      bidPrice:"",
      bidList:[],
      receiveList: [],

      // 불러온 아이템 정보
      userName:"",
      items: [],
      weight: "",
      itemTitle: "",
      itemDetail: "",
      time: "",
      city: "",
      tagNames: [],
      timer: null,
      remainingTime: "",
      images: [],
      currentIndex: 0,
      translateX: 0,
      seller: ""
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
  mounted() {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
      this.translateX = -this.currentIndex * 100;
    }, 2000);
  },
  methods: {
    connect() {
      this.receiveBidList();
      this.userName = localStorage.getItem("username");
      this.myBidPrice()

      // this.getPublisherInfo();
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
            this.stompClient.send("/bid-current");
            this.myBidPrice();
            this.$nextTick(() => {
              this.scrollToBottom();
            });
          });
        },
        (error) => {
          this.connected = false;
        },
      );


      // 디테일 불러오기
      this.$http.get(`/item/detail/${this.$route.params.id}`)
        .then((res) => {
          this.itemTitle = res.data.itemTitle;
          this.itemDetail = res.data.itemDetail;
          this.weight = res.data.weight;
          this.time = res.data.time;
          this.city = res.data.city;
          this.tagNames = res.data.tagNames;
          this.images = res.data.itemImgDtoList;
          this.seller = res.data.userName;
          // 시간 출력 디자인
          this.remainingTime = res.data.time;
          this.startTimer();
        })
        .catch((err) => {
          if(err.response.data == "please send refreshToken") {
            console.log("리프레시 토큰 요청");
            requireRefreshToken();
          }
        });
    },

    myBidPrice(){
      const data = {};
      data.bidId = this.$route.params.id;
      data.content = this.userName;
      this.$http.post('/bid-myPrice', data).then((res) =>{
        const data = res.data;
            this.myPriceList = data;
            this.myPrice = this.myPriceList.at(-1);
      }).catch((err) => {
        console.log(err);
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
        console.log(this.currentPrice.content);
        if(this.bidPrice > this.currentPrice.content){
          try{
            this.stompClient.send("/bid-push", JSON.stringify(msg), {});
            alert("입찰에 성공하였습니다.");
            this.bidPrice = "";
          }catch(err){
            alert("입찰에 실패하였습니다.");
          }

        }else {
          alert("현재 입찰가보다 낮은가격은 입찰 할 수 없습니다.");
          this.bidPrice = "";
        }


        // this.stompClient.send("/bid-myPrice", JSON.stringify(msg), {});
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
          this.publisherId = this.receiveList.at(0).userName;
          if(this.publisherId != null){
            if(this.userName === this.publisherId){
              this.myBid = true;
            }
            const data = {};
            data.bidId = this.publisherId;
            this.$http.post("/publisherInfo", data).then((res) => {
              const data = res.data;
              this.nickName = data;
            })
          }

        })
        .catch((err) => {
          console.log(err);
        });



    },
    // getPublisherInfo(){
    //   console.log("소ㅑㄴ!!!!!!!"+this.publisherId);
    //   this.$http.post("/publisherInfo", this.publisherId).then((res) => {
    //     const data = res.data;
    //     this.nickName = data.nickName;
    //
    //   })
    // },

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
          alert("아래의 채팅 리스트를 확인해주세요!\n" +
              "판매자 본인과는 채팅 할 수 없어요!");
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
    //채팅 & 삭제 버튼
    isSeller() {

    },

    //사진 슬라이드
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
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
      this.translateX = -this.currentIndex * 100;
    },
    goPrevSlide() {
      this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
      this.translateX = -this.currentIndex * 100;
    },

    scrollToBottom() {
      const chatBox = this.$refs.chatBox;
      chatBox.scrollTop = chatBox.scrollHeight;
    },
  },

};
</script>

<style scoped>
@import "../../../public/assets/css/item-detail-page.css";
@import "../../../public/assets/css/chat-style.css";
.bid-Message {
  background-color: #98CB98;
  border-radius: 5px;
  text-align: center;
  color: black;
  width: 80%;
  margin: 10px auto;
  box-shadow: 5px 5px 5px black;

}
.bid-font{
  margin-top: 15px;
  margin-bottom: 15px;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  border-bottom: 1px solid #444444;
}

.bid-container{

  overflow-y: scroll;
}
.bid-bgList{
  margin-top: 100px;
  margin-bottom: 224px;
  padding-bottom: 30px;
  width: 390px;
  height: 520px;
  position: fixed;
  top: 0;
  background-color: rgba(0, 0, 0, 60%);
  overflow-y: scroll;
}
</style>
