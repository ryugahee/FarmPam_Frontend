<template>
  <div class="tab">
    <ul class="tabnav">
      <li><a @click="tab1Click" :class="{ active: tab1 }">판매 중</a></li>
      <li><a @click="tab2Click" :class="{ active: tab2 }">거래 완료</a></li>
    </ul>
    <div class="tabcontent">
      <div id="tab1" v-if="tab1"><slot name="tab-num1"></slot></div>
      <div id="tab2" v-if="tab2"><slot name="tab-num2"></slot></div>
    </div>
  </div>
</template>

<script>

export default {
  name: "ItemPostTabComponent",
  data() {
    return {
      tab1: true,
      tab2: false,
    }
  },
  methods: {
    tab1Click() {
      this.tab1 = true;
      if (this.tab1) {
        this.tab2 = false;
      }
    },
    tab2Click() {
      this.tab2 = true;
      if (this.tab2) {
        this.tab1 = false;
      }
    }

  }
}
</script>

<style scoped>
@import "../../../public/assets/css/tab-component.css";
</style>