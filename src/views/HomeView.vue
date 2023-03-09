<template>
  <h2 class="text-red-500">Home View</h2>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const count = ref(0);

    return { count };
  },
};
</script>
