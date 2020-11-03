<template>
    <div id = "app">
        <nav-bar v-if = "showNav"></nav-bar>
        <router-view></router-view>
    </div>
</template>

<script>
	import {mapState} from 'vuex'
	
	export default {
		components: {},
		computed: {
			...mapState(['userProfile', 'country_options_dropdown']),
			showNav() {
				console.log("App.vue: userprofile length: ", Object.keys(this.userProfile).length)
                console.log("App.vue: country_options_dropdown: ", this.country_options_dropdown.length)
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
