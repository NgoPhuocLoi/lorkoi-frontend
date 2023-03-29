import { createRouter, createWebHistory } from "vue-router";
import { AuthLayout, MainLayout } from "@/layouts";
import { Actions } from "../components/main";
import { Login, Register } from "@/views/auth";
import { ProjectsList, Project } from "@/views/projects";
import userService from "../services/user.service";
import { useUserStore } from "../stores/user";
import store from "../stores";

const userStore = useUserStore(store);
const UserService = new userService({ needAuth: true });

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/workspace/projects",
    },
    {
      path: "/auth",
      component: AuthLayout,
      beforeEnter: async () => {
        try {
          const user = await UserService.getCurrentUser();
          if (user) return "/";
        } catch (error) {
          console.log(error);
        }
      },
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
    {
      path: "/workspace",
      component: MainLayout,
      redirect: "/workspace/actions",
      beforeEnter: async () => {
        try {
          const data = await UserService.getCurrentUser();
          userStore.setUser(data.user);
        } catch (error) {
          return "/auth/login";
        }
      },
      children: [
        {
          path: "actions",
          component: Actions,
        },
        {
          path: "projects",
          component: ProjectsList,
        },
        {
          path: "projects/:projectId",
          component: Project,
        },
      ],
    },
  ],
});

export default router;
