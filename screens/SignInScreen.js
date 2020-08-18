/**
 *
 */

import React from "react";
import Expo from "expo";
import * as Google from 'expo-google-app-auth';
import * as Facebook from 'expo-facebook';
import {
	StyleSheet,
	TouchableWithoutFeedback,
	Keyboard,
} from "react-native";
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
import 'firebase/firestore';
export default class SignInScreen extends React.Component {
   state = {
      email: "",
      password: "",
      errorMessage: null,
      loading: false,
   };
	isUserEqual = (googleUser, firebaseUser) => {
		if (firebaseUser) {
			var providerData = firebaseUser.providerData;
			for (var i = 0; i < providerData.length; i++) {
				if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
					providerData[i].uid === googleUser.getBasicProfile().getId()) {
					// We don't need to reauth the Firebase connection.
					return true;
				}
			}
		}
		return false;
	}
	onSignIn = googleUser => {
		console.log('Google Auth Response', googleUser);
		// We need to register an Observer on Firebase Auth to make sure auth is initialized.
		var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
			unsubscribe();
			// Check if we are already signed-in Firebase with the correct user.
			if (!this.isUserEqual(googleUser, firebaseUser)) {
				// Build Firebase credential with the Google ID token.
				var credential = firebase.auth.GoogleAuthProvider.credential(
					googleUser.idToken,
					googleUser.accessToken
					);
				// Sign in with credential from the Google user.
				firebase.auth().signInWithCredential(credential).then(function(result) {
					console.log('user signed in');
					firebase
						.database()
						.ref('/users' + result.user.uid)
						.set({
							gmail: result.user.email,
							first_name: result.additionalUserInfo.profile.given_name,
							last_name: result.additionalUserInfo.profile.family_name
						})
						.then(function(snapshot) {

					});
				}).catch(function(error) {
					// Handle Errors here.
					var errorCode = error.code;
					var errorMessage = error.message;
					// The email of the user's account used.
					var email = error.email;
					// The firebase.auth.AuthCredential type that was used.
					var credential = error.credential;
					// ...
				});
			} else {
				console.log('User already signed-in Firebase.');
			}
		}.bind(this));
	}
	componentDidMount(){
		firebase.auth().onAuthStateChanged((user) => {
			if(user != null)
			{
				console.log(user);
			}
		})
	}
   signInWithGoogleAsync = async() => {
   		console.log("running");
		try {
			const result = await Google.logInAsync({
				behavior:'web',
				androidClientId: '200356083068-cmspe2kthe9gis90nj73odthv0lvai3a.apps.googleusercontent.com',
				iosClientId: '200356083068-v599qf4gh4u4gdv97bel5fr18o1fpp86.apps.googleusercontent.com',
				scopes: ['profile', 'email'],
			});
			console.log(result);
			if (result.type === 'success') {

				// const { idToken, accessToken } = result;
				// const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
				// firebase
				// 	.auth()
				// 	.signInAndRetrieveDataWithCredential(credential)
				// 	.then(res => {
				// 		// user res, create your user, do whatever you want
				// 	})
				// 	.catch(error => {
				// 		console.log("firebase cred err:", error);
				// 	});jjkl
				this.onSignIn(result);

				return result.accessToken;
			} else {
				return { cancelled: true };
			}
		} catch (e) {
			return { error: true };
		}
	};
	async loginWithFacebook() {
		const {type, token} = await Facebook.logInWithReadPermissionsAsync('684604582290429', {permissions: ['public_profile']})
		if (type == 'success') {
			const credential = firebase.auth.FacebookAuthProvider.credential(token)
			firebase.auth().signInWithCredential(credential).catch((error) => {console.log(error)})
		}
	}
	handleSignIn = () => {
      this.setState({errorMessage: null, loading: true})
      const { email, password } = this.state;
      return firebase
         .auth()
         .signInWithEmailAndPassword(email, password)
         .then( (userCredentials) => {
			 this.setState({loading: false});
         })
         .catch((error) => this.setState({ loading: false, errorMessage: error.message }));
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
							<Button
								block
								style={styles.authButton}
								onPress={() => this.signInWithGoogleAsync()}
							>
								{this.state.loading ? (
									<Spinner color={colors.white} />
								) : (
									<Text style={styles.authButtonText}>Sign In With Google</Text>
								)}
							</Button>
							<Button
								block
								style={styles.authButton}
								onPress={() => this.loginWithFacebook() }
							>
								{this.state.loading ? (
									<Spinner color={colors.white} />
								) : (
									<Text style={styles.authButtonText}>Sign In With Facebook</Text>
								)}
							</Button>
							{/* <Button full style={styles.authButton}>
								{this.state.loading ? (
									<Spinner color="white" />
								) : (
									<TouchableOpacity onPress={this.handleSignInWithGoogle}>
										<Text style={styles.authButtonText}>
											Sign In with Google
										</Text>
									</TouchableOpacity>
								)}
							</Button> */}
						</Form>

						<View style={styles.errorContainer}>
							<Text style={styles.errorText}>
								{this.state.errorMessage}
							</Text>
						</View>

					</Content>

					<TouchableWithoutFeedback
						onPress={() => this.props.navigation.navigate("SignUp")}
					>
					<Footer style={styles.footer}>
							<Text style={styles.redirectText}>
								New to {strings.appName}?{" "}
								<Text style={{ color: colors.complementAccent }}>
									Sign Up
								</Text>
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
	form: {
	},
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
	redirectText: {
		color: colors.mediumText,
		fontSize: 13,
	},
	footer: {
		alignItems: "center",
		backgroundColor: colors.white,
		borderTopWidth: 1,
		borderTopColor: "#d3d3d3"
	},
	loading: {
		color: colors.white,
	},
	noLeftMargin: {
		marginLeft: 0
	}
});
