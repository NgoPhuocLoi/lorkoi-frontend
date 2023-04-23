<script setup>
const props = defineProps(["label", "image", "size", "shape", "icon"]);
</script>

<template>
  <Avatar
    v-if="!props.image"
    :label="props.label"
    :shape="props.shape || 'circle'"
    :size="props.size || 'small'"
    :icon="props.icon"
  />
  <Avatar
    v-else
    :image="props.image"
    :shape="props.shape || 'circle'"
    :size="props.size || 'small'"
    :icon="props.icon"
  />
</template>

<style scoped>
.p-avatar-group .p-avatar {
  border: 1px solid #888;
  background: #ddd;
}
</style>
