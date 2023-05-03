<script setup>
import { RoomService } from "@/services";
import { useChatStore, useUserStore } from "@/stores";
import { ref, computed } from "vue";
import Avatar from "../common/Avatar.vue";

const props = defineProps(["users", "textSearch"]);

const chatStore = useChatStore();
const roomService = new RoomService();
const userStore = useUserStore();

const othersUsers = ref(
  userStore.allUsers.filter((u) => u._id !== userStore.user._id)
);

const filteredUsers = computed(() => {
  if (!props.textSearch) return othersUsers.value;

  return othersUsers.value.filter((u) => {
    return [u.firstName.toLowerCase(), u.lastName.toLowerCase()]
      .join("")
      .includes(props.textSearch.toLowerCase());
  });
});

const changeChat = async (userId) => {
  try {
    const res = await roomService.getRoomOfUsers(userStore.user._id, userId);
    chatStore.setCurrentChat(res.data.room[0]);
    if (!res.data.room[0]) {
      const newChat = await roomService.createChatRoom([
        userStore.user._id,
        userId,
      ]);
      chatStore.setCurrentChat(newChat.data.room);
      chatStore.setUsersChatWith([...chatStore.usersChatWith, userId]);
    }
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div v-if="filteredUsers.length === 0" class="text-[13px] text-center italic">
    No users
  </div>
  <div
    v-for="user in filteredUsers"
    v-else
    :key="user?._id"
    class="p-2 hover:bg-[#efefef] rounded-md cursor-pointer flex items-center"
    @click="changeChat(user?._id)"
  >
    <Avatar
      :image="user.avatar"
      :label="user.firstName[0].toUpperCase()"
      :class="`flex-shrink-0 relative border border-gray-400
        `"
    />
    <span class="ml-2">{{ user?.lastName }} {{ user?.firstName }}</span>
  </div>
</template>

<style scoped></style>
