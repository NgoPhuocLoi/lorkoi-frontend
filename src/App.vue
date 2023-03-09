<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <h1>Hello Vue</h1>
  <RouterLink to="/setting">Setting</RouterLink>
  <RouterLink to="/">Home</RouterLink>
  <RouterView />
</template>
