<script setup>
import ColorPicker from "primevue/colorpicker";
import Dialog from "primevue/dialog";
import { reactive, ref, watch } from "vue";
import ProjectService from "@/services/project.service";
import { useProjectStore } from "../../stores/project";

const projectStore = useProjectStore();
const projectService = new ProjectService();

const loading = ref(false);
const modalInfo = reactive({
  header: "",
  labelBtn: "",
});
const newProject = reactive({
  name: "",
  color: "25e69c",
});
const props = defineProps(["visible", "updateProjectId"]);
const showModal = ref(props.visible);

watch(props, () => {
  showModal.value = props.visible;
  if (props.updateProjectId) {
    async function getProject() {
      const res = await projectService.getOne(props.updateProjectId);
      newProject.name = res.data.project.name;
      newProject.color = res.data.project.color;
      modalInfo.header = `📂Edit ${res.data.project.name}`;
      modalInfo.labelBtn = `Save changes`;
    }
    getProject();
  } else {
    newProject.name = "";
    newProject.color = "25e69c";
    modalInfo.header = `📁 Create new Project`;
    modalInfo.labelBtn = `Create project`;
  }
});
const emit = defineEmits(["update:visible"]);

const handleCreateProject = async () => {
  loading.value = true;
  try {
    const res = await projectService.create(newProject);
    projectStore.setProjects([...projectStore.projects, res.data.project]);
    showModal.value = false;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

const handleUpdateProject = async () => {
  loading.value = true;
  try {
    const res = await projectService.update(props.updateProjectId, newProject);
    projectStore.setProjects(
      projectStore.projects.map((project) =>
        project._id === props.updateProjectId ? res.data.project : project
      )
    );
    showModal.value = false;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

const handleSubmit = () => {
  if (props.updateProjectId) {
    handleUpdateProject();
  } else {
    handleCreateProject();
  }
};

const onHideModal = () => {
  emit("update:visible", false);
};
</script>

<template>
  <Dialog
    v-model:visible="showModal"
    modal
    :header="modalInfo.header"
    :style="{ width: '680px' }"
    v-on:hide="onHideModal"
  >
    <div class="flex gap-8">
      <div class="flex flex-col w-[70%]">
        <label for="name" class="text-[15px] font-semibold"
          >Project name
        </label>
        <input
          id="name"
          type="text"
          placeholder="New Project"
          v-model="newProject.name"
          class="px-[16px] py-2 border rounded-md text-[14px] outline-none focus:border-blue-400 mt-2 mb-1"
        />
      </div>

      <div class="w-[30%] flex flex-col">
        <span class="text-[15px] font-semibold">Project color</span>
        <ColorPicker v-model="newProject.color" />
      </div>
    </div>

    <div
      class="flex justify-end mt-4 border border-l-0 border-r-0 border-b-0 pt-3"
    >
      <Button
        @click="handleSubmit"
        :label="modalInfo.labelBtn"
        size="small"
        :disabled="!newProject.name"
        :loading="loading"
      />
    </div>
  </Dialog>
</template>

<style scoped></style>
