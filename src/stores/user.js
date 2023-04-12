import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const user = ref({});
  const allUsers = ref([]);
  const setUser = (payload) => {
    user.value = payload;
  };

  const setAllUsers = (payload) => {
    allUsers.value = payload;
  };

  return { user, setUser, allUsers, setAllUsers };
});
