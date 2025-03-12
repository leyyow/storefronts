import { createApp } from 'vue'
import "./styles/base/_reset.scss";
import "./styles/base/_base.scss";
import './style.css'
import App from './App.vue'
import router from './router'

const app = createApp(App);
app.use(router);
app.mount('#app');
