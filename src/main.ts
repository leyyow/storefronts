import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persistedstate";
import "./styles/base/_reset.scss";
import "./styles/base/_base.scss";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import Nora from "@primeuix/themes/nora";

const pinia = createPinia();
pinia.use(piniaPersist);

const app = createApp(App);

app.use(PrimeVue, {
    theme: {
        preset: Nora,
        options: {
            darkModeSelector: ".my-app-dark",
            cssLayer: false,
        },
    },
});
app.use(ToastService);
app.use(pinia);
app.use(router);

app.mount("#app");
