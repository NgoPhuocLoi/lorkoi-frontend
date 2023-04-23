import { createPinia } from "pinia";

const pinia = createPinia();

export default pinia;
export { default as useChatStore } from "./chat";
export { default as useCommonStore } from "./common";
export { default as useUserStore } from "./user";
export { default as useProjectStore } from "./project";
