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
          <p class="farm-money" v-if="farmMoney !== undefined">
            {{ Number(farmMoney).toLocaleString() }} 원
          </p>
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
      this.$router.replace("/login");
      alert("로그인 후 이용하실 수 있습니다.");
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
      farmMoney: 0,
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
      this.$store.state.amount = Number(this.inputFarmMoney);
      this.$router.push({ path: "/pay" });
    },
  },
};
</script>

<style scoped>
button {
  margin-top: 0;
  margin-left: 0;
  background-color: #f4f4f4;
}

.template-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.charging-container {
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
  height: 100%;
}

.top-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.subtitle {
  margin: 20px;
}

.charging-farm-money {
  height: 50px;
  border: 1px solid #efefef;
  border-radius: 5px;
  margin: 10px;
  width: 90%;
  padding: 10px;
  font-size: 20px;
}

.btn-div {
  display: flex;
  justify-content: space-around;
  align-content: center;
  margin: 20px;
  width: 100%;
}

.btn-div button {
  width: 80px;
}

.amount {
  margin: 20px;
  display: flex;
  justify-content: space-around;
  width: 100%;
}

.farm-money {
  color: #e12905;
}

.bottom-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.number-keypad {
  display: grid;
  grid-template-columns: repeat(3, minmax(80px, 1fr));
  width: 100%;
}

.number-keypad button {
  width: 100%;
  border-radius: 0%;
  height: 70px;
}

.charging-btn-div {
  display: flex;
  padding: 20px;
  background-color: #f4f4f4;
  width: 100%;
  justify-content: center;
}

.charging-btn {
  background-color: #90ee90;
  color: white;
}

.form-floating {
  display: flex;
  justify-content: center;
}
</style>
