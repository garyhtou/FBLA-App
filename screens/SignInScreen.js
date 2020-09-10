/**
 *
 */

import React from "react";
import Expo from "expo";
import * as Google from "expo-google-app-auth";
import * as Facebook from "expo-facebook";
import { StyleSheet, TouchableWithoutFeedback, Keyboard } from "react-native";
import {
	Text,
	Container,
	Footer,
	View,
	Content,
	Spinner,
	Form,
	Input,
	Item,
	Label,
	Button,
} from "native-base";
import { colors, strings } from "../config/styles";
import firebase from "../config/firebase";
import "firebase/firestore";
import { AntDesign } from "@expo/vector-icons";

export default class SignInScreen extends React.Component {
	state = {
		email: "",
		password: "",
		errorMessage: null,
		loading: false,
	};

	isUserEqual = (googleUser, firebaseUser) => {
		if (firebaseUser) {
			let providerData = firebaseUser.providerData;
			for (let i = 0; i < providerData.length; i++) {
				if (
					providerData[i].providerId ===
						firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
					providerData[i].uid === googleUser.getBasicProfile().getId()
				) {
					// We don't need to reauth the Firebase connection.
					return true;
				}
			}
		}
		return false;
	};
	componentDidMount() {
		Facebook.initializeAsync(684604582290429, "FBLA-App");
	}

	async loginWithFacebook() {
		const {
			type,
			token,
		} = await Facebook.logInWithReadPermissionsAsync( {
			permissions: ["public_profile"],
		});
		if (type === "success") {
			const credential = firebase.auth.FacebookAuthProvider.credential(token);
			firebase
				.auth()
				.signInWithCredential(credential)
				.catch((error) => {
					console.log(error);
				});
		}
		else {
			console.log("failure to login to facebook");
		}
	}
	/*async function signInWithFacebook() {
		const appId = 684604582290429;
		//const permissions = ['public_profile', 'email'];  // Permissions required, consult Facebook docs

		const {
			type,
			token,
		} = await Facebook.logInWithReadPermissionsAsync(
			appId
		);

		switch (type) {
			case 'success': {
				await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);  // Set persistent auth state
				const credential = firebase.auth.FacebookAuthProvider.credential(token);
				const facebookProfileData = await firebase.auth().signInAndRetrieveDataWithCredential(credential);  // Sign in with Facebook credential

				// Do something with Facebook profile data
				// OR you have subscribed to auth state change, authStateChange handler will process the profile data

				return Promise.resolve({type: 'success'});
			}
			case 'cancel': {
				return Promise.reject({type: 'cancel'});
			}
		}
	}*/
	handleSignIn = () => {
		this.setState({ errorMessage: null, loading: true });
		const { email, password } = this.state;
		return firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then((userCredentials) => {
				this.setState({ loading: false });
			})
			.catch((error) =>
				this.setState({ loading: false, errorMessage: error.message })
			);
	};

	render() {
		return (
			<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
				<Container>
					<Content contentContainerStyle={styles.content}>
						<Text style={styles.heading}>Welcome to {strings.appName}</Text>

						<Form style={styles.form}>
							<Item floatingLabel style={styles.noLeftMargin}>
								<Label style={styles.authLabelText}>Email Address</Label>
								<Input
									style={styles.authInput}
									autoCapitalize="none"
									onChangeText={(email) => this.setState({ email })}
									value={this.state.email}
								/>
							</Item>

							<Item floatingLabel style={styles.noLeftMargin}>
								<Label style={styles.authLabelText}>Password</Label>
								<Input
									style={styles.authInput}
									secureTextEntry
									autoCapitalize="none"
									onChangeText={(password) => this.setState({ password })}
									value={this.state.password}
								/>
							</Item>

							<Button
								block
								style={styles.authButton}
								onPress={this.handleSignIn}
							>
								{this.state.loading ? (
									<Spinner color={colors.white} />
								) : (
									<Text style={styles.authButtonText}>Sign In</Text>
								)}
							</Button>

							<View style={styles.authButtonRow}>
								<Button
									block
									style={styles.authButtonGoogle}
									onPress={() => this.signInWithGoogleAsync()}
								>
									<AntDesign
										name="google"
										size={26}
										color="white"
										verticalAlign="middle"
									/>
								</Button>

								<Button
									block
									style={styles.authButtonFacebook}
									onPress={() => this.loginWithFacebook()}
								>
									<AntDesign
										name="facebook-square"
										size={26}
										color="white"
										verticalAlign="middle"
									/>
								</Button>
							</View>
						</Form>

						<View style={styles.errorContainer}>
							<Text style={styles.errorText}>{this.state.errorMessage}</Text>
						</View>
					</Content>

					<TouchableWithoutFeedback
						onPress={() => this.props.navigation.navigate("SignUp")}
					>
						<Footer style={styles.footer}>
							<Text style={styles.redirectText}>
								New to {strings.appName}?{" "}
								<Text style={{ color: colors.complementAccent }}>Sign Up</Text>
							</Text>
						</Footer>
					</TouchableWithoutFeedback>
				</Container>
			</TouchableWithoutFeedback>
		);
	}
}

const styles = StyleSheet.create({
	content: {
		flex: 1,
		justifyContent: "center",
		marginHorizontal: 50,
	},
	heading: {
		fontSize: 24,
		textAlign: "center",
	},
	errorContainer: {
		marginTop: 15,
		alignItems: "center",
		justifyContent: "center",
	},
	errorText: {
		color: colors.complementAccent,
		fontSize: 13,
		textAlign: "center",
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
	redirectText: {
		color: colors.mediumText,
		fontSize: 13,
	},
	footer: {
		alignItems: "center",
		backgroundColor: colors.white,
		borderTopWidth: 1,
		borderTopColor: "#d3d3d3",
	},
	loading: {
		color: colors.white,
	},
	noLeftMargin: {
		marginLeft: 0,
	},
});
