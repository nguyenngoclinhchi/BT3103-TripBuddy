<template>
    <div id = "pinnedCountries">
        <div class = "container">
            <h6>
                Last Refreshed: {{date}}
            </h6>
            <section class = "controls">
                <md-autocomplete v-model = "selectedOption" :md-options = "country_options_dropdown">
                    <label>Country</label>
                </md-autocomplete>
                <md-button @click = "updateData(selectedOption)" class = "md-raised md-primary"
                           style = "padding: 9px; display: block; overflow: hidden">
                    Search
                </md-button>
                <pin-a-country :selected-country = "selectedOption"></pin-a-country>
            </section>
            <p>
                Using shortcut search with PINNED country list by clicking in the country tag</p>
            <b-form-group>
                <md-chip class = "md-accent" v-for = "chip in userProfile.country_interested" :key = "chip"
                         md-clickable style = "padding-bottom:8px; margin-right: 5px"
                         @click = "selectedOption = chip; updateData(selectedOption)">
                    {{chip}}
                </md-chip>
            </b-form-group>
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
        </div>
        <b><h4 id = "title" style = "margin-left:40px; text-align: center"></h4></b>
        <div class = "chart">
            <canvas id = "mixedChart"></canvas>
        </div>
        <br>
        <h4 id = "deaths" style = "text-align:center; padding:5px"></h4>
        <br>
        
		<div class = "row">
			<div class = "column">
				<div class = "card" style = "background-color: #6699CC">
					<h3><b>{{regionDeaths}}</b></h3>
					<p id="total">Total Deaths in {{region}}</p>
				</div>
			</div>
			<div class = "column">
				<div class = "card" style = "background-color: #EF9D4C">
					<h3><b>{{countryDeaths}}</b></h3>
					<p>Total Deaths in {{country}}</p>
				</div>
			</div>
			<div class = "column">
				<div class = "card" style = "background-color: #29D2A5">
					<h3><b>{{percentage}}</b></h3>
					<p>of deaths in {{region}}</p>
				</div>
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
	import PinACountry from "@/components/PinACountry";
	export default {
		components: {
			PinACountry
        },
		data() {
			return {
				date: 'today',
				selectedOption: '',
				mixedChartData: mixedChartData,
				myChart: null,
				alertStatus: 0,
				region: '',
				country: '',
				regionDeaths: null,
				countryDeaths: null,
				percentage: null
			}
		},
		computed: {
			...mapState(['userProfile', 'country_options_dropdown'])
		},
		methods: {
			createChart: function (chartId, chartData) {
				try {
					const ctx = document.getElementById(chartId).getContext('2d');
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
			
			updateData: function (countryCode) {
				let code = countryCode.slice(1, 4)
				this.myChart.data.datasets[0].data = []
				this.myChart.data.datasets[1].data = []
				this.myChart.data.labels = []
				this.myChart.update()
				//let date = this.date
				const link = "https://covidtrackerapi.bsg.ox.ac.uk/api/v2/stringency/date-range/" +
                    this.prev_date() + "/" + this.date_function()
				axios.get(link).then(response => {
					// push data for the past 20 days
					for (let day in response.data.data) {
						for (let country in response.data.data[day]) {
							if (response.data.data[day][country].country_code === code) {
								this.myChart.data.datasets[0].data.push(response.data.data[day][country].confirmed / 1000)
								this.myChart.data.datasets[1].data.push(response.data.data[day][country].stringency)
								this.myChart.data.labels.push(response.data.data[day][country].date_value)
								this.myChart.update()
							}
						}
					}
				})
				let country = countryCode.substr(6)
				document.getElementById("title").innerHTML = "Monitoring " + country + "'s COVID-19 situation";
				
				// retrieve statistics for number of deaths
				document.getElementById("deaths").innerHTML = "Cases of death in " + country + " VS. others in the same region";
				const link2 = "https://covidtrackerapi.bsg.ox.ac.uk/api/v2/stringency/date-range/" + this.date_function() + "/" + this.date_function()
				let region = this.findRegion(code);
				let deaths = 0;
				let regiondeaths = 0;
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
					this.myChart2.data.datasets[0].data.push(deaths)
					this.myChart2.data.datasets[0].data.push(regiondeaths)
					this.myChart2.data.labels.push(country)
					this.myChart2.data.labels.push("Other countries in " + region)
					this.myChart2.update()
					let percentage = (deaths / regiondeaths).toFixed(3);
					let total = deaths + regiondeaths;
					this.regionDeaths = total
					this.countryDeaths = deaths
					this.percentage = percentage + "%"
					this.region = region
					this.country = country
				})
				// generate travel advisory
				const url = 'https://covidtrackerapi.bsg.ox.ac.uk/api/v2/stringency/actions/' + code + '/' + this.date_function();
				axios.get(url).then(response => {
					let SI = response.data.stringencyData.stringency
					if (SI > 50) {
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
							this.alertStatus = 2
						} else {
							// safe to travel
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
				currentDate.setDate(currentDate.getDate() - 5);
				return currentDate.toJSON().slice(0, 10);
			},
			prev_date: function () {
				let currentDate = new Date();
				currentDate.setDate(currentDate.getDate() - 35);
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
			this.date = this.date_function()
		},
		created() {
			console.log("Starting creating mixedChart")
			this.createChart("mixedChart", this.mixedChartData);
			this.date = this.date_function()
		}
	}
</script>