<template>
    <div style = "background-color: white;">
        <div style = "padding-right:15%; padding-left:15%; padding-bottom:15%;">
            <div class = "logo" style = "padding:5%;  border-radius: 1rem 1rem 0 0;">
                <img src = "../../public/logo.png" style = "height:300px;width:550px;padding-bottom:5px">
            </div>
            <div style = "text-align:center">
                <h1 style = "color:DARKCYAN; font-size:3vh; padding:5%;">SIGN UP</h1>
            </div>
            <form @submit.prevent = 'submitForm'>
                <!-- Name field -->
                <md-field :class = "validate('name')">
                    <label>Name:</label>
                    <md-input v-model = "name"></md-input>
                    <!-- Checking validity of name -->
                    <span class = "text-danger" v-if = "!$v.name.required && !$v.name.$dirty">Name required.</span>
                </md-field>
                <!-- Email field -->
                <md-field :class = "validate('email')">
                    <label>Email:</label>
                    <md-input v-model = "email"></md-input>
                    <!-- Checking validity of email -->
                    <span class = "text-danger" v-if = "!$v.email.required && !$v.email.$dirty">Email required.</span>
                    <span class = "text-danger" v-if = "!$v.email.email && !$v.email.$dirty">Please enter a valid email.</span>
                </md-field>
                <!-- Password field -->
                <md-field>
                    <label>Password:</label>
                    <md-input type = "password" v-model = "password"></md-input>
                    <!-- Checking validity of password -->
                    <span class = "text-danger" v-if = "!$v.password.required && !$v.password.$dirty">Password required!</span>
                    <span class = "text-danger" v-if = "!$v.password.minLength && !$v.email.$dirty">Password should be at least {{$v.password.$params.minLength.min}} characters</span>
                </md-field>
                <md-field>
                    <label>Confirm password:</label>
                    <md-input type = "password" v-model = "cfmpassword"></md-input>
                    <!-- Checking matching passwords -->
                    <span class = "text-danger" v-if = "!$v.password.sameAsPassword && !$v.password.$dirty">Passwords do not match.</span>
                </md-field>
                <input class = "btn-primary mt-2" type = "submit">
            </form>
        </div>
    </div>
</template>

<script>
	//    import database from "../../src/firebase.js";
	import {validationMixin} from "vuelidate";
	import {email, minLength, required, sameAs} from "vuelidate/lib/validators";
	
	export default {
		name: "LoginPage",
		components: {},
		data: function () {
			return {
				name: '',
				email: '',
				password: '',
				cfmpassword: '',
				travelpref: []
			}
		},
		mixins: [validationMixin],
		validations: {
			name: {
				required
			},
			email: {
				required,
				email
			},
			password: {
				required,
				minLength: minLength(4)
			},
			cfmpassword: {
				required,
				sameAsPassword: sameAs('password')
			}
		},
		methods: {
			validate(field) {
				const x = this.$v[field];
				if (x) {
					return {
						"md-invalid": field.$invalid && field.$dirty
						// if email already entered, marked as invalid
					}
				}
			},
			submitForm() {
				this.$v.$touch();
				if (!this.$v.$invalid) {
					console.log(`Account created -- Name: ${this.name}, Email: ${this.email}, Password: ${this.password}`)
				}
			}
		}
	}
</script>