/**
 * Loading screen that redirects user after authentication status is received
 */

import React from "react";
import firebase from "../config/firebase";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { AppLoading } from "expo";
import {
	getCurUser,
	getUserConverter,
	getUserInitialized,
} from "../config/user";

export default class LoadingScreen extends React.Component {
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

				console.log(curID);
				console.log("Here");

				userListener = firebase
					.firestore()
					.collection("DatabaseUser")
					.doc(curID)
					.onSnapshot(
						(doc) => {
							console.log(doc.data());
							if (doc.data() != null) {
								getUserConverter().setCurUser(doc);

								if (getUserInitialized() === false) {
									getUserConverter().setInit(true);
									getUserConverter().addListener(userListener);

									// If the user is not in a chapter - go to chapter screens
									if (getCurUser().inChapter === false) {
										this.props.navigation.navigate("Chap");
									}
									// Else - go to the app
									else {
										this.props.navigation.navigate("App");
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
		return <AppLoading />;
	}
}
