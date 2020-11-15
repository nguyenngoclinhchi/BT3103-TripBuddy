<template>
    <div id = "statistics_map">
        <div style = "padding: 50px">
            <section>
                <div class = "geo-map-section">
                    <GChart
                            :data = "chartData"
                            :options = "chartOptions"
                            :settings = "{ packages: ['geochart'] }"
                            type = "GeoChart"/>
                </div>
                <div class = "controls" style = "max-width: 400px; padding: 40px">
                    <div>
                        <h3> Go anywhere </h3>
                        <div class = "block"></div>
                        <p>
                            It's your world and we'll help you explore it - responsibly. As our flight paths reopen post
                            COVID-19, we seek to provide users with information to travel safely through the
                            <b>Government Response Stringency Index</b>, a composite measure of indicators including
                            school
                            and workplace closures, travel bans and more.
                        </p>
                    </div>
                </div>
            </section>
            <br>
            <h6>Last Refreshed: {{date}}</h6>
            <p>Measure is rescaled to a value from 0 to 100 (100 = strictest).</p>
            <statistics-table></statistics-table>
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
					backgroundColor: '#e6ecf0',
				}
			}
		},
		methods: {
			date_function: function () {
				let currentDate = new Date();
				currentDate.setDate(currentDate.getDate() - 1);
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
			let url = 'https://covidtrackerapi.bsg.ox.ac.uk/api/v2/stringency/date-range/' + this.date_function() + '/' + this.date_function() + '';
			axios.get(url).then(response => {
				for (let key in response.data.data) {
					for (let countryKey in response.data.data[key]) {
						let stringency = response.data.data[key][countryKey].stringency;
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
		},
	}
</script>