<script setup>
import Dialog from "primevue/dialog";
import Chips from "primevue/chips";
import OverlayPanel from "primevue/overlaypanel";
import { computed, ref, watch } from "vue";
import Avatar from "../common/Avatar.vue";
import { getUserById } from "../../utils";
import { useUserStore } from "@/stores";

const props = defineProps(["visible", "members", "owner"]);
const emit = defineEmits(["update:visible", "update:members"]);
const userStore = useUserStore();

const showModal = ref(props.visible);
const value = ref([]);
const searchText = ref("");
const op = ref();
const input = ref();
const addedUsers = ref(props.members);

const showOverlay = (e) => {
  op.value.show(e);
};

const filteredUsers = computed(() =>
  userStore.allUsers.filter(
    (u) =>
      u.firstName.concat(u.lastName).toLowerCase().includes(searchText.value) &&
      u._id !== userStore.user._id
  )
);

watch(props, () => {
  showModal.value = props.visible;
  addedUsers.value = props.members;
});

const handleUpdate = (e) => {
  console.log(e);
};

const handleChooseUser = (user) => {
  if (value.value.includes(user._id) || addedUsers.value.includes(user._id))
    return;
  input.value.addItem(null, user._id);
  searchText.value = "";
  op.value.hide();
};

const handleInput = (e) => {
  searchText.value = e.target.value;
  showOverlay(e);
};

const handleRemoveMember = (memberId) => {
  addedUsers.value = addedUsers.value.filter((m) => m !== memberId);
  emit("update:members", addedUsers.value);
};

const handleInviteUsers = async () => {
  addedUsers.value = [...addedUsers.value, ...value.value];
  emit("update:members", addedUsers.value);
  value.value = [];
};
</script>

<template>
  <Dialog
    class="mx-3"
    v-model:visible="showModal"
    modal
    header="Invite project members"
    @hide="emit('update:visible', false)"
    :style="{ width: '500px', height: '80vh' }"
  >
    <div class="flex">
      <div class="p-fluid flex-1 mr-4">
        <Chips
          v-model="value"
          @update:modelValue="handleUpdate"
          @input="handleInput"
          ref="input"
          @keydown.enter="handleEnter"
        >
          <template #chip="slotProps">
            <div class="flex items-center">
              <Avatar
                :image="getUserById(slotProps.value)?.avatar"
                :label="
                  getUserById(slotProps.value)?.firstName[0].toUpperCase()
                "
                :class="`flex-shrink-0 relative border border-gray-400
        `"
              />
              <span class="ml-2"
                >{{ getUserById(slotProps.value)?.lastName }}
                {{ getUserById(slotProps.value)?.firstName }}
              </span>
            </div>
          </template>
        </Chips>
      </div>

      <button
        @click="handleInviteUsers"
        class="px-3 py-2 rounded-md bg-gray-300 mb-auto"
      >
        Invite
      </button>
    </div>

    <div class="mt-7">
      <span class="font-semibold block pb-2">Project members</span>
      <hr class="mb-3" />
      <div
        class="p-2 hover:bg-[#efefef] rounded-md cursor-pointer flex items-center"
      >
        <Avatar
          :image="getUserById(props.owner)?.avatar"
          :label="getUserById(props.owner)?.firstName[0].toUpperCase()"
          :class="`flex-shrink-0 relative border border-gray-400
        `"
        />
        <span class="ml-2"
          >{{ getUserById(props.owner)?.lastName }}
          {{ getUserById(props.owner)?.firstName }}</span
        >
        <span class="ml-auto text-[15px] font-semibold">Project Owner</span>
      </div>

      <div
        v-for="userId in addedUsers"
        :key="userId"
        class="p-2 hover:bg-[#efefef] rounded-md cursor-pointer flex items-center"
      >
        <Avatar
          :image="getUserById(userId)?.avatar"
          :label="getUserById(userId)?.firstName[0].toUpperCase()"
          :class="`flex-shrink-0 relative border border-gray-400
        `"
        />
        <span class="ml-2"
          >{{ getUserById(userId)?.lastName }}
          {{ getUserById(userId)?.firstName }}</span
        >
        <span
          @click="handleRemoveMember(userId)"
          v-tooltip.top="'Remove member'"
          class="ml-auto hover:text-red-500 pi pi-times-circle"
        ></span>
      </div>
    </div>
  </Dialog>

  <OverlayPanel ref="op" class="w-[300px] mt-[-10px]">
    <div class="p-2">
      <div
        v-for="user in filteredUsers"
        :key="user._id"
        :class="`p-2 hover:bg-[#efefef] rounded-md  flex items-center ${
          value.includes(user._id) || addedUsers.includes(user._id)
            ? 'cursor-not-allowed'
            : 'cursor-pointer'
        }`"
        @click="handleChooseUser(user)"
      >
        <Avatar
          :image="user.avatar"
          :label="user.firstName[0].toUpperCase()"
          :class="`flex-shrink-0 relative border border-gray-400
        `"
        />
        <span class="ml-2">{{ user.lastName }} {{ user.firstName }}</span>
        <span class="ml-auto text-[14px] font-semibold text-gray-400">{{
          value.includes(user._id) || addedUsers.includes(user._id)
            ? "Already added"
            : ""
        }}</span>
      </div>

      <span v-if="filteredUsers.length == 0">No users</span>
    </div>
  </OverlayPanel>
</template>

<style>
.p-chips .p-chips-multiple-container {
  padding: 4px 10px;
}

.p-chips .p-chips-multiple-container .p-chips-token {
  padding: 3px;
}

.p-dialog-content {
  height: 100%;
}

.p-avatar-group {
  width: fit-content;
}
</style>
