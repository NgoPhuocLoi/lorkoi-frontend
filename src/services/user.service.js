import { createApiClient } from "./api.service";

class UserService {
  constructor(baseUrl = "/auth", needAuth = false) {
    this.api = createApiClient(baseUrl, needAuth);
  }

  async register({ email, password, firstName, lastName, phone }) {
    const res = await this.api.post("/register", {
      email,
      password,
      firstName,
      lastName,
      phone,
    });
    return res.data;
  }

  async login({ email, password }) {
    const res = await this.api.post("/login", {
      email,
      password,
    });
    return res.data;
  }
}

export default UserService;
