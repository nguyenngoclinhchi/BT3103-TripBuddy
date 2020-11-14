<template>
    <div id = "settings" v-if = "showNav" style = "overflow-y: auto; padding-top: 25px">
        <div class = "accordion col1" role = "tablist">
            <b-card no-body class = "mb-1">
                <b-card-header header-tag = "header" class = "p-1" role = "tab">
                    <b-button block v-b-toggle.accordion-1 variant = "info">Update Name
                    </b-button>
                </b-card-header>
                <b-collapse id = "accordion-1" visible accordion = "my-accordion" role = "tabpanel">
                    <b-card-body>
                        <form @submit.prevent>
                            <label for = "name">Name</label>
                            <input :placeholder="userProfile.name" id = "name" type = "text" v-model.trim = "name"/>
                        </form>
                    </b-card-body>
                </b-collapse>
            </b-card>
            <b-card no-body class = "mb-1">
                <b-card-header header-tag = "header" class = "p-1" role = "tab">
                    <b-button block v-b-toggle.accordion-2 variant = "info" @click = "
                              nationality = (nationality != null)? nationality : userProfile.nationality">
                        Update Nationality
                    </b-button>
                </b-card-header>
                <b-collapse id = "accordion-2" accordion = "my-accordion" role = "tabpanel">
                    <b-card-body style = "height: 370px">
                        <b-form-group style = "margin: 0; padding: 0">
                            <b-form-tags v-model = "nationality" no-outer-focus class = "mb-2">
                                <template v-slot = "{ tags, disabled}">
                                    <ul v-if = "nationality != null && nationality.length > 0" class = "list-inline d-inline-block mb-2">
                                        <li>
                                            <b-form-tag :disabled = "disabled" class = "list-inline-item" variant = "info"
                                                        @remove = "removeTagNationality()">
                                                {{nationality[0]}}
                                            </b-form-tag>
                                        </li>
                                    </ul>
                                    <b-dropdown size = "sm" variant = "outline-info" block menu-class = "w-100"
                                                class = "my-scrolling-class">
                                        <template #button-content>
                                            <b-icon icon = "tag-fill"></b-icon>
                                            Choose countries
                                        </template>
                                        <b-dropdown-form @submit.stop.prevent = "() => {}">
                                            <b-form-group label-for = "tag-search-input-nationality" label = "Search countries"
                                                          label-cols-md = "auto" class = "mb-0"
                                                          label-size = "sm" :description = "searchDescNationality" :disabled = "disabled">
                                                <b-form-input v-model = "searchNationality" id = "tag-search-input-nationality" type = "search"
                                                              size = "sm" autocomplete = "on"></b-form-input>
                                            </b-form-group>
                                        </b-dropdown-form>
                                        <b-dropdown-divider></b-dropdown-divider>
                                        <b-dropdown-item-button
                                                v-for = "option in availableOptionsNationality"
                                                :key = "option"
                                                @click = "onOptionClickNationality({option})">
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
            <b-card no-body class = "mb-1">
                <b-card-header header-tag = "header" class = "p-1" role = "tab">
                    <b-button block v-b-toggle.accordion-3 variant = "info"
                              @click = "value = (value != null)? value : userProfile.country_interested">
                        Update customized pinned interesting countries
                    </b-button>
                </b-card-header>
                <b-collapse id = "accordion-3" accordion = "my-accordion" role = "tabpanel">
                    <b-card-body style = "min-height: 450px">
                        <b-form-group style = "margin: 0; padding: 0">
                            <b-form-tags v-model = "value" no-outer-focus class = "mb-2">
                                <template v-slot = "{ tags, disabled, addTag, removeTag }">
                                    <p v-if = "value.length === 0">
                                        There should be at least 1 pinned country in your profile
                                    </p>
                                    <ul v-if = "tags.length > 0" class = "list-inline d-inline-block mb-2">
                                        <li v-for = "tag in tags" :key = "tag" class = "list-inline-item">
                                            <b-form-tag @remove = "removeTag(tag)"
                                                        :title = "tag"
                                                        :disabled = "disabled"
                                                        variant = "info">
                                                {{ tag }}
                                            </b-form-tag>
                                        </li>
                                    </ul>
                                    <b-dropdown size = "sm" variant = "outline-info" block menu-class = "w-100"
                                                class = "my-scrolling-class">
                                        <template #button-content>
                                            <b-icon icon = "tag-fill"></b-icon>
                                            Choose countries
                                        </template>
                                        <b-dropdown-form @submit.stop.prevent = "() => {}">
                                            <b-form-group label-for = "tag-search-input" label = "Search countries"
                                                          label-cols-md = "auto" class = "mb-0"
                                                          label-size = "sm" :description = "searchDesc" :disabled = "disabled">
                                                <b-form-input v-model = "search" id = "tag-search-input" type = "search"
                                                              size = "sm" autocomplete = "on"></b-form-input>
                                            </b-form-group>
                                        </b-dropdown-form>
                                        <b-dropdown-divider></b-dropdown-divider>
                                        <b-dropdown-item-button v-for = "option in availableOptions"
                                                                :key = "option"
                                                                @click = "onOptionClick({ option, addTag })">
                                            {{ option }}
                                        </b-dropdown-item-button>
                                        <b-dropdown-text v-if = "availableOptions.length === 0">
                                            There are no countries available to select
                                        </b-dropdown-text>
                                    </b-dropdown>
                                </template>
                            </b-form-tags>
                        </b-form-group>
                    </b-card-body>
                </b-collapse>
            </b-card>
            <b-button style = "padding: 8px; width: 100%; height: 100%; display: block; overflow: hidden"
                      @click = "updateProfile(); $bvToast.show('my-toast')">Update Profile
            </b-button>
            <b-toast id = "my-toast" variant = "warning" solid>
                <template #toast-title>
                    <div class = "d-flex flex-grow-1 align-items-baseline">
                        <b-img blank blank-color = "#ff5555" class = "mr-2" width = "12" height = "12"></b-img>
                        <strong class = "mr-auto">Notice!</strong>
                        <small class = "text-muted mr-2">1 seconds ago</small>
                    </div>
                </template>
                The user profile has been updated. {{extraMessage}}
            </b-toast>
            <!--            <md-button-->
            <!--                    @click = "updateProfile()" class = "md-raised md-primary"-->
            <!--                    style = "padding: 10px; width: 97%; height: 100%; display: block; overflow: hidden">-->
            <!--                Update Profile-->
            <!--            </md-button>-->
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
