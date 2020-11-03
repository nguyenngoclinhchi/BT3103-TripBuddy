<template>
    <div>
        <div id = "password">
            <ul style="padding-bottom: 0; margin: 0">
                <li v-bind:class = "{ is_valid: contains_six_characters }"><strong>Must</strong> contain 6 Characters</li>
                <li v-bind:class = "{ is_valid: contains_number }">Contain Number</li>
                <li v-bind:class = "{ is_valid: contains_uppercase }">Contain Uppercase</li>
                <li v-bind:class = "{ is_valid: contains_special_character }">Contain Special Character</li>
            </ul>
            <section style="padding: 0; margin: 0">
                <p v-if = "passed_password.length > 0" style = "padding: 0; text-align: center">
                    Password Strength: <strong>{{checkPassword()}}</strong>
                </p>
                <p v-else style = "padding: 0; text-align: center">
                    Password is <strong>empty</strong>
                </p>
                <div class = "checkmark_container" v-bind:class = "{ show_checkmark: valid_password }">
                    <svg height = "30%" viewBox = "0 0 140 100" width = "30%">
                        <path class = "checkmark" d = "M10,50 l25,40 l95,-70" v-bind:class = "{ checked: valid_password }"/>
                    </svg>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
	export default {
		name: "Password",
		data() {
			return {
				password_length: 0,
				contains_six_characters: false,
				contains_number: false,
				contains_uppercase: false,
				contains_special_character: false,
				valid_password: false,
			}
		},
		props: {
			passed_password: {
				type: String,
			},
		},
		methods: {
			checkPassword() {
				this.password_length = this.passed_password.length;
				const format = /[ !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
				this.contains_six_characters = this.password_length > 5;
				this.contains_number = /\d/.test(this.passed_password);
				this.contains_uppercase = /[A-Z]/.test(this.passed_password);
				this.contains_special_character = format.test(this.passed_password);
				this.valid_password = this.contains_six_characters === true &&
					this.contains_special_character === true &&
					this.contains_uppercase === true &&
					this.contains_number === true;
				if (this.valid_password) {
					return "strong"
				} else {
					return "weak"
				}
			}
		},
		computed() {
			this.checkPassword()
		}
	}
</script>