<template>
    <div id = "statistics_dashboard">
        <div class = "container">
            <h6>Last Refreshed: {{date}}</h6>
            <div>
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
                <b-form-group style = "padding: 0 8px">
                    <md-chip class = "md-accent" v-for = "chip in userProfile.country_interested" :key = "chip"
                             md-clickable style = "margin: 5px"
                             @click = "selectedOption = chip; updateData(selectedOption)">
                        {{chip}}
                    </md-chip>
                </b-form-group>
                <section>
                    <div class = "chart controls">
                        <canvas id = "radarChart"></canvas>
                    </div>
                    <div class = "indic controls" style = "background-color:white; padding:10px; border-radius: 17px">
                        <div>
                            <p style = "font-size:120%;"><b> <u> Stringency Index </u> </b></p>
                            <p>
                                records the strictness of ‘lockdown style’ policies that primarily restrict people’
                                behaviour </p>
                            <p style = "font-size:120%;"><b> <u> Government Response Index </u> </b></p>
                            <p>
                                records how the response of governments has varied over all indicators in the database,
                                becoming stronger or weaker over the course of the outbreak </p>
                            <p style = "font-size:120%;"><b> <u> Containment & Health Index </u> </b></p>
                            <p>
                                combines ‘lockdown’ restrictions and closures with measures such as testing policy and
                                contact tracing, short term investment in healthcare, as well investments in
                                vaccine </p>
                        </div>
                    </div>
                </section>
                <section style = "min-height: 70vh">
                    <div class = "H">
                        <h5 style = "text-align: center"><b> Health System Policies </b></h5>
                        <table id = "H_indicators">
                            <thead>
                            <tr>
                                <th>Code</th>
                                <th>Description</th>
                                <th>Value</th>
                                <th>Policy</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-bind:key = "row" v-for = "row in this.H_indicators">
                                <td>{{row.code}}</td>
                                <td>{{row.descr}}</td>
                                <td>{{row.value}}</td>
                                <td>{{row.policy}}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class = "C">
                        <h5 style = "text-align: center"><b> Containment and Closure Policies </b></h5>
                        <table id = "C_indicators">
                            <thead>
                            <tr>
                                <th>Code</th>
                                <th>Description</th>
                                <th>Value</th>
                                <th>Policy</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-bind:key = "row" v-for = "row in this.C_indicators">
                                <td>{{row.code}}</td>
                                <td>{{row.descr}}</td>
                                <td>{{row.value}}</td>
                                <td>{{row.policy}}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
	import {mapState} from "vuex";
	import axios from 'axios';
	import Chart from 'chart.js';
	import radarChartData from "../radar.js";
	import PinACountry from "@/components/PinACountry";
	
	export default {
		data() {
			return {
				date: 'today',
				selectedOption: '[AFG] Afghanistan',
				radarChartData: radarChartData,
				myChart: null,
				H_indicators: [],
				C_indicators: []
			}
		},
		components: {
			PinACountry
		},
		computed: {
			...mapState(['userProfile', 'posts', 'country_options_dropdown'])
		},
		methods: {
			date_function: function () {
				let currentDate = new Date();
				//console.log(currentDate);
				currentDate.setDate(currentDate.getDate() - 5);
				// console.log(formatted_date);
				return currentDate.toJSON().slice(0, 10);
			},
			next_date: function () {
				let currentDate = new Date();
				currentDate.setDate(currentDate.getDate() - 4);
				// console.log(formatted_date);
				return currentDate.toJSON().slice(0, 10);
			},
			createChart: function (chartId, chartData) {
				const ctx = document.getElementById(chartId);
				this.myChart = new Chart(ctx, {
					type: chartData.type,
					data: chartData.data,
					optionsSortingElement: chartData.options
				});
			},
			updateData: function (countryCode) {
				const url = 'https://datasource.kapsarc.org/api/records/1.0/search/?dataset=oxford-covid-19-government-response-tracker&rows=10000&disjunctive.countryname=true&disjunctive.indicator=true&refine.indicator=Containment+Health+Index.&refine.indicator=Government+Response+Index.&refine.indicator=Stringency+Index.&q=date:%5B' + this.date_function() + 'T16:00:00Z+TO+' + this.next_date() + 'T15:59:59Z%5D&timezone=Asia/Shanghai&lang=en';
				//var url = 'https://datasource.kapsarc.org/api/records/1.0/search/?dataset=oxford-covid-19-government-response-tracker&rows=10000&disjunctive.countryname=true&disjunctive.indicator=true&refine.indicator=Containment+Health+Index.&refine.indicator=Government+Response+Index.&refine.indicator=Stringency+Index.&q=date:%5B2020-10-20T16:00:00Z+TO+2020-10-21T15:59:59Z%5D&timezone=Asia/Shanghai&lang=en'
				// console.log("called")
				let name = countryCode.substr(6)
				const containment = 'Containment Health Index.';
				const government = 'Government Response Index.';
				const stringency = 'Stringency Index.';
				let CI = 0.0;
				let GI = 0.0;
				let SI = 0.0;
				let code = countryCode.slice(1, 4)
				// fetch data for radar chart
				axios.get(url).then(response => {
					for (let key in response.data.records) {
						if (response.data.records[key].fields.countryname === name) {
							let indicator = response.data.records[key].fields.indicator
							if (indicator === containment) {
								CI = response.data.records[key].fields.value
							} else if (indicator === government) {
								GI = response.data.records[key].fields.value
							} else if (indicator === stringency) {
								SI = response.data.records[key].fields.value
							}
						}
					}
					// populate radar chart
					this.myChart.data.datasets[0].label = code + ' Index'
					// console.log(this.myChart.data.datasets[0].label)
					this.myChart.data.datasets[0].data = []
					this.myChart.data.datasets[0].data.push(CI)
					this.myChart.data.datasets[0].data.push(GI)
					this.myChart.data.datasets[0].data.push(SI)
					// console.log(this.myChart.data.datasets[0].data)
					this.myChart.update()
					// alert when no data available
					if (CI === 0.0 && GI === 0.0 && SI === 0.0) {
						this.H_indicators = [];
						this.C_indicators = [];
						const empty = {
							code: '-',
							descr: '-',
							value: '-',
							policy: '-'
						}
						this.H_indicators.push(empty);
						this.C_indicators.push(empty);
						alert('No data available for ' + name)
					} else {
						// fetch data for indicators table
						let link = 'https://covidtrackerapi.bsg.ox.ac.uk/api/v2/stringency/actions/' + code + '/2020-10-01';
						axios.get(link).then(response => {
							this.H_indicators = [];
							this.C_indicators = [];
							for (let record in response.data.policyActions) {
								let polCode = response.data.policyActions[record].policy_type_code
								let describe = response.data.policyActions[record].policy_type_display
								let val = response.data.policyActions[record].policyvalue
								let pol = response.data.policyActions[record].policy_value_display_field
								const row = {
									code: polCode,
									descr: describe,
									value: val,
									policy: pol
								}
								// populate table
								if (polCode.slice(0, 1) === 'H') {
									this.H_indicators.push(row)
								} else if (polCode.slice(0, 1) === 'C') {
									this.C_indicators.push(row)
								}
								//this.indicators.push(row);
							}
						})
					}
				})
				
			}
		},
		created() {
			this.updateData('[AFG] Afghanistan');
		},
		mounted() {
			this.createChart("radarChart", this.radarChartData);
			this.date = this.date_function()
		}
	}
</script>
