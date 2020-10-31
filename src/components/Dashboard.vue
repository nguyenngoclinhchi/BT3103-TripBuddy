<template>
    <div>
        <h1>Welcome {{ userProfile.name }} to Trip Buddy Dashboard</h1>
        <div id="body">
            <h4>Last Refreshed: {{date}}</h4>
            <br>
            <Form align ="right"> </Form>
            <md-field>
                <label> Country </label>
                <md-select v-model="selectedOption" @md-selected="updateData(selectedOption)">
                    <md-option v-for ="country in country_options" v-bind:key="country" :value="country">  {{country}} </md-option>
                </md-select>
            </md-field>
            <br>
            <div class = "chart">
                <canvas id = "radarChart"></canvas>
            </div>
            <div class = "indic" style = "background-color:white; padding:10px; border-radius: 17px"> 
                <p align ="left" style="font-size:120%;"> <b> <u> Stringency Index </u> </b> </p>
                <p align ="left"> records the strictness of ‘lockdown style’ policies that primarily restrict people’s behaviour </p>
                <p align ="left" style="font-size:120%;"> <b> <u> Government Repsonse Index </u> </b> </p>
                <p align ="left"> records how the response of governments has varied over all indicators in the database, becoming stronger or weaker over the course of the outbreak </p>
                <p align ="left" style="font-size:120%;"> <b> <u> Containment & Health Index </u> </b> </p>
                <p align ="left"> combines ‘lockdown’ restrictions and closures with measures such as testing policy and contact tracing, short term investment in healthcare, as well investments in vaccine </p>
            </div>
            <div class = "H">
                    <p style="font-size:180%"> <b> Health System Policies </b> </p> 
                    <table id="H_indicators">
                        <thead>
                            <tr>
                            <th>Code</th>
                            <th>Description</th>
                            <th>Value</th>
                            <th>Policy</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for ="row in this.H_indicators" v-bind:key ="row">
                                <td>{{row.code}}</td>
                                <td>{{row.descr}}</td>
                                <td>{{row.value}}</td>
                                <td>{{row.policy}}</td>
                            </tr>
                        </tbody>
                    </table>
            </div>
            <div class = "C">
                    <p style="font-size:180%"> <b> Containment and Closure Policies </b> </p>
                    <table id="C_indicators">
                        <thead>
                            <tr>
                            <th>Code</th>
                            <th>Description</th>
                            <th>Value</th>
                            <th>Policy</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for ="row in this.C_indicators" v-bind:key ="row">
                                <td>{{row.code}}</td>
                                <td>{{row.descr}}</td>
                                <td>{{row.value}}</td>
                                <td>{{row.policy}}</td>
                            </tr>
                        </tbody>
                    </table>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from "vuex";
    import worldCode from "../all.json";
    import axios from 'axios';
    import Chart from 'chart.js';
    import radarChartData from "../radar.js";
    import Form from "./Form.vue";
	
	export default {

        data() {
            return {
                date: 'today',
                country_options: [],
                selectedOption: '[AFG] Afghanistan',
                radarChartData: radarChartData,
                myChart: null,
                H_indicators: [],
                C_indicators: []
            }
        },

        components: {
            Form
        },

		computed: {
			...mapState(['userProfile', 'posts'])
        },
        
        methods: {

            date_function: function () {
                var currentDate = new Date();
                //console.log(currentDate);

                currentDate.setDate(currentDate.getDate()-5);
        
                var formatted_date = currentDate.toJSON().slice(0,10);
                console.log(formatted_date);
                return formatted_date;
            
            },

            next_date: function() {
                var currentDate = new Date();
                //console.log(currentDate);

                currentDate.setDate(currentDate.getDate()-4);
        
                var formatted_date = currentDate.toJSON().slice(0,10);
                console.log(formatted_date);
                return formatted_date;
            },
        
            createChart: function(chartId, chartData) {
                const ctx = document.getElementById(chartId);
                // Save reference
                this.myChart = new Chart(ctx, {
                    type: chartData.type,
                    data: chartData.data,
                    options: chartData.options
                });
            },

            updateData: function(countryCode) {
                var url = 'https://datasource.kapsarc.org/api/records/1.0/search/?dataset=oxford-covid-19-government-response-tracker&rows=10000&disjunctive.countryname=true&disjunctive.indicator=true&refine.indicator=Containment+Health+Index.&refine.indicator=Government+Response+Index.&refine.indicator=Stringency+Index.&q=date:%5B'+this.date_function()+'T16:00:00Z+TO+'+this.next_date()+'T15:59:59Z%5D&timezone=Asia/Shanghai&lang=en'
                //var url = 'https://datasource.kapsarc.org/api/records/1.0/search/?dataset=oxford-covid-19-government-response-tracker&rows=10000&disjunctive.countryname=true&disjunctive.indicator=true&refine.indicator=Containment+Health+Index.&refine.indicator=Government+Response+Index.&refine.indicator=Stringency+Index.&q=date:%5B2020-10-20T16:00:00Z+TO+2020-10-21T15:59:59Z%5D&timezone=Asia/Shanghai&lang=en'
                console.log("called")
                let name = countryCode.substr(6)
                var containment = 'Containment Health Index.'
                var government = 'Government Response Index.'
                var stringency = 'Stringency Index.'
                var CI = 0.0
                var GI = 0.0
                var SI = 0.0
                let code = countryCode.slice(1,4)
                // fetch data for radar chart
                axios.get(url).then(response => {
                    for (let key in response.data.records) {
                        if (response.data.records[key].fields.countryname == name) {
                            let indicator = response.data.records[key].fields.indicator
                            if (indicator == containment) {
                                CI = response.data.records[key].fields.value
                            } else if (indicator == government) {
                                GI = response.data.records[key].fields.value
                            } else if (indicator == stringency) {
                                SI = response.data.records[key].fields.value
                            }
                        }
                    }
                    // populate radar chart
                    var legend = code + ' Index'
                    this.myChart.data.datasets[0].label = legend
                    console.log(this.myChart.data.datasets[0].label)
                    this.myChart.data.datasets[0].data = []
                    this.myChart.data.datasets[0].data.push(CI)
                    this.myChart.data.datasets[0].data.push(GI)
                    this.myChart.data.datasets[0].data.push(SI)
                    console.log(this.myChart.data.datasets[0].data)
                    this.myChart.update()
                    // alert when no data available
                    if (CI == 0.0 && GI == 0.0 && SI == 0.0) {
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
                        var link = 'https://covidtrackerapi.bsg.ox.ac.uk/api/v2/stringency/actions/' + code + '/2020-10-01'
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
                                if (polCode.slice(0,1) == 'H') {
                                    this.H_indicators.push(row)
                                } else if (polCode.slice(0,1) == 'C') {
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
            for (let index = 0; index < worldCode.length; index++) {
                let code = "[" + worldCode[index]["alpha-3"] + "] "
                let countryName = worldCode[index]["name"]
                let country = code + countryName
                this.country_options.push(country)
            }

            this.updateData('[AFG] Afghanistan');
        },
        
        mounted() {
            this.createChart("radarChart", this.radarChartData);
            this.date = this.date_function()
            // console.log(this.myChart.data.datasets[0].label)
            // console.log(this.myChart.data.datasets[0].data)
        }
		
	}
</script>

<style>
    body {
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans,
        Ubuntu, Droid Sans, Helvetica Neue, sans-serif !important;
    }

    h4 {
        padding-left: 10px;
    }

    .chart{
        width:60%;
        margin-right:7%;
        float: left;
    }
    
    .indic{
        width:30%;
        float: left;
    }
    
    .H {
        width:45%;
        margin-right:5%;
        margin-left:1%;
        float: left;
    }

    .C{
        width:45%;
        float: left;
    }

    #body {
        background-color: #E6ECF0;
        min-height: 190vh;
        padding-left: 10px;
        padding-right: 10px;
    }

    table {
        margin-left: auto;
        margin-right: auto;
        width: 600px;
        border-collapse: collapse;
        border: 3px solid #ffffff;
    }

    table th {
        text-transform: uppercase;
        text-align: center;
        background: #000000;
        color: #FFF;
        padding: 8px;
        min-width: 30px;
    }

    table td {
    text-align: left;
    padding: 8px;
    }
    table td:last-child {
    border-right: none;
    }
    table tbody tr:nth-child(2n) td {
    background: #dddddc;
    }
    
    .topnav {
        overflow: hidden;
        background-color: white;
    }
    
    .topnav a {
        float: left;
        color: #f2f2f2;
        text-align: center;
        padding: 14px 16px;
        text-decoration: none;
        font-size: 17px;
    }
    
    .topnav a:hover {
        background-color: #ddd;
        color: black;
    }
    
    .topnav a.active {
        background-color: #4CAF50;
        color: white;
    }
    
    h1 {
        height: 50px;
        text-align: left;
        padding: 15px;
    }
</style>