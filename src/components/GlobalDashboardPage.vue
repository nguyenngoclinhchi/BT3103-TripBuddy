<template>
    <div id = "statistics_map">
        <div class = "container">
            <h3>{{title}}</h3>
            <div class = "block"></div>
            <h6>Last Refreshed: {{date}}</h6>
            <p>This is a composite measure based on nine response indicators including school closures, workplace
               closures, and travel bans, rescaled to a value from 0
               to 100 (100 = strictest).</p>
            <GChart
                    :data = "chartData"
                    :options = "chartOptions"
                    :settings = "{ packages: ['geochart'] }"
                    type = "GeoChart"/>
            <br>
            <h6>Last Refreshed: {{date}}</h6>
            <p>Measure is rescaled to a value from 0 to 100 (100 = strictest)</p>
            <statistics-table></statistics-table>
        </div>
        <div style = "width: 30%; float:right; padding-top:300px ">
            <div style = "padding-top:50px;">
                <h1 style = "font-size:4rem;text-align:center"> Go anywhere </h1>
                <h4 style = "font-size:2rem;text-align:left"> It's your world and we'll help you explore it -
                                                              responsibly. As our flight paths reopen post COVID-19,
                                                              we seek to provide users with information to travel safely
                                                              through the <b>Government Response Stringency Index</b>, a
                                                              composite
                                                              meaure of indicators including school and workplace
                                                              closures, travel bans and more.
                </h4>
            </div>
        </div>
    </div>
</template>

<script>
	import {GChart} from 'vue-google-charts';
	import worldCode from "../all.json";
	import axios from 'axios';
	import statisticsTable from './StatisticsTable.vue';
	
	export default {
		name: 'Geochart',
		data() {
			return {
				title: 'COVID-19: Government Response Stringency Index',
				date: 'today',
				chartData: [
					['Country', 'Stringency Index']
				],
				chartOptions: {
					chart: {},
					height: 600,
					backgroundColor: '#e6ecf0',
				}
			}
		},
		methods: {
			date_function: function () {
				let currentDate = new Date();
				//console.log(currentDate);
				currentDate.setDate(currentDate.getDate() - 1);
				// console.log(formatted_date);
				return currentDate.toJSON().slice(0, 10);
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
			}
		},
		components: {
			GChart,
			statisticsTable
		},
		mounted() {
			this.date = this.date_function()
		},
		created() {
			// let arrayData = [['Country', 'Stringency']];
			let url = 'https://covidtrackerapi.bsg.ox.ac.uk/api/v2/stringency/date-range/' + this.date_function() + '/' + this.date_function() + '';
			//var url = 'https://covidtrackerapi.bsg.ox.ac.uk/api/v2/stringency/date-range/2020-10-16/2020-10-16'
			axios.get(url).then(response => {
				for (let key in response.data.data) {
					for (let countryKey in response.data.data[key]) {
						let stringency = response.data.data[key][countryKey].stringency;
						//console.log(stringency)
						let alphaCode = countryKey + "";
						let countryCode = this.findMatchingAlphaCode(alphaCode);
						if (countryCode === "null") {
							continue;
						}
						let countryName = this.findMatchingCountryName(alphaCode)
						let countryData = [{v: countryCode, f: countryName}, stringency];
						this.chartData.push(countryData)
					}
				}
			})
			// console.log(arrayData)
		},
	}
</script>