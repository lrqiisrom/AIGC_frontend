import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import router from './router';
import axios from 'axios';
import App from './App.vue';

const app = createApp(App);
app.config.globalProperties.$axios = axios;
app.use(ElementPlus);
app.use(router);
app.mount('#app');