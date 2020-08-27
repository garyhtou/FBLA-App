/**
 * Loading screen that redirects user after authentication status is received
 */

import React from "react";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { Container, Spinner } from "native-base";
import { StackActions } from "@react-navigation/native";
import { firestore } from "../config/firebase";

import * as Alert from "react-native-web";
import * as BackHandler from "react-native-web";

export default class LoadingScreen extends React.Component {
	async componentDidMount() {
		await Font.loadAsync({
			Roboto: require("native-base/Fonts/Roboto.ttf"),
			Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
			...Ionicons.font,
		});

		firestore.start().then(() => {
			firestore.user().listen.isLoggedIn((isLoggedIn) => {
				if (isLoggedIn) {
					firestore.user().listen.inChapter((inChapter) => {
						// If the user is not in a chapter - go to chapter screens
						if (inChapter === false) {
							this.props.navigation.dispatch(StackActions.replace("Chap"));
						}
						// Else - go to the app
						else {
							this.props.navigation.dispatch(StackActions.replace("App"));
						}
					});
				}
				// If the a user is not signed in - go to sign in screen
				else {
					this.props.navigation.dispatch(StackActions.replace("Auth"));
				}
			});
		});
	}

	render() {
		console.log("here");
		return (
			<Container style={{ justifyContent: "center", alignItems: "center" }}>
				<Spinner />
			</Container>
		);
	}
}
