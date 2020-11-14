<template>
    <header>
        <div class = "col1" style = "padding: 0;">
            <div>
                <b-navbar toggleable = "lg" type = "dark" variant = "info">
                    <div @click="current_page = 'Home page'">
                        <router-link to = "/">
                            <h3 style = "color: white">TRIP BUDDY</h3>
                        </router-link>
                    </div>
                    <b-navbar-nav>
                        <b-nav-item v-if = "current_page != null">Welcome {{this.userProfile.name}} to {{this.current_page}}</b-nav-item>
                    </b-navbar-nav>
                    <b-navbar-toggle target = "nav-collapse"></b-navbar-toggle>
                    <b-collapse id = "nav-collapse" is-nav>
                        <b-navbar-nav class = "ml-auto">
                            <b-nav-item-dropdown right>
                                <template #button-content>
                                    <em style = "color: white">Discover</em>
                                </template>
                                <b-dropdown-item @click = "current_page = detect_current_page()">
                                    <router-link to = "/">Home</router-link>
                                </b-dropdown-item>
                                <b-dropdown-item @click = "current_page = detect_current_page()">
                                    <router-link to = "/statistics">Global Dashboard</router-link>
                                </b-dropdown-item>
                                <b-dropdown-item @click = "current_page = detect_current_page()">
                                    <router-link to = "/dashboard">Country Dashboard</router-link>
                                </b-dropdown-item>
                                <b-dropdown-item @click = "current_page = detect_current_page()">
                                    <router-link to = "/pinned">Pinned Country</router-link>
                                </b-dropdown-item>
                                <b-dropdown-item @click = "current_page = detect_current_page()">
                                    <router-link to = "/comments">Experience Dashboard</router-link>
                                </b-dropdown-item>
                                <b-dropdown-item @click = "current_page = detect_current_page()">
                                    <router-link to = "/about">About our app</router-link>
                                </b-dropdown-item>
                            </b-nav-item-dropdown>
                            <b-nav-item-dropdown right >
                                <template #button-content>
                                    <em style = "color: white">User</em>
                                </template>
                                <b-dropdown-item @click = "current_page = detect_current_page()">
                                    <router-link to = "/settings">Profile Settings</router-link>
                                </b-dropdown-item>
                                <b-dropdown-item @click = "logout()">
                                    Sign Out
                                </b-dropdown-item>
                            </b-nav-item-dropdown>
                        </b-navbar-nav>
                    </b-collapse>
                </b-navbar>
            </div>
        </div>
    </header>
</template>
<script>
	import router from '../router/index';
	import {mapState} from "vuex";
	
	export default {
		name: "Navigation",
		components: {},
		data: function () {
			return {
				current_page: ''
			};
		},
        computed: {
			...mapState(['userProfile', 'posts'])
		},
		methods: {
			logout() {
				this.$store.dispatch('logout')
			},
			detect_current_page() {
				if (router.currentRoute.path === '/') {
					return "Home page"
				} else if (router.currentRoute.path === '/about') {
					return "About page"
				} else if (router.currentRoute.path === '/dashboard') {
					return "Country dashboard"
				} else if (router.currentRoute.path === '/statistics') {
					return "Global Dashboard"
				} else if (router.currentRoute.path === '/comments') {
					return "Experience Dashboard"
				} else if (router.currentRoute.path === '/settings') {
					return "Profile Settings"
                } else if (router.currentRoute.path === '/pinned') {
                    return "Pinned Countries"
                }
				return null
			}
		},
		created() {
			this.current_page = this.detect_current_page()
		}
	}
</script>
