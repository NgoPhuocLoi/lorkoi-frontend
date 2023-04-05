<script setup>
import ProjectService from "@/services/project.service";
import SectionService from "@/services/section.service";
import TaskService from "@/services/task.service";
import AvatarGroup from "primevue/avatargroup";
import OverlayPanel from "primevue/overlaypanel";
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import Draggable from "vuedraggable";
import ConfirmModal from "../../components/common/ConfirmModal.vue";
import DetailTaskModal from "../../components/project/DetailTaskModal.vue";
import { useCommonStore } from "../../stores/common";

const route = useRoute();
const commonStore = useCommonStore();
const projectService = new ProjectService();
let sectionService = new SectionService(route.params.projectId);
let taskService = new TaskService(route.params.projectId);

const project = ref();
const newSection = ref("");
const newTasks = ref({});
const sections = ref([]);
const showEditMenu = ref();

const showModals = ref({
  confirmDelete: false,
  editSection: false,
  detailTask: false,
});
const chosenSectionId = ref();
const chosenSectionTitle = ref("");
const chosenTask = ref();

watch(chosenSectionId, () => {
  chosenSectionTitle.value = sections.value.find(
    (sc) => sc._id === chosenSectionId.value
  )?.title;
});

watch(route, async () => {
  if (route.params.projectId) {
    sectionService = new SectionService(route.params.projectId);
    taskService = new TaskService(route.params.projectId);
    try {
      const res = await projectService.getOne(route.params.projectId);
      project.value = res.data.project;
      sections.value = res.data.project.sections;
      commonStore.setHeaderContent({ text: res.data.project.name, icon: null });
    } catch (error) {
      console.log(error);
    }
  }
});
onMounted(async () => {
  try {
    const res = await projectService.getOne(route.params.projectId);
    project.value = res.data.project;
    sections.value = res.data.project.sections;
    commonStore.setHeaderContent({ text: res.data.project.name, icon: null });
  } catch (error) {
    console.log(error);
  }
});

const checkMove = async (e) => {
  const sourceSectionId = e.from.id;
  const desSectionId = e.to.id;
  const sourceList = sections.value.find(
    (section) => section._id === sourceSectionId
  ).tasks;
  const desList = sections.value.find(
    (section) => section._id === desSectionId
  ).tasks;

  try {
    await taskService.updatePosition({
      sourceList,
      desList,
      sourceSectionId,
      desSectionId,
    });
  } catch (error) {
    console.log(error);
  }
};

const toggleEditMenu = (e) => {
  chosenSectionId.value = e.target.id;
  showEditMenu.value.toggle(e);
};

const handleAddSection = async () => {
  try {
    const res = await sectionService.create({ title: newSection.value });
    sections.value.push(res.data.section);
    newSection.value = "";
  } catch (error) {
    console.log(error);
  }
};

const handleDeleteSection = async () => {
  await sectionService.delete(chosenSectionId.value);
  sections.value = sections.value.filter(
    (section) => section._id !== chosenSectionId.value
  );
};

const handleEditSection = async () => {
  try {
    await sectionService.update(chosenSectionId.value, {
      title: chosenSectionTitle.value,
    });
    sections.value = sections.value.map((section) =>
      section._id === chosenSectionId.value
        ? { ...section, title: chosenSectionTitle.value }
        : section
    );
  } catch (error) {
    console.log(error);
  }
};

const handleAddTask = async (index) => {
  if (!newTasks.value[index] || newTasks.value[index].trim() === "") return;
  try {
    const res = await taskService.create({
      sectionId: sections.value[index]._id,
      title: newTasks.value[index],
    });
    sections.value[index].tasks.unshift(res.data.task);
    newTasks.value[index] = "";
  } catch (error) {
    console.log(error);
  }
};

const onDeletedTask = ({ taskId }) => {
  const section = sections.value.find((s) => s._id === chosenSectionId.value);
  section.tasks = section.tasks.filter((t) => t._id !== taskId);
};

const onUpdatedTask = ({ taskId, ...rest }) => {
  const section = sections.value.find((s) => s._id === chosenSectionId.value);
  section.tasks = section.tasks.map((t) =>
    t._id === taskId ? { ...t, ...rest } : t
  );
};
</script>

<template>
  <div class="h-[40px] pl-[20px] shadow flex items-center justify-between">
    <div class="flex items-center">
      <span class="pi pi-bookmark"></span>
      <AvatarGroup class="ml-4">
        <Avatar label="A" size="small" shape="circle" />
        <Avatar label="B" size="small" shape="circle" />
        <Avatar label="C" size="small" shape="circle" />
        <Avatar label="D" size="small" shape="circle" />
        <Avatar label="E" size="small" shape="circle" />
        <Avatar label="+2" shape="circle" size="small" />
      </AvatarGroup>
    </div>

    <div>
      <Button
        icon="pi pi-bookmark"
        severity="secondary"
        outlined
        aria-label="Bookmark"
        size="small"
      />
    </div>
  </div>

  <div class="flex-1 overflow-auto">
    <div class="p-5 pb-0 flex gap-7 overflow-x-auto bg-[#f8f8f8] h-full">
      <div
        v-for="(section, index) in sections"
        :key="section._id"
        class="w-[255px] flex-shrink-0 max-h-full flex flex-col"
      >
        <div class="flex items-center justify-between">
          <h4 class="font-semibold">{{ section.title }}</h4>
          <span
            :id="section._id"
            @click="toggleEditMenu"
            class="pi pi-ellipsis-v block p-2 cursor-pointer"
          ></span>
        </div>

        <div class="pr-2 mt-3">
          <input
            type="text"
            class="py-2 pl-2 pr-7 text-[14px] rounded-md outline outline-gray-200 outline-1 w-full"
            placeholder="Create new action"
            v-model="newTasks[index]"
            @keydown.enter="handleAddTask(index)"
          />
        </div>

        <Draggable
          v-if="section.tasks.length > 0"
          :list="section.tasks"
          item-key="id"
          ghost-class="ghost"
          class="mt-3 pr-2 flex-1 overflow-auto content"
          @end="checkMove"
          group="task"
          :id="section._id"
        >
          <template #item="{ element }">
            <div
              @click="
                () => {
                  showModals.detailTask = true;
                  chosenTask = element;
                  chosenSectionId = section._id;
                }
              "
              class="w-full rounded-sm overflow-hidden mt-4 shadow-sm border cursor-pointer"
            >
              <div
                :class="`p-2 text-[14px] bg-white border border-t-0 border-l-4 border-r-0 border-b-0`"
                :style="{ borderColor: '#' + project.color }"
              >
                <div class="pb-7">{{ element.title }}</div>

                <div class="flex items-center justify-between">
                  <div>
                    <span
                      v-if="element.description"
                      class="pi pi-book text-gray-500"
                    ></span>
                  </div>
                  <Avatar
                    icon="pi pi-user"
                    class="text-gray-500"
                    shape="circle"
                    size="small"
                  />
                </div>
              </div></div
          ></template>
        </Draggable>

        <span v-else class="text-gray-500 text-[15px] italic mt-5 text-center"
          >Nothing here yet.</span
        >
      </div>

      <form class="flex flex-col" @submit.prevent="handleAddSection">
        <input
          type="text"
          class="p-2 outline-none border rounded-md text-[14px]"
          placeholder="Add new Section"
          v-model="newSection"
        />
        <button
          v-if="newSection"
          class="cursor-pointer w-[30%] px-1 py-1 ml-auto mt-2 rounded-sm bg-yellow-500 hover:bg-yellow-400 duration-200 text-[14px] font-semibold text-white"
        >
          Add
        </button>
      </form>
    </div>
  </div>

  <OverlayPanel ref="showEditMenu">
    <div>
      <div
        class="p-2 text-[13px] hover:bg-gray-100 cursor-pointer"
        @click="showModals.editSection = true"
      >
        <span class="pi pi-pencil" :style="{ fontSize: '13px' }"></span>
        <span class="ml-2">Edit Section</span>
      </div>
      <div
        class="p-2 text-[13px] hover:bg-gray-100 cursor-pointer"
        @click="showModals.confirmDelete = true"
      >
        <span class="pi pi-trash" :style="{ fontSize: '13px' }"></span>
        <span class="ml-2">Delete Section</span>
      </div>
    </div>
  </OverlayPanel>

  <ConfirmModal
    v-model:status="showModals.confirmDelete"
    :header="`Delete ${chosenSectionTitle}`"
    danger="true"
    :handler="handleDeleteSection"
    label-btn="Delete"
    ><h1>
      Are you sure want to remove <b>{{ chosenSectionTitle }}</b> from this
      project?
    </h1></ConfirmModal
  >

  <ConfirmModal
    v-model:status="showModals.editSection"
    :header="`Edit Section`"
    :handler="handleEditSection"
    label-btn="Update"
    :disabled-btn="!chosenSectionTitle"
  >
    <div class="flex flex-col">
      <label
        for="editedSectionTittle"
        class="text-[14px] font-semibold mb-2 ml-1"
        >Section Title</label
      >
      <input
        type="text"
        class="px-4 py-2 outline-none border rounded-sm text-[15px]"
        id="editedSectionTittle"
        v-model="chosenSectionTitle"
      />
    </div>
  </ConfirmModal>

  <DetailTaskModal
    v-model:visible="showModals.detailTask"
    :chosenTask="chosenTask"
    @deleted-task="onDeletedTask"
    @updated-task="onUpdatedTask"
  />
</template>

<style scoped>
div.p-avatar.extra-small {
  width: 24px;
  font-size: 13px;
  height: 24px;
}

button.p-button.p-button-sm {
  padding: 10px;
}

.content {
  mask-image: linear-gradient(to top, transparent, black),
    linear-gradient(to left, transparent 17px, black 17px);
  mask-size: 100% 20000px;
  mask-position: left bottom;
  -webkit-mask-image: linear-gradient(to top, transparent, black),
    linear-gradient(to left, transparent 17px, black 17px);
  -webkit-mask-size: 100% 20000px;
  -webkit-mask-position: left bottom;
  transition: mask-position 0.3s, -webkit-mask-position 0.3s;
}

.content:hover {
  -webkit-mask-position: left top;
}

.ghost {
  opacity: 0.5;
}
</style>
