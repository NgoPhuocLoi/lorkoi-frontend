import { createApiClient } from "./api.service";

class MessageService {
  constructor(baseUrl = "/message", needAuth = true) {
    this.api = createApiClient(baseUrl, needAuth);
  }

  async createMessage({ room, sender, message }) {
    const res = await this.api.post("/", { room, sender, message });
    return res.data;
  }

  async getMessages(roomId) {
    const res = await this.api.get(`/${roomId}`);
    return res.data;
  }
}

export default MessageService;
