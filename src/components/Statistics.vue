<template>
  <div>
    <h4><br> {{title}}</h4>
    <h4>Last Refreshed: {{date}}</h4>
    <p style="font-size:18px;"><br>This is a composite measure based on nine response indicators including school closures, workplace closures, and travel bans, rescaled to a value from 0 to 100 (100 = strictest).</p>
    <GChart
        :settings="{ packages: ['geochart'] }"
        type="GeoChart"
        :data="chartData"
        :options="chartOptions"
    />
    <br><br><br>
    <statistics-table></statistics-table>
  </div>
</template>

<script>
import { GChart } from 'vue-google-charts';
import worldCode from "../all.json";
import axios from 'axios';
import statisticsTable from './StatisticsTable.vue';

export default {
  name: 'Geochart',
  data () {
    return{
      title: 'COVID-19: Government Response Stringency Index',
      date: 'today',
      chartData: [
          ['Country', 'Stringency Index']
        ],
        chartOptions: {
            chart: {
            }, 
            height: 600,
            backgroundColor: '#e6ecf0',
        }
    }
  },
  methods:{
    date_function: function () {
        var currentDate = new Date();
        //console.log(currentDate);

        currentDate.setDate(currentDate.getDate()-1);
  
        var formatted_date = currentDate.toJSON().slice(0,10);
        console.log(formatted_date);
        return formatted_date;
     
    },
    findMatchingAlphaCode: function(geoId) {
      for (let index = 0; index < worldCode.length; index++) {
            let id = geoId + "";
            if (worldCode[index]["alpha-3"] === id) {
                return worldCode[index]["alpha-2"];
            }
      }
        return "null";
    }, 
    findMatchingCountryName: function(geoId) {
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
  mounted () {
      this.date = this.date_function()
  },

  created() {
    var arrayData = [['Country', 'Stringency']]
    var url = 'https://covidtrackerapi.bsg.ox.ac.uk/api/v2/stringency/date-range/'+this.date_function()+'/'+this.date_function()+''
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
                var countryData = [{v: countryCode, f: countryName}, stringency]
                this.chartData.push(countryData)
            }
        }   
    })
    console.log(arrayData)
    //this.chartData.push(arrayData)
  }
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  font-size: 40px;
}

h4, p {
    padding-left: 20px;
}
</style>
