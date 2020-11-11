<template>
    <div id="statistics_table">
        <vue-table-dynamic :params = "params" ref = "table"></vue-table-dynamic>
    </div>
</template>

<script>
	import VueTableDynamic from 'vue-table-dynamic'
	import worldCode from "../all.json";
	import axios from 'axios';
	
	export default {
		name: 'Demo',
		data() {
			return {
				params: {
					data: [
						['Country', 'Country Code', 'Confirmed Cases', 'Deaths', 'Stringency Index']
					],
					header: 'row',
					stripe: true,
					enableSearch: true,
					highlight: {row: [0]},
					sort: [0, 1, 2, 3, 4],
					height: 500,
					border: true,
					highlightedColor: '#52b2bf'
				}
			}
		},
		components: {VueTableDynamic},
		methods: {
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
			date_function: function () {
				let currentDate = new Date();
				currentDate.setDate(currentDate.getDate() - 1);
				let formatted_date = currentDate.toJSON().slice(0, 10);
				console.log(formatted_date);
				return formatted_date;
				
			},
		},
		created() {
			let url = 'https://covidtrackerapi.bsg.ox.ac.uk/api/v2/stringency/date-range/' + this.date_function() + '/' + this.date_function() + '';
			axios.get(url).then(response => {
				for (let key in response.data.data) {
					for (let countryKey in response.data.data[key]) {
						let stringency = response.data.data[key][countryKey].stringency;
						// console.log(stringency)
						let confirmed = response.data.data[key][countryKey].confirmed;
						let deaths = response.data.data[key][countryKey].deaths;
						let alphaCode = countryKey + "";
						//let countryCode = this.findMatchingAlphaCode(alphaCode);
						let countryName = this.findMatchingCountryName(alphaCode)
						if (countryName === "null") {
							continue;
						}
						let countryData = [countryName, alphaCode, confirmed, deaths, stringency];
						// console.log(countryData)
						this.params.data.push(countryData)
					}
				}
			})
		}
	}

</script>