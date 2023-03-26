import { createRouter, createWebHistory } from "vue-router";
import { AuthLayout, MainLayout } from "@/layouts";
import { Actions } from "../components/main";
import { Login, Register } from "@/views/auth";
import { ProjectsList, Project } from "@/views/projects";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/workspace/actions",
    },
    {
      path: "/auth",
      component: AuthLayout,
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
