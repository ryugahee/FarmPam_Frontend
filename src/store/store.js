import { createStore } from "vuex";
const store = createStore({
  state() {
    return {
      amount: 0,
      user: {
        // TODO: 유저정보를 DB에서 조회해서 값 주입시키기
        name: "홍길동",
        email: "test@test.com",
        mobilePhone: "01012345678",
        farmMoney: 150000,
      },
    };
  },
  mutations: {
    charging(state, data) {
      state.amount = data;
    },
    setUserInfo(state, name, email, mobilePhone, farmMoney) {
      state.user.name = name;
      state.user.email = email;
      state.user.mobilePhone = mobilePhone;
      state.user.farmMoney = farmMoney;
    },
  },
  actions: {},
  getters: {
    getAmount(state) {
      return state.amount;
    },
    getUserName(state) {
      return state.user.name;
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
  },
});

export default store;
