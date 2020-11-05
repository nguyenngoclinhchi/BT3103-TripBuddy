<template>
<div id = "pinnedCountries">
    <div class = "container">
    <h6> <i> View your pinned countries by selecting from the dropdown button </i> </h6>
    <h6> <b> Last Refreshed: {{date}} </b> </h6>
    <md-autocomplete v-model = "selectedOption" :md-options = "userProfile.country_interested">
        <label>Pinned Countries</label>
    </md-autocomplete>
    <md-button @click = "updateData(selectedOption)" class = "md-raised md-primary" style = "padding: 9px; display: block; overflow: hidden">
        Display
    </md-button>
    </div>
    <b> <h3 id="title"> </h3> </b>
    <div class = "chart">
        <canvas id = "mixedChart"></canvas>
    </div>
    <br>
    <h2 id="newstitle" style="text-align:center;padding:5px"> <b> Keep up to date with the latest COVID-19 news </b> </h2>
    <div class = "news"> 
    </div>
    <br>
    
</div>
    
</template>

<script>
import {mapState} from "vuex";
import Chart from 'chart.js';
import mixedChartData from "../mixedChart.js";
import axios from 'axios';

export default {
    data() {
			return {
				date: 'today',
                selectedOption: '',
                mixedChartData: mixedChartData,
				myChart: null
			}
		},
    computed: {
			...mapState(['userProfile'])
        },
    methods: {
            createChart: function (chartId, chartData) {
				const ctx = document.getElementById(chartId);
				this.myChart = new Chart(ctx, {
					type: chartData.type,
					data: chartData.data,
					optionsSortingElement: chartData.options
				});
            },
            
            updateData: function (countryCode) {
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
                            if (response.data.data[day][country].country_code == code) {
                                console.log(response.data.data[day][country].confirmed /1000)
                                this.myChart.data.datasets[0].data.push(response.data.data[day][country].confirmed /1000)
                                this.myChart.data.datasets[1].data.push(response.data.data[day][country].stringency)
                                this.myChart.data.labels.push(response.data.data[day][country].date_value)

                            }
                        }
                    }
                })
                let country = countryCode.substr(6)
                document.getElementById("title").innerHTML = "Monitoring " + country + "'s COVID-19 situation";

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
			}


    },
    mounted() {
			this.createChart("mixedChart", this.mixedChartData);
			this.date = this.date_function()
		}
    
}
</script>

<style scoped>

</style>