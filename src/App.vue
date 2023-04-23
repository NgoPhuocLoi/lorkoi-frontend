<script setup>
import { RouterView } from "vue-router";
import Toast from "primevue/toast";
</script>

<template>
  <RouterView />
  <Toast position="bottom-right" />
</template>

<style>
::-webkit-scrollbar {
  width: 5px;
  height: 8px;
}
/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #999;
}

input.p-colorpicker-preview {
  width: 90px;
  height: 36px;
  margin-top: 8px;
}

.p-tooltip div.p-tooltip-text {
  font-size: 12px;
  padding: 10px;
}

.p-dialog-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: 20px;
}

.p-toast-message-content {
  padding: 10px;
}
</style>
