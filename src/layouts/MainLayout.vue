<script setup>
import { CenterPanel, LeftPanel } from "../components/main";

import ChatPopper from "../components/chat/ChatPopper.vue";
import { ref } from "vue";
</script>

<template>
  <div class="flex">
    <div class="w-[20%] overflow-hidden">
      <LeftPanel />
    </div>

    <div class="w-full overflow-auto flex flex-col h-screen">
      <CenterPanel />
    </div>
    <!-- <div class="w-[220px]"></div>
    <div class="flex-1"></div> -->
  </div>

  <ChatPopper />
</template>

<style scoped>
.p-splitter {
  border: none;
  width: 100vw;
}

.p-splitter-gutter-handle {
  display: none;
}
</style>
