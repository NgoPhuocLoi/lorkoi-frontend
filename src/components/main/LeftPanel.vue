<script setup>
import { ProjectService, RoomService, UserService } from "@/services";
import { socket } from "@/services/socket.js";
import { useProjectStore, useUserStore, useCommonStore } from "@/stores";
import Dialog from "primevue/dialog";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import ChatList from "../chat/ContactList.vue";
import UserList from "../chat/UserList.vue";

const route = useRoute();
const projectStore = useProjectStore();
const userStore = useUserStore();
const commonStore = useCommonStore();
const projectService = new ProjectService();
const roomService = new RoomService();
const userService = new UserService();

let currentLink = ref(route.fullPath.split("/").at(-1));

const showStartNewRoomModal = ref(false);
const textSearch = ref("");

onMounted(async () => {
  try {
    const res = await projectService.getPinned();
    projectStore.setPinnedProjects(res.data.projects);

    socket.emit("addUser", userStore.user._id);
  } catch (error) {
    console.log(error);
  }
});

const changeLink = (link) => (currentLink.value = link);
</script>

<template>
  <div class="w-full h-screen bg-[#0D1B3E] flex flex-col">
    <div class="flex items-center">
      <RouterLink to="/" class="h-[46px] mr-1 my-4 flex items-center">
        <img src="/logo.png" alt="" class="w-full" />
      </RouterLink>
      <span
        :class="`pi pi-angle-double-left mr-3 text-gray-400 rounded-md
                 p-1 hover:bg-[rgba(255,255,255,.1)] ml-[-4px] cursor-pointer`"
        :style="{
          fontSize: '22px',
          display: commonStore.showSidebar ? 'inline-block' : 'none',
        }"
        @click="commonStore.showSidebar = false"
      ></span>
    </div>
    <!-- Component -->
    <div class="text-white">
      <!-- <RouterLink
        to="/workspace/actions"
        active-class="bg-[#2B74D9]"
        :class="`flex items-center px-[11px] py-[6px] mx-[6px] rounded-md cursor-pointer mb-[4px] transition duration-200 ${
          currentLink !== 'actions' ? ' hover:bg-[#ffffff1a]' : ''
        }`"
        @click="changeLink('actions')"
      >
        <div class="mr-2"><ion-icon name="home"></ion-icon></div>
        <span class="text-[14px] font-semibold">My Actions</span>
      </RouterLink> -->
      <RouterLink
        to="/workspace/projects"
        active-class="bg-[#2B74D9]"
        :class="`flex items-center px-[11px] py-[6px] mx-[6px] rounded-md cursor-pointer mb-[4px] transition duration-200 ${
          currentLink !== 'projects' ? ' hover:bg-[#ffffff1a]' : ''
        }`"
        @click="changeLink('projects')"
      >
        <div class="mr-2"><span class="pi pi-folder-open"></span></div>
        <span class="text-[14px] font-semibold">Projects</span>
      </RouterLink>

      <div class="max-h-[112px] overflow-auto mr-2">
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
    </div>

    <!-- Component -->
    <div class="text-white mt-auto min-h-[280px]">
      <ChatList />
    </div>

    <button
      @click="showStartNewRoomModal = true"
      class="mt-4 mb-3 ml-[50%] translate-x-[-50%] hover:opacity-90 py-2 text-white rounded-xl px-2 w-[90%] font-semibold text-[15px] bg-[#142858]"
    >
      New Message
    </button>
  </div>

  <Dialog
    v-model:visible="showStartNewRoomModal"
    modal
    header="Start messaging"
    :style="{ width: '50vw' }"
  >
    <div class="p-2">
      <div
        class="w-full border py-2 px-3 text-[14px] flex items-center rounded-md hover:border-gray-400"
      >
        <span class="pi pi-search"></span>
        <input
          type="text"
          class="outline-none flex-1 ml-3"
          placeholder="Search user"
          v-model.trim="textSearch"
        />
      </div>

      <div class="w-full p-2 border mt-4 overflow-auto h-[300px]">
        <span class="ml-2 text-[14px] font-bold text-gray-500">All users</span>
        <UserList :textSearch="textSearch" />
      </div>
    </div>
  </Dialog>
</template>

<style scoped></style>
