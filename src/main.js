<<<<<<< HEAD
import { createApp } from 'vue'
import App from '@/App.vue';
import router from "@/router/index";
=======
import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";
>>>>>>> c1dd2b1ecdcad6e9d70ef9df869df7fff0e4c420
import http from "@/api/http";
// main.js 또는 해당 컴포넌트
import BootstrapVue from 'bootstrap-vue-3'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

const app = createApp(App);
app.use(BootstrapVue);

<<<<<<< HEAD
app.provide('$http', http);
app.use(router);
app.mount('#app');

=======
app.provide("$http", http);

app.use(router);

app.mount("#app");
>>>>>>> c1dd2b1ecdcad6e9d70ef9df869df7fff0e4c420
