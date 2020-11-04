import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import Navigation from './components/Navigation.vue'
import VueMaterial from 'vue-material'
import Toast from "vue-toastification";
import router from "./router"
import store from './store'
import {auth} from './firebase'
import compositionApi from "@vue/composition-api";
import { BootstrapVue, IconsPlugin, BFormRating } from 'bootstrap-vue'
import PortalVue from 'portal-vue'
import './assets/main.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import KProgress from 'k-progress';

Vue.use(PortalVue)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueMaterial);
Vue.use(Vuelidate);
Vue.use(Toast);
Vue.use(compositionApi);

Vue.config.productionTip = false
Vue.component('navBar', Navigation)
Vue.component('b-form-rating', BFormRating)
Vue.component('k-progress', KProgress);

let app
auth.onAuthStateChanged(user => {
	if (!app) {
		app = new Vue({
			router,
			store,
			render: h => h(App)
		}).$mount('#app')
	}
	if (user) {
		store.dispatch('fetchUserProfile', user).then();
	}
})
