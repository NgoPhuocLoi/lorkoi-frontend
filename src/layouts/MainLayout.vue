<script setup>
import { LeftPanel, CenterPanel } from "../components/main";

import Splitter from "primevue/splitter";
import SplitterPanel from "primevue/splitterpanel";
</script>

<template>
  <div class="flex">
    <div class="min-w-[16%]"><LeftPanel /></div>

    <div class="w-full overflow-auto flex flex-col h-screen">
      <CenterPanel />
    </div>
    <!-- <div class="w-[220px]"></div>
    <div class="flex-1"></div> -->
  </div>
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
