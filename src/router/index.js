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
import ItemDetailView from "@/view/auction/ItemDetailView.vue";
import AuctionRegisterView from "@/view/auction/AuctionRegisterView.vue";
import MyPageView from "@/view/mypage/MyPageView.vue";
import HomeView from "@/view/home/HomeView.vue";

const routes = [
    {
        path: "/",
        redirect: "/auction/bid",
        component: UserTemplate,
        children:
            [
                {
                    path: "/login",
                    component: LoginView
                },
                {
                    path: "/easyLogin",
                    component: EasyLogin
                },
                {
                    path: "/findId",
                    component: FindIdView
                },
                {
                    path: "/findPw",
                    component: FindPwView
                },
                {
                    path: "/register",
                    component: RegisterView
                },
                {
                    path: "/pay",
                    name: "pay",
                    component: PayView
                },
                {
                    path: "/success",
                    name: "success",
                    component: SuccessView
                },
                {
                    path: "/fail",
                    name: "fail",
                    component: FailView
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
                    path: "/detail",
                    name: "detail",
                    component: ItemDetailView
                },
                {
                    path: "/auction/register",
                    component: AuctionRegisterView
                },
                {
                    path: "/user",
                    name: "user",
                    component: MyPageView
                }
            ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;
