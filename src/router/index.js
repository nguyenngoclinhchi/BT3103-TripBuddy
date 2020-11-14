import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '@/components/CountryDashboardPage'
import {auth} from '@/firebase'
import MainPage from "@/components/MainPage";
import Statistics from "@/components/GlobalDashboardPage";
import About from "@/components/About";
import DashboardComment from "@/components/ExperienceDashboard";
import PinnedCountry from "@/components/PinnedCountry";

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'MainPage',
		components: {
			default: MainPage,
		},
		meta: {
			requiresAuth: true
		},
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import( /* webpackChunkName: "login" */ '../components/LoginPage.vue')
	},
	{
		path: '/settings',
		name: 'settings',
		component: () => import( /* webpackChunkName: "settings" */ '../components/Settings.vue'),
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/statistics',
		components: {
			default: Statistics,
		}
	},
	{
		path: '/dashboard',
		components: {
			default: Dashboard,
		}
	},
	{
		path: '/about',
		components: {
			default: About,
		}
	},
	{
		path: '/comments',
		components: {
			default: DashboardComment,
		}
	},
	{
		path: '/pinned',
		components: {
			default: PinnedCountry,
		}
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

// navigation guard to check for logged in users
router.beforeEach((to, from, next) => {
	const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
	
	if (requiresAuth && !auth.currentUser) {
		next('/login')
	} else {
		next()
	}
})

export default router
