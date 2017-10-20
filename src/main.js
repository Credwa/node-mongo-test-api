import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
const VueMaterial = require('vue-material');
import { routes } from './routes.js'


Vue.use(VueRouter);
Vue.use(VueMaterial);

const router = new VueRouter({
  routes,
  mode: 'history'
});

Vue.material.registerTheme('default', {
  primary: 'blue',
  accent: 'red',
  warn: 'red',
  background: 'white'
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
