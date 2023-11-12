import { createApp } from 'vue'
import App from '@/App.vue'
import router from "@/router";
import http from "@/api/http";

const app = createApp(App);

app.provide('$http', http);

app.use(router);


app.mount('#app');

