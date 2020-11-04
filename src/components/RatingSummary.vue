<template>
    <div>
        <div v-if="selectedPosts.length > 0">
            <p style="text-align: center; padding-top: 0; padding-bottom: 0; margin: 0">Summary for OVERALL SATISFACTION rating</p>
        </div>
        <section class = "controls">
            <b-form-rating id = "rating-inline" variant = "warning" show-value show-value-max readonly no-border inline
                           :value = "avgRating" style = "padding: 10px"></b-form-rating>
        </section>
        <div v-if="getRating(1) > 0">
            <p style="padding-top: 0; padding-bottom: 0; margin: 0">Rating 1</p>
            <k-progress :percent = "getRating(1)" :color = "['#f5af19', '#f12711', '#9254de', '#40a9ff', '#5cdbd3']"
                        :border = "false"></k-progress>
        </div>
        <div v-if="getRating(2) > 0">
            <p style="padding-top: 0; padding-bottom: 0; margin: 0">Rating 2</p>
            <k-progress :percent = "getRating(2)" :color = "['#f5af19', '#f12711', '#9254de', '#40a9ff', '#5cdbd3']"
                        :border = "false"></k-progress>
        </div>
        <div v-if="getRating(3) > 0">
            <p style="padding-top: 0; padding-bottom: 0; margin: 0">Rating 3</p>
            <k-progress :percent = "getRating(3)" :color = "['#f5af19', '#f12711', '#9254de', '#40a9ff', '#5cdbd3']"
                        :border = "false"></k-progress>
        </div>
        <div v-if="getRating(4) > 0">
            <p style="padding-top: 0; padding-bottom: 0; margin: 0">Rating 4</p>
            <k-progress :percent = "getRating(4)" :color = "['#f5af19', '#f12711', '#9254de', '#40a9ff', '#5cdbd3']"
                        :border = "false"></k-progress>
        </div>
        <div v-if="getRating(5) > 0">
            <p style="padding-top: 0; padding-bottom: 0; margin: 0">Rating 5</p>
            <k-progress :percent = "getRating(5)" :color = "['#f5af19', '#f12711', '#9254de', '#40a9ff', '#5cdbd3']"
                        :border = "false"></k-progress>
        </div>
        <!--        <k-progress :percent = "10"></k-progress>-->
        <!--        <k-progress :percent = "20"  status = "success"></k-progress>-->
        <!--        <k-progress :percent = "30" status = "warning" :border = "false"></k-progress>-->
        <!--        <k-progress :percent = "40" status = "error"></k-progress>-->
        <!--        <k-progress :percent = "50" color = "#9254de"></k-progress>-->
        <!--        <k-progress :percent = "80" :color = "['#f5af19', '#f12711', '#9254de', '#40a9ff', '#5cdbd3']" :border = "false"></k-progress>-->
        <!--        <k-progress :percent = "70" :color = "['#40a9ff', '#5cdbd3']" bg-color = "#d9f7be"></k-progress>-->
        <!--        <k-progress :percent = "percent" :color = "getColor"></k-progress>-->
    </div>
</template>

<script>
	export default {
		data() {
			return {
				percent: 10,
				ifUp: true,
                avgRating: 5,
                
			}
		},
		props: {
			selectedPosts: {
				type: Array
			}
		},
		computed: {
        },
		methods: {
			getRating(value) {
				this.getAvgRating()
				let updatedPostList = this.selectedPosts
				updatedPostList = this.selectedPosts.filter(opt => opt.rating_value_5 === value)
				return Math.round(updatedPostList.length * 100.0 / this.selectedPosts.length)
			},
			getAvgRating() {
				this.avgRating = this.selectedPosts.reduce((total, next) => total + next.rating_value_5, 0)/this.selectedPosts.length;
				return this.avgRating
			}
		},
	}
</script>