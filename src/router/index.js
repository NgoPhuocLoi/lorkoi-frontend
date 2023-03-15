import { createRouter, createWebHistory } from "vue-router";
import AuthView from "../views/AuthView.vue";
import { Login, Register } from "@/components/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/auth",
      component: AuthView,
      children: [
        {
          path: "login",
          component: Login,
        },
        {
          path: "register",
          component: Register,
        },
      ],
    },
  ],
});

export default router;
