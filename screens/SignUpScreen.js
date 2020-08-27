/**
 *
 */

import React from "react";
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
import { colors } from "../config/styles";
import { firebase, firestore } from "../config/firebase";
import "firebase/firestore";

export default class SignUpScreen extends React.Component {
	state = {
		name: "",
		email: "",
		password: "",
		errorMessage: null,
		loading: false,
	};

	handleSignUp = () => {
		this.setState({ loading: true });
		const { name, email, password } = this.state;
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then((userCredentials) => {
				return userCredentials.user
					.updateProfile({
						displayName: name,
					})
					.then(() => {
						firestore
							.user()
							.create(userCredentials.user.uid, name)
							.then(() => {
								this.setState({ loading: false });
							});
					});
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
						<Text style={styles.heading}>Sign up to get started!</Text>

						<Form style={styles.form}>
							<Item floatingLabel style={styles.noLeftMargin}>
								<Label style={styles.authLabelText}>Full Name</Label>
								<Input
									style={styles.authInput}
									autoCapitalize="none"
									onChangeText={(name) => this.setState({ name })}
									value={this.state.name}
								/>
							</Item>

							<Item floatingLabel style={styles.noLeftMargin}>
								<Label style={styles.authLabelText}>Email</Label>
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
								onPress={this.handleSignUp}
							>
								{this.state.loading ? (
									<Spinner color={colors.white} />
								) : (
									<Text style={styles.authButtonText}>Sign Up</Text>
								)}
							</Button>
						</Form>

						<View style={styles.errorContainer}>
							<Text style={styles.errorText}>{this.state.errorMessage}</Text>
						</View>
					</Content>
					<TouchableWithoutFeedback
						onPress={() => this.props.navigation.navigate("SignIn")}
					>
						<Footer style={styles.footer}>
							<Text style={styles.redirectText}>
								Already have an account?{" "}
								<Text style={{ color: colors.complementAccent }}>Sign In</Text>
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
