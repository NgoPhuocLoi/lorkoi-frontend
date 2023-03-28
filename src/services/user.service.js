import { createApiClient } from "./api.service";

class UserService {
  constructor({ baseUrl = "/user", needAuth = true }) {
    this.api = createApiClient(baseUrl, needAuth);
  }

  async getCurrentUser() {
    const res = await this.api.get("/");
    return res.data;
  }
}

export default UserService;
