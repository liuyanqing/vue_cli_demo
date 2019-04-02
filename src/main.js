import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App.vue';
import './utils/share';
import './style/index.scss';

Vue.config.productionTip = false;

const axiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'https://xxxx.xx.com/' : '//',
  headers: {
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET, POST, OPTIONS, PUT, DELETE',
  },
});

Vue.use(VueAxios, axiosInstance);

new Vue({
  render: h => h(App),
}).$mount('#app')
