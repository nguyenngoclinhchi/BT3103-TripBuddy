<template>
    <div id = "dashboard">
        <transition name = "fade">
            <CommentModal :post = "selectedPost" @close = "toggleCommentModal()"
                          v-if = "showCommentModal"></CommentModal>
        </transition>
        
        <div class = "container" style = "margin-top: 20px">
            <section>
                <div class = "col1">
                    <div class = "profile">
                        <section class = "controls">
                            <div class = "md-button-custom" style = "display: inline-block; margin: 0; padding: 0">
                                <h5 style = "text-align: center">Welcome {{ userProfile.name }}</h5>
                                <p style = "text-align: center">{{ userProfile.nationality }}</p>
                            </div>
                            <experience-form></experience-form>
                        </section>
                        <p class = "no-results">
                            <em style = "color: #1abc9c">{{getTextMessage}}</em>
                        </p>
                        <progress-bar :selectedPosts = "getCountryUpdatedPostsList"></progress-bar>
                    </div>
                    <div class = "accordion" role = "tablist">
                        <b-card class = "mb-1" no-body>
                            <b-card-header class = "p-1" header-tag = "header" role = "tab">
                                <b-button block v-b-toggle.accordion-1 variant = "info">
                                    SHORTCUT FILTER posts with PINNED COUNTRY list
                                </b-button>
                            </b-card-header>
                            <b-collapse accordion = "my-accordion" id = "accordion-1" role = "tabpanel" visible>
                                <p style = "text-align: center">
                                    Choose only posts with ONLY specific country in the PINNED list</p>
                                <b-form-group style = "padding: 0 8px">
                                    <md-chip :key = "chip" @click = "selectedCountryOption = chip" class = "md-accent"
                                             md-clickable style = "padding: 5px; margin: 5px" v-for = "chip in updateInterestCountry">
                                        {{chip}}
                                    </md-chip>
                                    <md-chip @click = "selectedCountryOption = ''" class = "md-info" md-clickable
                                             style = "padding-top: 5px; margin: 5px">
                                        Reset to all countries
                                    </md-chip>
                                </b-form-group>
                            </b-collapse>
                        </b-card>
                        <b-card class = "mb-1" no-body>
                            <b-card-header class = "p-1" header-tag = "header" role = "tab">
                                <b-button block v-b-toggle.accordion-2 variant = "info">
                                    FILTER and SEARCH
                                </b-button>
                            </b-card-header>
                            <b-collapse accordion = "my-accordion" id = "accordion-2" role = "tabpanel">
                                <b-card-body style = "padding-top: 3px; margin-right: 5px">
                                    <md-autocomplete :md-options = "country_options_dropdown"
                                                     id = "countryDropdownList"
                                                     style = "margin-right: 20px" v-model = "selectedCountryOption">
                                        <label>Search with Country</label>
                                    </md-autocomplete>
                                    <md-field>
                                        <label>Search with Post Content</label>
                                        <md-input class = "controls" v-model = "selectedPostContent"></md-input>
                                    </md-field>
                                    <pin-a-country :selected-country = "selectedCountryOption"></pin-a-country>
                                    <label style = "padding-top: 10px">SORT BY ELEMENT</label>
                                    <section class = "controls" style = "justify-content: left">
                                        <md-radio class = "md-primary" v-model = "selectedSortingElement" value = "createdOn">
                                            CreatedTime
                                        </md-radio>
                                        <md-radio class = "md-primary" v-model = "selectedSortingElement" value = "likes">
                                            Likes
                                        </md-radio>
                                        <md-radio class = "md-primary" v-model = "selectedSortingElement" value = "ratings">
                                            Overall Satisfaction
                                        </md-radio>
                                    </section>
                                    <label style = "padding-top: 10px">SORTING ORDER</label>
                                    <section class = "controls" style = "justify-content: left">
                                        <md-radio v-model = "selectedSortingOrder" value = "descending">Descending
                                        </md-radio>
                                        <md-radio v-model = "selectedSortingOrder" value = "increasing">Increasing
                                        </md-radio>
                                    </section>
                                </b-card-body>
                            </b-collapse>
                        </b-card>
                    </div>
                </div>
                <div class = "col2">
                    <div>
                        <div :key = "post.id" class = "post" v-for = "post in getCountryUpdatedPostsList">
                            <section class = "controls rating" style = "width: 270px;">
                                <label for = "rating-inline" style = "padding: 0; font-size: 14px; margin: 0">
                                    Overall Satisfaction</label>
                                <b-form-rating :value = "post.rating_value_5"
                                               id = "rating-inline"
                                               inline no-border readonly
                                               style = "padding: 10px"
                                               variant = "info"></b-form-rating>
                            </section>
                            <h5 style="padding-top: 20px">{{ post.userName }}</h5>
                            <b-form-group>
                                <md-chip class = "md-info" md-static size = "sm" style = "margin: 5px">
                                    <em><u>Email</u></em> {{post.userEmail}}
                                </md-chip>
                                <md-chip class = "md-info" md-static size = "sm" style = "margin: 5px">
                                    <em><u>Nationality</u></em> {{post.userNationality}}
                                </md-chip>
                                <md-chip class = "md-info" md-static size = "sm" style = "margin: 5px">
                                    <em><u>Travelled to</u></em> {{post.countryTravelled}}
                                </md-chip>
                                <md-chip class = "md-light" md-static size = "sm" style = "margin: 5px">
                                    <em><u>Purpose</u></em> {{post.purpose}}
                                </md-chip>
                                <md-chip class = "md-light" md-static size = "sm" style = "margin: 5px">
                                    <em><u>Period</u></em> {{post.dateTravelled|formatDateTravelled}}
                                                           to {{post.dateTravelledTo|formatDateTravelled}}
                                </md-chip>
                            </b-form-group>
                            <span>posted {{ post.createdOn | formatDate }}</span>
                            <br>
                            <p>{{ post.content | trimLength }}</p>
                            <ul>
                                <li><a @click = "toggleCommentModal(post)" class="red-link">comments {{ post.comments }}</a></li>
                                <li><a @click = "likePost(post.id, post.likes)" class="red-link">likes {{ post.likes }}</a></li>
                                <li><a @click = "viewPost(post)" class="red-link">view full post</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <!-- full post modal -->
            <transition name = "fade">
                <div class = "p-modal" v-if = "showPostModal">
                    <div class = "p-container">
                        <a @click = "closePostModal()" class = "close">close</a>
                        <div class = "post" style = "margin-bottom: 0">
                            <section class = "controls rating">
                                <label for = "rating-inline" style = "padding: 0; margin: 10px">Overall
                                                                                                Satisfaction</label>
                                <b-form-rating :value = "fullPost.rating_value_5"
                                               id = "rating-inline"
                                               inline no-border readonly
                                               style = "padding: 10px"
                                               variant = "info"></b-form-rating>
                            </section>
                            <h5 style="padding-top: 20px">{{ fullPost.userName }}</h5>
                            <b-form-group>
                                <md-chip class = "md-info" md-static size = "sm" style = "margin: 5px">
                                    <em><u>Email</u></em> {{fullPost.userEmail}}
                                </md-chip>
                                <md-chip class = "md-info" md-static size = "sm" style = "margin: 5px">
                                    <em><u>Nationality</u></em> {{fullPost.userNationality}}
                                </md-chip>
                                <md-chip class = "md-info" md-static size = "sm" style = "margin: 5px">
                                    <em><u>Travelled to</u></em> {{fullPost.countryTravelled}}
                                </md-chip>
                                <md-chip class = "md-light" md-static size = "sm" style = "margin: 5px">
                                    <em><u>Purpose</u></em> {{fullPost.purpose}}
                                </md-chip>
                                <md-chip class = "md-light" md-static size = "sm" style = "margin: 5px">
                                    <em><u>Period</u></em> {{fullPost.dateTravelled|formatDateTravelled}}
                                                           to {{fullPost.dateTravelledTo|formatDateTravelled}}
                                </md-chip>
                                <md-chip class = "md-light" md-static size = "sm"
                                         style = "margin: 5px" v-if = "getTravelledPeople(fullPost) !== ''">
                                    <em><u>Travellers</u></em> {{getTravelledPeople(fullPost)}}
                                </md-chip>
                                <md-chip class = "md-light" md-static size = "sm" style = "margin: 5px">
                                    <em><u>Having existing medical condition</u></em> {{fullPost.medical}}
                                </md-chip>
                            </b-form-group>
                            <span>posted {{ fullPost.createdOn | formatDate }}</span>
                            <section class = "controls" style = "justify-content: left">
                                <p>Overall public health situation</p>
                                <b-form-rating :value = "fullPost.rating_value_1"
                                               id = "rating-inline"
                                               inline no-border readonly
                                               style = "padding: 10px"
                                               variant = "warning"></b-form-rating>
                            </section>
                            <section class = "controls" style = "justify-content: left">
                                <p>Observing of safety measures by the public</p>
                                <b-form-rating :value = "fullPost.rating_value_2"
                                               id = "rating-inline"
                                               inline no-border readonly
                                               style = "padding: 10px"
                                               variant = "warning"></b-form-rating>
                            </section>
                            <section class = "controls" style = "justify-content: left">
                                <p>Contact tracing</p>
                                <b-form-rating :value = "fullPost.rating_value_3"
                                               id = "rating-inline"
                                               inline no-border readonly
                                               style = "padding: 10px"
                                               variant = "warning"></b-form-rating>
                            </section>
                            <section class = "controls" style = "justify-content: left">
                                <p>Recommendation to travel</p>
                                <b-form-rating :value = "fullPost.rating_value_4"
                                               id = "rating-inline"
                                               inline no-border readonly
                                               style = "padding: 10px"
                                               variant = "warning"></b-form-rating>
                            </section>
                            <section class = "controls" style = "justify-content: left">
                                <p>Overall Satisfaction</p>
                                <b-form-rating :value = "fullPost.rating_value_5"
                                               id = "rating-inline"
                                               inline no-border readonly
                                               style = "padding: 10px"
                                               variant = "warning"></b-form-rating>
                            </section>
                            <br>
                            <p><strong>{{ fullPost.content}}</strong></p>
                            <ul>
                                <li><a class="red-link">comments {{ fullPost.comments }}</a></li>
                                <li><a class="red-link">likes {{ fullPost.likes }}</a></li>
                            </ul>
                        </div>
                        <div class = "comments" v-show = "postComments.length">
                            <div :key = "comment.id" class = "comment" v-for = "comment in postComments">
                                <p>{{ comment.userName }}</p>
                                <span>{{ comment.createdOn | formatDate }}</span>
                                <p>{{ comment.content }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
	import {commentsCollection} from '@/firebase'
	import {mapState} from 'vuex'
	import moment from 'moment'
	import CommentModal from '@/components/CommentModal'
	import PinACountry from "@/components/PinACountry";
	import ExperienceForm from "@/components/ExperienceForm";
	import ProgressBar from "@/components/RatingSummary"
	
	export default {
		components: {
			CommentModal,
			PinACountry,
			ExperienceForm,
			ProgressBar,
		},
		data() {
			return {
				selectedCountryOption: '',
				selectedPostContent: '',
				showCommentModal: false,
				selectedPost: {},
				showPostModal: false,
				fullPost: {},
				postComments: [],
				currentPosts: this.posts,
				searchCounter: 0,
				textMessage: '',
				searchClicked: false,
				historySelectedOption: '',
				selectedSortingElement: 'createdOn',
				selectedSortingOrder: 'descending',
				optionsSortingElement: null,
				value: null,
			}
		},
		computed: {
			...mapState(['userProfile', 'posts', 'country_options_dropdown']),
			getCountryUpdatedPostsList() {
				let criteriaCountry = this.selectedCountryOption.toLowerCase()
				let criteriaContent = this.selectedPostContent.toLowerCase()
				let updatedPostList = this.posts
				updatedPostList = (criteriaCountry === '') ? updatedPostList :
					this.posts.filter(opt => opt.countryTravelled.toLowerCase().indexOf(criteriaCountry) > -1)
				updatedPostList = (criteriaContent === '') ? updatedPostList :
					this.posts.filter(opt => opt.content.toLowerCase().indexOf(criteriaContent) > -1)
				updatedPostList = this.getCountrySortedPostsList(updatedPostList)
				return updatedPostList
			},
			getTextMessage() {
				let detectedCountrySearch = (this.selectedCountryOption === '') ? '' : ' (COUNTRY: '
					+ this.selectedCountryOption + ')'
				let detectedContentSearch = (this.selectedPostContent === '') ? '' : ' (CONTENT: '
					+ this.selectedPostContent + ')'
				if (this.posts.length === 0) {
					return "There is no post has been made so far. Be the first one to share!"
				} else if (this.getCountryUpdatedPostsList.length === 0) {
					return "There is no post matching with" + detectedCountrySearch + detectedContentSearch
				} else if (this.selectedCountryOption !== '' || this.selectedPostContent !== '') {
					return "Search for post matching with " + detectedCountrySearch + detectedContentSearch
				}
				return "Showing all the posts"
			},
			updateInterestCountry() {
				return this.updateValue()
			}
		},
		methods: {
			getCountrySortedPostsList(updatedPostList) {
				let criteria = this.selectedSortingElement
				let order = this.selectedSortingOrder
				if (criteria === "createdOn") {
					updatedPostList.sort(function (a, b) {
						return b.createdOn - a.createdOn;
					})
				} else if (criteria === "likes") {
					updatedPostList.sort(function (a, b) {
						return b.likes - a.likes;
					})
				} else if (criteria === "ratings") {
					updatedPostList.sort(function (a, b) {
						return b.rating_value_5 - a.rating_value_5;
					})
				}
				if (order === "increasing") {
					return updatedPostList.reverse()
				}
				return updatedPostList
			},
			toggleCommentModal(post) {
				this.showCommentModal = !this.showCommentModal
				if (this.showCommentModal) {
					this.selectedPost = post
				} else {
					this.selectedPost = {}
				}
			},
			likePost(id, likesCount) {
				this.$store.dispatch('likePost', {id, likesCount})
			},
			async viewPost(post) {
				try {
					const docs = await commentsCollection.where('postId', '==', post.id).get()
					docs.forEach(doc => {
						let comment = doc.data()
						comment.id = doc.id
						this.postComments.push(comment)
					})
					this.fullPost = post
					this.showPostModal = true
				} catch (e) {
					console.log(e.message)
				}
			},
			closePostModal() {
				this.postComments = []
				this.showPostModal = false
			},
			updateValue() {
				this.value = (this.value != null) ? this.value : this.userProfile.country_interested
				return this.value
			},
			getTravelledPeople(selectedFullPost) {
				let summaryString = ''
				if (selectedFullPost.numAdult > 0) {
					summaryString += " " + selectedFullPost.numAdult + " adult(s)"
				}
				if (selectedFullPost.numChild > 0) {
					summaryString += " " + selectedFullPost.numChild + " child(s)"
				}
				if (selectedFullPost.numElder > 0) {
					summaryString += " " + selectedFullPost.numElder + " elderly(s)"
				}
				return summaryString
			}
		},
		filters: {
			formatDate(val) {
				if (!val) {
					return '-'
				}
				let date = val.toDate()
				return moment(date).fromNow()
			},
			formatDateTravelled(val) {
				if (!val) {
					return '-'
				}
				let date = val.toDate()
				return moment(date).format('MMM-DD-YYYY')
			},
			trimLength(val) {
				if (val.length < 200) {
					return val
				}
				return `${val.substring(0, 200)}...`
			},
		},
		created() {
			this.currentPosts = this.posts
		}
	}
</script>