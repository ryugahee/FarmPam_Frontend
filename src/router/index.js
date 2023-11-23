import {createRouter, createWebHistory} from "vue-router";
import LoginView from "@/view/AuctionView.vue";
import UserTemplate from "@/components/user/UserTemplate.vue";

const routes = [
    {
        path: '/',
        redirect: '/auction/bid',
        component: UserTemplate,
        children:[
            {path: 'auction/bid',
                component: LoginView},

        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;