<script setup>
import LeftPanel from "@/components/setting/LeftPanel.vue";
</script>

<template>
  <div class="flex h-screen">
    <div class="w-[20%]"><LeftPanel /></div>

    <div class="w-full">
      <div class="p-[64px] pb-0">
        <RouterView />
      </div>
    </div>
  </div>
</template>
