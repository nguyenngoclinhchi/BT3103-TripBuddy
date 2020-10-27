<template>
    <div id = "dashboard">
        <transition name = "fade">
            <CommentModal :post = "selectedPost" @close = "toggleCommentModal()" v-if = "showCommentModal"></CommentModal>
        </transition>
        <section>
            <div class = "col1">
                <div class = "profile">
                    <h5>Welcome {{ userProfile.name }}</h5>
                    <p>{{ userProfile.country }}</p>
                    <br>
                    <div class = "create-post">
                        <h5>Create a post</h5>
                        <form @submit.prevent>
                            <label for = "country_travelled">Country travelled</label>
                            <input id = "country_travelled" type = "text" v-model.trim = "post.countryTravelled"/>

                            <label for = "content">What is your experience in the trip?</label>
                            <textarea id = "content" type = "text" v-model.trim = "post.content"></textarea>

                            <button :disabled = "post.content === '' || post.countryTravelled === ''" @click = "createPost()" class = "button">
                                post
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <div class = "col2">
                <div v-if = "posts.length">
                    <div :key = "post.id" class = "post" v-for = "post in posts">
                        <h5>{{ post.userName }}</h5>
                        <span>{{ post.createdOn | formatDate }}</span>
                        <p>{{ post.content | trimLength }}</p>
                        <ul>
                            <li><a @click = "toggleCommentModal(post)">comments {{ post.comments }}</a></li>
                            <li><a @click = "likePost(post.id, post.likes)">likes {{ post.likes }}</a></li>
                            <li><a @click = "viewPost(post)">view full post</a></li>
                        </ul>
                    </div>
                </div>
                <div v-else>
                    <p class = "no-results">There are currently no posts</p>
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
	import {commentsCollection} from '@/firebase'
	import {mapState} from 'vuex'
	import moment from 'moment'
	import CommentModal from '@/components/CommentModal'
	
	export default {
		components: {
			CommentModal
		},
		data() {
			return {
				post: {
					content: '',
					countryTravelled: ''
				},
				showCommentModal: false,
				selectedPost: {},
				showPostModal: false,
				fullPost: {},
				postComments: []
			}
		},
		computed: {
			...mapState(['userProfile', 'posts'])
		},
		methods: {
			createPost() {
				this.$store.dispatch('createPost', {content: this.post.content})
				this.post.content = ''
			},
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
				const docs = await commentsCollection.where('postId', '==', post.id).get()
				
				docs.forEach(doc => {
					let comment = doc.data()
					comment.id = doc.id
					this.postComments.push(comment)
				})
				
				this.fullPost = post
				this.showPostModal = true
			},
			closePostModal() {
				this.postComments = []
				this.showPostModal = false
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
			trimLength(val) {
				if (val.length < 200) {
					return val
				}
				return `${val.substring(0, 200)}...`
			}
		}
	}
</script>