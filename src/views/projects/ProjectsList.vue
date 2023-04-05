<script setup>
import ProjectModel from "@/components/project/ProjectModal.vue";
import ProjectService from "@/services/project.service";
import AvatarGroup from "primevue/avatargroup";
import Column from "primevue/column";
import DataTable from "primevue/datatable";
import { computed, onMounted, reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
import ConfirmModal from "../../components/common/ConfirmModal.vue";
import { useProjectStore } from "../../stores/project";
import { useCommonStore } from "../../stores/common";

const projectService = new ProjectService();

const router = useRouter();
const projectStore = useProjectStore();
const commonStore = useCommonStore();

const chosenProjectId = ref();
const searchText = ref("");
const showModals = reactive({
  editProject: false,
  deleteProject: false,
});

const projects = computed(() => {
  if (!searchText) return projectStore.projects;
  return projectStore.projects.filter((pj) =>
    pj.name.toLowerCase().includes(searchText.value.toLowerCase())
  );
});

onMounted(async () => {
  commonStore.setHeaderContent({ text: "Project List", icon: "pi-folder" });
  try {
    const res = await projectService.getAll();
    projectStore.setProjects(res.data.projects);
  } catch (error) {
    console.log(error);
  }
});

const selected = ref();
watch(selected, () => {
  router.push("/workspace/projects/" + selected.value._id);
});

const handleDelete = async () => {
  try {
    await projectService.delete(chosenProjectId.value);
    projectStore.setProjects(
      projectStore.projects.filter(
        (project) => project._id !== chosenProjectId.value
      )
    );
    const res = await projectService.getPinned();
    projectStore.setPinnedProjects(res.data.projects);
  } catch (error) {
    console.log(error);
  }
};

const openModal = (e) => {
  console.log(123);
  showModals[e.target.dataset.type] = true;
  console.log(showModals);
  chosenProjectId.value = e.target.id;
};

const handlePinProject = async (projectId, value) => {
  try {
    await projectService.update(projectId, { pinned: value });
    projectStore.setProjects(
      projectStore.projects.map((project) =>
        project._id === projectId ? { ...project, pinned: value } : project
      )
    );
    const res = await projectService.getPinned();
    projectStore.setPinnedProjects(res.data.projects);
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div class="p-5">
    <button
      @click="openModal"
      icon="pi pi-plus"
      class="px-[10px] py-[5px] bg-[#4990E2] rounded-md text-white font-semibold text-[14px] flex items-center"
      data-type="editProject"
    >
      <span class="pi pi-plus mr-[6px] mt-[1px]" style="font-size: 10px"></span>
      New Project
    </button>
    <div class="p-input-icon-left my-5">
      <i class="pi pi-search" />
      <InputText type="text" placeholder="Search" v-model="searchText" />
    </div>

    <DataTable
      v-model:selection="selected"
      :value="projects"
      tableStyle="min-width: 50rem"
      class="p-datatable-sm"
      selectionMode="single"
      v-if="projects.length > 0"
    >
      <Column field="name" header="Project name">
        <template #body="slot">
          <div class="flex gap-4 items-center">
            <span
              @click.stop="handlePinProject(slot.data._id, !slot.data.pinned)"
              class="cursor-pointer hover:text-blue-500"
              :class="`pi pi-bookmark${slot.data.pinned ? '-fill' : ''} `"
              v-tooltip.right="
                `${
                  slot.data.pinned ? 'Unpin' : 'Pin'
                } the project to left panel`
              "
            ></span>
            <div
              class="w-[20px] rounded-full h-[20px] ml-4 mr-2 flex-shrink-0"
              :style="{ backgroundColor: '#' + slot.data.color }"
            ></div>
            <p>{{ slot.data.name }}</p>
          </div>
        </template>
      </Column>
      <Column field="members" header="Members">
        <template #body="slot">
          <div class="flex justify-between items-center">
            <div class="flex">
              <Avatar icon="pi pi-user" class="mr-2" size="small" />

              <AvatarGroup>
                <Avatar label="A" size="small" />
                <Avatar label="A" size="small" />
                <Avatar label="A" size="small" />
                <Avatar label="A" size="small" />
                <Avatar label="A" size="small" />
                <Avatar label="+2" size="small" />
              </AvatarGroup>
            </div>

            <div class="flex gap-2 mr-3">
              <span
                :id="slot.data._id"
                data-type="editProject"
                class="pi pi-file-edit cursor-pointer hover:text-blue-500"
                @click.stop="openModal"
                v-tooltip.top="'Edit Project'"
              ></span>

              <span
                :id="slot.data._id"
                data-type="deleteProject"
                class="pi pi-trash cursor-pointer hover:text-red-500"
                @click.stop="openModal"
                v-tooltip.top="'Delete Project'"
              ></span>
            </div>
          </div> </template
      ></Column>
    </DataTable>
  </div>

  <ProjectModel
    v-model:visible="showModals.editProject"
    :updateProjectId="chosenProjectId"
  />
  <ConfirmModal
    :handler="handleDelete"
    :danger="true"
    v-model:status="showModals.deleteProject"
    :label-btn="'Delete'"
    :header="'Delete Project'"
  >
    <h1>
      This project and all related actions will be deleted permanently.
    </h1></ConfirmModal
  >
</template>

<style scoped>
button.p-button.p-button-sm {
  padding: 4px 10px;
  display: block;
}

input.p-inputtext {
  padding: 6px 40px;
}
</style>

<style>
tr.p-selectable-row td:first-child {
  overflow: hidden;
}
</style>
