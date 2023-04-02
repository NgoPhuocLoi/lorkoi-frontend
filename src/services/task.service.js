import { createApiClient } from "./api.service";

class TaskService {
  constructor(projectId, needAuth = true) {
    const baseUrl = `/project/${projectId}/task`;
    this.api = createApiClient(baseUrl, needAuth);
  }

  async create({ sectionId, title }) {
    const res = await this.api.post("/", { sectionId, title });
    return res.data;
  }

  async update(taskId, newData) {
    const res = await this.api.put(`/${taskId}`, newData);
    return res.data;
  }

  async delete(taskId) {
    await this.api.delete(`/${taskId}`);
  }

  async updatePosition({ sourceList, desList, sourceSectionId, desSectionId }) {
    await this.api.put("/position", {
      sourceList,
      desList,
      sourceSectionId,
      desSectionId,
    });
  }
}

export default TaskService;
