<script setup>
const props = defineProps(["label", "image", "size", "shape"]);
</script>

<template>
  <Avatar
    v-if="!props.image"
    :label="props.label"
    :shape="props.shape || 'circle'"
    :size="props.size || 'small'"
  />
  <Avatar
    v-else
    :image="props.image"
    :shape="props.shape || 'circle'"
    :size="props.size || 'small'"
  />
</template>

<style scoped></style>
