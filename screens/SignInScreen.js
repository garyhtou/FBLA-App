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
import { colors, strings } from "../config/styles";
import firebase from "../config/firebase";

export default class SignInScreen extends React.Component {
	state = {
		email: "",
		password: "",
		errorMessage: null,
		loading: false,
	};

	handleSignInWithEmail = () => {
		this.setState({ errorMessage: null, loading: true });
		const { email, password } = this.state;
		return firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then(() => {
				this.setState({ loading: false });
				this.props.navigation.navigate("App");
			})
			.catch((error) =>
				this.setState({ loading: false, errorMessage: error.message })
			);
	};

	handleSignInWithGoogle = async () => {
		//can't find anything that works
	};

	render() {
		if (true) {
			return (
				<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
					<Container>
						<Content contentContainerStyle={styles.content}>
							<Text style={styles.heading}>Welcome to {strings.appName}</Text>

							<View style={styles.errorContainer}>
								{this.state.errorMessage && (
									<Text style={styles.errorText}>
										{this.state.errorMessage}
									</Text>
								)}
							</View>

							<Form style={styles.form}>
								<Item floatingLabel>
									<Label style={styles.authLabelText}>Email Address</Label>
									<Input
										style={styles.authInput}
										autoCapitalize="none"
										onChangeText={(email) => this.setState({ email })}
										value={this.state.email}
									/>
								</Item>
								<Item floatingLabel>
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
									onPress={this.handleSignInWithEmail}
								>
									{this.state.loading ? (
										<Spinner color={colors.white} />
									) : (
										<Text style={styles.authButtonText}>Sign In</Text>
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
						</Content>
						<Footer style={styles.footer}>
							<TouchableOpacity
								onPress={() => this.props.navigation.navigate("SignUp")}
							>
								<Text style={styles.redirectText}>
									New to {strings.appName}?{" "}
									<Text style={{ color: colors.complementAccent }}>
										Sign Up
									</Text>
								</Text>
							</TouchableOpacity>
						</Footer>
					</Container>
				</TouchableWithoutFeedback>
			);
		}
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
