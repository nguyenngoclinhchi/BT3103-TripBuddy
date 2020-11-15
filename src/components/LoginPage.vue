<template>
    <div id = "login" style = "max-height: 100vh">
        <PasswordReset @close = "togglePasswordReset()" v-if = "showPasswordReset"></PasswordReset>
        <section>
            <div class = "col1">
                <div>
                    <img alt = "logo" src = "../assets/logo1.png"
                         style = "width: 270px; display: block; padding-top: 20px; margin-left: auto; margin-right: auto">
                </div>
                <h1>tripBuddy</h1>
                <p>
                    tripBuddy is a travel advisory application that provides potential travellers with all the necessary
                    and latest information needed to plan for their travels during the COVID-19 pandemic following the
                    gradual lifting of travel restrictions in some countries. Through a thorough assessment of
                    government
                    policy responses based on the context of each country, the web application aims to give
                    recommendations to users depending on the safety of the destination country and the user
                    profile.</p>
            </div>
            <div :class = "{ 'signup-form': !showLoginForm }" class = "col2" style = "overflow-y: auto">
                <form @submit.prevent v-if = "showLoginForm" style = "margin-top: 20px">
                    <p class="slogan">
                        Travel safe, Worry less
                    </p>
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
                            @click = "login()" class = "md-raised md-primary">Log In
                    </md-button>
                    <div class = "extras">
                        <a @click = "togglePasswordReset()">Forgot Password</a>
                        <a @click = "toggleForm()">Create an Account</a>
                    </div>
                </form>
                <form @submit.prevent style = "padding-top: 5vh" v-else>
                    <div>
                        <b-form-group label = "Name">
                            <label>
                                <input placeholder = "Full Name" type = "text" v-model.trim = "signupForm.name"/>
                            </label>
                        </b-form-group>
                    </div>
                    <div>
                        <b-form-group label = "Nationality" style = "margin: 0; padding: 0">
                            <b-form-tags class = "mb-2" no-outer-focus v-model = "signupForm.nationality">
                                <template v-slot = "{ disabled}">
                                    <ul class = "list-inline d-inline-block mb-2" v-if = "signupForm.nationality.length > 0">
                                        <li>
                                            <b-form-tag :disabled = "disabled" @remove = "removeTagNationality()"
                                                        class = "list-inline-item" style = "font-size: 0.9rem"
                                                        variant = "info">
                                                {{signupForm.nationality[0]}}
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
                    </div>
                    <div>
                        <b-form-group label = "Do you have any interest in any particular country? Feel free to make customized countries list"
                                      style = "margin: 0; padding: 0">
                            <b-form-tags class = "mb-2" no-outer-focus v-model = "value">
                                <template v-slot = "{ tags, disabled, addTag, removeTag }">
                                    <p style = "text-align: center" v-if = "value.length === 0">
                                        There should be at least 1 pinned country in your profile
                                    </p>
                                    <ul class = "list-inline d-inline-block mb-2" v-if = "tags.length > 0">
                                        <li :key = "tag" class = "list-inline-item" v-for = "tag in tags">
                                            <b-form-tag
                                                    :disabled = "disabled" :title = "tag" @remove = "removeTag(tag)"
                                                    style = "font-size: 0.9rem; margin-bottom: 5px;" variant = "info"
                                            >{{ tag }}
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
                                            <b-form-group :description = "searchDesc" :disabled = "disabled"
                                                          class = "mb-0" label = "Search countries"
                                                          label-cols-md = "auto" label-for = "tag-search-input" label-size = "sm">
                                                <b-form-input autocomplete = "on" id = "tag-search-input" size = "sm"
                                                              type = "search" v-model = "search"></b-form-input>
                                            </b-form-group>
                                        </b-dropdown-form>
                                        <b-dropdown-divider></b-dropdown-divider>
                                        <b-dropdown-item-button
                                                :key = "option"
                                                @click = "onOptionClick({ option, addTag })"
                                                v-for = "option in availableOptions">
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
                            <br><em>Password requirement</em>
                            <password v-bind:passed_password = "signupForm.password"></password>
                        </div>
                        <div class = "col3">
                            <md-field>
                                <label>Password</label>
                                <md-input @input = "checkPasswordRegister" style = "padding: 0"
                                          type = "password" v-model = "signupForm.password"></md-input>
                            </md-field>
                            <md-field>
                                <label>Confirm password</label>
                                <md-input @input = "checkPasswordConfirm" style = "padding: 0"
                                          type = "password" v-model = "signupForm.confirm_password"></md-input>
                            </md-field>
                            <p style = "text-align: center"
                               v-if = "!signupForm.confirm_password_match && signupForm.password.length > 0">
                                Password do not match</p>
                        </div>
                    </section>
                    <md-button
                            class = "md-raised md-primary"
                            disabled v-if = "!signupForm.contains_six_characters || signupForm.name === '' ||
                            signupForm.nationality === '' || signupForm.email === '' || !signupForm.confirm_password_match ||
                            value.length === 0">
                        Submit
                    </md-button>
                    <md-button
                            @click = "signup()"
                            class = "md-raised md-primary" v-else> Submit
                    </md-button>
                    <md-button
                            @click = "resetForm()" class = "md-raised md-accent"> Reset Form
                    </md-button>
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
	// import Galaxy from "@/components/Galaxy";
	
	export default {
		components: {
			Password,
			PasswordReset,
			// Galaxy
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