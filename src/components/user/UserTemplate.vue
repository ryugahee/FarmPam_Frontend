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
@font-face {
  font-family: 'BMHANNAPro';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_seven@1.0/BMHANNAPro.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}

body {
  font-family: BMHANNAPro;
}

body::-webkit-scrollbar {
  display: none;
}

#user_app {
  margin: 0 auto;
  width: 390px;
  height: 844px;
}
</style>