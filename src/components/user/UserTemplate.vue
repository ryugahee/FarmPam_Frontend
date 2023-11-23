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

<style scoped>

#user_app{
  padding: 0;
  margin: auto;
  width: 100%;
  max-width: 600px;
}
</style>