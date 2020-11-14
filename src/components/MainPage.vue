<template>
    <div id = "mainPage">
        <br>
		<section style = "padding: 50px">
			<div style = "max-width: 50%">
				<h3>Staying cognizant</h3>
				<div class = "block"></div>
				<p> While measures ease, it remains critical that we remain aware of key pandemic statistics as we
					continue to combat COVID-19 as a society.
				</p>
			</div>
			<div class = "controls">
				<div class = "card-shadow" style = "background-color: #3498db;padding: 12px">
					<h3><b>{{totalCases}}</b></h3>
					<p>Global Total Cases</p>
				</div>
				<div class = "card-shadow" style = "background-color: #e74c3c;padding: 12px">
					<h3><b>{{totalDeaths}}</b></h3>
					<p>Global Total Deaths</p>
				</div>
				<div class = "card-shadow" style = "background-color: #2ecc71; padding: 12px">
					<h3><b>{{totalRecovered}}</b></h3>
					<p>Global Total Recovered</p>
				</div>
			</div>
		</section>
        <GlobalDashboard></GlobalDashboard>
        <div style = "padding: 50px">
            <section>
                <div style = "min-width: 650px">
                    <bubblechart></bubblechart>
                </div>
				<div style = "padding-left: 40px" class="controls">
					<div>
						<h3> Make informed decisions </h3>
						<div class = "block"></div>
						<p>
							Leveraging on the Stringency Index, you can compare your countries of interest to
							understand how they fare as compared to other countries through this bubble chart,
							enabling you to make more informed decisions before travelling.
						</p>
					</div>
				</div>
            </section>
        </div>
    </div>
</template>

<script>
	import {mapState} from "vuex";
	import bubblechart from './BubbleChart.vue'
	import axios from 'axios';
	import GlobalDashboard from './GlobalDashboardPage.vue';
	
	export default {
		name: "MainPage",
		components: {
			bubblechart,
			GlobalDashboard
		},
		
		data: function () {
			return {
				name: 'Person',
				date: 'today',
				totalCases: null,
				totalDeaths: null,
				totalRecovered: null,
				showPostModal: true,
				greeting: null
			};
		},
		computed: {
			...mapState(['userProfile', 'posts']),
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
			},
			getGreeting: function () {
				var today = new Date();
				var cur = today.getHours();
				if (cur < 12) {
					return 'Good morning'
				} else if (cur < 18) {
					return 'Good afternoon'
				} else {
					return 'Good evening'
				}
			},
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
			this.greeting = this.getGreeting();
		},
	}
</script>