import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/view/accounts/LoginView.vue";
import UserTemplate from "@/components/user/UserTemplate.vue";
import EasyLogin from "@/view/accounts/EasyLoginView.vue";
import FindIdView from "@/view/accounts/FindIDView.vue";
import FindPwView from "@/view/accounts/FindPWView.vue";
import RegisterView from "@/view/accounts/RegisterView.vue";
import PayView from "@/view/pay/PayView.vue";
import SuccessView from "@/view/pay/SuccessView.vue";
import ItemsView from "@/view/auction/ItemsView.vue";
import ProfileView from "@/view/user/ProfileView.vue";
import FailView from "@/view/pay/FailView.vue";
import HomeView from "@/view/user/HomeView.vue";
import ItemDetailView from "@/view/auction/ItemDetailView.vue";
import MainView from '@/view/main/MainView.vue';

const routes = [
    {
        path: "/",
        redirect: "/auction/bid",
        component: UserTemplate,
        children:
            [
                {
                    path: "/login",
                    component: LoginView,
                },
                {
                    path: "/easyLogin",
                    component: EasyLogin,
                },
                {
                    path: "/findIdView",
                    component: FindIdView,
                },
                {
                    path: "/findPwView",
                    component: FindPwView,
                },
                {
                    path: "/registerView",
                    component: RegisterView,
                },
                {
                    path: "/pay",
                    name: "pay",
                    component: PayView,
                },
                {
                    path: "/success",
                    name: "success",
                    component: SuccessView,
                },
                {
                    path: "/fail",
                    name: "fail",
                    component: FailView,
                },
                {
                    path: "/items",
                    name: "items",
                    component: ItemsView
                },
                {
                    path: "/profile",
                    name: "profile",
                    component: ProfileView
                },
                {
                    path: "/home",
                    name: "home",
                    component: HomeView
                },
                // TODO : 식별 번호 수정 사항
                {
                    path: "/items/detail",
                    name: "detail",
                    component: ItemDetailView
                }
                },
                {
                    path: "/main",
                    name: "main",
                    component: MainView,
                },
            ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;
