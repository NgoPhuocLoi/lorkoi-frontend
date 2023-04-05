import { defineStore } from "pinia";
import { ref } from "vue";

export const useCommonStore = defineStore("common", () => {
  const headerContent = ref({
    text: "",
    icon: null,
  });

  const setHeaderContent = (payload) => {
    headerContent.value = payload;
  };

  return { headerContent, setHeaderContent };
});
