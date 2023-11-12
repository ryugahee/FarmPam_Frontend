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
*{
  margin:0;
  padding: 0;
  box-sizing: border-box;
}
</style>
