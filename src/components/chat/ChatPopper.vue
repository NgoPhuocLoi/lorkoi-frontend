<script setup>
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

import { MessageService, UserService } from "@/services";
import { socket, state } from "@/services/socket";
import { useChatStore, useUserStore } from "@/stores";
import { onUpdated, ref, watch } from "vue";
import Avatar from "../common/Avatar.vue";

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");

const chatStore = useChatStore();
const userStore = useUserStore();
const userService = new UserService();
const messageService = new MessageService();

const user = ref();
const messages = ref([]);
const messageInput = ref("");
const bottom = ref(null);

watch(chatStore, async () => {
  if (chatStore.currentChat)
    try {
      const userId = chatStore.currentChat.members.find(
        (id) => id !== userStore.user._id
      );
      let res = await userService.getUser(userId);
      user.value = res.user;

      res = await messageService.getMessages(chatStore.currentChat._id);
      messages.value = res.data.messages.reverse();
    } catch (error) {
      console.log(error);
    }
});

watch(state, () => {
  if (state.incomingMessage)
    messages.value = [state.incomingMessage, ...messages.value];
  state.incomingMessage = null;
});

const handleSendMessage = async () => {
  if (!messageInput.value.trim()) return;
  try {
    socket.emit("sendMessage", {
      senderId: userStore.user._id,
      receiverId: user.value._id,
      message: messageInput.value,
    });
    const res = await messageService.createMessage({
      room: chatStore.currentChat._id,
      sender: userStore.user._id,
      message: messageInput.value,
    });

    messages.value = [res.data.message, ...messages.value];
    messageInput.value = "";
  } catch (error) {
    console.log(error);
  }
};

onUpdated(() => {
  bottom.value.scrollIntoView();
});
</script>

<template>
  <div
    :class="`w-[340px] h-[450px] fixed bottom-0 rounded-md right-20 border shadow-md flex flex-col ${
      chatStore.currentChat ? '' : 'hidden'
    }`"
  >
    <div
      class="flex justify-between items-center p-2 h-[44px] bg-white border border-t-0 border-r-0 border-l-0 border-b-1"
    >
      <div class="flex items-center">
        <Avatar
          :image="user?.avatar"
          :label="user?.firstName[0].toUpperCase()"
          class="mr-2 border border-gray-400"
        />
        <div class="flex flex-col">
          <h2 class="text-[15px] font-semibold mt-[2px]">
            {{ user?.lastName }} {{ user?.firstName }}
          </h2>
          <span
            v-if="state.onlineUsersId.includes(user?._id)"
            class="text-[12px] text-gray-800 mt-[-3px]"
            >Active now</span
          >
        </div>
      </div>

      <div>
        <span
          @click="chatStore.setCurrentChat(null)"
          class="pi pi-times mr-1 p-2 rounded-full hover:bg-gray-200 cursor-pointer"
        ></span>
      </div>
    </div>

    <div class="bg-white flex-1 p-2 pb-0 overflow-auto flex flex-col-reverse">
      <div ref="bottom" class="w-full h-[1px]"></div>
      <div
        v-for="message in messages"
        :key="message._id"
        :class="`flex w-[60%] mb-2 ${
          message.sender === userStore.user._id
            ? 'ml-auto flex-row-reverse'
            : ''
        }`"
        ref="messageRefs"
      >
        <Avatar
          v-if="message.sender !== userStore.user._id"
          :image="user?.avatar"
          :label="user?.firstName[0].toUpperCase()"
          class="flex-shrink-0 mr-2 border border-gray-400"
        />

        <div>
          <p class="py-2 px-3 bg-gray-300 rounded-lg">
            {{ message.message }}
          </p>

          <span
            :class="`text-[11px] text-gray-700 block  pr-2 p-[2px] ${
              message.sender === userStore.user._id ? 'text-right' : ''
            }`"
            >{{ timeAgo.format(new Date(message.createdAt)) }}</span
          >
        </div>
      </div>
    </div>

    <form @submit.prevent="handleSendMessage" class="flex py-3 items-center">
      <input
        v-model="messageInput"
        type="text"
        class="h-[36px] flex-1 ml-3 border border-gray-500 rounded-2xl px-3"
        placeholder="Typing something"
      />
      <button><span class="pi pi-send cursor-pointer p-3 mr-2"></span></button>
    </form>
  </div>
</template>

<style scoped></style>
