<template>
    <div class="mainPage" style="margin-left: 100px; margin-right: 100px;">
		<div id="greeting" style="color: white; content-align:center;">
			<h1 style='font-size: 30px'>{{greeting}}, {{ userProfile.name }}. Welcome to TripBuddy </h1>
			<h4 style='font-size: 15px'>Last Refreshed: {{date}}</h4><br>
		</div>
		<div id="top">
			<div class="centered">
				<GlobalDashboard></GlobalDashboard>
			</div>
		</div>
		<hr>
		<div id="mid" style="padding-top: 40px">
			<div style="width: 30%; float:left; padding-top: 100px;">
				<h1 style="font-size:50px;text-align:center"> Staying cognizant </h1>
				<h4 style="font-size:15px;text-align:left"> While measures ease, it remains critical that we
					remain aware of key pandemic statistics as we continue to combat COVID-19 as a society
				</h4>
			</div>
			<div style="width: 70%; float:right">
				<div class="row" style="padding: 100px">
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
			</div>
		</div>
		<hr>	
		<div id="bottom">
			<div class="row">
				<div class="column1" style="width: 60%; float:left; ">
					<div class="card" style="background-color: white; padding: 0px;">
						<bubblechart></bubblechart>
					</div>
				</div>
				<div class="column2" style="width: 40%; float:right; padding-top: 200px;">
					<h1 style="font-size:50px;text-align:center"> Make informed decisions </h1>
					<h4 style="font-size:15px;text-align:center"> Leveraging on the Stringency Index, you can compare
						your countrys of interest to understand how they fare as compared to other countries through
						this bubble chart, enabling you to make more informed decisions before travelling.
					</h4>
				</div>
			</div>
		</div>	


		<br>

    </div>
</template>
<script>
	import {mapState} from "vuex";
	import bubblechart from './BubbleChart.vue'
	import axios from 'axios';
	import GlobalDashboard from './GlobalDashboardPage.vue';
	
	export default {
		name: "MainPage",
		components: {
			bubblechart,
			GlobalDashboard 
		},
		data: function () {
			return {
				name: 'Person',
				date: 'today',
				totalCases: null,
				totalDeaths: null,
				totalRecovered: null,
				showPostModal: true,
				greeting: null
			};
		},
		computed: {
			...mapState(['userProfile', 'posts']),
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
			},
			getGreeting: function() {
                var today = new Date();
                var cur = today.getHours();
                if (cur < 12) {
                    return 'Good morning'
                } else if (cur < 18) {
                    return 'Good afternoon'
                } else {
                    return 'Good evening'
                }				
			},
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
			this.greeting = this.getGreeting();
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

.savedlist {
	width: 40%;
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

#top {
    top: 0;
	height: 1400px;
}

#bottom {
    bottom: 0;
}

#mid {
	height: 400px;
}

#greeting {
	background-color: rgb(41, 106, 192);
	height: 85px;
	border-radius: 15px;
}


</style>
