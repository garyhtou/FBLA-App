/**
 *
 */

import React from "react";
import {
	TouchableOpacity,
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
import { colors } from "../config/styles";
import firebase from "../config/firebase";

export default class SignUpScreen extends React.Component {
	state = {
		name: "",
		email: "",
		password: "",
		errorMessage: null,
		loading: false,
	};

	handleSignUp = () => {
		this.setState({ errorMessage: null, loading: true });
		const { name, email, password } = this.state;
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then((userCredentials) => {
				this.setState({ loading: false });
				return userCredentials.user
					.updateProfile({
						displayName: name,
					})
					.then(() => {
						this.props.navigation.navigate("App");
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

						<View style={styles.errorContainer}>
							{this.state.errorMessage && (
								<Text style={styles.errorText}>{this.state.errorMessage}</Text>
							)}
						</View>

						<Form style={styles.form}>
							<Item floatingLabel>
								<Label style={styles.authLabelText}>Full Name</Label>
								<Input
									style={styles.authInput}
									autoCapitalize="none"
									onChangeText={(name) => this.setState({ name })}
									value={this.state.name}
								/>
							</Item>

							<Item floatingLabel>
								<Label style={styles.authLabelText}>Email</Label>
								<Input
									style={styles.authInput}
									autoCapitalize="none"
									onChangeText={(email) => this.setState({ email })}
									value={this.state.email}
								/>
							</Item>

							<Item floatingLabel style={styles.marginTop}>
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
					</Content>
					<Footer style={styles.footer}>
						<TouchableOpacity
							onPress={() => this.props.navigation.navigate("SignIn")}
						>
							<Text style={styles.redirectText}>
								Already have an account?{" "}
								<Text style={{ color: colors.complementAccent }}>Sign In</Text>
							</Text>
						</TouchableOpacity>
					</Footer>
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
		marginBottom: 10,
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
		marginTop: 15,
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
		marginTop: 20,
	},
	redirectText: {
		color: colors.mediumText,
		fontSize: 13,
	},
	footer: {
		alignItems: "center",
	},
	loading: {
		color: colors.white,
	},
});
