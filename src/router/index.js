import { AuthLayout, MainLayout, SettingLayout } from "@/layouts";
import { UserService } from "@/services";
import { useUserStore } from "@/stores";
import { Login, Register } from "@/views/auth";
import { Project, ProjectsList } from "@/views/projects";
import { ChangePassword, UserProfile } from "@/views/setting";
import { createRouter, createWebHistory } from "vue-router";
import { Actions } from "../components/main";
import store from "../stores";

const userStore = useUserStore(store);
const userService = new UserService();

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
          const user = await userService.getCurrentUser();
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
      redirect: "/workspace/projects",
      beforeEnter: async () => {
        try {
          const data = await userService.getCurrentUser();
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
    {
      path: "/setting/user",
      component: SettingLayout,
      beforeEnter: async () => {
        try {
          const data = await userService.getCurrentUser();
          userStore.setUser(data.user);
        } catch (error) {
          return "/auth/login";
        }
      },
      children: [
        {
          path: "profile",
          component: UserProfile,
        },
        {
          path: "change-password",
          component: ChangePassword,
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      beforeEnter: () => {
        return "/workspace/projects";
      },
    },
  ],
});

export default router;
