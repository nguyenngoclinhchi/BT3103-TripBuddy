<template>
    <div id = "login">
        <PasswordReset @close = "togglePasswordReset()" v-if = "showPasswordReset"></PasswordReset>
        <section>
            <div class = "col1">
                <h1>Trip Buddy</h1>
                <p>TripBuddy is a travel advisory application that provides potential travellers with all the necessary
                   and latest information needed to plan for their travels during the COVID-19 pandemic following the
                   gradual lifting of travel restrictions in some countries. Through a thorough assessment of government
                   policy responses based on the context of each country, the web application aims to give
                   recommendations to users depending on the safety of the destination country and the user profile.</p>
            </div>
            <div :class = "{ 'signup-form': !showLoginForm }" class = "col2">
                <form @submit.prevent v-if = "showLoginForm">
                    <div class = "logo" style = "padding:5%">
                        <img alt = "logo" src = "../../public/logo.svg" style = "height:300px;width:550px;padding-bottom:5px">
                    </div>
                    <div>
                        <label for = "email1">Email</label>
                        <input id = "email1" placeholder = "you@email.com" type = "text" v-model.trim = "loginForm.email"/>
                    </div>
                    <div>
                        <label for = "password1">Password</label>
                        <label>
                            <input id = "password1" autocomplete = "off" placeholder = "Password" type = "password"
                                   v-model = "loginForm.password"/>
                        </label>
                    </div>
                    <button @click = "login()" class = "button">Log In</button>
                    <div class = "extras">
                        <a @click = "togglePasswordReset()">Forgot Password</a>
                        <a @click = "toggleForm()">Create an Account</a>
                    </div>
                </form>
                <form @submit.prevent v-else>
                    <h1 style="text-align: center">Let's get Started</h1>
                    <div>
                        <label for = "name">Name</label>
                        <input id = "name" placeholder = "Full Name" type = "text" v-model.trim = "signupForm.name"/>
                    </div>
                    <div>
                        <label for = "country">Country</label>
                        <input id = "country" placeholder = "Country" type = "text" v-model.trim = "signupForm.country"/>
                    </div>
                    <div>
                        <label for = "email2">Email</label>
                        <input id = "email2" placeholder = "you@email.com" type = "text" v-model.trim = "signupForm.email"/>
                    </div>
                    <div>
                        <label for = "password2">Password</label>
                        <password v-bind:passed_password = "signupForm.password"></password>
                        <label>
                            <input id = "password2" autocomplete = "off" placeholder = "Password" type = "password"
                                   v-model = "signupForm.password" @input = "checkPasswordRegister"/>
                        </label>
                        <label for = "password2_confirm">
                            Confirm Password
                        </label><input id = "password2_confirm" autocomplete = "off" placeholder = "Password" type = "password"
                                   v-model = "signupForm.confirm_password" @input = "checkPasswordConfirm"/>
                    </div>
                    <div>
                        <p style="text-align: center" v-if="!this.signupForm.confirm_password_match">Password do not match</p>
                    </div>
                    <button @click = "signup()" class = "button"
                            :disabled = "
                            !signupForm.password_strength ||
                            signupForm.name === '' ||
                            signupForm.country ==='' ||
                            signupForm.email === '' ||
                            !signupForm.confirm_password_match">Sign Up
                    </button>
                    <div class = "extras">
                        <a @click = "toggleForm()">Back to Log In</a>
                    </div>
                </form>
            </div>
        </section>
    </div>
</template>

<script>
	import PasswordReset from '@/components/PasswordReset'
	import Password from "@/components/Password";
	export default {
		components: {
			Password,
			PasswordReset
		},
		data() {
			return {
				loginForm: {
					email: '',
					password: '',
				},
				signupForm: {
					name: '',
					country: '',
					email: '',
					password: '',
                    confirm_password: '',
					password_strength: '',
					confirm_password_match: false
				},
				showLoginForm: true,
				showPasswordReset: false,
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
					country: this.signupForm.country
				})
			},
			checkPasswordRegister() {
				let password_length = this.signupForm.password.length;
				const format = /[ !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
				let contains_eight_characters = password_length > 8;
				let contains_number = /\d/.test(this.signupForm.password);
				let contains_uppercase = /[A-Z]/.test(this.signupForm.password);
				let contains_special_character = format.test(this.signupForm.password);
				this.signupForm.password_strength = contains_eight_characters === true &&
					contains_special_character === true &&
					contains_uppercase === true &&
					contains_number === true;
			},
			checkPasswordConfirm() {
				this.signupForm.confirm_password_match = this.signupForm.password === this.signupForm.confirm_password
            }
		}
	}
</script>
