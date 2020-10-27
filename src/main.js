import Vue from 'vue'
import App from './App.vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import Vuelidate from 'vuelidate'
import Navigation from './components/Navigation.vue'
import Toast from "vue-toastification";
import router from "./router"
import store from './store'
import {auth} from './firebase'
import compositionApi from "@vue/composition-api";


Vue.use(VueMaterial);
Vue.use(Vuelidate);
Vue.use(Toast);
Vue.use(compositionApi);

Vue.config.productionTip = false
Vue.component('navBar', Navigation)

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
		store.dispatch('fetchUserProfile', user)
	}
})
