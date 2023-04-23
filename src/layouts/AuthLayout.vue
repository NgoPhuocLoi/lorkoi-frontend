<script setup></script>

<template>
  <div
    class="h-screen flex flex-col bg-gradient justify-center items-center bg-[#F9FAFC]"
  >
    <div class="w-[200px] flex items-center fixed top-2 left-3">
      <img src="/public/logo.png" alt="" class="w-full" />
    </div>

    <div class="max-w-[500px] w-full mx-auto">
      <RouterView />
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

.bg-gradient {
  background-image: linear-gradient(to right, #0f0c29, #302b63, #24243e);
  /* background-image: linear-gradient(
    95.2deg,
    rgb(183, 233, 221) 26.8%,
    rgb(201, 224, 235) 64%
  ); */
}
</style>
