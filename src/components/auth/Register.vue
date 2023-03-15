<script setup>
import { ref } from "vue";

const check = ref(false);
</script>

<template>
  <div v-if="!check" class="px-[10px]">
    <div>
      <input
        type="text"
        class="p-[12px] w-full outline-none rounded-md border border-[#ccc]"
        placeholder="Email"
      />

      <!-- <span class="text-s  m text-red-400 ml-[2px]">This field is required</span> -->
    </div>

    <button
      @click="check = true"
      class="p-[10px] bg-blue-500 rounded-md w-full text-white mt-8"
    >
      Next
    </button>
  </div>

  <div v-else class="px-[10px]">
    <div class="flex justify-between">
      <div class="w-[48%]">
        <input
          type="text"
          class="p-[12px] w-full outline-none rounded-md border border-[#ccc]"
          placeholder="Email"
        />

        <!-- <span class="text-s  m text-red-400 ml-[2px]">This field is required</span> -->
      </div>

      <div class="w-[48%]">
        <input
          type="text"
          class="p-[12px] w-full outline-none rounded-md border border-[#ccc]"
          placeholder="Email"
        />

        <!-- <span class="text-s  m text-red-400 ml-[2px]">This field is required</span> -->
      </div>
    </div>

    <div class="my-5">
      <input
        type="text"
        class="p-[12px] w-full outline-none rounded-md border border-[#ccc]"
        placeholder="Password"
      />

      <!-- <span class="text-sm  text-red-400 ml-[2px]">This field is required</span> -->
    </div>

    <div class="my-5">
      <input
        type="text"
        class="p-[12px] w-full outline-none rounded-md border border-[#ccc]"
        placeholder="Password"
      />

      <!-- <span class="text-sm  text-red-400 ml-[2px]">This field is required</span> -->
    </div>

    <button class="p-[10px] bg-blue-500 rounded-md w-full text-white mt-2">
      Sign up
    </button>
  </div>

  <RouterLink
    class="text-blue-500 mt-3 text-sm text-center block font-semibold hover:opacity-80"
    to="/auth/login"
    >Already have an account ? Go back to sign in.</RouterLink
  >
</template>

<style scoped></style>
