import { createStore } from "vuex";
import {
  getChatIds,
  getChatPreviewInfos,
  getChatDetailInfo,
  getChatMessages,
  sendMessage,
  getSellerId,
  createChat,
  getFarmMoney,
} from "@/api/http";
import { requireRefreshToken } from "@/api/tokenApi.vue";

const store = createStore({
  state() {
    return {
      amount: 0,
      user: {
        id: "",
        name: "",
        nickname: "",
        email: "",
        mobilePhone: "",
        farmMoney: 0,
      },
      chatIds: [0],
      chatPreviewInfos: [
        {
          toNickName: "",
          toNickNameThumbnailUrl: "",
          lastMessage: "",
          updateTime: "",
          itemThumbnailUrl: "",
        },
      ],
      chatDetailInfo: {
        toNickName: "",
        itemTitle: "",
        itemThumbnailUrl: "",
        biddingPrice: 0,
      },

      chatMessages: [
        {
          fromUserId: 0,
          message: "",
          updateAt: "",
        },
      ],

      sellerId: "grandFarm",

      newChatId: 0,
    };
  },
  mutations: {
    charging(state, data) {
      state.amount = data;
    },
    setUserInfo(state, id, name, nickname, email, mobilePhone, farmMoney) {
      state.user.id = id;
      state.user.name = name;
      state.user.nickname = nickname;
      state.user.email = email;
      state.user.mobilePhone = mobilePhone;
      state.user.farmMoney = farmMoney;
    },
    addFarmMoney(state) {
      // TODO: 팜머니 업데이트 체크
      state.user.farmMoney += state.amount;
    },
    setChatIds(state, chatIds) {
      state.chatIds = chatIds;
    },
    setChatPreviewInfos(state, chatPreviewInfos) {
      state.chatPreviewInfos = chatPreviewInfos;
    },
    setChatDetailInfo(state, chatDetailInfo) {
      state.chatDetailInfo = chatDetailInfo;
    },
    setChatMessages(state, chatMessages) {
      state.chatMessages = chatMessages;
    },
    setSellerId(state, sellerId) {
      state.sellerId = sellerId;
    },
    setNewChatId(state, newChatId) {
      state.newChatId = newChatId;
    },
    setFarmMoney(state, farmMoney) {
      state.user.farmMoney = farmMoney;
    },
  },
  actions: {
    // 내가 참여중인 채팅방 아이디 찾기
    findChatIds({ commit }, userId) {
      return getChatIds(userId)
        .then((response) => {
          commit("setChatIds", response.data);
        })
        .catch(function (err) {
          console.log("findChatIds Error");
          if (err.response.data == "please send refreshToken") {
            console.log("리프레시 토큰 요청");
            requireRefreshToken();
          }
        });
    },

    // 채팅방 프리뷰 정보 가져오기
    findChatPreviewInfos({ commit }, { chatIds, userId }) {
      return getChatPreviewInfos(chatIds, userId)
        .then((response) => {
          commit("setChatPreviewInfos", response.data);
          console.log(store.state.chatPreviewInfos);
        })
        .catch(function (err) {
          console.log("findChatPreviewInfos Error");
          if (err.response.data == "please send refreshToken") {
            console.log("리프레시 토큰 요청");
            requireRefreshToken();
          }
        });
    },

    findChatDetailInfo({ commit }, { chatId, userId }) {
      return getChatDetailInfo(chatId, userId)
        .then((response) => {
          commit("setChatDetailInfo", response.data);
        })
        .catch(function (err) {
          console.log("findChatDetailInfo Error");
          if (err.response.data == "please send refreshToken") {
            console.log("리프레시 토큰 요청");
            requireRefreshToken();
          }
        });
    },

    findChatMessages({ commit }, chatId) {
      return getChatMessages(chatId)
        .then((response) => {
          commit("setChatMessages", response.data);
        })
        .catch(function (err) {
          console.log("findChatMessages Error");
          if (err.response.data == "please send refreshToken") {
            console.log("리프레시 토큰 요청");
            requireRefreshToken();
          }
        });
    },

    sendMessage({ commit }, { chatMessage, chatId }) {
      return sendMessage(chatMessage, chatId)
        .then(() => {
          store.dispatch("findChatMessages", chatId);
        })
        .catch(function (err) {
          console.log("sendMessage Error");
          if (err.response.data == "please send refreshToken") {
            console.log("리프레시 토큰 요청");
            requireRefreshToken();
          }
        });
    },

    findSellerId({ commit }, itemId) {
      return getSellerId(itemId)
        .then((response) => {
          commit("setSellerId", response.data);
        })
        .catch(function (err) {
          console.log("findSellerId Error");
          if (err.response.data == "please send refreshToken") {
            console.log("리프레시 토큰 요청");
            requireRefreshToken();
          }
        });
    },
    createChat({ commit }, newChatInfo) {
      return createChat(newChatInfo)
        .then((response) => {
          commit("setNewChatId", response.data);
        })
        .catch(function (err) {
          console.log("createChat Error");
          if (err.response.data == "please send refreshToken") {
            console.log("리프레시 토큰 요청");
            requireRefreshToken();
          }
        });
    },

    findFarmMoney({ commit }, userId) {
      return getFarmMoney(userId)
        .then((response) => {
          commit("setFarmMoney", response.data);
        })
        .catch(function (err) {
          console.log("findFarmMoney");
          if (err.response.data == "please send refreshToken") {
            console.log("리프레시 토큰 요청");
            requireRefreshToken();
          }
        });
    },
  },
  getters: {
    getAmount(state) {
      return state.amount;
    },
    getUserId(state) {
      return state.user.id;
    },
    getUserName(state) {
      return state.user.name;
    },
    getUserNickName(state) {
      return state.user.nickname;
    },
    getUserEmail(state) {
      return state.user.email;
    },
    getUserMobilePhone(state) {
      return state.user.mobilePhone;
    },
    getUserFarmMoney(state) {
      return state.user.farmMoney;
    },
    getChatIds(state) {
      return state.chatIds;
    },
    getChatPreviewInfos(state) {
      return state.chatPreviewInfos;
    },
  },
});

export default store;
