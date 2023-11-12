import {createRouter, createWebHistory} from "vue-router";

import AuctionView from '@/view/AuctionView.vue'

const routes = [
    {

        path: '/',
        redirect: '/auction',
        component: AuctionView,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;