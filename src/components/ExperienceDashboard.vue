<template>
    <div id = "dashboard">
        <transition name = "fade">
            <CommentModal :post = "selectedPost" @close = "toggleCommentModal()"
                          v-if = "showCommentModal"></CommentModal>
        </transition>
        <section style = "padding: 10px">
            <md-autocomplete v-model = "selectedOption"
                             :md-options = "country_options_dropdown"
                             id = "countryDropdownList">
                <label>Country</label>
            </md-autocomplete>
            <md-field>
                <label>Post Experience Content</label>
                <md-input v-model="selectedPostContent"></md-input>
            </md-field>
            <pin-a-country :selected-country = "selectedOption"></pin-a-country>
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
                    <div v-if = "getUpdatedPostsList.length === 0 && getTextMessage !== ''" class = "post">
                        <p class = "no-results">
                            <em>{{getTextMessage}}</em>
                        </p>
                    </div>
                    <div :key = "post.id" class = "post" v-for = "post in getUpdatedPostsList">
                        <h5>{{ post.userName }}</h5>
                        <p>has travelled to {{ post.countryTravelled }} on the date
                           {{post.dateTravelled | formatDateTravelled}}</p>
                        <span>posted {{ post.createdOn | formatDate }}</span>
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
				selectedOption: '',
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
				historySelectedOption: ''
			}
		},
		computed: {
			...mapState(['userProfile', 'posts', 'country_options_dropdown']),
			getUpdatedPostsList() {
				if (this.selectedOption === '') {
					return this.posts
				} else {
					const criteria = this.selectedOption.toLowerCase()
					return this.posts.filter(opt => opt.countryTravelled.toLowerCase().indexOf(criteria) > -1)
				}
			},
			getTextMessage() {
				if (this.posts.length === 0) {
					return "There is no post has been made so far. Be the first one to share!"
				} else if (this.getUpdatedPostsList.length === 0) {
					return "There is no post matching with " + this.selectedOption
                }
				return ""
			}
		},
		methods: {
			toggleCommentModal(post) {
				this.showCommentModal = !this.showCommentModal
				// if opening modal set selectedPost, else clear
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
						} else if (this.currentPosts.length === 0 && this.selectedOption !== '') {
							this.textMessage = "There are currently no posts about " + this.selectedOption
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