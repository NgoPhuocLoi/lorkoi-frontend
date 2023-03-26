import { createApp } from "vue";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";

import App from "./App.vue";
import router from "./router";

import "./assets/style.css";
import "vue-popperjs/dist/vue-popper.css";
//theme
import "primevue/resources/themes/lara-light-indigo/theme.css";

//core
import "primevue/resources/primevue.min.css";

//icons
import "primeicons/primeicons.css";

import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Avatar from "primevue/avatar";

const app = createApp(App);

// app.config.compilerOptions.isCustomElement = (tag) => {
//   return tag.startsWith("ion-");
// };
app.component("InputText", InputText);
app.component("Button", Button);
app.component("Avatar", Avatar);
app.use(PrimeVue);

app.use(createPinia());
app.use(router);
app.mount("#app");
