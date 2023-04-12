import { reactive } from "vue";
import { io } from "socket.io-client";
export const state = reactive({
  onlineUsersId: [],
  incomingMessage: null,
});

const URL = "http://localhost:8080";
export const socket = io(URL);

socket.on("getUsers", (users) => {
  state.onlineUsersId = users.map((u) => u[0]);
});

socket.on("getMessage", (message) => {
  console.log(message);
  state.incomingMessage = message;
});

socket.on("disconnect", () => {
  console.log("Disconnect");
  state.message = null;
});
