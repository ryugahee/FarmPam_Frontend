<template>
  <div>
    <logo />
    <Header>
      <p>{{ title }}</p>
    </Header>
    <div v-if="chargingHistory.length > 0">
      <div class="charging-container">
        <div
          v-for="(charging, index) in chargingHistory"
          :key="index"
          class="charing-wrapper"
        >
          <div class="charging-time">
            {{ formateTime(charging.approvedAt) }}
          </div>
          <div class="charging-farmmoney">
            <div v-if="charging.method === '간편결제'">
              {{ charging.provider }}
            </div>
            <div v-else>
              {{ charging.method }}
            </div>
            <div class="charging-price-wrapper">
              <span class="charging-price">
                {{ Number(charging.totalAmount).toLocaleString() }}
              </span>
              <span class="charging-price-unit"> 원 충전</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <NavComponent />
  </div>
</template>
<script>
import Logo from "@/components/user/LogoComponent.vue";
import Header from "@/components/user/HeaderComponent.vue";
import NavComponent from "@/components/user/NavComponent.vue";

export default {
  name: "ChargingHistoryView",
  components: { Logo, Header, NavComponent },
  data() {
    return {
      title: "충전 내역",
      chargingHistory: [],
    };
  },
  beforeCreate() {},
  created() {
    if (localStorage.getItem("accessToken") == null) {
      this.$router.replace("/home");
    }

    this.$store
      .dispatch("findChargingHistory", localStorage.getItem("username"))
      .then(() => {
        this.chargingHistory = this.$store.state.chargingHistory;
      });
  },
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeUnmount() {},
  unmounted() {},
  methods: {
    formateTime(dateTime) {
      const time = new Date(dateTime).toLocaleTimeString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      return `${time}`;
    },
  },
};
</script>

<style scoped>
.charging-container {
  width: 390px;
}
.charing-wrapper {
  margin: 10px;
  padding: 10px;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  width: 100%;
}

.charging-farmmoney {
  display: flex;
  justify-content: space-between;
}

.charging-price {
  color: #e12905;
}
</style>
