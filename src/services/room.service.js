import { createApiClient } from "./api.service";

class RoomService {
  constructor(baseUrl = "/room", needAuth = true) {
    this.api = createApiClient(baseUrl, needAuth);
  }

  async createChatRoom(membersId) {
    const res = await this.api.post("/", { members: membersId });
    return res.data;
  }

  async getRoomsOfUser() {
    const res = await this.api.get("/");
    return res.data;
  }

  async getRoomOfUsers(firstUserId, secondUserId) {
    const res = await this.api.get(`/${firstUserId}/${secondUserId}`);

    return res.data;
  }
}

export default RoomService;
