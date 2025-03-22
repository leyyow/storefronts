import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persistedstate";
import "./styles/index.scss";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import Aura from "@primeuix/themes/aura";

const pinia = createPinia();
pinia.use(piniaPersist);

const app = createApp(App);

app.use(PrimeVue, {
    theme: {
        preset: Aura,
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
