<script setup>
import { SubTaskService, TaskService } from "@/services";
import Dialog from "primevue/dialog";
import { ref, watch, computed } from "vue";
import { useRoute } from "vue-router";
import ConfirmModal from "../common/ConfirmModal.vue";
import { socket, state } from "@/services/socket";
import { useProjectStore } from "@/stores";

let timer;
const props = defineProps(["visible", "chosenTask"]);
const showModal = ref(props.visible);
const emit = defineEmits(["update:visible", "deleted-task", "updated-task"]);
const subTaskInput = ref("");
const newSubTaskTitle = ref("");
const task = ref(props.chosenTask);
const showDeleteConfirm = ref(false);
const subTaskToUpdate = ref(null);

const route = useRoute();
const projectStore = useProjectStore();
const taskService = new TaskService(route.params.projectId);
const subTaskService = new SubTaskService();

const projectName = ref(
  projectStore.projects.find((p) => p._id === route.params.projectId).name
);

watch(props, () => {
  showModal.value = props.visible;
  task.value = props.chosenTask;
});

watch(state, () => {
  if (state.incomingSubTask) {
    const actions = {
      add: () => {
        task.value?.subTasks.push(state.incomingSubTask);
      },
      update: () => {
        if (task.value)
          task.value.subTasks = task.value?.subTasks.map((st) =>
            st._id === state.incomingSubTask._id ? state.incomingSubTask : st
          );
      },
      delete: () => {
        if (task.value)
          task.value.subTasks = task.value?.subTasks.filter(
            (st) => st._id !== state.incomingSubTask._id
          );
      },
    };

    actions[state.incomingSubTask.action]();
    state.incomingSubTask = null;
  }
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
    await taskService.update(task.value._id, {
      [e.target.id]: e.target.innerText,
    });
    emit("updated-task", {
      taskId: task.value._id,
      [e.target.id]: e.target.innerText,
    });
  }, 600);
};

const handleAddSubTask = async () => {
  if (!subTaskInput.value.trim()) return;
  try {
    const res = await subTaskService.create({
      task: task.value._id,
      title: subTaskInput.value,
    });
    task.value.subTasks.push(res.data.subTask);
    socket.emit("handleSubTask", {
      subTask: { ...res.data.subTask, project: route.params.projectId },
      action: "add",
    });
    emit("updated-task", { subTasks: task.value.subTasks });
    subTaskInput.value = "";
  } catch (error) {
    console.log(error);
  }
};

const handleDeleteSubTask = async (subTaskId) => {
  try {
    await subTaskService.delete(subTaskId);
    task.value.subTasks = task.value.subTasks.filter(
      (st) => st._id !== subTaskId
    );
    socket.emit("handleSubTask", {
      subTask: { _id: subTaskId, project: route.params.projectId },
      action: "delete",
    });
    emit("updated-task", { subTasks: task.value.subTasks });
  } catch (error) {
    console.log(error);
  }
};

const handleUpdateSubTask = async (subTaskId, newData) => {
  try {
    const res = await subTaskService.update(subTaskId, newData);
    task.value.subTasks = task.value.subTasks.map((st) =>
      st._id === subTaskId ? res.data.subTask : st
    );
    socket.emit("handleSubTask", {
      subTask: { ...res.data.subTask, project: route.params.projectId },
      action: "update",
    });
    emit("updated-task", { subTasks: task.value.subTasks });
    subTaskToUpdate.value = null;
  } catch (error) {
    console.log(error);
  }
};

const handleActiveUpdate = (subtask) => {
  subTaskToUpdate.value = subtask._id;
  newSubTaskTitle.value = subtask.title;
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
          <h1 class="font-bold">{{ projectName }}</h1>

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
            id="title"
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
            class="outline-none ml-6 mt-2 w-[90%] description text-[14px]"
            role="textbox"
            contenteditable
            data-placeholder="Add description"
            id="description"
            @input="handleInput"
          >
            {{ task.description }}
          </div>
        </div>

        <div class="mt-7">
          <div class="flex items-center">
            <span class="pi pi-list mt-[4px] mr-2"></span>
            <h2 class="font-semibold">Subtasks</h2>
          </div>
          <div class="flex flex-col mt-3">
            <div v-for="subTask in task.subTasks">
              <div
                :key="subTask._id"
                v-if="subTask._id !== subTaskToUpdate"
                class="flex items-center hover:bg-gray-100 p-2"
              >
                <span
                  :class="`pi pi-check-circle mr-3 ${
                    subTask.completed ? 'text-green-500' : 'text-gray-400'
                  } cursor-pointer`"
                  v-tooltip.top="'Completed'"
                  @click="
                    handleUpdateSubTask(subTask._id, {
                      completed: !subTask.completed,
                    })
                  "
                ></span>
                <input
                  type="text"
                  :class="`outline-none w-[90%] text-[14px] disabled:bg-transparent ${
                    subTask.completed ? 'line-through' : ''
                  }`"
                  :value="subTask.title"
                  disabled
                />

                <div class="flex gap-2">
                  <span
                    class="pi pi-pencil text-gray-400 hover:text-blue-700 cursor-pointer"
                    style="font-size: 13px"
                    v-tooltip.top="'Edit'"
                    @click="handleActiveUpdate(subTask)"
                  ></span>
                  <span
                    class="pi pi-trash text-gray-400 hover:text-red-500 cursor-pointer"
                    style="font-size: 13px"
                    v-tooltip.top="'Delete'"
                    @click="handleDeleteSubTask(subTask._id)"
                  ></span>
                </div>
              </div>

              <div v-else class="hover:bg-gray-100 p-2">
                <input
                  type="text"
                  :class="` pl-1 py-1 outline-none w-[90%] text-[14px] disabled:bg-transparent border ml-7 mr-2`"
                  v-model="newSubTaskTitle"
                />

                <div class="flex gap-2 ml-7 text-[14px] mt-2">
                  <button
                    class="py-1 px-2 rounded-sm text-white border bg-blue-500 hover:shadow-md disabled:bg-blue-200 disabled:hover:shadow-none"
                    @click="
                      handleUpdateSubTask(subTask._id, {
                        title: newSubTaskTitle,
                      })
                    "
                    :disabled="!newSubTaskTitle.trim()"
                  >
                    Save
                  </button>

                  <button
                    class="py-1 px-2 rounded-sm border border bg-gray-100 hover:shadow-md"
                    @click="subTaskToUpdate = null"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>

            <div class="flex items-center hover:bg-gray-100 p-2">
              <input
                type="text"
                :class="`outline-none w-[90%] text-[14px] ml-7 bg-transparent
                `"
                placeholder="Add new subtask"
                v-model="subTaskInput"
                @keydown.enter="handleAddSubTask"
                @blur="handleAddSubTask"
              />
            </div>
          </div>

          <!-- <input
            type="text"
            class="border outline-none text-[14px] ml-7 p-2"
            placeholder="Add new subtask"
          /> -->
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

<style scoped>
.description:empty::before {
  content: attr(data-placeholder);
  color: #888;
}
</style>
