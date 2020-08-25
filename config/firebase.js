/**
 * Firebase configuration
 */

import firebase from "firebase";

const firebaseConfig = {
	apiKey: "AIzaSyDYezXvKXApGuyXVij_dB7oXhz8ja3b7FU",
	authDomain: "mobile-app-development-15940.firebaseapp.com",
	databaseURL: "https://mobile-app-development-15940.firebaseio.com",
	projectId: "mobile-app-development-15940",
	storageBucket: "mobile-app-development-15940.appspot.com",
	messagingSenderId: "200356083068",
	appId: "1:200356083068:web:d623a36471a0e0ca39e0f9",
	measurementId: "G-NS6FVH7163",
};

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
}

export default firebase;
