<script setup></script>

<template>
  <div
    class="w-full h-full bg-gray-100 flex flex-col items-center justify-start"
  >
    <RouterLink
      to="/workspace/projects"
      class="px-3 py-1 text-[14px] rounded-2xl mt-4 hover:shadow-lg border shadow bg-blue-100 text-blue-700 font-semibold"
    >
      ⬅️ Back to Projects
    </RouterLink>

    <div class="w-full mt-5">
      <span class="text-left text-[14px] px-4 font-semibold text-gray-700"
        >Personal Setting</span
      >

      <div class="py-2 px-3 cursor-pointer bg-gray-200">
        <span
          class="pi pi-user text-gray-400 mx-2"
          style="font-size: 14px"
        ></span>
        <span class="text-[14px] text-gray-700">My Profile</span>
      </div>

      <!-- <div class="py-2 px-3 cursor-pointer hover:bg-gray-200">
        <span
          class="pi pi-lock text-gray-400 mx-2"
          style="font-size: 14px"
        ></span>
        <span class="text-[14px] text-gray-700">Change Password</span>
      </div> -->
    </div>
  </div>
</template>

<style scoped>
.active-link {
}
</style>
