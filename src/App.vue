<template>
    <div id = "app">
        <nav-bar v-if = "showNav"></nav-bar>
        <router-view></router-view>
        <footer-page v-if = "showNavFooter"></footer-page>
    </div>
</template>

<script>
	import {mapState} from 'vuex'
	import FooterPage from "@/components/FooterPage";
	import router from "@/router";
	
	export default {
		components: {FooterPage},
		computed: {
			...mapState(['userProfile', 'country_options_dropdown']),
			showNav() {
				console.log("App.vue: userprofile keys: ", Object.keys(this.userProfile))
				console.log("App.vue: country_options_dropdown: ", this.country_options_dropdown.length)
				return Object.keys(this.userProfile).length > 1
					&& this.country_options_dropdown.length > 0
			},
			showNavFooter() {
				if (router.currentRoute.path === '/settings') {
					return false
				}
				return Object.keys(this.userProfile).length > 1
					&& this.country_options_dropdown.length > 0
			}
		},
		created() {
			this.$store.dispatch("addCountries")
			console.log("App.vue: this.$store.dispatch(addCountries)")
		},
	}
</script>

<style>
    @import './assets/main.css';
</style>
