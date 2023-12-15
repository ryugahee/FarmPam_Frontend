import axios from "axios";
import { reactive } from "vue";

const instance = axios.create({
  timeout: 10000,
  baseURL: "/api",
  headers: {
    "content-type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    username: localStorage.getItem("username"),
  },
});

const state = reactive({
  items: [],
  errMsg: "",
});

// 채팅 아이디 가져오기
function getChatIds(userId) {
  return instance.get(`/chats/chatIds`, {
    params: {
      userId: userId,
    },
    headers: {
      "Content-Type": "text/plain",
    },
  });
}

// 채팅리스트 Preview 데이터 가져오기
function getChatPreviewInfos(chatIds, userId) {
  return instance.post(
    `/chats/chatPreviewInfos`,
    {
      chatIds,
      userId,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

function getChatDetailInfo(chatId, userId) {
  return instance.get(`/chats/chatDetailInfo`, {
    params: {
      chatId: chatId,
      userId: userId,
    },
    headers: {
      "Content-Type": "text/plain",
    },
  });
}

function getChatMessages(chatId) {
  return instance.get(`/chats/chatMessages`, {
    params: {
      chatId: chatId,
    },
    headers: {
      "Content-Type": "text/plain",
    },
  });
}

function sendMessage(chatMessage, chatId) {
  return instance.post(`/chats/chatMessage`, { chatMessage, chatId });
}

function getSellerId(itemId) {
  return instance.get(`/item/detail/${itemId}/seller`);
}

function createChat(newChatInfo) {
  console.log(newChatInfo);
  return instance.post(`/chats`, newChatInfo);
}

function getFarmMoney(userId) {
  return instance.get(`/farmmoney`, {
    params: {
      userId: userId,
    },
    headers: {
      "Content-Type": "text/plain",
    },
  });
}

function getUser(username) {
  return instance.get("/user", {
    params: {
      username: username,
    },
    headers: {
      "Content-Type": "text/plain",
    },
  });
}

function successPayment(username, paymentInfo) {
  return instance.post("/payment/success", { username, paymentInfo });
}

export default instance;
export {
  getChatIds,
  getChatPreviewInfos,
  getChatDetailInfo,
  getChatMessages,
  sendMessage,
  getSellerId,
  createChat,
  getFarmMoney,
  getUser,
  successPayment,
};
