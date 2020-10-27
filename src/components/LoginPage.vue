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
                        <input id = "password1" placeholder = "******" type = "password" v-model.trim = "loginForm.password"/>
                    </div>
                    <button @click = "login()" class = "button">Log In</button>
                    <div class = "extras">
                        <a @click = "togglePasswordReset()">Forgot Password</a>
                        <a @click = "toggleForm()">Create an Account</a>
                    </div>
                </form>
                <form @submit.prevent v-else>
                    <h1>Let's get Started</h1>
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
                        <input id = "password2" placeholder = "min 6 characters" type = "password" v-model.trim = "signupForm.password"/>
                    </div>
                    <button @click = "signup()" class = "button">Sign Up</button>
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
	
	export default {
		components: {
			PasswordReset
		},
		data() {
			return {
				loginForm: {
					email: '',
					password: ''
				},
				signupForm: {
					name: '',
					country: '',
					email: '',
					password: ''
				},
				showLoginForm: true,
				showPasswordReset: false
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
			}
		}
	}
</script>
