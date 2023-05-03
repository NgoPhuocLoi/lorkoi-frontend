<script setup>
import ProjectModel from "@/components/project/ProjectModal.vue";
import useToast from "@/hooks/useToast";
import { ProjectService } from "@/services";
import { socket, state } from "@/services/socket";
import { useCommonStore, useProjectStore, useUserStore } from "@/stores";
import { getUserById } from "@/utils";
import AvatarGroup from "primevue/avatargroup";
import Column from "primevue/column";
import DataTable from "primevue/datatable";
import Skeleton from "primevue/skeleton";
import { computed, onMounted, reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
import Avatar from "../../components/common/Avatar.vue";
import ConfirmModal from "../../components/common/ConfirmModal.vue";

const projectService = new ProjectService();

const router = useRouter();

const projectStore = useProjectStore();
const commonStore = useCommonStore();
const userStore = useUserStore();
const { showInfoToast, showErrorToast } = useToast();

const chosenProjectId = ref();
const searchText = ref("");
const loading = ref(false);
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
  loading.value = true;
  try {
    const res = await projectService.getAll();
    projectStore.setProjects(res.data.projects);
    loading.value = false;
  } catch (error) {
    console.log(error);
  }
});

watch(state, () => {
  if (state.incomingProject) {
    if (state.incomingProject.action === "add") {
      const p = projectStore.projects.find(
        (project) => project._id === state.incomingProject._id
      );

      if (p) {
        const isMember = state.incomingProject.members.find(
          (m) => m === userStore.user._id
        );
        if (isMember) {
          projectStore.setProjects(
            projectStore.projects.map((project) =>
              project._id === state.incomingProject._id
                ? state.incomingProject
                : project
            )
          );

          showInfoToast(
            `Project '${state.incomingProject.name}' has been updated by owner!`
          );
        } else {
          projectStore.setProjects(
            projectStore.projects.filter(
              (project) => project._id !== state.incomingProject._id
            )
          );
          showInfoToast(
            `You have been removed from project '${state.incomingProject.name}'`
          );
        }
      } else {
        projectStore.setProjects([
          ...projectStore.projects,
          state.incomingProject,
        ]);
        showInfoToast(
          `You have been invited to project '${state.incomingProject.name}'`
        );
      }

      // socket.disconnect();
      socket.emit("addUser", userStore.user._id);
      state.incomingProject = null;
    } else if (state.incomingProject.action === "delete") {
      projectStore.setProjects(
        projectStore.projects.filter(
          (project) => project._id !== state.incomingProject._id
        )
      );
      projectStore.setPinnedProjects(
        projectStore.pinnedProjects.filter(
          (project) => project._id !== state.incomingProject._id
        )
      );
      showInfoToast(
        `Project '${state.incomingProject.name}' has been deleted by owner!`
      );
      state.incomingProject = null;
    } else if (state.incomingProject.action === "pinned") {
      projectStore.setProjects(
        projectStore.projects.map((p) =>
          p._id === state.incomingProject._id
            ? { ...p, pinnedUsers: state.incomingProject.pinnedUsers }
            : p
        )
      );

      state.incomingProject = null;
    }
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
    socket.emit("handleProject", {
      project: { _id: chosenProjectId.value },
      action: "delete",
    });
    const res = await projectService.getPinned();
    projectStore.setPinnedProjects(res.data.projects);
  } catch (error) {
    console.log(error);
  }
};

const openModal = (e) => {
  if (e.target.dataset.owner && userStore.user._id !== e.target.dataset.owner)
    return;
  showModals[e.target.dataset.type] = true;
  console.log(showModals);
  chosenProjectId.value = e.target.id;
};

const handlePinProject = async (projectId, pinnedUsers) => {
  const currentUserId = pinnedUsers.find((u) => u === userStore.user._id);
  try {
    if (!currentUserId) {
      pinnedUsers = [...pinnedUsers, userStore.user._id];
    } else {
      pinnedUsers = pinnedUsers.filter((u) => u !== userStore.user._id);
    }
    await projectService.update(projectId, {
      pinnedUsers,
    });
    projectStore.setProjects(
      projectStore.projects.map((project) =>
        project._id === projectId ? { ...project, pinnedUsers } : project
      )
    );
    const res = await projectService.getPinned();
    projectStore.setPinnedProjects(res.data.projects);
    socket.emit("handleProject", {
      project: { _id: projectId, pinnedUsers },
      action: "pinned",
    });
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
          <div v-if="!loading" class="flex gap-4 items-center">
            <span
              @click.stop="
                handlePinProject(slot.data._id, slot.data.pinnedUsers)
              "
              class="cursor-pointer hover:text-blue-500"
              :class="`pi pi-bookmark${
                slot.data.pinnedUsers?.includes(userStore.user._id)
                  ? '-fill'
                  : ''
              } `"
              v-tooltip.right="
                `${
                  slot.data.pinnedUsers?.includes(userStore.user._id)
                    ? 'Unpin'
                    : 'Pin'
                } the project to left panel`
              "
            ></span>
            <div
              class="w-[20px] rounded-full h-[20px] ml-4 mr-2 flex-shrink-0"
              :style="{ backgroundColor: '#' + slot.data.color }"
            ></div>
            <p>{{ slot.data.name }}</p>
          </div>
          <Skeleton v-else></Skeleton>
        </template>
      </Column>
      <Column field="members" header="Members">
        <template #body="slot">
          <div v-if="!loading" class="flex justify-between items-center">
            <div class="flex">
              <Avatar
                :image="getUserById(slot.data.owner)?.avatar"
                :label="getUserById(slot.data.owner)?.firstName[0]"
                shape="square"
                class="border p-[2px] border-gray-500"
                size="small"
                v-tooltip.top="`Project owner`"
              />

              <AvatarGroup class="ml-2">
                <Avatar
                  v-for="memberId in slot.data.members"
                  :key="memberId"
                  :image="getUserById(memberId)?.avatar"
                  :label="getUserById(memberId)?.firstName[0]"
                  size="small"
                  v-tooltip.top="
                    `${getUserById(memberId)?.lastName} ${
                      getUserById(memberId)?.firstName
                    }`
                  "
                />
              </AvatarGroup>
            </div>

            <div class="flex gap-2 mr-3">
              <span
                :id="slot.data._id"
                data-type="editProject"
                :data-owner="slot.data.owner"
                :class="`pi pi-file-edit  hover:text-blue-500 ${
                  userStore.user._id === slot.data.owner
                    ? 'cursor-pointer'
                    : 'cursor-not-allowed'
                }  `"
                @click.stop="openModal"
                v-tooltip.top="'Edit'"
                :title="`${
                  userStore.user._id === slot.data.owner
                    ? 'Edit Project'
                    : 'Only project owner can edit this'
                } `"
              ></span>

              <span
                :id="slot.data._id"
                :data-owner="slot.data.owner"
                data-type="deleteProject"
                :class="`pi pi-trash  hover:text-red-500 ${
                  userStore.user._id === slot.data.owner
                    ? 'cursor-pointer'
                    : 'cursor-not-allowed'
                }  `"
                @click.stop="openModal"
                v-tooltip.top="'Delete'"
                :title="`${
                  userStore.user._id === slot.data.owner
                    ? 'Delete Project'
                    : 'Only project owner can delete this'
                } `"
              ></span>
            </div>
          </div>
          <Skeleton v-else></Skeleton> </template
      ></Column>
    </DataTable>

    <div class="text-center text-gray-700 font-semibold" v-else>
      You don't have any project yet.
      <span
        data-type="editProject"
        @click="openModal"
        class="text-blue-500 cursor-pointer"
        >Create now!</span
      >
    </div>
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
