import { defineStore } from "pinia";
import { ref } from "vue";

export const useProjectStore = defineStore("project", () => {
  const projects = ref([]);

  const setProjects = (payload) => {
    projects.value = payload;
  };

  return { projects, setProjects };
});
