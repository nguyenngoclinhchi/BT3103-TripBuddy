<template>
    <div id = "settings" style = "overflow-y: auto; padding-top: 25px" v-if = "showNav">
        <div class="container">
            <div class = "accordion col1" role = "tablist">
                <b-card class = "mb-1" no-body>
                    <b-card-header class = "p-1" role = "tab">
                        <b-button block v-b-toggle.accordion-1 variant = "info">Update Name
                        </b-button>
                    </b-card-header>
                    <b-collapse accordion = "my-accordion" id = "accordion-1" role = "tabpanel" visible>
                        <b-card-body>
                            <form @submit.prevent>
                                <label for = "name">Name</label>
                                <input :placeholder = "userProfile.name" id = "name" type = "text" v-model.trim = "name"/>
                            </form>
                        </b-card-body>
                    </b-collapse>
                </b-card>
                <b-card class = "mb-1" no-body>
                    <b-card-header class = "p-1"  role = "tab">
                        <b-button @click = "
                              nationality = (nationality != null)? nationality : userProfile.nationality"
                                  block v-b-toggle.accordion-2 variant = "info">
                            Update Nationality
                        </b-button>
                    </b-card-header>
                    <b-collapse accordion = "my-accordion" id = "accordion-2" role = "tabpanel">
                        <b-card-body style = "height: 400px">
                            <b-form-group style = "margin: 0; padding: 0">
                                <b-form-tags class = "mb-2" no-outer-focus v-model = "nationality">
                                    <template v-slot = "{ disabled}">
                                        <ul class = "list-inline d-inline-block mb-2" v-if = "nationality != null && nationality.length > 0">
                                            <li>
                                                <b-form-tag :disabled = "disabled" @remove = "removeTagNationality()"
                                                            class = "list-inline-item" style="font-size: 1.1rem"
                                                            variant = "info">
                                                    {{nationality[0]}}
                                                </b-form-tag>
                                            </li>
                                        </ul>
                                        <b-dropdown block class = "my-scrolling-class" menu-class = "w-100" size = "sm"
                                                    variant = "outline-info">
                                            <template #button-content>
                                                <b-icon icon = "tag-fill"></b-icon>
                                                Choose countries
                                            </template>
                                            <b-dropdown-form @submit.stop.prevent = "() => {}">
                                                <b-form-group :description = "searchDescNationality" :disabled = "disabled"
                                                              class = "mb-0" label = "Search countries"
                                                              label-cols-md = "auto" label-for = "tag-search-input-nationality" label-size = "sm">
                                                    <b-form-input autocomplete = "on" id = "tag-search-input-nationality" size = "sm"
                                                                  type = "search" v-model = "searchNationality"></b-form-input>
                                                </b-form-group>
                                            </b-dropdown-form>
                                            <b-dropdown-divider></b-dropdown-divider>
                                            <b-dropdown-item-button
                                                    :key = "option"
                                                    @click = "onOptionClickNationality({option})"
                                                    v-for = "option in availableOptionsNationality">
                                                {{ option }}
                                            </b-dropdown-item-button>
                                            <b-dropdown-text v-if = "availableOptionsNationality.length === 0">
                                                There are no countries available to select
                                            </b-dropdown-text>
                                        </b-dropdown>
                                    </template>
                                </b-form-tags>
                            </b-form-group>
                        </b-card-body>
                    </b-collapse>
                </b-card>
                <b-card class = "mb-1" no-body>
                    <b-card-header class = "p-1"  role = "tab">
                        <b-button @click = "value = (value != null)? value : userProfile.country_interested" block v-b-toggle.accordion-3
                                  variant = "info">
                            Update customized pinned interesting countries
                        </b-button>
                    </b-card-header>
                    <b-collapse accordion = "my-accordion" id = "accordion-3" role = "tabpanel">
                        <b-card-body style = "min-height: 400px">
                            <b-form-group style = "margin: 0; padding: 0">
                                <b-form-tags class = "mb-2" no-outer-focus v-model = "value">
                                    <template v-slot = "{ tags, disabled, addTag, removeTag }">
                                        <p v-if = "value.length === 0">
                                            There should be at least 1 pinned country in your profile
                                        </p>
                                        <section>
                                            <div style="max-width: 400px">
                                                <ul class = "list-inline d-inline-block mb-2" v-if = "tags.length > 0">
                                                    <li :key = "tag" class = "list-inline-item" v-for = "tag in tags">
                                                        <b-form-tag :disabled = "disabled"
                                                                    :title = "tag"
                                                                    @remove = "removeTag(tag)"
                                                                    variant = "info" style="font-size: 0.9rem; margin-bottom: 5px;">
                                                            {{ tag }}
                                                        </b-form-tag>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div>
                                                <b-dropdown block class = "my-scrolling-class" menu-class = "w-100" size = "sm"
                                                            variant = "outline-info" style="min-width: 300px">
                                                    <template #button-content>
                                                        <b-icon icon = "tag-fill"></b-icon>
                                                        Choose countries
                                                    </template>
                                                    <b-dropdown-form @submit.stop.prevent = "() => {}">
                                                        <b-form-group :description = "searchDesc" :disabled = "disabled"
                                                                      class = "mb-0" label = "Search countries"
                                                                      label-cols-md = "auto" label-for = "tag-search-input" label-size = "sm">
                                                            <b-form-input autocomplete = "on" id = "tag-search-input" size = "sm"
                                                                          type = "search" v-model = "search"></b-form-input>
                                                        </b-form-group>
                                                    </b-dropdown-form>
                                                    <b-dropdown-divider></b-dropdown-divider>
                                                    <b-dropdown-item-button :key = "option"
                                                                            @click = "onOptionClick({ option, addTag })"
                                                                            v-for = "option in availableOptions">
                                                        {{ option }}
                                                    </b-dropdown-item-button>
                                                    <b-dropdown-text v-if = "availableOptions.length === 0">
                                                        There are no countries available to select
                                                    </b-dropdown-text>
                                                </b-dropdown>
                                            </div>
                                        </section>
                                    </template>
                                </b-form-tags>
                            </b-form-group>
                        </b-card-body>
                    </b-collapse>
                </b-card>
                <b-button @click = "updateProfile(); $bvToast.show('my-toast')"
                          style = "padding: 8px; width: 100%; height: 100%; display: block; overflow: hidden">Update Profile
                </b-button>
                <b-toast id = "my-toast" solid variant = "warning">
                    <template #toast-title>
                        <div class = "d-flex flex-grow-1 align-items-baseline">
                            <b-img blank blank-color = "#ff5555" class = "mr-2" height = "12" width = "12"></b-img>
                            <strong class = "mr-auto">Notice!</strong>
                            <small class = "text-muted mr-2">1 seconds ago</small>
                        </div>
                    </template>
                    The user profile has been updated. {{extraMessage}}
                </b-toast>
            </div>
        </div>
    </div>
</template>

<script>
	import {mapState} from 'vuex'
	
	export default {
		data() {
			return {
				name: '',
				showSuccess: false,
				nationality: null,
				value: null,
				options: this.$store.state.country_options_dropdown,
				optionsNationality: this.$store.state.country_options_dropdown,
				search: '',
				searchNationality: '',
				extraMessage: ''
			}
		},
		methods: {
			updateProfile() {
				console.log("updating Profile!!!")
				if (this.nationality.length === 0) {
					this.extraMessage += " Nationality is required when updating Profile, so it is reset back to old value."
				}
				if (this.value.length === 0) {
					this.extraMessage += " List of pinned country is required when updating Profile, so it is reset back to old value."
					
				}
				let updatedValueName = this.name !== '' ? this.name : this.userProfile.name
				let updatedValueNationality = this.nationality.length > 0 ? this.nationality[0] : this.userProfile.nationality
				let updatedInterestedCountry = this.value.length > 0 ? this.value : this.userProfile.country_interested
				this.$store.dispatch('updateProfile', {
					email: this.userProfile.email,
					name: updatedValueName,
					nationality: updatedValueNationality,
					country_interested: updatedInterestedCountry
				})
				this.name = updatedValueName
				this.nationality = updatedValueNationality
				this.value = updatedInterestedCountry
				this.showSuccess = true
				setTimeout(() => {
					this.showSuccess = false
				}, 2000)
			},
			onOptionClickNationality({option}) {
				console.log("nationality")
				this.nationality = option;
				this.search = '';
			},
			onOptionClick({option, addTag}) {
				addTag(option)
				this.search = ''
			},
			removeTagNationality() {
				console.log("removeTagNationality")
				this.nationality = []
			},
			updateValues() {
				console.log("UPDATE IS CALLED!")
				console.log("Previous value", this.value)
				console.log("Previous nationality", this.nationality)
				if (this.value === null) {
					console.log("After value", this.value)
					this.value = this.userProfile.country_interested
					console.log("value:", this.value)
				}
				if (this.nationality === null) {
					console.log("After nationality", this.nationality)
					this.nationality = []
					this.nationality.push(this.userProfile.nationality)
					console.log("nationality: ", this.nationality)
				}
			}
		},
		created() {
			this.options = this.$store.state.country_options_dropdown
			this.optionsNationality = this.$store.state.country_options_dropdown
		},
		computed: {
			...mapState(['userProfile', 'country_options_dropdown']),
			criteriaNationality() {
				console.log("criteriaNationality")
				return this.searchNationality.trim().toLowerCase()
			},
			availableOptionsNationality() {
				console.log("availableOptionsNationality")
				const criteria = this.criteriaNationality
				const options = this.optionsNationality.filter(opt => this.nationality.indexOf(opt) === -1)
				if (criteria) {
					return options.filter(opt => opt.toLowerCase().indexOf(criteria) > -1);
				}
				return options
			},
			searchDescNationality() {
				console.log("searchDescNationality")
				this.updateValues()
				if (this.criteriaNationality && this.availableOptionsNationality.length === 0) {
					return 'There are no tags matching your search criteria'
				}
				return ''
			},
			criteria() {
				console.log("criteria")
				return this.search.trim().toLowerCase()
			},
			availableOptions() {
				console.log("availableOptions")
				const criteria = this.criteria
				const options = this.options.filter(opt => this.value.indexOf(opt) === -1)
				if (criteria) {
					return options.filter(opt => opt.toLowerCase().indexOf(criteria) > -1);
				}
				return options
			},
			searchDesc() {
				console.log("searchDesc")
				this.updateValues()
				if (this.criteria && this.availableOptions.length === 0) {
					return 'There are no tags matching your search criteria'
				}
				return ''
			},
			showNav() {
				if (Object.keys(this.userProfile).length > 1 && (this.value === null || this.nationality === null)) {
					this.updateValues()
				}
				return Object.keys(this.userProfile).length > 1 && this.country_options_dropdown.length > 0
			}
		},
	}
</script>
