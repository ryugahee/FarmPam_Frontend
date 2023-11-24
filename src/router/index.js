import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/view/AuctionView.vue";
import UserTemplate from "@/components/user/UserTemplate.vue";
import Login from "@/accounts/LoginView.vue";
import EasyLogin from "@/view/accounts/EasyLoginView.vue";
import FindIdView from "@/view/accounts/FindIDView.vue";
import FindPwView from "@/view/accounts/FindPWView.vue";
import RegisterView from "@/view/accounts/RegisterView.vue";
import PayView from "@/view/pay/PayView.vue";
import SuccessView from "@/view/pay/SuccessView.vue";
import FailView from "@/view/pay/FailView.vue";

const routes = [
  {
    path: "/",
    redirect: "/auction/bid",
    component: UserTemplate,
    children: [{ path: "auction/bid", component: LoginView }],
  },
  {
    path: "/login",
    component: Login,
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

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
