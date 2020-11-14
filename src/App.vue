<template>
    <div id = "app">
        <div>
            <nav-bar v-if = "showNav"></nav-bar>
        </div>
        <router-view></router-view>
        <nav v-if = "showNav && !($router.currentRoute.path === '/settings')">
            <a @click = "scrollTop" id = "butt">
                <img alt = "goTop" src = "../public/GoTop.svg" class = "goTop">
            </a>
        </nav>
        <div  v-if = "showNav && !($router.currentRoute.path === '/settings')">
            <footer-page></footer-page>
        </div>
    </div>
</template>

<script>
	import {mapState} from 'vuex'
	import FooterPage from "@/components/FooterPage";
	
	export default {
		components: {
			FooterPage,
        },
		computed: {
			...mapState(['userProfile', 'country_options_dropdown']),
			showNav() {
				console.log("App.vue: userprofile keys: ", Object.keys(this.userProfile))
				console.log("App.vue: country_options_dropdown: ", this.country_options_dropdown.length)
				return Object.keys(this.userProfile).length > 1
					&& this.country_options_dropdown.length > 0
			},
		},
		created() {
			this.$store.dispatch("addCountries")
			console.log("App.vue: this.$store.dispatch(addCountries)")
		},
		methods: {
			scrollTop() {
				let butt = document.getElementById('butt');
				butt.onclick = function () {
					window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
					});
				}
			}
		}
	}
</script>

<style>
    @import './assets/main.css';
</style>
