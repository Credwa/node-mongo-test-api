import Login from './components/Login.vue';
import SignUp from './components/SignUp.vue';
import Home from './components/Home.vue';
import Main from './components/Main.vue';

export const routes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/signup', component: SignUp },
    { path: '/main', component: Main } ,
    { path: '*', redirect: '/'}
];