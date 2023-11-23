import {createRouter, createWebHistory} from "vue-router";
import LoginView from "@/view/AuctionView.vue";
import UserTemplate from "@/components/user/UserTemplate.vue";
import AuctionRegisterView from "@/view/auction/AuctionRegisterView.vue";

const routes = [
    {
        path: '/',
        redirect: '/auction/bid',
        component: UserTemplate,
        children:[
            {path: 'auction/bid',
                component: LoginView},
            {path:'/auction/register', component: AuctionRegisterView},

        ]
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;