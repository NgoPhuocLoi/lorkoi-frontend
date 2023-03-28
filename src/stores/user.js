import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useUserStore = defineStore("user", () => {
  let user = ref({ name: "Hello" });
  const setUser = (payload) => {
    user.value = payload;
  };

  return { user, setUser };
});
