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
import 'firebase/firestore';

export default class SignInScreen extends React.Component {
   state = {
      email: "",
      password: "",
      errorMessage: null,
      loading: false
   };

   handleSignIn = () => {
      this.setState({errorMessage: null, loading: true})
      const { email, password } = this.state;
      return firebase
         .auth()
         .signInWithEmailAndPassword(email, password)
         .then( (userCredentials) => {
            this.setState({loading: false});
            let inChapter = false;
            firebase.firestore().collection("DatabaseUser")
                .doc(userCredentials.user.uid).get()
                .then(function (DocSnapshot) {
                   inChapter = DocSnapshot.get("inChapter")

               });
            if(inChapter===false){
               this.props.navigation.navigate("InitChap");
            } else{
               this.props.navigation.navigate("App");
            }


         })
         .catch((error) => this.setState({ loading: false, errorMessage: error.message }));
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
