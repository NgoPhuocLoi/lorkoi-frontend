import { defineStore } from "pinia";
import { ref } from "vue";
const useUserStore = defineStore("user", () => {
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
export default useUserStore;
