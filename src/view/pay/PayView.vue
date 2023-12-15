<template>
  <div class="wrapper">
    <div class="box_section">
      <!-- 결제 UI -->
      <div id="payment-method"></div>
      <!-- 이용약관 UI -->
      <div id="agreement"></div>
      <!-- 쿠폰 체크박스 -->
      <div style="padding-left: 25px"></div>
      <!-- 결제하기 버튼 -->
      <div class="result wrapper">
        <button
          @click="requestPayment"
          class="button"
          id="payment-button"
          style="margin-top: 30px"
        >
          결제하기
        </button>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { loadPaymentWidget, ANONYMOUS } from "@tosspayments/payment-widget-sdk";
import { BIconThermometerSnow } from "bootstrap-vue";
import { nanoid } from "nanoid";

export default {
  props: {},

  data() {
    return {
      paymentWidget: null,
      paymentMethodWidget: null,
      // TODO: clientKey는 개발자센터의 결제위젯 연동 키 > 클라이언트 키로 바꾸세요.
      clientKey: "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm",
      // TODO: customerKey는 구매자와 1:1 관계로 무작위한 고유값을 생성하세요.
      customerKey: nanoid(),
      amount: this.$store.state.amount,
      user: [],
    };
  },

  created() {
    if (localStorage.getItem("accessToken") == null) {
      this.$router.replace("/home");
    }
    if (this.$store.state.amount === 0) {
      this.$router.replace("/charging");
      alert("금액을 다시 입력해주세요");
    }

    this.$store
      .dispatch("findUser", localStorage.getItem("username"))
      .then(() => {
        this.user = this.$store.state.user;
      });
  },

  methods: {
    async requestPayment() {
      try {
        if (this.paymentWidget) {
          // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
          // @docs https://docs.tosspayments.com/reference/widget-sdk#requestpayment결제-정보
          await this.paymentWidget.requestPayment({
            orderId: nanoid(),
            orderName: "Farm 머니 충전",
            customerName: this.$store.getters.getUserName,
            customerEmail: this.$store.getters.getUserEmail,
            customerMobilePhone: this.$store.getters.getUserMobilePhone,
            successUrl: `${window.location.origin}/success`,
            failUrl: `${window.location.origin}/fail`,
          });
        }
      } catch (error) {
        // 에러 처리하기
        console.error(error);
      }
    },
    async updateAmount() {
      const coupon = document.getElementById("coupon-box");
      // ------  결제 금액 업데이트 ------
      // @docs https://docs.tosspayments.com/reference/widget-sdk#updateamount결제-금액
      if (coupon.checked) {
        this.paymentMethodWidget.updateAmount(this.amount - 5000);
      } else {
        this.paymentMethodWidget.updateAmount(this.amount);
      }
    },
  },
  async mounted() {
    // ------  결제위젯 초기화 ------
    // @docs https://docs.tosspayments.com/reference/widget-sdk#sdk-설치-및-초기화
    this.paymentWidget = PaymentWidget(this.clientKey, ANONYMOUS);

    // ------  결제위젯 렌더링 ------
    // @docs https://docs.tosspayments.com/reference/widget-sdk#renderpaymentmethods선택자-결제-금액-옵션
    this.paymentMethodWidget = this.paymentWidget.renderPaymentMethods(
      "#payment-method",
      { value: this.amount },
      { variantKey: "DEFAULT" }
    );
    // ------  이용약관 렌더링 ------
    // @docs https://docs.tosspayments.com/reference/widget-sdk#renderagreement선택자-옵션
    this.paymentWidget.renderAgreement("#agreement", {
      variantKey: "AGREEMENT",
    });
  },
};
</script>
<style scoped>
@import "../../../public/assets/css/tosspayments-style.css";
</style>
