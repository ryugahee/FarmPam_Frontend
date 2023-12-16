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
import HomeView from "@/view/home/HomeView.vue";
import ItemDetailView from "@/view/auction/ItemDetailView.vue";
import AuctionRegisterView from "@/view/auction/AuctionRegisterView.vue";
import MyPageView from "@/view/mypage/MyPageView.vue";
import UserInfoView from "@/view/mypage/UserInfoView.vue";
import FailView from "@/view/pay/FailView.vue";
import ChatListView from "@/view/chat/ChatListView.vue";
import ChatDetailView from "@/view/chat/ChatDetailView.vue";
import ChargingView from "@/view/charging/ChargingView.vue";
import AuctionPurchaseHistoryView from "@/view/mypage/AuctionPurchaseHistoryView.vue";
import AuctionSaleHistoryView from "@/view/mypage/AuctionSaleHistoryView.vue";
import AuctionView from "@/view/auction/AuctionView.vue";
import Admin from "@/view/admin/AdminView.vue";
import Chart from "@/view/admin/ChartView.vue";

const routes = [
  {
    path: "/",
    redirect: "/login",
    component: UserTemplate,
    children: [
      {
        path: "/auctionTest",
        component: AuctionView,
        meta: { requiresAuth: true },
      },
      {
        path: "/login",
        component: LoginView,
        meta: { requiresAuth: false },
      },
      {
        path: "/easyLogin",
        component: EasyLogin,
        meta: { requiresAuth: false },
      },
      {
        path: "/findId",
        component: FindIdView,
        meta: { requiresAuth: false },
      },
      {
        path: "/findPw",
        component: FindPwView,
        meta: { requiresAuth: false },
      },
      {
        path: "/register",
        name: "Register",
        component: RegisterView,
        meta: { requiresAuth: false },
      },
      {
        path: "/items",
        name: "items",
        component: ItemsView,
        meta: { requiresAuth: false },
      },
      {
        path: "/profile",
        name: "profile",
        component: ProfileView,
        meta: { requiresAuth: true },
      },
      {
        path: "/home",
        name: "home",
        component: HomeView,
        meta: { requiresAuth: false },
      },
      // TODO : 식별 번호 수정 사항
      {
        path: "/auction/detail/:id",
        name: "detail",
        component: ItemDetailView,
        meta: { requiresAuth: true },
      },
      {
        path: "/auction/register",
        component: AuctionRegisterView,
        meta: { requiresAuth: true },
      },
      {
        path: "/user",
        name: "user",
        component: MyPageView,
        meta: { requiresAuth: true },
      },
      {
        path: "/user/info",
        component: UserInfoView,
        meta: { requiresAuth: true },
      },
      {
        path: "/user/history/purchase",
        component: AuctionPurchaseHistoryView,
        meta: { requiresAuth: true },
      },
      {
        path: "/user/history/sales",
        component: AuctionSaleHistoryView,
        meta: { requiresAuth: true },
      },
      {
        path: "/chats",
        name: "chats",
        component: ChatListView,
        meta: { requiresAuth: true },
      },
      {
        path: "/chats/:id",
        name: "chat",
        component: ChatDetailView,
        meta: { requiresAuth: true },

        props: true,
      },
      {
        path: "/charging",
        name: "charging",
        component: ChargingView,
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: "/pay",
    name: "pay",
    component: PayView,
    meta: { requiresAuth: true },
  },
  {
    path: "/success",
    name: "success",
    component: SuccessView,
    meta: { requiresAuth: true },
  },
  {
    path: "/fail",
    name: "fail",
    component: FailView,
    meta: { requiresAuth: true },
  },
  {
    path: "/admin",
    component: Admin,
    meta: { requireAdmin: true },
  },
  {
    path: "/chart",
    component: Chart,
    meta: { requireAdmin: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const userRole = localStorage.getItem("roles");

  console.log("유저 권한 : ", userRole);

  if (to.meta.requiresAuth) {
    if (userRole.includes("ROLE_USER")) {
      next();
    } else {
      window.alert("로그인을 해주세요.");
      next("/login");
    }
  }

  if (to.meta.requireAdmin) {
    if (userRole.includes("ROLE_ADMIN")) {
      next();
    } else {
      window.alert("접근 권한이 없습니다.");
      next("/login");
    }
  } else {
    //requiresAuth 메타 필드가 없는 경우에는 다음 라우트로 이동
    next();
  }
});

export default router;
