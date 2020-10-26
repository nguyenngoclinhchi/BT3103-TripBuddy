<template>
  <div style="background-color: white;">
    <div style="padding-right:15%; padding-left:15%; padding-bottom:15%;">
        <div class="logo" style="padding:5%;  border-radius: 1rem 1rem 0 0;">
            <img src="../../public/logo.png" style="height:300px;width:550px;padding-bottom:5px">
        </div>
        <h1 style="color:DARKCYAN; font-size:3vh; text-align:center">LOG IN</h1>
        <form @submit.prevent='submitForm'>
        <!-- Email field -->
        <md-field :class="validate('email')">
            <label>Email:</label>
            <md-input v-model="email"></md-input>
            <!-- Checking validity of email -->
            <span v-if="!$v.email.required && !$v.email.$dirty" class="text-danger">Valid email required!</span> 
            <span v-if="!$v.email.email && !$v.email.$dirty" class="text-danger">Valid email required!</span>
        </md-field>
        <md-field :class="validate('password')">
        <!-- Password field -->
            <label>Password:</label>
            <md-input v-model="password" type="password"></md-input>
            <!-- Checking validity of password -->
            <span v-if="!$v.password.required && !$v.password.$dirty" class="text-danger">Password required!</span>
            <span v-if="!$v.password.minLength && !$v.email.$dirty" class="text-danger">Password is too short; Should be at least {{$v.password.$params.minLength.min}}</span>
        </md-field>
        <input type="submit" class="btn-primary mt-2">
        </form>
    </div>
  </div>
</template>

<script>
    import { validationMixin } from "vuelidate";
    import { required, minLength, email } from "vuelidate/lib/validators";
    export default {
        name: "LoginPage",
        components: {},
        data: function() {
            return {
                email: '',
                password: ''
            }
        },
        mixins: [validationMixin],
        validations: {
            email: {
                required,
                email
            },
            password: {
                required,
                minLength: minLength(4)
            }
        },
        methods: {
            validate(field) { 
                const x = this.$v[field];
                if (x) {
                    return{
                        "md-invalid": field.$invalid && field.$dirty
                        // if email already entered, marked as invalid
                    }
                }
            },
            submitForm() {
                this.$v.$touch();
                if(!this.$v.$invalid) {
                    console.log(`Email: ${this.email}, Password: ${this.password}`)

                }
            }
        } 
    } 
</script>

<style scoped>
h1 {
  margin-bottom: 0;
}
body {
  background-size: cover;
  background-position:fixed;
  height: 120vh
}
.button {
  font-family: Gill Sans;
  border-radius: 4px;
  border: none;
  text-align: center;
  margin: 0;
  transition: all 0.5s;
  cursor: pointer;
} 
</style>