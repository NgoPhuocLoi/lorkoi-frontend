<script setup>
import ProjectModel from "@/components/project/ProjectModal.vue";
import ProjectService from "@/services/project.service";
import AvatarGroup from "primevue/avatargroup";
import Column from "primevue/column";
import ConfirmDialog from "primevue/confirmdialog";
import DataTable from "primevue/datatable";
import { useConfirm } from "primevue/useconfirm";
import { onMounted, ref, watch, computed } from "vue";
import { useRouter } from "vue-router";
import { useProjectStore } from "../../stores/project";

const projectService = new ProjectService();

const router = useRouter();
const projectStore = useProjectStore();
const confirm = useConfirm();

const visible = ref(false);
const updateProjectId = ref();
const searchText = ref("");

const projects = computed(() => {
  if (!searchText) return projectStore.projects;
  return projectStore.projects.filter((pj) =>
    pj.name.toLowerCase().includes(searchText.value.toLowerCase())
  );
});

onMounted(async () => {
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

const handleDelete = (e) => {
  confirm.require({
    message: "Do you want to delete this project?",
    header: "Delete Confirmation",
    icon: "pi pi-info-circle",
    acceptClass: "p-button-danger",
    accept: async () => {
      const projectId = e.target.id;
      await projectService.delete(projectId);
      projectStore.setProjects(
        projectStore.projects.filter((project) => project._id !== projectId)
      );
    },
  });
};

const openModal = (projectId) => {
  updateProjectId.value = projectId;
  visible.value = true;
};

const handlePinProject = async (projectId, value) => {
  try {
    const res = await projectService.update(projectId, { pinned: value });
    projectStore.setProjects(
      projectStore.projects.map((project) =>
        project._id === projectId ? res.data.project : project
      )
    );
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div class="p-5">
    <Button
      @click="openModal()"
      label="New Project"
      icon="pi pi-plus"
      size="small"
    />
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
      v-if="projectStore.projects.length > 0"
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
              class="w-[20px] rounded-full h-[20px] ml-4 mr-2"
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
                class="pi pi-file-edit cursor-pointer hover:text-blue-500"
                @click.stop="(e) => openModal(e.target.id)"
                v-tooltip.top="'Edit Project'"
              ></span>

              <span
                :id="slot.data._id"
                class="pi pi-trash cursor-pointer hover:text-red-500"
                @click.stop="handleDelete"
                v-tooltip.top="'Delete Project'"
              ></span>
            </div>
          </div> </template
      ></Column>
    </DataTable>
  </div>

  <ProjectModel v-model:visible="visible" :updateProjectId="updateProjectId" />
  <ConfirmDialog></ConfirmDialog>
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
