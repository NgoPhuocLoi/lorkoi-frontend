import { createApp } from "vue";
import PrimeVue from "primevue/config";
import App from "./App.vue";
import store from "./stores";
import router from "./router";

import "./assets/style.css";
import "vue-popperjs/dist/vue-popper.css";
import "primevue/resources/themes/lara-light-indigo/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Avatar from "primevue/avatar";
import ConfirmationService from "primevue/confirmationservice";
import Tooltip from "primevue/tooltip";
import ToastService from "primevue/toastservice";
const app = createApp(App);

// app.config.compilerOptions.isCustomElement = (tag) => {
//   return tag.startsWith("ion-");
// };
app.component("InputText", InputText);
app.component("Button", Button);
app.component("Avatar", Avatar);
app.directive("tooltip", Tooltip);
app.use(PrimeVue);
app.use(ConfirmationService);
app.use(ToastService);

app.use(store);
app.use(router);
app.mount("#app");
