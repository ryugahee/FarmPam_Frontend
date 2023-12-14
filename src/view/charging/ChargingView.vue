<template>
  <div class="template-container">
    <Logo />
    <Header>
      <p>{{ title }}</p>
    </Header>
    <div class="charging-container">
      <div class="top-wrapper">
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control charging-farm-money"
            :placeholder="subtitle"
            :value="formattedInputFarmMoney"
            @input="updateInputFarmMoney"
            :id="chargingInput"
            readonly
          />
          <label for="chargingInput">{{ subtitle }}</label>
        </div>
        <div class="amount">
          <p>{{ currentFarmMoneyTitle }}</p>
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
            <button
              @click="charge"
              class="charging-btn"
              :disabled="!isChargeValid()"
              :style="{ 'background-color': isChargeValid() ? '' : '#808080' }"
            >
              충전하기
            </button>
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

  created() {
    if (localStorage.getItem("accessToken") == null) {
      this.$router.replace("/home");
    }
    this.myId = localStorage.getItem("username");
    this.$store.dispatch("findFarmMoney", this.myId).then(() => {
      this.farmMoney = this.$store.state.user.farmMoney;
    });
  },

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
      currentFarmMoneyTitle: "현재 Farm 머니",
    };
  },
  computed: {
    formattedInputFarmMoney() {
      return this.inputFarmMoney !== "" && this.inputFarmMoney !== "0"
        ? Number(this.inputFarmMoney).toLocaleString()
        : "";
    },
  },
  methods: {
    isChargeValid() {
      const inputFarmMoneyAsNumber = Number(this.inputFarmMoney);
      return !isNaN(inputFarmMoneyAsNumber) && inputFarmMoneyAsNumber >= 10000;
    },
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
      this.inputFarmMoney = newValue !== "0" ? newValue : "";
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
