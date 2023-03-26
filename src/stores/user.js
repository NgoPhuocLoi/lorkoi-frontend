import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const user = reactive({});
  const setUser = (payload) => {
    user = payload;
  };

  return { user, setUser };
});
