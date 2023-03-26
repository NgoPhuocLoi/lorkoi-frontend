import { createApiClient } from "./api.service";

class SectionService {
  constructor(projectId, needAuth = true) {
    const baseUrl = `/project/${projectId}/section`;
    this.api = createApiClient(baseUrl, needAuth);
  }

  async create({ title }) {
    const res = await this.api.post("/", { title });
    return res.data;
  }

  async update(sectionId, newData) {
    const res = await this.api.put(`/${sectionId}`, newData);
    return res.data;
  }

  async delete(sectionId) {
    await this.api.delete(`${sectionId}`);
  }
}

export default SectionService;
