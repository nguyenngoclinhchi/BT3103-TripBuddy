<template>
    <div id = "mainPage" style = "margin-left: 100px; margin-right: 100px">
        <div style = "padding-left: 25px; padding-top: 20px">
            <h6>Last Refreshed: {{date}}</h6><br>
        </div>
        <div class = "row">
            <div class = "column">
                <div class = "card" style = "background-color: #3498db">
                    <h3><b>{{totalCases}}</b></h3>
                    <p>Global Total Cases</p>
                </div>
            </div>
            <div class = "column">
                <div class = "card" style = "background-color: #e74c3c">
                    <h3><b>{{totalDeaths}}</b></h3>
                    <p>Global Total Deaths</p>
                </div>
            </div>
            <div class = "column">
                <div class = "card" style = "background-color: #2ecc71">
                    <h3><b>{{totalRecovered}}</b></h3>
                    <p>Global Total Recovered</p>
                </div>
            </div>
        </div>
        <div class = "row">
            <div class = "column1">
                <div class = "card" style = "background-color: white; padding: 0;">
                    <bubblechart></bubblechart>
                </div>
                <p style = "text-align: right"><i>Only pinned counties are highlighted in the charts</i></p>
            </div>
        </div>
    </div>
</template>
<script>
	import {mapState} from "vuex";
	import bubblechart from './BubbleChart.vue'
	import axios from 'axios';
	
	export default {
		name: "MainPage",
		components: {
			bubblechart,
		},
		
		data: function () {
			return {
				name: 'Person',
				date: 'today',
				totalCases: null,
				totalDeaths: null,
				totalRecovered: null,
				showPostModal: true,
			};
		},
		computed: {
			...mapState(['userProfile', 'posts'])
		},
		methods: {
			user() {
				return this.$store.getters.getUser;
			},
			setUser() {
				this.$store.dispatch("setUser");
			},
			closePostModal() {
				this.showPostModal = false;
			},
			date_function: function () {
				let currentDate = new Date();
				//console.log(currentDate);
				
				currentDate.setDate(currentDate.getDate() - 1);
				
				//console.log(formatted_date);
				return currentDate.toJSON().slice(0, 10);
				
			},
			numberWithCommas: function (x) {
				return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
			}
		},
		created() {
			this.setUser();
			let url = 'https://api.covid19api.com/summary';
			axios.get(url).then(response => {
				this.totalCases = this.numberWithCommas(response.data.Global['TotalConfirmed']);
				this.totalDeaths = this.numberWithCommas(response.data.Global['TotalDeaths']);
				this.totalRecovered = this.numberWithCommas(response.data.Global['TotalRecovered']);
			})
		},
		mounted() {
			this.date = this.date_function();
		},
	}
</script>