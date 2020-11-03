<template>
    <div id = "dashboard">
        <transition name = "fade">
            <CommentModal :post = "selectedPost" @close = "toggleCommentModal()"
                          v-if = "showCommentModal"></CommentModal>
        </transition>
        <section>
            <md-autocomplete v-model = "selectedCountryOption"
                             :md-options = "country_options_dropdown"
                             id = "countryDropdownList" style="margin-right: 20px">
                <label>Search with Country</label>
            </md-autocomplete>
            <md-field>
                <label>Search with Post Content</label>
                <md-input v-model = "selectedPostContent"></md-input>
            </md-field>
            <pin-a-country :selected-country = "selectedCountryOption" style="margin-top: 10px"></pin-a-country>
        </section>
        <section>
            <div>
                <label style="margin-top: 15px">SORT BY ELEMENT</label>
            </div>
            <div>
                <b-form-group style="padding: 0 8px; margin-top: 10px">
                    <b-form-checkbox-group v-model = "selected" :options = "optionsSortingElement"
                                           name = "buttons-1" buttons button-variant="info" size="sm"
                    ></b-form-checkbox-group>
                </b-form-group>
            </div>
            <div>
                <label style="margin-top: 15px; margin-left: 30px; margin-right: 10px">SORTING ORDER</label>
            </div>
            <div>
                <md-radio v-model="radio" value="descending">DESC</md-radio>
            </div>
            <div>
                <md-radio v-model="radio" value="increasing">INC</md-radio>
            </div>
        </section>
        <section>
            <div class = "col1">
                <div class = "profile">
                    <h5 style = "text-align: center">Welcome {{ userProfile.name }}</h5>
                    <p style = "text-align: center">{{ userProfile.nationality }}</p>
                    <h6 style = "text-align: center">Let's create a personalized advisory</h6>
                    <experience-form></experience-form>
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
                        <p>has travelled to <em>{{ post.countryTravelled }}</em> from <em>{{post.dateTravelled | formatDateTravelled}}</em>
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
	
	export default {
		components: {
			CommentModal,
			PinACountry,
			ExperienceForm
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
				selected: ['createdOn'],
				optionsSortingElement: [
					{text: 'CreatedAt', value: 'createdOn'},
					{text: 'Likes', value: 'likes'},
					{text: 'Rating', value: 'rating'},
				],
                radio: 'descending'
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