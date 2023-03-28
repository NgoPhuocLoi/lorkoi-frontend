import { createApiClient } from "./api.service";

class AuthService {
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

  async checkEmail({ email }) {
    await this.api.post("/check-email", { email });
  }
}

export default AuthService;
