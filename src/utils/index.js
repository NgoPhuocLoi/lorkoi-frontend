import { useUserStore } from "@/stores";
import store from "@/stores";
const userStore = useUserStore(store);

export const getUserById = (userId = userStore.user._id) => {
  return userStore.allUsers.find((user) => user._id === userId);
};
