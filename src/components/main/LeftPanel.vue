<script setup>
import { useRoute } from "vue-router";
import { computed, ref } from "vue";

const route = useRoute();
let currentLink = ref(route.fullPath.split("/").at(-1));

const changeLink = (link) => (currentLink.value = link);
</script>

<template>
  <div class="w-full h-screen bg-[#0D1B3E]">
    <div class="h-[46px] px-[22px] flex items-center">
      <img
        src="https://s3.amazonaws.com/hv-static-content/hive-logo-orange-white-v1.svg"
        alt=""
        class="w-[80px]"
      />
    </div>

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
    </div>
  </div>
</template>

<style scoped></style>
