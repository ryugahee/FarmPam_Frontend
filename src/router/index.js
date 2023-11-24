import {createRouter, createWebHistory} from "vue-router";

import UserTemplate from '@/components/user/UserTemplate.vue'
import ItemsView from "@/view/auction/ItemsView.vue";
import ProfileView from "@/view/user/ProfileView.vue";

const routes = [
    {
        path: '/',
        redirect:'/login',
        component: UserTemplate,
        children: [
            {
                path: '/items',
                component: ItemsView
            },
            {
                path: '/profile',
                component: ProfileView
            }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;