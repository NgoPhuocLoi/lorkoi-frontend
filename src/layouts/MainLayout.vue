<script setup>
import { CenterPanel, LeftPanel } from "../components/main";
import ChatPopper from "../components/chat/ChatPopper.vue";
import { ref, watch } from "vue";
import { useCommonStore } from "@/stores";

const commonStore = useCommonStore();
</script>

<template>
  <div class="flex">
    <div
      :class="`w-[210px] transition duration-200 overflow-hidden ${
        commonStore.showSidebar ? '' : 'hidden'
      }`"
    >
      <LeftPanel />
    </div>

    <div
      class="w-full transition duration-200 flex-1 overflow-auto flex flex-col h-screen"
    >
      <CenterPanel />
    </div>
  </div>

  <ChatPopper />
</template>
