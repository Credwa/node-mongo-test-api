import Vue from 'vue';
import VueResource from 'vue-resource'
import VueCookie from 'vue-cookie';
import VueRouter from 'vue-router';
import VueMaterial from 'vue-material';

import App from './App.vue';
import { routes } from './routes.js'


Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(VueMaterial);
Vue.use(VueCookie);

Vue.http.options.root = 'https://secret-eyrie-85925.herokuapp.com';
// Vue.http.interceptors.push((req, next) => {
//   console.log(req);
//   console.log(req.headers.get('x-auth'));
//   next(res => {
//     console.log(res);
//     console.log(res.headers.get('x-auth'));
//   });
// });

// Vue.http.interceptors.push(function(request, next) {

//     // modify method
//     request.method = 'POST';

//     // modify headers
//     request.headers.set('x-auth', 'TOKEN');
//     request.headers.set('Authorization', 'Bearer TOKEN');
//     console.log(request);
//     // continue to next interceptor
//     next(res => {
//       console.log(res);
//     });
//   });

const router = new VueRouter({
  routes,
  mode: 'history'
});

Vue.material.registerTheme('default', {
  primary: 'blue',
  accent: 'green',
  warn: 'red',
  background: {
    color: 'grey',
    hue: 100
  }
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
