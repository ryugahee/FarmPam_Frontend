<template>
  <div>
    <LOGO />
    <HeaderComponent>
      <p>판매 내역</p>
    </HeaderComponent>
    <div class="tabs">
      <label class="tab_item" for="a">Tab 1</label>
      <input id="a" type="radio" name="tab_item" checked>

      <input id="b" type="radio" name="tab_item">
      <label class="tab_item" for="b">Tab 2</label>

    </div>
  </div>
</template>

<script>
import LOGO from "@/components/user/LogoComponent.vue";
import HeaderComponent from "@/components/user/HeaderComponent.vue";

export default {
  name: "SalesHistory",
  components: {HeaderComponent, LOGO},
  methods: {

  }
}
</script>

<style scoped>

</style>