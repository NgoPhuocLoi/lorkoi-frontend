import { reactive } from "vue";
import { io } from "socket.io-client";
export const state = reactive({
  onlineUsersId: [],
  incomingMessage: null,
  incomingProject: null,
  incomingSection: null,
  incomingTask: null,
  incomingSubTask: null,
});

const URL = "http://localhost:8080";
export const socket = io(URL);

socket.on("getUsers", (users) => {
  state.onlineUsersId = users.map((u) => u[0]);
});

socket.on("getMessage", (message) => {
  state.incomingMessage = message;
});

socket.on("getProject", (project) => {
  console.log({ project });
  state.incomingProject = project;
});

socket.on("getSection", ({ section, action }) => {
  section.action = action;
  console.log({ section });
  state.incomingSection = section;
});

socket.on("getTask", ({ task, action }) => {
  task.action = action;
  state.incomingTask = task;
});

socket.on("getSubTask", ({ subTask, action }) => {
  subTask.action = action;
  state.incomingSubTask = subTask;
});

socket.on("disconnect", () => {
  console.log("Disconnect");
  state.message = null;
});
