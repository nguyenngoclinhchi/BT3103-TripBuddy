<template>
    <div id = "dashboard">
        <transition name = "fade">
            <CommentModal :post = "selectedPost" @close = "toggleCommentModal()"
                          v-if = "showCommentModal"></CommentModal>
        </transition>
        <section>
            <div class = "col1">
                <div class = "profile">
                    <h5 style = "text-align: center">Welcome {{ userProfile.name }}</h5>
                    <p style = "text-align: center">{{ userProfile.nationality }}</p>
                </div>
                <div class = "accordion" role = "tablist">
                    <b-card no-body class = "mb-1">
                        <b-card-header header-tag = "header" class = "p-1" role = "tab">
                            <b-button block v-b-toggle.accordion-1 variant = "info" style = "font-size: 13px"
                            @click="value = (value != null)? value : userProfile.country_interested">
                                SHORTCUT FILTER posts with PINNED COUNTRY list
                            </b-button>
                        </b-card-header>
                        <b-collapse id = "accordion-1" visible accordion = "my-accordion" role = "tabpanel">
                            <p style="text-align: center">Choose only posts with ONLY specific country in the PINNED list</p>
                            <b-form-group style = "padding: 0 8px">
                                <b-form-checkbox-group v-model = "selected" :options = "optionsSortingElement"
                                                       class="controls" stacked name = "buttons-1"
                                                       buttons button-variant = "light" size = "sm">
                                </b-form-checkbox-group>
                            </b-form-group>
                        </b-collapse>
                    </b-card>
                    <b-card no-body class = "mb-1">
                        <b-card-header header-tag = "header" class = "p-1" role = "tab">
                            <b-button block v-b-toggle.accordion-2 variant = "info" style = "font-size: 13px">
                                FILTER and SEARCH
                            </b-button>
                        </b-card-header>
                        <b-collapse id = "accordion-2" accordion = "my-accordion" role = "tabpanel">
                            <b-card-body style = "padding-top: 3px; padding-bottom: 0; font-size: 13px">
                                <md-autocomplete v-model = "selectedCountryOption"
                                                 :md-options = "country_options_dropdown"
                                                 id = "countryDropdownList" style = "margin-right: 20px">
                                    <label>Search with Country</label>
                                </md-autocomplete>
                                <md-field>
                                    <label>Search with Post Content</label>
                                    <md-input v-model = "selectedPostContent" class = "controls"></md-input>
                                </md-field>
                                <pin-a-country :selected-country = "selectedCountryOption"></pin-a-country>
                                <label>SORT BY ELEMENT</label>
                                <md-radio v-model = "selectedSortingElement" value = "createdOn" class = "md-primary">
                                    CreatedTime
                                </md-radio>
                                <md-radio v-model = "selectedSortingElement" value = "likes" class = "md-primary">
                                    Likes
                                </md-radio>
                                <md-radio v-model = "selectedSortingElement" value = "rating" class = "md-primary">
                                    Rating
                                </md-radio>
                                <label>SORTING ORDER</label>
                                <md-radio v-model = "radio" value = "descending">DESC</md-radio>
                                <md-radio v-model = "radio" value = "increasing">INC</md-radio>
                            </b-card-body>
                        </b-collapse>
                    </b-card>
                </div>
                <div class = "accordion" role = "tablist">
                    <b-card no-body class = "mb-1">
                        <b-card-header header-tag = "header" class = "p-1" role = "tab">
                            <b-button block v-b-toggle.accordion-3 variant = "info" style = "font-size: 13px">
                                CREATE Post
                            </b-button>
                        </b-card-header>
                        <b-collapse id = "accordion-3" accordion = "my-accordion" role = "tabpanel">
                            <b-card-body>
                                <h6 style = "text-align: center">Let's create a personalized advisory</h6>
                                <experience-form></experience-form>
                            </b-card-body>
                        </b-collapse>
                    </b-card>
                </div>
            </div>
            <div class = "col2">
                <div>
                    <div v-if = "getCountryUpdatedPostsList.length === 0 && getTextMessage !== ''" class = "post">
                        <p class = "no-results">
                            <em>{{getTextMessage}}</em>
                        </p>
                    </div>
                    <div :key = "post.id" class = "post" v-for = "post in getCountryUpdatedPostsList">
                        <h5>{{ post.userName }}</h5>
                        <p>has travelled to <em>{{ post.countryTravelled }}</em> from <em>{{post.dateTravelled |
                                                                                          formatDateTravelled}}</em>
                           to <em>{{post.dateTravelledTo | formatDateTravelled}}</em></p>
                        <span>posted {{ post.createdOn | formatDate }}</span>
                        <br>
                        <p>{{ post.content | trimLength }}</p>
                        <ul>
                            <li><a @click = "toggleCommentModal(post)">comments {{ post.comments }}</a></li>
                            <li><a @click = "likePost(post.id, post.likes)">likes {{ post.likes }}</a></li>
                            <li><a @click = "viewPost(post)">view full post</a></li>
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
                    <div class = "post">
                        <h5>{{ fullPost.userName }}</h5>
                        <span>{{ fullPost.createdOn | formatDate }}</span>
                        <p>{{ fullPost.content }}</p>
                        <ul>
                            <li><a>comments {{ fullPost.comments }}</a></li>
                            <li><a>likes {{ fullPost.likes }}</a></li>
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
</template>

<script>
	import {commentsCollection, postsCollection} from '@/firebase'
	import {mapState} from 'vuex'
	import moment from 'moment'
	import CommentModal from '@/components/CommentModal'
	import PinACountry from "@/components/PinACountry";
	import ExperienceForm from "@/components/ExperienceForm";
	// import CardSample from "@/components/CardSample";

	export default {
		components: {
			CommentModal,
			PinACountry,
			ExperienceForm,
            // CardSample,
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
				radio: 'descending',
				selected: ['createdOn'],
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
				return updatedPostList
			},
			getTextMessage() {
				if (this.posts.length === 0) {
					return "There is no post has been made so far. Be the first one to share!"
				} else if (this.getCountryUpdatedPostsList.length === 0) {
					let detectedCountrySearch = (this.selectedCountryOption === '') ? '' : ' --- COUNTRY: ' + this.selectedCountryOption
					let detectedContentSearch = (this.selectedPostContent === '') ? '' : ' --- CONTENT: ' + this.selectedPostContent
					return "There is no post matching with" + detectedCountrySearch + detectedContentSearch
				}
				return ""
			}
		},
		methods: {
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
			async updateData(countryCode) {
				this.searchClicked = false
				try {
					if (this.country_options_dropdown.includes(countryCode)) {
						this.currentPosts = []
						const docs = await postsCollection.where('countryTravelled', '==', countryCode).get()
						docs.forEach(doc => {
							let post = doc.data()
							post.id = doc.id
							this.currentPosts.push(post)
						})
						console.log("Get results: ", this.currentPosts)
						if (this.currentPosts.length > 0) {
							this.textMessage = "There are " + this.currentPosts.length + " posts found"
						} else if (this.currentPosts.length === 0 && this.selectedCountryOption !== '') {
							this.textMessage = "There are currently no posts about " + this.selectedCountryOption
						}
						return this.currentPosts.length > 0;
					}
					return false
				} catch (e) {
					console.log(e.message)
				}
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
			}
		},
		created() {
			this.currentPosts = this.posts
		}
	}
</script>