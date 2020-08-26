/**
 * Loading screen that redirects user after authentication status is received
 */

import React from "react";
import firebase from "../config/firebase";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { AppLoading } from "expo";
import {chapterConverter, getChapterInitialized} from "../config/chapter";

import {
	getCurUser,
	getUserConverter,
	getUserInitialized,
} from "../config/user";

export default class LoadingScreen extends React.Component {

	startChapter = (chapterID) =>{
		console.log("init");
		let chapterListener = firebase
			.firestore()
			.collection("Chapter")
			.doc(chapterID)
			.onSnapshot(
				(doc) => {
					if (doc.data() != null) {
						chapterConverter.setCurChapter(doc);


						if (getChapterInitialized() === false) {
							chapterConverter.setInit(true);
							chapterConverter.addListener(chapterListener);

							this.props.navigation.navigate("JoinChap");

						}
					}
				},
				() => {
					console.log("User Logged Out");
				}
			);

	}
	async componentDidMount() {
		await Font.loadAsync({
			Roboto: require("native-base/Fonts/Roboto.ttf"),
			Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
			...Ionicons.font,
		});
		
		
		

		let userListener = null;
		// When firebase user loads
		firebase.auth().onAuthStateChanged((user) => {
			// If a user is signed in
			if (user !== null) {
				let curID = firebase.auth().currentUser.uid;

				userListener = firebase
					.firestore()
					.collection("DatabaseUser")
					.doc(curID)
					.onSnapshot(
						(doc) => {
							if (doc.data() != null) {
								getUserConverter().setCurUser(doc);

								if (getUserInitialized() === false) {
									getUserConverter().setInit(true);
									getUserConverter().setListener(userListener);


									// If the user is not in a chapter - go to chapter screens
									if (getCurUser().inChapter === false) {
										console.log("init");
										this.props.navigation.navigate("Chap");
									}
									// Else - go to the app
									else {
										this.startChapter(getCurUser().chapterID)
									}
								}
							}
						},
						() => {
							console.log("User Logged Out");
						}
					);
			}

			// If the a user is not signed in - go to sign in screen
			else {
				console.log("Signed Out");
				if (userListener !== null) {
					userListener();
				}
				getUserConverter().setInit(false);
				this.props.navigation.navigate("Auth");
			}
		});
	}

	render() {
		console.log("here");
		return <AppLoading />;
	}
}
