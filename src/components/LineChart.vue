<template>
    <div>
        <GChart
                :data = "chartData"
                :options = "chartOptions"
                type = "LineChart"
        />
    </div>
</template>

<script>
	import {GChart} from 'vue-google-charts';
	import {mapState} from "vuex";
	import worldCode from "../all.json";
	import axios from 'axios';
	
	export default {
		name: 'LineChart',
		data() {
			return {
				title: 'COVID-19: Government Response Stringency Index',
				date: 'today',
				chartData: [
					['Date', 'Bhutan', 'Malaysia', 'Singapore', 'Fiji', 'Vietnam'],
				],
				chartOptions: {
					chart: {},
					//colorAxis: { colors: ["grey", "#52b2bf"] },
					height: 650,
					//backgroundColor: '#e6ecf0',
					title: 'Stringency Index Across Time',
					hAxis: {title: 'Date'},
					vAxis: {title: 'Stringency Index'}
				}
			}
		},
		methods: {
			date_function: function () {
				var currentDate = new Date();
				//console.log(currentDate);
				
				currentDate.setDate(currentDate.getDate() - 1);
				
				var formatted_date = currentDate.toJSON().slice(0, 10);
				//console.log(formatted_date);
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
			}
		},
		components: {
			GChart
		},
		computed: {
			...mapState(['userProfile', 'posts'])
		},
		mounted() {
			this.date = this.date_function()
			//console.log(this.chartData[0])
		},
		
		created() {
			/*var country_int = Array.from(this.userProfile.country_interested);
            this.chartData[0].push(this.userProfile.country_interested);
            console.log(this.chartData)*/
			var country_int = ['Bhutan', 'Malaysia', 'Singapore', 'Fiji', 'Vietnam'];
			var url = 'https://covidtrackerapi.bsg.ox.ac.uk/api/v2/stringency/date-range/2020-04-01/2020-10-31'
			axios.get(url).then(response => {
				for (let key in response.data.data) {
					let arr = [key];
					for (let countryKey in response.data.data[key]) {
						let alphaCode = countryKey + "";
						//let countryCode = this.findMatchingAlphaCode(alphaCode);
						let countryName = this.findMatchingCountryName(alphaCode);
						if (country_int.includes(countryName)) {
							let stringency = response.data.data[key][countryKey].confirmed;
							var i = country_int.indexOf(countryName);
							arr[i + 1] = parseFloat(stringency);
						} else continue;
					}
					this.chartData.push(arr)
				}
			})
		}
	}
</script>
