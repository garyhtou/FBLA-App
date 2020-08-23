/**
 *
 */

import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { userConverter, userInitialized } from "../config/user";
import firebase from "../config/firebase";
import { colors } from "../config/styles";

export default class AnnouncementScreen extends React.Component {
	state = {
		email: "",
		displayName: "",
	};

	componentDidMount() {
		const { email, displayName } = firebase.auth().currentUser;
		this.setState({ email, displayName });
	}

	signOutUser = () => {
		userConverter.signOut();
	};

	render() {
		return (
			<View style={styles.container}>
				<Text>Hello {this.state.displayName}!</Text>

				<TouchableOpacity style={styles.button} onPress={this.signOutUser}>
					<Text style={styles.redirectText}>SignOut</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	button: {
		marginTop: 32,
	},
	redirectText: {
		color: colors.mediumText,
		fontSize: 13,
	},
});
