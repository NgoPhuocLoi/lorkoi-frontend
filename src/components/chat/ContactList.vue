<script setup>
import { RoomService, UserService } from "@/services";
import { useChatStore, useCommonStore, useUserStore } from "@/stores";
import { onMounted, ref, watch } from "vue";
import { state } from "../../services/socket";
import Avatar from "../common/Avatar.vue";

const commonStore = useCommonStore();
const chatStore = useChatStore();
const userStore = useUserStore();
const roomService = new RoomService();
const userService = new UserService();

const onlineUsers = ref([]);
const roomsHaveChatted = ref([]);
const onlineStyle =
  "after:w-[10px] after:h-[10px] after:rounded-full after:bg-green-400 after:absolute after:top-0 after:right-0";
watch(state, () => {
  onlineUsers.value = userStore.allUsers.filter(
    (u) => u._id !== userStore.user._id && state.onlineUsersId.includes(u._id)
  );
});

onMounted(async () => {
  try {
    const res = await Promise.all([
      userService.getAllUsers(),
      roomService.getRoomsOfUser(),
    ]);
    userStore.setAllUsers(res[0].data.users);
    const otherUsersId = res[1].data.rooms.map((room) => {
      return room.members.find((m) => m !== userStore.user._id);
    });
    chatStore.setUsersChatWith(otherUsersId);
    roomsHaveChatted.value = userStore.allUsers.filter((u) =>
      chatStore.usersChatWith?.includes(u._id)
    );
  } catch (error) {
    console.log(error);
  }
});

watch(chatStore, () => {
  roomsHaveChatted.value = userStore.allUsers.filter((u) =>
    chatStore.usersChatWith?.includes(u._id)
  );
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
      chatStore.setUsersChatWith([...changeChat.usersChatWith, userId]);
    }
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div class="p-2">
    <h2 class="text-[15px] font-semibold">Contacts</h2>

    <div class="max-h-[280px] overflow-auto">
      <div
        v-for="user in roomsHaveChatted"
        :key="user._id"
        class="p-2 hover:bg-[rgba(255,255,255,0.1)] rounded-md cursor-pointer flex items-center"
        @click="changeChat(user._id)"
      >
        <Avatar
          :image="user.avatar"
          :label="user.firstName[0].toUpperCase()"
          :class="`flex-shrink-0 relative border border-gray-400
        ${state.onlineUsersId.includes(user._id) ? onlineStyle : ''}`"
        />
        <span class="ml-2">{{ user.lastName }} {{ user.firstName }}</span>
      </div>

      <div
        class="text-[14px] text-gray-400 ml-2 font-semibold"
        v-if="roomsHaveChatted.length === 0"
      >
        No contacts yet.
      </div>
    </div>
  </div>
</template>

<style>
div.p-panelmenu .p-panelmenu-header .p-panelmenu-header-content {
  background-color: transparent;
  border: none;
  outline: none;
  box-shadow: unset;
}
div.p-panelmenu
  .p-panelmenu-header:not(.p-highlight):not(.p-disabled):hover
  .p-panelmenu-header-content {
  background-color: transparent;
  border: none;
  outline: none;
  box-shadow: unset;
}

div.p-panelmenu
  .p-panelmenu-header:not(.p-disabled).p-highlight:hover
  .p-panelmenu-header-content {
  background-color: transparent;
  border: none;
  outline: none;
  box-shadow: unset;
}

div.p-panelmenu
  .p-panelmenu-header
  .p-panelmenu-header-content
  .p-panelmenu-header-action {
  padding: 10px;
  color: white;
  font-size: 15px;
  font-weight: 600;
}

div.p-panelmenu
  .p-panelmenu-header:not(.p-disabled).p-highlight
  .p-panelmenu-header-content {
  background-color: transparent;
  border: none;
  box-shadow: none;
}

div.p-panelmenu
  .p-panelmenu-header
  .p-panelmenu-header-content
  .p-panelmenu-header-action
  .p-submenu-icon {
  font-size: 12px;
}

div.p-panelmenu .p-panelmenu-content {
  background-color: transparent;
  border: none;
  outline: none;
  color: white;
  border-radius: 10px;
}

div.p-panelmenu
  .p-panelmenu-content
  .p-menuitem:not(.p-highlight):not(.p-disabled)
  > .p-menuitem-content:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

div.p-panelmenu
  .p-panelmenu-content
  .p-menuitem:not(.p-highlight):not(.p-disabled)
  > .p-menuitem-content:hover
  .p-menuitem-link
  .p-menuitem-text {
  color: white;
}

div.p-panelmenu .p-panelmenu-content .p-menuitem > .p-menuitem-content {
  color: white;
  font-size: 14px;
  font-weight: 500;
  border-radius: 10px;
}

div.p-panelmenu
  .p-panelmenu-content
  .p-menuitem
  > .p-menuitem-content
  .p-menuitem-link
  .p-menuitem-text {
  color: white;
}

div.p-panelmenu
  .p-panelmenu-content
  .p-menuitem
  > .p-menuitem-content
  .p-menuitem-link {
  padding: 8px 30px;
}

div.p-panelmenu
  .p-panelmenu-content
  .p-menuitem:not(.p-highlight):not(.p-disabled).p-focus
  > .p-menuitem-content
  .p-menuitem-link
  .p-menuitem-text {
  color: white;
}

div.p-panelmenu
  .p-panelmenu-content
  .p-menuitem:not(.p-highlight):not(.p-disabled).p-focus
  > .p-menuitem-content {
  background-color: rgba(255, 255, 255, 0.2);
}
</style>

<style scoped></style>
