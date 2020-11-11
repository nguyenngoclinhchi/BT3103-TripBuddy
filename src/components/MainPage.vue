<template>
    <div class = "mainPage" style="margin-left: 100px; margin-right: 100px">
        <h1>Welcome {{ userProfile.name }} to Trip Buddy Home page</h1>
		<h4>Last Refreshed: {{date}}</h4><br>
		<div class="row">
			<div class="column">
				<div class="card" style="background-color: #3498db">
					<h3><b>{{totalCases}}</b></h3>
					<p>Total Cases</p>
				</div>
			</div>
			<div class="column">
				<div class="card" style="background-color: #e74c3c">
					<h3><b>{{totalDeaths}}</b></h3>
					<p>Total Deaths</p>
				</div>
			</div>
			<div class="column">
				<div class="card" style="background-color: #2ecc71">
					<h3><b>{{totalRecovered}}</b></h3>
					<p>Total Recovered</p>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="column1">
				<div class="card" style="background-color: white; padding: 0px;">
					<bubblechart></bubblechart>
				</div>
			</div>
			<div class="column2">
				<div class="card" style="background-color: white; padding: 0px;">
				</div>
			</div>
		</div>
    </div>
</template>
<script>
	import {mapState} from "vuex";
	import bubblechart from './BubbleChart.vue'
	import axios from 'axios';
	
	export default {
		name: "MainPage",
		components: {
			bubblechart, 
		},
		data: function () {
			return {
				name: 'Person',
				date: 'today',
				totalCases: null,
				totalDeaths: null,
				totalRecovered: null,
				showPostModal: true,
			};
		},
		computed: {
			...mapState(['userProfile', 'posts'])
		},
		methods: {
			user() {
				return this.$store.getters.getUser;
			},
			setUser() {
				this.$store.dispatch("setUser");
			},
			closePostModal() {
				this.showPostModal = false;
			},
			date_function: function () {
				var currentDate = new Date();
				//console.log(currentDate);

				currentDate.setDate(currentDate.getDate()-1);
		
				var formatted_date = currentDate.toJSON().slice(0,10);
				//console.log(formatted_date);
				return formatted_date;
			
			},
			numberWithCommas: function(x) {
				return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
			}
		},
		created() {
			this.setUser();
			var url = 'https://api.covid19api.com/summary'
			axios.get(url).then(response => {
				this.totalCases = this.numberWithCommas(response.data.Global['TotalConfirmed']);
				this.totalDeaths = this.numberWithCommas(response.data.Global['TotalDeaths']);
				this.totalRecovered = this.numberWithCommas(response.data.Global['TotalRecovered']);
			})
		},
		mounted() {
			this.date = this.date_function();
		},
	}
</script>

<style scoped> /*will move this to main.css*/
@import url("https://fonts.googleapis.com/css2?family=Merriweather&display=swap");

* {
	box-sizing: border-box;
}
.column1 {
	float: left;
	width: 58%;
	padding: 0 30px;
	margin-top: 30px;
	margin-bottom: 20px;
}

.column2 {
	float: left;
	width: 40%;
	padding: 0 10px;
	margin-top: 30px;
	margin-bottom: 20px;
}

p {
	text-align: left;
	font-size: 18px;
}

h3 {
	text-align: left;
	font-size: 38px;
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}

/* Float four columns side by side */
.column {
  float: left;
  width: 33%;
  padding: 0 30px;
}

/* Remove extra left and right margins, due to padding */
.row {margin: 0 -5px;}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}

/* Responsive columns */
@media screen and (max-width: 600px) {
  .column {
    width: 100%;
    display: block;
    margin-bottom: 20px;
  }
}

/* Style the counter cards */
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  padding: 12px;
  text-align: center;
  background-color: #f1f1f1;
  color: #fff;
  box-shadow: 7px 6px 26px -17px rgba(0, 0, 0, 1);
}

</style>
