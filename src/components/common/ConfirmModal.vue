<script setup>
import { ref, watch } from "vue";
import Dialog from "primevue/dialog";

const props = defineProps([
  "status",
  "header",
  "width",
  "danger",
  "handler",
  "labelBtn",
  "disabledBtn",
  "hideCancelBtn",
]);
const emit = defineEmits(["update:status"]);
const visible = ref(props.status);
const loading = ref(false);
watch(props, () => {
  visible.value = ref(props.status);
});

const close = () => {
  visible.value = false;
  emit("update:status", false);
};

const onHandler = async () => {
  loading.value = true;
  try {
    if (props.handler) await props.handler();
    close();
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <Dialog
    v-model:visible="visible.value"
    modal
    :header="props.header || 'Header'"
    :style="{ width: `${props.width || 450}px` }"
    v-on:after-hide="emit('update:status', false)"
    class="w-[300px]"
    :closable="false"
  >
    <slot />
    <div class="flex gap-3 justify-end mt-4">
      <button
        v-if="!props.hideCancelBtn"
        :disabled="loading"
        @click="close"
        class="py-[6px] px-3 hover:shadow-lg rounded-md border disabled:opacity-60 disabled:cursor-default"
      >
        Cancel
      </button>
      <button
        :disabled="loading || disabledBtn"
        @click="onHandler"
        :class="`py-[6px] px-3 ${
          props.danger ? 'bg-red-500' : 'bg-blue-500'
        } text-white rounded-md border flex items-center disabled:opacity-60 disabled:cursor-default`"
      >
        <span
          v-if="loading"
          class="pi pi-spin pi-spinner mr-2"
          style="font-size: 12px"
        ></span>
        {{ props.labelBtn }}
      </button>
    </div>
  </Dialog>
</template>

<style scoped></style>
