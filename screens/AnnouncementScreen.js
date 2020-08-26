/**
 *
 */

import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { Container, Header, Content, Title, Body } from "native-base";
import { userConverter, getUserInitialized } from "../config/user";
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
			<Container>
				<Header>
					<Body>
						<Title>Announcements</Title>
					</Body>
				</Header>
				<Content contentContainerStyle={styles.container} padder>
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
		minHeight: "100%",
		padding: 15,
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
