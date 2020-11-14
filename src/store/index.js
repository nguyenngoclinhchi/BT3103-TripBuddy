import Vue from 'vue';
import Vuex from 'vuex';
import * as fb from '../firebase';
import router from '../router/index';
import worldCode from "@/all.json";

Vue.use(Vuex)

// realtime firebase
fb.postsCollection.orderBy('createdOn', 'desc').onSnapshot(snapshot => {
	let postsArray = []
	snapshot.forEach(doc => {
		let post = doc.data()
		post.id = doc.id
		postsArray.push(post)
	})
	store.commit('setPosts', postsArray)
})

const store = new Vuex.Store({
	state: {
		userProfile: {},
		posts: [],
		user: null,
		country_options_dropdown: [],
	},
	mutations: {
		setUserProfile(state, val) {
			state.userProfile = val
		},
		setPerformingRequest(state, val) {
			state.performingRequest = val
		},
		setPosts(state, val) {
			state.posts = val
		},
		SET_USER: state => {
			state.user = fb.auth.currentUser;
		},
		set_country_options(state, val) {
			state.country_options_dropdown = val
		},
	},
	getters: {
		getUser: state => state.user,
		getCountryOptionsDropdown: state => state.country_options_dropdown
	},
	actions: {
		setUser: context => {
			context.commit("SET_USER");
		},
		async login({dispatch}, form) {
			try {
				// sign user in
				const {user} = await fb.auth.signInWithEmailAndPassword(form.email, form.password)
				// fetch user profile and set in state
				dispatch('fetchUserProfile', user)
				fb.auth.onAuthStateChanged(newUser => {
					if (newUser) {
						if (newUser.emailVerified === true) {
							console.log('login success');
						} else {
							console.log("user did not verify email")
						}
					} else {
						console.log('not logged in');
					}
				})
			} catch (err) {
				alert(err.message)
			}
		},
		// eslint-disable-next-line no-unused-vars
		async signup({dispatch}, form) {
			try {
				// sign user up
				console.log('Sign up with nationality: ', form.nationality, "with type: ", typeof form.nationality)
				const {user} = await fb.auth.createUserWithEmailAndPassword(form.email, form.password)
				fb.auth.onAuthStateChanged(firebaseUser => {
					if (firebaseUser) {
						firebaseUser.sendEmailVerification().then(function () {
							console.log('send Verification');
							alert("A confirmation email is sent to you to make sure this email is valid for resetting " +
								"password case.")
						}, function (error) {
							console.log('not send Verification', error);
						});
					} else {
						console.log('not logged in');
					}
				})
				// create user object in userCollections
				await fb.usersCollection.doc(user.uid).set({
					email: form.email,
					name: form.name,
					nationality: form.nationality,
					country_interested: form.country_interested
				})
				// fetch user profile and set in state
				dispatch('fetchUserProfile', user)
			} catch (err) {
				alert(err.message)
			}
		},
		async addCountries({dispatch}) {
			let country_options = []
			for (let index = 0; index < worldCode.length; index++) {
				let code = "[" + worldCode[index]["alpha-3"] + "] "
				let countryName = worldCode[index]["name"]
				let country = code + countryName
				country_options.push(country)
			}
			dispatch('fetchCountryOptionsDropDown', country_options);
		},
		async fetchUserProfile({commit}, user) {
			try {
				console.log("Fetching user profile")
				console.log("user", user)
				// fetch user profile
				const userProfile = await fb.usersCollection.doc(user.uid).get()
				// set user profile in state
				commit('setUserProfile', userProfile.data())
				if (router.currentRoute.path === '/login') {
					await router.push('/')
				}
			} catch (err) {
				alert(err.message)
			}
		},
		async fetchCountryOptionsDropDown({commit}, countries) {
			commit('set_country_options', countries)
		},
		async logout({commit}) {
			try {
				// log user out
				await fb.auth.signOut()
				// clear user data from state
				commit('setUserProfile', {})
				// redirect to login view
				await router.push('/login')
			} catch (err) {
				alert(err.message)
			}
		},
		// eslint-disable-next-line no-unused-vars
		async createPost({state, commit}, post) {
			// create post in firebase
			await fb.postsCollection.add({
				createdOn: new Date(),
				userId: fb.auth.currentUser.uid,
				userName: state.userProfile.name,
				userNationality: state.userProfile.nationality,
				userEmail: state.userProfile.email,
				comments: 0,
				likes: 0,
				content: post.content,
				countryTravelled: post.countryTravelled,
				dateTravelled: post.dateTravelled,
				dateTravelledTo: post.dateTravelledTo,
				numAdult: post.numAdult,
				numChild: post.numChild,
				numElder: post.numElder,
				purpose: post.purpose,
				medical: post.medical,
				rating_value_1: post.rating_value_1,
				rating_value_2: post.rating_value_2,
				rating_value_3: post.rating_value_3,
				rating_value_4: post.rating_value_4,
				rating_value_5: post.rating_value_5,
			})
		},
		// eslint-disable-next-line no-unused-vars
		async likePost({commit}, post) {
			const userId = fb.auth.currentUser.uid
			const docId = `${userId}_${post.id}`
			
			// check if user has liked post
			const doc = await fb.likesCollection.doc(docId).get()
			if (doc.exists) {
				return
			}
			
			// create post
			await fb.likesCollection.doc(docId).set({
				postId: post.id,
				userId: userId
			})
			
			// update post likes count
			await fb.postsCollection.doc(post.id).update({
				likes: post.likesCount + 1
			})
		},
		async updateProfile({dispatch}, user) {
			const userId = fb.auth.currentUser.uid
			// update user object
			// eslint-disable-next-line no-unused-vars
			const userRef = await fb.usersCollection.doc(userId).update({
				email: user.email,
				name: user.name,
				nationality: user.nationality,
				country_interested: user.country_interested
			})
			dispatch('fetchUserProfile', {uid: userId})
			// update all posts by user
			const postDocs = await fb.postsCollection.where('userId', '==', userId).get()
			postDocs.forEach(doc => {
				fb.postsCollection.doc(doc.id).update({
					userName: user.name
				})
			})
			// update all comments by user
			const commentDocs = await fb.commentsCollection.where('userId', '==', userId).get()
			commentDocs.forEach(doc => {
				fb.commentsCollection.doc(doc.id).update({
					userName: user.name
				})
			})
		}
	}
})

export default store
