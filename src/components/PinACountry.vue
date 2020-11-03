<template>
    <div id = "statistics_form">
        <section>
            <md-button @click = "pinACountry(); $bvToast.show('my-toast')" class = "md-raised md-accent">
                Pin it!
            </md-button>
            <b-toast id = "my-toast" variant = "warning" solid @click="validPinnedCountry = false">
                <template #toast-title>
                    <div class = "d-flex flex-grow-1 align-items-baseline">
                        <b-img blank blank-color = "#ff5555" class = "mr-2" width = "12" height = "12"></b-img>
                        <strong class = "mr-auto">Notice!</strong>
                        <small class = "text-muted mr-2">1 seconds ago</small>
                    </div>
                </template>
                <p>
                    {{textMessage}}<br>
                    To edit full pinned country list, please proceed to <router-link to = "/settings">Settings page</router-link>
                </p>
            </b-toast>
        </section>
    </div>
</template>

<script>
	import {mapState} from "vuex";
	
	export default {
		data() {
			return {
				validPinnedCountry: false,
				textMessage: ''
			}
		},
		props: {
			selectedCountry: {
				type: String
			}
		},
		methods: {
			pinACountry() {
				console.log("validPinnedCountry: ", this.validPinnedCountry)
				let currentInterestedCountry = this.$store.state.userProfile.country_interested;
				console.log("currentInterestedCountry: ", currentInterestedCountry)
				if (!currentInterestedCountry.includes(this.selectedCountry)
					&& this.country_options_dropdown.includes(this.selectedCountry)) {
					currentInterestedCountry.push(this.selectedCountry)
					this.$store.dispatch('updateProfile', {
						name: this.userProfile.name,
						nationality: this.userProfile.nationality,
						country_interested: currentInterestedCountry
					})
                    this.textMessage = "SUCCESS: " + this.selectedCountry + " has been added to your customized pinned list of countries."
				} else {
					this.textMessage = "FAIL: " + this.selectedCountry + " has NOT been added to your customized pinned " +
                        "list of countries because this target country is already in the pinned list or its name is not in pre-defined list."
                }
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