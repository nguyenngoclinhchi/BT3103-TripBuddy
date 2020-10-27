<template>
    <div id = "app">
        <nav-bar v-if = "showNav"></nav-bar>
<!--        <notifications group="foo"></notifications>-->
        <router-view></router-view>
    </div>
</template>

<script>
	import {mapState} from 'vuex'
	
	export default {
		components: {
        },
		computed: {
			...mapState(['userProfile']),
			showNav() {
				console.log("userprofile length: ", Object.keys(this.userProfile).length)
				return Object.keys(this.userProfile).length > 1
			}
		},
	}
</script>

<style>
    @import './assets/main.css';
</style>
