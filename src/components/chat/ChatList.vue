<script setup>
import { watch, ref, onMounted, computed } from "vue";
import { state } from "../../services/socket";
import { useCommonStore } from "../../stores/common";
import { useChatStore } from "../../stores/chat";
import { useUserStore } from "../../stores/user";
import RoomService from "@/services/room.service";
import Avatar from "../common/Avatar.vue";

const commonStore = useCommonStore();
const chatStore = useChatStore();
const userStore = useUserStore();
const roomService = new RoomService();
const props = defineProps(["users"]);

const onlineUsers = ref([]);
const onlineStyle =
  "after:w-[10px] after:h-[10px] after:rounded-full after:bg-green-400 after:absolute after:top-0 after:right-0";
watch(state, () => {
  onlineUsers.value = props.users.filter((u) =>
    state.onlineUsersId.includes(u._id)
  );
});

onMounted(async () => {
  try {
    const res = await roomService.getRoomsOfUser();
    const otherUsersId = res.data.rooms.map((room) => {
      return room.members.find((m) => m !== userStore.user._id);
    });

    chatStore.setUsersChatWith(otherUsersId);
  } catch (error) {
    console.log(error);
  }
});

const roomsHaveChatted = computed(() =>
  props.users.filter((u) => chatStore.usersChatWith?.includes(u._id))
);
console.log(roomsHaveChatted.value);
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
    <h2>Rooms</h2>

    <div>
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
    </div>
  </div>

  <div class="p-2">
    <h2>Online users</h2>

    <div>
      <div
        v-for="user in onlineUsers"
        :key="user._id"
        class="p-2 hover:bg-[rgba(255,255,255,0.1)] rounded-md cursor-pointer"
        @click="changeChat(user._id)"
      >
        <Avatar
          :label="user.firstName[0]"
          shape="circle"
          :class="`relative ${onlineStyle}`"
        />
        <span class="ml-2">{{ user.lastName }} {{ user.firstName }}</span>
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
