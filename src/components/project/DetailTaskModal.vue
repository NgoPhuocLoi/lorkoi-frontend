<script setup>
import Dialog from "primevue/dialog";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import TaskService from "@/services/task.service";
import ConfirmModal from "../common/ConfirmModal.vue";

let timer;
const props = defineProps(["visible", "chosenTask"]);
const showModal = ref(props.visible);
const emit = defineEmits(["update:visible", "deleted-task", "updated-task"]);
const inputValue = ref({
  title: "",
});
const task = ref(props.chosenTask);
const showDeleteConfirm = ref(false);

const route = useRoute();

const taskService = new TaskService(route.params.projectId);

watch(props, () => {
  showModal.value = props.visible;
  task.value = props.chosenTask;
});

const handleClose = () => {
  showModal.value = false;
  emit("update:visible", false);
};

const handleDeleteTask = async () => {
  try {
    await taskService.delete(task.value._id);
    handleClose();
    emit("deleted-task", { taskId: task.value._id });
  } catch (error) {
    console.log(error);
  }
};

const handleInput = (e) => {
  clearTimeout(timer);

  timer = setTimeout(async () => {
    await taskService.update(task.value._id, { title: e.target.innerText });
    emit("updated-task", { taskId: task.value._id, title: e.target.innerText });
  }, 600);
};
</script>

<template>
  <div class="card flex justify-content-center">
    <Dialog
      v-model:visible="showModal"
      modal
      header="Header"
      :style="{ width: '50vw' }"
      @after-hide="emit('update:visible', false)"
      :closable="false"
    >
      <template #header>
        <div class="flex justify-between flex-1 items-center mr-2 my-[-10px]">
          <h1 class="font-bold">My Project</h1>

          <div>
            <span
              class="pi pi-trash cursor-pointer hover:text-red p-[8px] rounded-full hover:bg-gray-200"
              v-tooltip.bottom="`Delete`"
              @click="showDeleteConfirm = true"
            ></span>

            <span
              class="pi pi-times cursor-pointer hover:text-red p-[8px] rounded-full hover:bg-gray-200"
              v-tooltip.bottom="`Close`"
              @click="handleClose"
            ></span>
          </div>
        </div>
      </template>
      <div>
        <div class="flex">
          <span class="pi pi-check-square mt-[6px]"></span>
          <div
            class="outline-none flex-1 ml-3 text-[16px] font-semibold max-w-[90%]"
            role="textbox"
            contenteditable
            @input="handleInput"
          >
            {{ task.title }}
          </div>
        </div>

        <div class="mt-7">
          <div class="flex items-center">
            <span class="pi pi-book mt-[4px] mr-2"></span>
            <h2 class="font-semibold">Description</h2>
          </div>
          <div
            class="outline-none ml-6 mt-2 w-[90%]"
            role="textbox"
            contenteditable
          >
            <span v-if="!task.description">Add</span>
            {{ task.description }}
          </div>
        </div>

        <div class="mt-7">
          <div class="flex items-center">
            <span class="pi pi-list mt-[4px] mr-2"></span>
            <h2 class="font-semibold">Subtasks</h2>
          </div>
          <div class="flex flex-col gap-4 mt-3">
            <div class="flex items-center">
              <span class="pi pi-check-circle mr-3 text-gray-400"></span>
              <input
                type="text"
                class="outline-none w-[90%] text-[14px]"
                value="Do domething"
              />
            </div>

            <div class="flex items-center">
              <span class="pi pi-check-circle mr-3 text-gray-400"></span>
              <input
                type="text"
                class="outline-none w-[90%] text-[14px]"
                value="Do domething"
              />
            </div>

            <div class="flex items-center">
              <span class="pi pi-check-circle mr-3 text-gray-400"></span>
              <input
                type="text"
                class="outline-none w-[90%] text-[14px]"
                value="Do domething"
              />
            </div>

            <div class="flex items-center">
              <span class="pi pi-check-circle mr-3 text-gray-400"></span>
              <input
                type="text"
                class="outline-none w-[90%] text-[14px]"
                value="Do domething"
              />
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  </div>

  <ConfirmModal
    v-model:status="showDeleteConfirm"
    :header="`Delete this task?`"
    danger="true"
    :handler="handleDeleteTask"
    label-btn="Delete"
    ><h1>
      If you delete this action, all subactions will also be deleted.
    </h1></ConfirmModal
  >
</template>

<style scoped></style>
