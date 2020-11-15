<template>
    <div>
        <GChart
                :data = "chartData"
                :options = "chartOptions"
                :settings = "{packages:[ 'corechart']}"
                type = "BubbleChart"/>
    </div>
</template>

<script>
	import {GChart} from 'vue-google-charts';
	import {mapState} from "vuex";
	import worldCode from "../all.json";
	import axios from 'axios';
	
	export default {
		name: 'BubbleChart',
		data() {
			return {
				title: 'COVID-19: Government Response Stringency Index',
				date: 'today',
				chartData: [
					['Country', 'Cases Fatality Rate (%)', 'Stringency Index', 'Pinned', 'Size'],
					['', -10, 0, 'No', 0]
				],
				chartOptions: {
					chart: {},
					colors: ['#CED4D3', '#52b2bf'],
					bubble: {opacity: 0.7},
					sortBubblesBySize: false,
					height: 650,
					legend: {position: 'none'},
					title: 'Stringency Index vs Cases Fataility Rate in Each Country',
					hAxis: {scaleType: 'log', title: 'Cases Fatality Rate (Logarithmic Scaling)'},
					vAxis: {title: 'Stringency Index'},
					sizeAxis: {maxSize: 25},
				}
			}
		},
		computed: {
			...mapState(['userProfile', 'posts'])
		},
		methods: {
			date_function: function () {
				var currentDate = new Date();
				currentDate.setDate(currentDate.getDate() - 1);
				var formatted_date = currentDate.toJSON().slice(0, 10);
				return formatted_date;
				
			},
			findMatchingAlphaCode: function (geoId) {
				for (let index = 0; index < worldCode.length; index++) {
					let id = geoId + "";
					if (worldCode[index]["alpha-3"] === id) {
						return worldCode[index]["alpha-2"];
					}
				}
				return "null";
			},
			findMatchingCountryName: function (geoId) {
				for (let index = 0; index < worldCode.length; index++) {
					let id = geoId + "";
					if (worldCode[index]["alpha-3"] === id) {
						return worldCode[index]["name"];
					}
				}
				return "null";
			},
		},
		components: {
			GChart
		},
		mounted() {
			this.date = this.date_function()
		},
		
		created() {
			var url = 'https://covidtrackerapi.bsg.ox.ac.uk/api/v2/stringency/date-range/' + this.date_function() + '/' + this.date_function()
			axios.get(url).then(response => {
				for (let key in response.data.data) {
					for (let countryKey in response.data.data[key]) {
						let stringency = parseFloat(response.data.data[key][countryKey].stringency);
						let confirmed = response.data.data[key][countryKey].confirmed;
						let deaths = response.data.data[key][countryKey].deaths;
						let alphaCode = countryKey + "";
						let countryName = this.findMatchingCountryName(alphaCode);
						if (countryName === "null") {
							continue;
						}
						let country = '[' + alphaCode + '] ' + countryName;
						let deathrate = parseFloat(0);
						if (confirmed != 0) { //account for division error
							deathrate = parseFloat((parseFloat(deaths) / parseFloat(confirmed)) * 100);
						}
						var countries_int = Array.from(this.userProfile.country_interested);
						let countryData = [country, parseFloat(deathrate), parseFloat(stringency), 'No', 0];
						if (countries_int.includes(country)) {
							countryData[3] = 'Yes';
							countryData[4] = 3;
						}
						this.chartData.push(countryData);
					}
				}
				//to ensure pinned countries bubbles appear on top
				var arr2 = [];
				for (let index = 1; index < this.chartData.length; index++) {
					if (countries_int.includes(this.chartData[index][0])) {
						var arr1 = this.chartData[index];
						arr2.push(arr1);
						this.chartData.splice(index, 1);
					}
				}
				for (let i = 0; i < arr2.length; i++) {
					this.chartData.push(arr2[i])
				}
			})
		}
	}
</script>
