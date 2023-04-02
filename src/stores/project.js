import { defineStore } from "pinia";
import { ref } from "vue";

export const useProjectStore = defineStore("project", () => {
  const projects = ref([]);
  const pinnedProjects = ref([]);

  const setProjects = (payload) => {
    projects.value = payload;
  };

  const setPinnedProjects = (payload) => {
    pinnedProjects.value = payload;
  };

  return { projects, setProjects, pinnedProjects, setPinnedProjects };
});
