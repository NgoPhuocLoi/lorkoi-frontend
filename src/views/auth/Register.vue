<script setup>
import { ref } from "vue";
const check = ref(false);
const value = ref("");
</script>

<template>
  <div v-if="!check" class="px-[10px]">
    <div class="p-float-label mb-4">
      <InputText id="email" :type="'email'" v-model="value" class="w-full" />
      <label for="email">Email</label>
    </div>

    <Button @click="check = true" label="Next" class="w-full" size="small" />
  </div>

  <div v-else class="px-[10px]">
    <div class="flex justify-between">
      <div class="p-float-label w-[48%]">
        <InputText
          id="firstName"
          :type="'text'"
          v-model="value"
          class="w-full"
        />
        <label for="firstName">First name</label>
      </div>

      <div class="p-float-label w-[48%]">
        <InputText
          id="lastName"
          :type="'text'"
          v-model="value"
          class="w-full"
        />
        <label for="lastName">Last name </label>
      </div>
    </div>

    <div class="my-5">
      <input
        type="text"
        class="p-[12px] w-full outline-none rounded-md border border-[#ccc]"
        placeholder="Last name"
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

    <Button label="Sign up" size="small" class="w-full" />
  </div>

  <RouterLink
    class="text-blue-500 mt-3 text-sm text-center block font-semibold hover:opacity-80"
    to="/auth/login"
    >Already have an account ? Go back to sign in.</RouterLink
  >
</template>

<style scoped></style>
