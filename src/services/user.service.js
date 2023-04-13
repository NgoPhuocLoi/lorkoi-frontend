import { createApiClient } from "./api.service";

class UserService {
  constructor(baseUrl = "/user", needAuth = true) {
    this.api = createApiClient(baseUrl, needAuth);
  }

  async getCurrentUser() {
    const res = await this.api.get("/");
    return res.data;
  }

  async getUser(userId) {
    const res = await this.api.get("/" + userId);
    return res.data;
  }

  async getAllUsers() {
    const res = await this.api.get("/all");
    return res.data;
  }

  async update(userId, newData) {
    const res = await this.api.put(`${userId}`, newData);
    return res.data;
  }
}

export default UserService;
