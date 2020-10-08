/**
 *
 */

import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { Container, Header, Content, Title, Body } from "native-base";
import { userConverter, getUserInitialized } from "../config/user";
import firebase from "../config/firebase";
import { colors } from "../config/styles";

export default class OppScreen extends React.Component {
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
	_handlePressBAAButtonAsync = async () => {
		let result = await WebBrowser.openBrowserAsync('https://www.fbla-pbl.org/fbla/programs/education/baa/');
		this.setState({ result });
	};
	_handlePressCSAButtonAsync = async () => {
		let result = await WebBrowser.openBrowserAsync('https://www.fbla-pbl.org/fbla/programs/recognition-awards/csa/');
		this.setState({ result });
	};

	render() {
		return (
			<Container>
				<Header>
					<Body>
						<Title>Opportunity</Title>
					</Body>
				</Header>
				<View>
					<Button title="BAA" onPress={this._handlePressBAAButtonAsync} />
					<Text>{this.state.result && JSON.stringify(this.state.result)}</Text>
				</View>
				<View>
					<Button title="CSA" onPress={this._handlePressCSAButtonAsync} />
					<Text>{this.state.result && JSON.stringify(this.state.result)}</Text>
				</View>
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
