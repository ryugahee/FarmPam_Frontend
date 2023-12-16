<template>
  <!-- 결제 성공 시 -->
  <section v-if="confirmed">
    <div class="result wrapper">
      <div class="box_section">
        <h2 style="padding: 20px 0px 10px 0px">
          <img
            width="35"
            src="https://static.toss.im/3d-emojis/u1F389_apng.png"
          />
          결제 성공
        </h2>
        <h3>{{ this.$store.state.user.nickname }} 님</h3>
        <p v-if="amount !== undefined">
          {{ this.amount.toLocaleString() }} 원을 충전 하셨습니다.
        </p>
        <div class="amount">
          <p>충전 후 Farm 머니</p>
          <p class="farm-money" v-if="this.$store.state.user !== undefined">
            {{ Number(this.$store.state.user.farmMoney).toLocaleString() }} 원
          </p>
        </div>
        <div class="result wrapper">
          <button
            class="button"
            @click="goMyPage"
            style="margin-top: 30px; margin-right: 10px"
          >
            마이 페이지로 이동
          </button>
          <button
            class="button"
            @click="goChargingHistory"
            style="margin-top: 30px; background-color: #e8f3ff; color: #1b64da"
          >
            충전 내역
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
/* eslint-disable */
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { confirmPayment } from "@/confirmPayment";
import { useStore } from "vuex";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const confirmed = ref(false);
    const amount = ref(0);

    onMounted(async () => {
      const requestData = {
        orderId: route.query.orderId,
        amount: route.query.amount,
        paymentKey: route.query.paymentKey,
      };

      async function confirm() {
        try {
          const { response, json } = await confirmPayment(requestData);
          console.log(json);
          if (!response.ok) {
            router.push(`/fail?message=${json.message}&code=${json.code}`);
          } else {
            confirmed.value = true;
            store.dispatch("successPayment", {
              username: localStorage.getItem("username"),
              paymentInfo: json,
            });

            amount.value = json.totalAmount;
            console.log(amount);
          }
        } catch (error) {}
      }

      async function getUser() {
        store.dispatch("findUser", localStorage.getItem("username"));
      }

      confirm();
      getUser();
    });

    return {
      confirmed,
      amount,
    };
  },

  created() {
    if (localStorage.getItem("accessToken") == null) {
      this.$router.replace("/home");
    }
  },

  methods: {
    goMyPage() {
      this.$router.push(`/user`);
    },

    goChargingHistory() {
      this.$router.push(`/chargingHistory`);
    },
  },
};
</script>
<style scoped>
@import "../../../public/assets/css/tosspayments-style.css";
@import "../../../public/assets/css/charging-page-style.css";
</style>
