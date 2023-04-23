import { defineStore } from "pinia";
import { ref } from "vue";
const useChatStore = defineStore("chat", () => {
  const currentChat = ref(null);
  const usersChatWith = ref([]);

  const setCurrentChat = (payload) => {
    currentChat.value = payload;
  };

  const setUsersChatWith = (payload) => {
    usersChatWith.value = payload;
  };

  return { currentChat, setCurrentChat, usersChatWith, setUsersChatWith };
});
export default useChatStore;
