<template>
  <div class="container">
    <Logo />
    <Header>
      <p>{{ title }}</p>
    </Header>
    <div class="charging-container">
      <div class="top-wrapper">
        <h3 class="subtitle">{{ subtitle }}</h3>
        <input
          type="text"
          class="charging-farm-money"
          :placeholder="subtitle"
          :value="formattedInputFarmMoney"
          @input="updateInputFarmMoney"
        />
        <div class="amount">
          <p>현재 Farm 머니</p>
          <p class="farm-money">{{ farmMoney.toLocaleString() }}원</p>
        </div>
      </div>
      <div class="bottom-wrapper">
        <div class="btn-div">
          <button @click="addToFarmMoney(10000)">{{ one }}</button>
          <button @click="addToFarmMoney(30000)">{{ three }}</button>
          <button @click="addToFarmMoney(50000)">{{ five }}</button>
          <button @click="addToFarmMoney(100000)">{{ ten }}</button>
        </div>
        <div class="number-keypad">
          <button @click="appendToFarmMoney('1')">1</button>
          <button @click="appendToFarmMoney('2')">2</button>
          <button @click="appendToFarmMoney('3')">3</button>
          <button @click="appendToFarmMoney('4')">4</button>
          <button @click="appendToFarmMoney('5')">5</button>
          <button @click="appendToFarmMoney('6')">6</button>
          <button @click="appendToFarmMoney('7')">7</button>
          <button @click="appendToFarmMoney('8')">8</button>
          <button @click="appendToFarmMoney('9')">9</button>
          <button @click="appendToFarmMoney('00')">00</button>
          <button @click="appendToFarmMoney('0')">0</button>
          <button @click="backspace">
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              stroke="currentColor"
              stroke-width="2"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="css-i6dzq1"
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>
        </div>
        <div class="charging-btn-div">
          <router-link :to="`/pay`">
            <button @click="charge" class="charging-btn">충전하기</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Logo from "@/components/user/LogoComponent.vue";
import Header from "@/components/user/HeaderComponent.vue";

export default {
  name: "ChargingView",
  components: { Logo, Header },
  data() {
    return {
      title: "충전",
      subtitle: "충전 금액",
      farmMoney: this.$store.getters.getUserFarmMoney,
      one: "+1만",
      three: "+3만",
      five: "+5만",
      ten: "+10만",
      inputFarmMoney: "",
    };
  },
  computed: {
    formattedInputFarmMoney() {
      return Number(this.inputFarmMoney).toLocaleString();
    },
  },
  methods: {
    addToFarmMoney(number) {
      this.inputFarmMoney = (Number(this.inputFarmMoney) + number).toString();
    },
    appendToFarmMoney(number) {
      this.inputFarmMoney += number;
    },
    backspace() {
      this.inputFarmMoney = this.inputFarmMoney.slice(0, -1);
    },
    updateInputFarmMoney(event) {
      const newValue = event.target.value.replace(/[^0-9]/g, "");
      this.inputFarmMoney = newValue;
    },
    charge() {
      this.$store.commit("charging", Number(this.inputFarmMoney));
    },
  },
};
</script>

<style scoped>
@import "../../../public/assets/css/charging-page-style.css";
</style>
