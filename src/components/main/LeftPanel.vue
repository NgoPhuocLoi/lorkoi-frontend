<script setup>
import ProjectService from "@/services/project.service";
import RoomService from "@/services/room.service";
import { socket } from "@/services/socket.js";
import UserService from "@/services/user.service";
import { useProjectStore } from "@/stores/project";
import { useUserStore } from "@/stores/user";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import ChatList from "../chat/ChatList.vue";

const route = useRoute();
const projectStore = useProjectStore();
const userStore = useUserStore();
const projectService = new ProjectService();
const roomService = new RoomService();
const userService = new UserService();

let currentLink = ref(route.fullPath.split("/").at(-1));

const users = ref([]);

onMounted(async () => {
  try {
    const res = await projectService.getPinned();
    projectStore.setPinnedProjects(res.data.projects);

    socket.emit("addUser", userStore.user._id);
  } catch (error) {
    console.log(error);
  }
});

onMounted(async () => {
  try {
    const res = await userService.getAllUsers();
    users.value = res.data.users;
  } catch (error) {
    console.log(error);
  }
});
const changeLink = (link) => (currentLink.value = link);
</script>

<template>
  <div class="w-full h-screen bg-[#0D1B3E]">
    <!-- <div class="h-[46px] px-[22px] flex items-center">
      <img
        src="https://s3.amazonaws.com/hv-static-content/hive-logo-orange-white-v1.svg"
        alt=""
        class="w-[80px]"
      />
    </div> -->
    <!-- Component -->
    <div class="text-white">
      <RouterLink
        to="/workspace/actions"
        active-class="bg-[#2B74D9]"
        :class="`flex items-center px-[11px] py-[6px] mx-[6px] rounded-md cursor-pointer mb-[4px] transition duration-200 ${
          currentLink !== 'actions' ? ' hover:bg-[#ffffff1a]' : ''
        }`"
        @click="changeLink('actions')"
      >
        <div class="mr-2"><ion-icon name="home"></ion-icon></div>
        <span class="text-[14px] font-semibold">My Actions</span>
      </RouterLink>
      <RouterLink
        to="/workspace/projects"
        active-class="bg-[#2B74D9]"
        :class="`flex items-center px-[11px] py-[6px] mx-[6px] rounded-md cursor-pointer mb-[4px] transition duration-200 ${
          currentLink !== 'projects' ? ' hover:bg-[#ffffff1a]' : ''
        }`"
        @click="changeLink('projects')"
      >
        <div class="mr-2"><ion-icon name="folder"></ion-icon></div>
        <span class="text-[14px] font-semibold">Projects</span>
      </RouterLink>

      <RouterLink
        v-if="projectStore.pinnedProjects.length > 0"
        v-for="project in projectStore.pinnedProjects"
        :key="project._id"
        :to="`/workspace/projects/${project._id}`"
        active-class="bg-[#2B74D9]"
        :class="`flex items-center px-[11px] py-[6px] mx-[6px] rounded-md cursor-pointer mb-[4px] transition duration-200 ${
          currentLink !== 'projects' ? ' hover:bg-[#ffffff1a]' : ''
        }`"
        @click="changeLink('projects')"
      >
        <div class="mr-2">
          <div
            :style="{ backgroundColor: '#' + project.color }"
            class="w-[16px] h-[16px] rounded-full"
          ></div>
        </div>
        <span
          class="text-[14px] font-semibold whitespace-nowrap overflow-hidden text-ellipsis"
          >{{ project.name }}</span
        >
      </RouterLink>

      <span v-else class="text-[14px] text-gray-400 font-semibold ml-3"
        >Nothing pinned yet.</span
      >
    </div>

    <!-- Component -->
    <div class="text-white">
      <ChatList :users="users.filter((u) => u._id !== userStore.user._id)" />
    </div>
  </div>
</template>

<style scoped></style>
