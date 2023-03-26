<script setup>
import { ref } from "vue";
const email = ref("");
const password = ref("");
</script>

<template>
  <div class="px-[10px]">
    <div class="p-float-label mb-7">
      <InputText id="email" :type="'email'" v-model="email" class="w-full" />
      <label for="email">Email</label>
    </div>

    <div class="p-float-label mb-4">
      <InputText
        id="password"
        type="password"
        v-model="password"
        class="w-full"
      />
      <label for="password">Password</label>
    </div>

    <Button label="Sign in" class="w-full" size="small" />
  </div>

  <RouterLink
    class="text-blue-500 mt-3 text-sm text-center block font-semibold hover:opacity-80"
    to="/auth/register"
    >Don't have an account? Sign up now!!</RouterLink
  >
</template>

<style scoped></style>
