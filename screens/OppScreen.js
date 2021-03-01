/**
 *
 */

import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import {Container, Header, Content, Title, Body, Label, Spinner, Form} from "native-base";
import { userConverter, getUserInitialized } from "../config/user";
import firebase from "../config/firebase";
import { colors } from "../config/styles";
import {
	Thumbnail,
	Button,
	Input,
	Item,
	Icon,
	Switch,
	ListItem,
	Right,
	List,
	View,
} from "native-base";
import * as WebBrowser from 'expo-web-browser';

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
	_handlePressCompButtonAsync = async () => {
		let result = await WebBrowser.openBrowserAsync('https://www.fbla-pbl.org/fbla/competitive-events/');
		this.setState({ result });
	};
	_handlePressWAButtonAsync = async () => {
		let result = await WebBrowser.openBrowserAsync('https://wafbla.org/');
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
				<Form style={styles.form}>
					<Button
						block
						style={styles.authButton}
						onPress={this._handlePressBAAButtonAsync}
					>
						{this.state.loading ? (
							<Spinner color={colors.white} />
						) : (
							<Text style={styles.authButtonText}>BAAs</Text>
						)}
					</Button>
					<Button
						block
						style={styles.authButton}
						onPress={this._handlePressCSAButtonAsync}
					>
						{this.state.loading ? (
							<Spinner color={colors.white} />
						) : (
							<Text style={styles.authButtonText}>CSA</Text>
						)}
					</Button>
					<Button
						block
						style={styles.authButton}
						onPress={this._handlePressCompButtonAsync}
					>
						{this.state.loading ? (
							<Spinner color={colors.white} />
						) : (
							<Text style={styles.authButtonText}>Competitive Events</Text>
						)}
					</Button>
					<Button
						block
						style={styles.authButton}
						onPress={this._handlePressWAButtonAsync}
					>
						{this.state.loading ? (
							<Spinner color={colors.white} />
						) : (
							<Text style={styles.authButtonText}>Washington FBLA Website</Text>
						)}
					</Button>
				</Form>
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
	form: {},
	authLabelText: {
		color: colors.lightText,
		fontSize: 15,
		textTransform: "uppercase",
	},
	authButtonText: {
		color: colors.white,
		fontSize: 16,
	},
	authInput: {
		fontSize: 20,
	},
	authButton: {
		backgroundColor: colors.complementAccent,
		borderRadius: 4,
		marginTop: 30,
	},
	authButtonRow: {
		flexDirection: "row",
		alignContent: "center",
		justifyContent: "center",
		alignItems: "center",
	},
	authButtonGoogle: {
		flex: 0.5,
		backgroundColor: "#3283FC",
		borderRadius: 4,
		marginTop: 30,
		marginRight: 5,
	},
	authButtonFacebook: {
		flex: 0.5,
		backgroundColor: "#3b5998",
		borderRadius: 4,
		marginTop: 30,
		marginLeft: 5,
	},
});
