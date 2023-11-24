<template>
  <div id="user_app">
    <router-view></router-view>
  </div>
</template>
<script>

export default {
  name: "UserTemplate",
  components: {},
  data() {
    return {
    }
  },
  methods: {
  },
  mounted() {
  },
  beforeUnmount() {
  },
};
</script>

<style>
#user_app {
  margin: 0 auto;
  width: 390px;
  height: 844px;
  overflow: hidden;
}
</style>