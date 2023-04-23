<script setup>
import { onMounted } from "vue";
import { useCommonStore } from "@/stores";

const commonStore = useCommonStore();

onMounted(() => {
  commonStore.setHeaderContent({ text: "My Actions", icon: "pi-home" });
});
</script>

<template>
  <h1>Actions</h1>
</template>

<style scoped></style>
