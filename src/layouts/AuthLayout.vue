<script setup>
import { onBeforeRouteUpdate } from "vue-router";
import { useUserStore } from "../stores/user";

const userStore = useUserStore();
onBeforeRouteUpdate(() => {
  console.log(123);
});
</script>

<template>
  <div class="h-screen flex flex-col justify-center items-center">
    <h1 class="text-[46px] font-bold text-center mb-10">Welcome to My App</h1>
    <div class="max-w-[500px] w-full mx-auto">
      <RouterView />

      {{ userStore.user }}
    </div>
  </div>
</template>

<style>
.error-msg {
  font-size: 13px;
  color: red;
  display: block;
  margin-left: 3px;
  margin-top: 2px;
}
</style>
