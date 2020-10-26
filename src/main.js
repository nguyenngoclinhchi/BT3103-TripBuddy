import Vue from 'vue'
import App from './App.vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import Vuelidate from 'vuelidate'
import Navigation from './components/Navigation.vue'
import VueRouter from 'vue-router'
import MainPage from './components/MainPage.vue'
import Statistics from './components/Statistics.vue'
import About from './components/About.vue'
import Dashboard from './components/Dashboard.vue'
import LoginPage from './components/LoginPage.vue'


Vue.use(VueMaterial)
Vue.use(Vuelidate)
Vue.use(VueRouter);

const routes = [
  { path: '/', component: MainPage },
  { path: '/statistics', component: Statistics },
  { path: '/dashboard', component: Dashboard },
  { path: '/about', component: About},
  { path: '/login', component: LoginPage}
];

const router = new VueRouter({
  routes
});


Vue.config.productionTip = false
Vue.component('navBar', Navigation)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
