<script setup>
import useToast from "@/hooks/useToast";
import { ProjectService } from "@/services";
import { socket } from "@/services/socket";
import { useProjectStore } from "@/stores";
import AvatarGroup from "primevue/avatargroup";
import ColorPicker from "primevue/colorpicker";
import Dialog from "primevue/dialog";
import { reactive, ref, watch } from "vue";
import { getUserById } from "../../utils";
import Avatar from "../common/Avatar.vue";
import ProjectMembersModal from "./ProjectMembersModal.vue";

const projectStore = useProjectStore();
const projectService = new ProjectService();
const { showSuccessToast } = useToast();

const loading = ref(false);
const fetchLoading = ref(false);
const showMembersModal = ref(false);
const modalInfo = reactive({
  header: "",
  labelBtn: "",
});
const newProject = reactive({
  name: "",
  color: "25e69c",
  members: [],
});
const props = defineProps(["visible", "updateProjectId"]);
const showModal = ref(props.visible);
const members = ref([]);

watch(props, () => {
  showModal.value = props.visible;
  if (props.updateProjectId) {
    async function getProject() {
      fetchLoading.value = true;
      const res = await projectService.getOne(props.updateProjectId);
      newProject.name = res.data.project.name;
      newProject.color = res.data.project.color;
      newProject.owner = res.data.project.owner;
      members.value = res.data.project.members;
      modalInfo.header = `📂Edit ${res.data.project.name}`;
      modalInfo.labelBtn = `Save changes`;
      fetchLoading.value = false;
    }
    getProject();
  } else {
    members.value = [];
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
    const res = await projectService.create({
      ...newProject,
      members: members.value,
    });
    projectStore.setProjects([...projectStore.projects, res.data.project]);
    showModal.value = false;
    showSuccessToast("Project created!");
    socket.emit("createProject", {
      project: res.data.project,
      oldAndNewMembers: res.data.project.members,
    });
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

const handleUpdateProject = async () => {
  loading.value = true;
  try {
    const oldMembers = projectStore.projects.find(
      (p) => p._id === props.updateProjectId
    ).members;
    let res = await projectService.update(props.updateProjectId, {
      ...newProject,
      members: members.value,
    });
    projectStore.setProjects(
      projectStore.projects.map((project) =>
        project._id === props.updateProjectId ? res.data.project : project
      )
    );

    const oldAndNewMembers = [...new Set([...oldMembers, ...members.value])];
    socket.emit("createProject", {
      project: res.data.project,
      oldAndNewMembers,
    });
    res = await projectService.getPinned();
    projectStore.setPinnedProjects(res.data.projects);
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
    :header="fetchLoading ? '' : modalInfo.header"
    :style="{ width: '680px' }"
    v-on:hide="onHideModal"
    :closable="!fetchLoading"
  >
    <div v-if="!fetchLoading">
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

      <div class="mt-4">
        <span class="text-[15px] font-semibold">Project Members</span>

        <AvatarGroup
          v-tooltip.left="'Add members'"
          class="mt-2 ml-2 cursor-pointer"
          @click="showMembersModal = true"
        >
          <Avatar
            :image="getUserById(newProject.owner)?.avatar"
            :label="getUserById(newProject.owner)?.firstName[0]"
            class="border p-[2px] border-gray-500"
          />
          <Avatar
            v-for="userId in members"
            :key="userId"
            :image="getUserById(userId)?.avatar"
            :label="getUserById(userId)?.firstName[0]"
            class="border p-[2px] border-gray-500"
          />
          <Avatar icon="pi pi-user-plus" />
        </AvatarGroup>
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
    </div>
    <div v-else class="flex items-center justify-center">
      <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
    </div>
  </Dialog>

  <ProjectMembersModal
    v-model:visible="showMembersModal"
    v-model:members="members"
    :owner="newProject.owner"
  />
</template>
