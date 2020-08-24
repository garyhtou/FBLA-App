/**
 *
 */

import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { Container, Header, Content, Title, Body } from "native-base";
import { userConverter, userInitialized } from "../config/user";
import firebase from "../config/firebase";
import { colors } from "../config/styles";

export default class ProfileScreen extends React.Component {
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
			<Container>
				<Header>
					<Body>
						<Title>Profile</Title>
					</Body>
				</Header>
				<Content contentContainerStyle={styles.container}>
					<Text>Hello {this.state.displayName}!</Text>

					<TouchableOpacity style={styles.button} onPress={this.signOutUser}>
						<Text style={styles.redirectText}>SignOut</Text>
					</TouchableOpacity>
				</Content>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#f3f3f3",
	},
	button: {
		marginTop: 32,
	},
	redirectText: {
		color: colors.mediumText,
		fontSize: 13,
	},
});
