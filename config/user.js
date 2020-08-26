import firebase from "../config/firebase";
import "firebase/firestore";
import { CurrentRenderContext } from "@react-navigation/native";
import { chapterConverter } from "./chapter";

class User {
	constructor(
		name,
		chapterID,
		inChapter,
		isAdmin,
		chapterEvents,
		competitiveEvents,
		notification
	) {
		this.name = name;
		this.chapterID = chapterID;
		this.inChapter = inChapter;
		this.isAdmin = isAdmin;
		this.chapterEvents = chapterEvents;
		this.compEvents = competitiveEvents;
		this.notification = notification;
	}
	toString() {
		return (
			this.name +
			", " +
			this.chapterName +
			", " +
			this.inChapter +
			", " +
			this.isAdmin +
			", " +
			this.chapterEvents +
			", " +
			this.compEvents +
			", " +
			this.notification
		);
	}
}

// Firestore data converter
let userConverter = {
	setCurUser: function (snapshot) {
		curUser = this.fromFirestore(snapshot);
	},
	setListener: function (listener) {
		userListener = listener;
	},
	signOut: function () {
		this.setInit(false);

		if (curUser.inChapter === true) {
			chapterConverter.endChapter();
		}
		userListener();

		firebase.auth().signOut().then();
	},
	setInit: function (initialized) {
		userInitialized = initialized;
	},
	toFirestore: function (user) {
		return {
			name: user.name,
			chapterID: user.chapterID,
			inChapter: user.inChapter,
			isAdmin: user.isAdmin,

			chapterEvents: user.chapterEvents,
			compEvents: user.compEvents,
			notification: user.notification,
		};
	},
	fromFirestore: function (snapshot) {
		const data = snapshot.data();
		return new User(
			data.name,
			data.chapterID,
			data.inChapter,
			data.isAdmin,
			data.chapterEvents,
			data.compEvents,
			data.notification
		);
	},
};

let curUser;
let userInitialized = false;
let userListener;

function getCurUser() {
	return curUser;
}

function getUserInitialized() {
	return userInitialized;
}

function getUserConverter() {
	return userConverter;
}

export { getCurUser, getUserInitialized, userConverter };
