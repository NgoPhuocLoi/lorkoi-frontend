import { defineStore } from "pinia";
import { ref } from "vue";

const useCommonStore = defineStore("common", () => {
  const headerContent = ref({
    text: "",
    icon: null,
  });
  const showChatPopper = ref(true);
  const showSidebar = ref(true);

  const setHeaderContent = (payload) => {
    headerContent.value = payload;
  };

  const setShowChatPopper = (payload) => {
    showChatPopper.value = payload;
  };

  const setShowSidebar = (payload) => {
    showSidebar.value = payload;
  };

  return {
    headerContent,
    setHeaderContent,
    showChatPopper,
    setShowChatPopper,
    showSidebar,
    setShowSidebar,
  };
});

export default useCommonStore;
