<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',

  data(){

  },
  created() {
  },
  inject: ['$http'],
  methods:{

  }
}

</script>

<style>
@font-face {
  font-family: 'BMHANNAPro';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_seven@1.0/BMHANNAPro.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}

* {
  margin:0;
  padding: 0;
  font-family: BMHANNAPro;
  box-sizing: border-box;
}

*::-webkit-scrollbar {
  display: none;
}
</style>
