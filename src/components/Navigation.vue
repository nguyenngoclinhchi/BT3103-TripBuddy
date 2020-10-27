<template>
    <header>
        <section>
            <div class = "col1">
                <router-link to = "/">
                    <h3>TRIP BUDDY</h3>
                </router-link>
                <ul class = "inline">
                    <li>
                        <router-link to = "/">Home</router-link>
                    </li>
                    <li>
                        <router-link to = "/about">About our app</router-link>
                    </li>
                    <li>
                        <router-link to = "/dashboard">Dashboard</router-link>
                    </li>
                    <li>
                        <router-link to = "/statistics">Explore statistics</router-link>
                    </li>
                    <li>
                        <router-link to = "/comments">Dashboard Comments</router-link>
                    </li>
                    <li>
                        <router-link to = "/settings">Settings</router-link>
                    </li>
                    <li>
                        <button @click = "logout()"
                                style = " border: none; color: white; background-color: white; cursor: pointer">
                            <img src = "../../public/log-out.svg" alt = "logout">
                        </button>
                    </li>
                </ul>
            </div>
        </section>
    </header>
</template>
<script>
	export default {
		name: "Navigation",
		components: {},
		data: function () {
			return {};
		},
		methods: {
			logout() {
				this.$store.dispatch('logout')
			}
		}
	}
</script>