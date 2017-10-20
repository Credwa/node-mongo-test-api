import Login from './components/Login.vue';
import SignUp from './components/SignUp.vue';

export const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { path: '/signup', component: SignUp }
];