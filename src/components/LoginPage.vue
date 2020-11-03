<template>
    <div id = "login">
        <PasswordReset @close = "togglePasswordReset()" v-if = "showPasswordReset"></PasswordReset>
        <section>
            <div class = "col1">
                <galaxy></galaxy>
                <h1>Trip Buddy</h1>
                <p>TripBuddy is a travel advisory application that provides potential travellers with all the necessary
                   and latest information needed to plan for their travels during the COVID-19 pandemic following the
                   gradual lifting of travel restrictions in some countries. Through a thorough assessment of government
                   policy responses based on the context of each country, the web application aims to give
                   recommendations to users depending on the safety of the destination country and the user profile.</p>
            </div>
            <div :class = "{ 'signup-form': !showLoginForm }" class = "col2" style = "overflow-y: auto">
                <form @submit.prevent v-if = "showLoginForm">
                    <div class = "logo" style = "padding:5%; max-width: 480px">
                        <img alt = "logo" src = "../../public/logo.svg" style = "height:300px;width:550px;padding-bottom:5px">
                    </div>
                    <div>
                        <label for = "email1">Email</label>
                        <input id = "email1" placeholder = "you@email.com" type = "text" v-model.trim = "loginForm.email"/>
                    </div>
                    <div>
                        <label for = "password1">Password</label>
                        <label>
                            <input autocomplete = "off" id = "password1" placeholder = "Password" type = "password"
                                   v-model = "loginForm.password"/>
                        </label>
                    </div>
                    <md-button
                            @click = "login()" class = "md-raised md-primary">Log In</md-button>
                    <div class = "extras">
                        <a @click = "togglePasswordReset()">Forgot Password</a>
                        <a @click = "toggleForm()">Create an Account</a>
                    </div>
                </form>
                <form @submit.prevent v-else style = "padding-top: 5vh">
                    <div>
                        <label for = "name">Name</label>
                        <input id = "name" placeholder = "Full Name" type = "text" v-model.trim = "signupForm.name"/>
                    </div>
                    <div>
                        <b-form-group label = "Nationality" style = "margin: 0; padding: 0">
                            <b-form-tags v-model = "signupForm.nationality" no-outer-focus class = "mb-2">
                                <template v-slot = "{ tags, disabled}">
                                    <ul v-if = "signupForm.nationality.length > 0" class = "list-inline d-inline-block mb-2">
                                        <li>
                                            <b-form-tag :disabled = "disabled" class = "list-inline-item" variant = "info"
                                                        @remove = "removeTagNationality()">
                                                {{signupForm.nationality[0]}}
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
                                                :key = "option" style = "font-size: 13px"
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
                    </div>
                    <div>
                        <b-form-group label = "Do you have any interest in any particular country? Feel free to make customized countries list"
                                      style = "margin: 0; padding: 0">
                            <b-form-tags v-model = "value" no-outer-focus class = "mb-2">
                                <template v-slot = "{ tags, disabled, addTag, removeTag }">
                                    <ul v-if = "tags.length > 0" class = "list-inline d-inline-block mb-2">
                                        <li v-for = "tag in tags" :key = "tag" class = "list-inline-item">
                                            <b-form-tag
                                                    @remove = "removeTag(tag)"
                                                    :title = "tag"
                                                    :disabled = "disabled"
                                                    variant = "info"
                                            >{{ tag }}
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
                                        <b-dropdown-item-button
                                                v-for = "option in availableOptions"
                                                :key = "option" style = "font-size: 13px"
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
                    </div>
                    <div>
                        <label for = "email2">Email</label>
                        <input id = "email2" placeholder = "you@email.com" type = "text"
                               v-model.trim = "signupForm.email"/>
                    </div>
                    <section>
                        <div class = "col3">
                            <label for = "password2">Password</label>
                            <password v-bind:passed_password = "signupForm.password"></password>
                            <input @input = "checkPasswordRegister" autocomplete = "off" id = "password2" placeholder = "Password"
                                   type = "password" v-model = "signupForm.password"/>
                        </div>
                        <div class = "col3">
                            <label for = "password2_confirm">
                                Confirm Password
                            </label>
                            <input @input = "checkPasswordConfirm" autocomplete = "off" id = "password2_confirm" placeholder = "Password"
                                   type = "password" v-model = "signupForm.confirm_password"/>
                            <p style = "text-align: center"
                               v-if = "!signupForm.confirm_password_match && signupForm.password.length > 0">
                                Password do not match</p>
                        </div>
                    </section>
                    <md-button
                            v-if = "!signupForm.contains_six_characters || signupForm.name === '' ||
                            signupForm.country ==='' || signupForm.email === '' || !signupForm.confirm_password_match"
                            class = "md-raised md-primary" disabled>
                        Submit
                    </md-button>
                    <md-button
                            v-else
                            @click = "signup()" class = "md-raised md-primary"> Submit</md-button>
                    <md-button
                            @click = "resetForm()" class = "md-raised md-accent"> Reset Form</md-button>
                    <div class = "extras">
                        <a @click = "resetForm(); toggleForm()">Back to Log In</a>
                    </div>
                </form>
            </div>
        </section>
    </div>
</template>

<script>
	import PasswordReset from '@/components/PasswordReset'
	import Password from "@/components/Password";
	import {mapState} from 'vuex'
	import Galaxy from "@/components/Galaxy";
	
	export default {
		components: {
			Password,
			PasswordReset,
			Galaxy
		},
		data() {
			return {
				loginForm: {
					email: '',
					password: '',
				},
				signupForm: {
					name: '',
					nationality: '',
					email: '',
					password: '',
					confirm_password: '',
					password_strength: '',
					confirm_password_match: false,
					contains_six_characters: false,
				},
				showLoginForm: true,
				showPasswordReset: false,
				points: [],
				steps: 0, //current step
				hueBase: 180, //base color out of 360
				hueRange: 60, //variance off of base
				maxSteps: 1000, //steps to completion
				numPoints: 10, //points per group
				subGroups: 4, //particle groups
				animation_speed: 5, //how many steps per frame
				sinkFactor: .99, //how fast distance decreases
				orbitMin: 0, //minimum rotation
				orbitMax: .01, //maximum rotation
				
				value: [],
				options: [],
				optionsNationality: [],
				search: '',
				searchNationality: '',
				
			}
		},
		methods: {
			toggleForm() {
				this.showLoginForm = !this.showLoginForm
			},
			togglePasswordReset() {
				this.showPasswordReset = !this.showPasswordReset
			},
			login() {
				this.$store.dispatch('login', {
					email: this.loginForm.email,
					password: this.loginForm.password
				})
			},
			signup() {
				this.$store.dispatch('signup', {
					email: this.signupForm.email,
					password: this.signupForm.password,
					name: this.signupForm.name,
					nationality: this.signupForm.nationality[0],
					country_interested: this.value
				})
			},
			checkPasswordRegister() {
				let password_length = this.signupForm.password.length;
				const format = /[ !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
				this.signupForm.contains_six_characters = password_length > 5;
				let contains_number = /\d/.test(this.signupForm.password);
				let contains_uppercase = /[A-Z]/.test(this.signupForm.password);
				let contains_special_character = format.test(this.signupForm.password);
				this.signupForm.password_strength = this.signupForm.contains_six_characters === true &&
					contains_special_character === true &&
					contains_uppercase === true &&
					contains_number === true;
				console.log("nationality: ", this.signupForm.nationality);
			},
			checkPasswordConfirm() {
				this.signupForm.confirm_password_match = this.signupForm.password === this.signupForm.confirm_password
			},
			onOptionClickNationality({option}) {
				this.signupForm.nationality = option;
				this.search = '';
			},
			onOptionClick({option, addTag}) {
				addTag(option)
				this.search = ''
			},
			removeTagNationality() {
				this.signupForm.nationality = ''
			},
			resetForm() {
				this.signupForm.name = ''
				this.signupForm.nationality = ''
				this.signupForm.email = ''
				this.signupForm.password = ''
				this.signupForm.confirm_password = ''
				this.signupForm.password_strength = ''
				this.signupForm.confirm_password_match = false
				this.signupForm.contains_six_characters = false
				this.search = ''
				this.value = []
			},
		},
		created() {
			this.$store.dispatch("addCountries")
			this.options = this.$store.state.country_options_dropdown
			this.optionsNationality = this.$store.state.country_options_dropdown
		},
		computed: {
			...mapState(['country_options_dropdown']),
			criteriaNationality() {
				return this.searchNationality.trim().toLowerCase()
			},
			availableOptionsNationality() {
				const criteria = this.criteriaNationality
				const options = this.optionsNationality.filter(opt => this.signupForm.nationality.indexOf(opt) === -1)
				if (criteria) {
					return options.filter(opt => opt.toLowerCase().indexOf(criteria) > -1);
				}
				return options
			},
			searchDescNationality() {
				if (this.criteriaNationality && this.availableOptionsNationality.length === 0) {
					return 'There are no tags matching your search criteria'
				}
				return ''
			},
			criteria() {
				return this.search.trim().toLowerCase()
			},
			availableOptions() {
				const criteria = this.criteria
				const options = this.options.filter(opt => this.value.indexOf(opt) === -1)
				if (criteria) {
					return options.filter(opt => opt.toLowerCase().indexOf(criteria) > -1);
				}
				return options
			},
			searchDesc() {
				if (this.criteria && this.availableOptions.length === 0) {
					return 'There are no tags matching your search criteria'
				}
				return ''
			},
		},
	}
</script>
<style>
</style>