import { createApiClient } from "./api.service";

class ProjectService {
  constructor(baseUrl = "/project", needAuth = true) {
    this.api = createApiClient(baseUrl, needAuth);
  }

  async getAll() {
    const res = await this.api.get("/");
    return res.data;
  }

  async getOne(projectId) {
    const res = await this.api.get(`/${projectId}`);
    return res.data;
  }

  async getPinned() {
    const res = await this.api.get("/pinned");
    return res.data;
  }

  async create({ name, color, members }) {
    const res = await this.api.post("/", { name, color, members });
    return res.data;
  }

  async update(projectId, newData) {
    const res = await this.api.put(`/${projectId}`, newData);
    return res.data;
  }

  async delete(projectId) {
    await this.api.delete(`${projectId}`);
  }
}

export default ProjectService;
