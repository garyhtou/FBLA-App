/**
 * Loading screen that redirects user after authentication status is received
 */

import React from "react";
import firebase from "../config/firebase";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { Container, Spinner } from "native-base";
import {chapterConverter, getChapterInitialized} from "../config/chapter";
import { StackActions } from '@react-navigation/native';

import {
	getCurUser,
	userConverter,
	getUserInitialized,
} from "../config/user";
import * as Alert from "react-native-web";
import * as BackHandler from "react-native-web";

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

							this.props.navigation.dispatch(StackActions.replace("App"));

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
								userConverter.setCurUser(doc);

								if (getUserInitialized() === false) {
									userConverter.setInit(true);
									userConverter.setListener(userListener);


									// If the user is not in a chapter - go to chapter screens
									if (getCurUser().inChapter === false) {
										this.props.navigation.dispatch(StackActions.replace("Chap"));
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
				userConverter.setInit(false);
				this.props.navigation.dispatch(StackActions.replace("Auth"));
			}
		});
	}

	render() {
		console.log("here");
		return (
			<Container style={{justifyContent: "center", alignItems: "center"}}>
				<Spinner/>
			</Container>);
	}
}
