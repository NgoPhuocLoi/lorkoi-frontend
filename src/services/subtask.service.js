import { createApiClient } from "./api.service";
class SubTaskService {
  constructor(baseUrl = "/subtask", needAuth = true) {
    this.api = createApiClient(baseUrl, needAuth);
  }

  async getAll(taskId) {
    const res = await this.api.get(`${taskId}`);
    return res.data;
  }

  async create({ task, title }) {
    const res = await this.api.post("/", { task, title });
    return res.data;
  }

  async update(subtaskId, newData) {
    const res = await this.api.put(`/${subtaskId}`, newData);
    return res.data;
  }

  async delete(subtaskId) {
    await this.api.delete(`/${subtaskId}`);
  }
}

export default SubTaskService;
