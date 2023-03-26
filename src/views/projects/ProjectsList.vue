<script setup>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import AvatarGroup from "primevue/avatargroup";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const selected = ref();
watch(selected, () => {
  console.log();
  router.push("/workspace/projects/" + selected.value._id);
});
const project = ref([
  {
    _id: "6408aac5cc12a89e8b01da8d",
    owner: "6408aa49cc12a89e8b01da8b",
    name: "Admin Project",
    color: "red",
    members: ["6408aa49cc12a89e8b01da8b"],
    pinned: true,
    pinnedPosition: 0,
    createdAt: "2023-03-08T15:33:25.631Z",
    updatedAt: "2023-03-08T15:33:25.631Z",
    __v: 0,
  },
  {
    _id: "6408aac5cc12a89e8b01da8d",
    owner: "6408aa49cc12a89e8b01da8b",
    name: "Admin Project",
    color: "red",
    members: ["6408aa49cc12a89e8b01da8b"],
    pinned: false,
    pinnedPosition: 0,
    createdAt: "2023-03-08T15:33:25.631Z",
    updatedAt: "2023-03-08T15:33:25.631Z",
    __v: 0,
  },
  {
    _id: "6408aac5cc12a89e8b01da8d",
    owner: "6408aa49cc12a89e8b01da8b",
    name: "Admin Project",
    color: "red",
    members: ["6408aa49cc12a89e8b01da8b"],
    pinned: false,
    pinnedPosition: 0,
    createdAt: "2023-03-08T15:33:25.631Z",
    updatedAt: "2023-03-08T15:33:25.631Z",
    __v: 0,
  },
]);
</script>

<template>
  <div class="p-5">
    <Button label="New Project" icon="pi pi-plus" size="small" />

    <div class="p-input-icon-left my-5">
      <i class="pi pi-search" />
      <InputText placeholder="Search" />
    </div>

    <DataTable
      v-model:selection="selected"
      :value="project"
      tableStyle="min-width: 50rem"
      class="p-datatable-sm"
      selectionMode="single"
    >
      <Column field="name" header="Project name">
        <template #body="slot">
          <div class="flex gap-4 items-center">
            <span
              class="cursor-pointer"
              :class="`pi pi-bookmark${slot.data.pinned ? '-fill' : ''} `"
            ></span>
            <div
              class="w-[20px] rounded-full h-[20px] bg-red-500 ml-4 mr-2"
            ></div>
            <p>{{ slot.data.name }}</p>
          </div>
        </template>
      </Column>
      <Column field="members" header="Members">
        <template #body="slot">
          <div class="flex">
            <Avatar icon="pi pi-user" class="mr-2" size="small" />

            <AvatarGroup>
              <Avatar label="A" size="small" />
              <Avatar label="A" size="small" />
              <Avatar label="A" size="small" />
              <Avatar label="A" size="small" />
              <Avatar label="A" size="small" />
              <Avatar
                label="+2"
                size="small"
                style="background-color: '#9c27b0', color: '#ffffff'"
              />
            </AvatarGroup>
          </div> </template
      ></Column>
    </DataTable>
  </div>
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
