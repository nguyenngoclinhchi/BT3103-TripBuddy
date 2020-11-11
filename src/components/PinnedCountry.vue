<template>
    <div id = "pinnedCountries">
        <div class = "container" style = "margin-top: 25px">
            <h6>
                Last Refreshed: {{date}}
            </h6>
            <section>
                <md-autocomplete v-model = "selectedOption" :md-options = "userProfile.country_interested">
                    <label>Pinned Countries</label>
                </md-autocomplete>
                <md-button @click = "updateData(selectedOption)" class = "md-raised md-primary">
                    Display
                </md-button>
            </section>
            <h6>
                <p style = "padding-bottom: 20px; text-align: right">
                    <i>View your pinned countries by selecting from the dropdown button and click Display button</i>
                </p>
            </h6>
            
            <div v-if = "this.alertStatus === 0">
                <b-alert show variant = "secondary">
                    <div class = "alert-heading" style = "display:inline-block;vertical-align:top;padding:10px">
                        <img src = "https://i.pinimg.com/originals/f4/60/7f/f4607f44077947f21ffdcdb34c4cd850.png" style = "width:30px;height:30px;" alt = "flight">
                    </div>
                    <h5 class = "alert-heading" style = "display:inline-block">
                        No advisories found!
                    </h5>
                    <p>
                        Search for country to receive travel advisories
                    </p>
                </b-alert>
            </div>
            <div v-if = "this.alertStatus === 1">
                <b-alert show variant = "success">
                    <div class = "alert-heading" style = "display:inline-block;vertical-align:top;padding:10px">
                        <img src = "https://i.pinimg.com/originals/f4/60/7f/f4607f44077947f21ffdcdb34c4cd850.png" style = "width:30px;height:30px;" alt = "flight">
                    </div>
                    <h5 class = "alert-heading" style = "display:inline-block">
                        Level 1 - Safe to travel; Exercise Normal Precautions
                    </h5>
                    <p>
                        Have a safe trip!
                    </p>
                </b-alert>
            </div>
            <div v-if = "this.alertStatus === 2">
                <b-alert show variant = "warning">
                    <div class = "alert-heading" style = "display:inline-block;vertical-align:top;padding:10px">
                        <img src = "https://i.pinimg.com/originals/f4/60/7f/f4607f44077947f21ffdcdb34c4cd850.png" style = "width:30px;height:30px;" alt = "flight">
                    </div>
                    <h5 class = "alert-heading" style = "display:inline-block">
                        Level 2 - Exercise Increased Caution!
                    </h5>
                    <p>
                        Be aware of heightened risks to safety and security. Elderly & children to take extra care.
                    </p>
                </b-alert>
            </div>
            <div v-if = "this.alertStatus === 3">
                <b-alert show variant = "danger">
                    <div class = "alert-heading" style = "display:inline-block;vertical-align:top;padding:10px">
                        <img src = "https://i.pinimg.com/originals/f4/60/7f/f4607f44077947f21ffdcdb34c4cd850.png" style = "width:30px;height:30px;" alt = "flight">
                    </div>
                    <h5 class = "alert-heading" style = "display:inline-block">
                        Level 3 - Not recommended to travel!
                    </h5>
                    <p>
                        Avoid travel due to serious risks to safety and security.
                    </p>
                </b-alert>
            </div>
            <p id = "notification_processing"></p>
            <!--            <div id = "advisory" style = "margin-top: 20px; background-color:lightgrey">-->
            <!--                <div style = "display:inline-block;vertical-align:top;padding:10px">-->
            <!--                    <img src = "https://i.pinimg.com/originals/f4/60/7f/f4607f44077947f21ffdcdb34c4cd850.png" style = "width:30px;height:30px;" alt = "flight">-->
            <!--                </div>-->
            <!--                <div style = "display:inline-block; font-size:23px; padding: 13px">-->
            <!--                    <div id = "titleAdv"><u> Travel Advisory </u></div>-->
            <!--                </div>-->
            <!--                <p id = "recommend" style = "margin-left:60px; font-size:18px; color:white"></p>-->
            <!--                <p id = "comment" style = "margin-left:60px; font-size:18px; color:white"></p>-->
            <!--                <br>-->
            <!--            </div>-->
        </div>
        <b><h4 id = "title" style = "margin-left:40px; text-align: center"></h4></b>
        <div class = "chart">
            <canvas id = "mixedChart"></canvas>
        </div>
        <br>
        <h4 id = "deaths" style = "text-align:center;padding:5px"></h4>
        <br>
        <div class = "chart2">
            <div style = "width: 50%; float:left; margin-left:150px">
                <canvas id = "doughnutChart"></canvas>
            </div>
            <div style = "width:20%; float:right; text-align:center; margin-right:200px">
                <br> <br> <br>
                <h1 id = "%deaths"><b> </b></h1>
                <p id = "text"></p>
                <br>
                <h1 id = "total"><b> </b></h1>
                <p id = "regionDeaths"></p>
            </div>
        </div>
        <br>
    
    </div>

</template>

<script>
	import {mapState} from "vuex";
	import Chart from 'chart.js';
	import mixedChartData from "../mixedChart.js";
	import axios from 'axios';
	import worldCode from "../all.json";
	import doughnutChartData from "../doughnut.js";
	
	export default {
		data() {
			return {
				date: 'today',
				selectedOption: '',
				mixedChartData: mixedChartData,
				myChart: null,
				doughnutChartData: doughnutChartData,
				myChart2: null,
				alertStatus: 0
			}
		},
		computed: {
			...mapState(['userProfile'])
		},
		methods: {
			createChart: function (chartId, chartData) {
				try {
					const ctx = document.getElementById(chartId);
					this.myChart = new Chart(ctx, {
						type: chartData.type,
						data: chartData.data,
						optionsSortingElement: chartData.options
					});
					this.myChart.update()
				} catch (e) {
					console.log(e.message);
				}
			},
			
			createChart2: function (chartId, chartData) {
				try {
					const ctx = document.getElementById(chartId);
					this.myChart2 = new Chart(ctx, {
						type: chartData.type,
						data: chartData.data,
						options: chartData.options
					});
					this.myChart2.update()
				} catch (e) {
					console.log(e.message);
				}
			},
			
			updateData: function (countryCode) {
				document.getElementById("notification_processing").innerHTML = "processing data for " + countryCode
				let code = countryCode.slice(1, 4)
				// clear previous data
				this.myChart.data.datasets[0].data = []
				this.myChart.data.datasets[1].data = []
				this.myChart.data.labels = []
				//let date = this.date
				const link = "https://covidtrackerapi.bsg.ox.ac.uk/api/v2/stringency/date-range/" + this.prev_date() + "/" + this.date_function()
				axios.get(link).then(response => {
					// push data for the past 20 days
					for (let day in response.data.data) {
						for (let country in response.data.data[day]) {
							if (response.data.data[day][country].country_code === code) {
								console.log(response.data.data[day][country].confirmed / 1000)
								this.myChart.data.datasets[0].data.push(response.data.data[day][country].confirmed / 1000)
								this.myChart.data.datasets[1].data.push(response.data.data[day][country].stringency)
								this.myChart.data.labels.push(response.data.data[day][country].date_value)
								
							}
						}
					}
				})
				let country = countryCode.substr(6)
				document.getElementById("title").innerHTML = "Monitoring " + country + "'s COVID-19 situation";
				
				// generate doughnut chart for number of deaths
				document.getElementById("deaths").innerHTML = "Cases of death in " + country + " VS. others in the same region";
				const link2 = "https://covidtrackerapi.bsg.ox.ac.uk/api/v2/stringency/date-range/" + this.date_function() + "/" + this.date_function()
				let region = this.findRegion(code);
				let deaths = 0;
				let regiondeaths = 0;
				this.myChart2.data.datasets[0].data = []
				this.myChart2.data.labels = []
				axios.get(link2).then(response => {
					for (let day in response.data.data) {
						for (let country in response.data.data[day]) {
							if (response.data.data[day][country].country_code === code) {
								deaths = response.data.data[day][country].deaths
							} else {
								let foundRegion = this.findRegion(response.data.data[day][country].country_code)
								if (foundRegion === region) {
									regiondeaths = regiondeaths + response.data.data[day][country].deaths
								}
							}
						}
					}
					// console.log("deaths is: " + deaths)
					// console.log("region deaths is: " + regiondeaths)
					this.myChart2.data.datasets[0].data.push(deaths)
					this.myChart2.data.datasets[0].data.push(regiondeaths)
					this.myChart2.data.labels.push(country)
					this.myChart2.data.labels.push("Other countries in " + region)
					let percentage = (deaths / regiondeaths).toFixed(3);
					let total = deaths + regiondeaths;
					document.getElementById("%deaths").innerHTML = percentage + "%"
					document.getElementById("text").innerHTML = "of deaths in " + region
					document.getElementById("total").innerHTML = total
					document.getElementById("regionDeaths").innerHTML = "cases of deaths in total in " + region
				})
				// generate travel advisory
				const url = 'https://covidtrackerapi.bsg.ox.ac.uk/api/v2/stringency/actions/' + code + '/' + this.date_function();
				axios.get(url).then(response => {
					let SI = response.data.stringencyData.stringency
					if (SI > 50) {
						// document.getElementById("advisory").style.backgroundColor = "#ff4d4d"
						// document.getElementById("titleAdv").style.color = "white"
						// document.getElementById("recommend").innerHTML = "Level 3 - Not recommended to travel!"
						// document.getElementById("comment").innerHTML = "Avoid travel due to serious risks to safety and security."
						this.alertStatus = 3
					} else {
						let indic1 = 0;
						let indic2 = 0;
						let indic3 = 0;
						for (let record in response.data.policyActions) {
							let polCode = response.data.policyActions[record].policy_type_code
							if (polCode === "C7") {
								indic1 = response.data.policyActions[record].policyvalue_actual
							} else if (polCode === "C6") {
								indic2 = response.data.policyActions[record].policyvalue_actual
							} else if (polCode === "H3") {
								indic3 = response.data.policyActions[record].policyvalue_actual
							}
						}
						// travel with care
						if (indic1 > 2 || indic2 > 2 || indic3 > 2) {
							// document.getElementById("advisory").style.backgroundColor = "#ffc34d"
							// document.getElementById("titleAdv").style.color = "white"
							// document.getElementById("recommend").innerHTML = "Level 2 - Exercise Increased Caution!"
							// document.getElementById("comment").innerHTML = "Be aware of heightened risks to safety and security. Elderly & children to take extra care."
							this.alertStatus = 2
						} else {
							// safe to travel
							// document.getElementById("advisory").style.backgroundColor = "#00cc66"
							// document.getElementById("titleAdv").style.color = "white"
							// document.getElementById("recommend").innerHTML = "Level 1 - Safe to travel; Exercise Normal Precautions"
							// document.getElementById("comment").innerHTML = "Have a safe trip!"
							this.alertStatus = 1
						}
					}
				})
				try {
					console.log("Starting creating mixedChart")
					this.createChart("mixedChart", this.mixedChartData);
					console.log("Starting creating doughnutChart")
					this.createChart2("doughnutChart", this.doughnutChartData);
					this.date = this.date_function()
				} catch (e) {
					console.log(e.message)
				}
			},
			date_function: function () {
				let currentDate = new Date();
				//console.log(currentDate.toJSON());
				currentDate.setDate(currentDate.getDate() - 5);
				// console.log(formatted_date);
				return currentDate.toJSON().slice(0, 10);
			},
			prev_date: function () {
				let currentDate = new Date();
				currentDate.setDate(currentDate.getDate() - 35);
				// console.log(formatted_date);
				return currentDate.toJSON().slice(0, 10);
			},
			findRegion: function (alpha3) {
				for (let index = 0; index < worldCode.length; index++) {
					if (worldCode[index]["alpha-3"] === alpha3) {
						return worldCode[index]["sub-region"]
					}
				}
			}
		},
		mounted() {
			this.createChart("mixedChart", this.mixedChartData);
			this.createChart2("doughnutChart", this.doughnutChartData);
			this.date = this.date_function()
		}
	}
</script>

<style scoped>

</style>