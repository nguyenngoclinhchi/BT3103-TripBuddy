import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// firebase init
const firebaseConfig = {
	apiKey: "AIzaSyBTCLATT80KJTNRx9r1LU9Jhh4yCe0NVfg",
	authDomain: "tripbuddy-ac05a.firebaseapp.com",
	databaseURL: "https://tripbuddy-ac05a.firebaseio.com",
	projectId: "tripbuddy-ac05a",
	storageBucket: "tripbuddy-ac05a.appspot.com",
	messagingSenderId: "39359922526",
	appId: "1:39359922526:web:e13fd71098e53f837c0fcf",
	measurementId: "G-P3CEWZ7612"
};
firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.firestore()
const auth = firebase.auth()

// collection references
const usersCollection = db.collection('users')
const postsCollection = db.collection('posts')
const commentsCollection = db.collection('comments')
const likesCollection = db.collection('likes')

// export utils/refs
export {
	db,
	auth,
	usersCollection,
	postsCollection,
	commentsCollection,
	likesCollection
}
