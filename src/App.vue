<template>
    <div id = "app">
        <nav-bar v-if = "showNav"></nav-bar>
        <router-view></router-view>
    </div>
</template>

<script>
	import {mapState} from 'vuex'
	
	export default {
		computed: {
			...mapState(['userProfile']),
			showNav() {
				console.log("userprofile length: ", Object.keys(this.userProfile).length)
				return Object.keys(this.userProfile).length > 1
			}
		}
	}
</script>

<style>
    @import './assets/main.css';
</style>
