<template>
    <div class = "mainPage">
        <h1>Welcome {{ userProfile.name }} to Trip Buddy Home page</h1>
    </div>
</template>
<script>
	import {mapState} from "vuex";
	
	export default {
		name: "MainPage",
		components: {},
		data: function () {
			return {
				name: 'Person',
				showPostModal: true,
			};
		},
		computed: {
			...mapState(['userProfile', 'posts'])
		},
		methods: {
			user() {
				return this.$store.getters.getUser;
			},
			setUser() {
				this.$store.dispatch("setUser");
			},
			closePostModal() {
				this.showPostModal = false;
			},
		},
		created() {
			this.setUser();
		}
	}
</script>
