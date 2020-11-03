<template>
    <div id = "statistics_form">
        <section>
            <md-button @click = "pinACountry(); $bvToast.show('my-toast')" class = "md-raised md-accent">
                Pin it!
            </md-button>
            <b-toast id = "my-toast" variant = "warning" solid>
                <template #toast-title>
                    <div class = "d-flex flex-grow-1 align-items-baseline">
                        <b-img blank blank-color = "#ff5555" class = "mr-2" width = "12" height = "12"></b-img>
                        <strong class = "mr-auto">Notice!</strong>
                        <small class = "text-muted mr-2">1 seconds ago</small>
                    </div>
                </template>
                <p>{{textMessage}}</p>
            </b-toast>
        </section>
    </div>
</template>

<script>
	import {mapState} from "vuex";
	
	export default {
		data() {
			return {
				textMessage: "<strong>" + this.selectedCountry + "</strong>" +
					" has been added to your customized pinned list of countries." +
					" To edit this full list, please proceed to <router-link to = \"/settings\">Settings page</router-link>"
			}
		},
		props: {
			selectedCountry: {
				type: String
			}
		},
		methods: {
			pinACountry() {
				let currentInterestedCountry = this.$store.state.userProfile.country_interested;
				if (currentInterestedCountry.includes(this.selectedCountry) <= -1
					&& this.country_options_dropdown.includes(this.selectedCountry)) {
					currentInterestedCountry.push(this.selectedCountry)
					this.$store.dispatch('updateProfile', {
						name: this.userProfile.name,
						nationality: this.userProfile.nationality,
						country_interested: currentInterestedCountry
					})
					return true
				}
				this.textMessage = "The target country" + "<strong>" + this.selectedCountry + "</strong>" +
					"is not added to the list as it is not included in pre-defined country list"
				return false
			}
		},
		created() {
			// this.$store.dispatch("addCountries")
		},
		computed: {
			...mapState(['userProfile', 'country_options_dropdown']),
		}
	}
</script>

<style scoped>
    .md-dialog {
        transform: translate(0%, 0%) scale(1) !important;
    }
</style>