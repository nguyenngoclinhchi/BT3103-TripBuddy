<template>
    <div>
        <div class = "input_container">
           <ul>
                <li v-bind:class = "{ is_valid: contains_eight_characters }">8 Characters</li>
                <li v-bind:class = "{ is_valid: contains_number }">Contains Number</li>
                <li v-bind:class = "{ is_valid: contains_uppercase }">Contains Uppercase</li>
                <li v-bind:class = "{ is_valid: contains_special_character }">Contains Special Character</li>
            </ul>
            <div class = "checkmark_container" v-bind:class = "{ show_checkmark: valid_password }">
                <svg width = "50%" height = "50%" viewBox = "0 0 140 100">
                    <path class = "checkmark" v-bind:class = "{ checked: valid_password }" d = "M10,50 l25,40 l95,-70"/>
                </svg>
            </div>
            <p style="text-align: center">The password strength is <strong>{{checkPassword()}}</strong></p>
        </div>
    </div>
</template>

<script>
	export default {
		name: "Password",
		data() {
			return {
				password_length: 0,
				contains_eight_characters: false,
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
				this.contains_eight_characters = this.password_length > 8;
				this.contains_number = /\d/.test(this.passed_password);
				this.contains_uppercase = /[A-Z]/.test(this.passed_password);
				this.contains_special_character = format.test(this.passed_password);
				this.valid_password = this.contains_eight_characters === true &&
					this.contains_special_character === true &&
					this.contains_uppercase === true &&
					this.contains_number === true;
				this.$emit('valid_password', this.valid_password)
				if (this.valid_password) {
					return "strong"
                } else {
					return "weak"
                }
			}
		}
	}
</script>

<style scoped>
    html {
        box-sizing: border-box;
    }
    
    *, *:before, *:after {
        box-sizing: inherit;
    }
    
    html, body {
        height: 100%;
        width: 100%;
        margin: 0;
        padding: 0;
    }
    
    body {
        font-family: 'Open Sans', sans-serif;
        display: flex;
        justify-content: center;
        align-items: center;
        /*background: #ff6b6b;*/
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    
    h2 {
        text-align: center;
        color: #525f7f;
        font-weight: 400;
    }
    
    ul {
        padding-left: 20px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
    
    li {
        margin-bottom: 8px;
        color: #525f7f;
        position: relative;
    }
    
    li:before {
        content: "";
        width: 0;
        height: 2px;
        background: #2ecc71;
        position: absolute;
        left: 0;
        top: 50%;
        display: block;
        transition: all .6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    
    .input_container {
        position: relative;
        border-radius: 6px;
    }
    
    input[type="password"] {
        line-height: 1.5;
        display: block;
        color: rgba(136, 152, 170, 1);
        font-weight: 300;
        width: 100%;
        height: calc(2.75rem + 2px);
        padding: .625rem .75rem;
        border-radius: .25rem;
        background-color: #fff;
        transition: border-color .4s ease;
        border: 1px solid #cad1d7;
        outline: 0;
    }
    
    input[type="password"]:focus {
        border-color: rgba(50, 151, 211, .45);
    }
    
    .is_valid {
        color: rgba(136, 152, 170, 0.8);
    }
    
    .is_valid:before {
        width: 100%;
    }
    
    .checkmark_container {
        border-radius: 50%;
        position: absolute;
        top: -15px;
        right: -15px;
        background: #2ecc71;
        width: 50px;
        height: 50px;
        visibility: hidden;
        opacity: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: opacity .4s ease;
    }
    
    .show_checkmark {
        visibility: visible;
        opacity: 1;
    }
    
    .checkmark {
        width: 100%;
        height: 100%;
        fill: none;
        stroke: white;
        stroke-width: 15;
        stroke-linecap: round;
        stroke-dasharray: 180;
        stroke-dashoffset: 180;
    }
    
    .checked {
        animation: draw 0.5s ease forwards;
    }
    
    @keyframes draw {
        to {
            stroke-dashoffset: 0;
        }
    }
</style>