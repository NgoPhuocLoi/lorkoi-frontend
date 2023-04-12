import { defineStore } from "pinia";
import { ref } from "vue";

export const useCommonStore = defineStore("common", () => {
  const headerContent = ref({
    text: "",
    icon: null,
  });
  const showChatPopper = ref(true);

  const setHeaderContent = (payload) => {
    headerContent.value = payload;
  };

  const setShowChatPopper = (payload) => {
    showChatPopper.value = payload;
  };

  return { headerContent, setHeaderContent, showChatPopper, setShowChatPopper };
});
