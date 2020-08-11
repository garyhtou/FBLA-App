import React from "react";
import {
	TouchableOpacity,
	TouchableWithoutFeedback,
	Keyboard,
	StyleSheet,
} from "react-native";
import { colors, strings } from "../config/styles";
import * as firebase from "firebase";
import {
	Button,
	Content,
	Spinner,
	Container,
	Text,
	View,
	Form,
	Item,
	Label,
	Input,
	Footer,
} from "native-base";
let firestore = firebase.firestore();

export default class JoinChapScreen extends React.Component {
	state = {
		code: "",
		errorMessage: null,
		loading: false,
	};

	joinChapter = () => {
		const user = firebase.auth().currentUser;
		const { code } = this.state;
		firestore
			.collection("Chapter")
			.where("code", "==", code)
			.get()
			.then(function (querySnapshot) {
				if (querySnapshot.size === 0) {
					this.setState({ errorMessage: "No chapter with code given" });
				} else {
					const setChapter = firestore
						.collection("DatabaseUser")
						.doc(user.uid)
						.set(
							{
								chapterName: querySnapshot[0].data().get("chapterName"),
							},
							{ merge: true }
						);
				}
			});
	};

	render() {
		return (
			<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
				<Container>
					<Content contentContainerStyle={styles.content}>
						<Text style={styles.heading}>Create a Chapter!</Text>

						<View style={styles.errorContainer}>
							<Text style={styles.errorText}>{this.state.errorMessage}</Text>
						</View>

						<Form>
							<Item floatingLabel style={styles.noLeftMargin}>
								<Label style={styles.codeLabelText}>Enter Chapter Name</Label>
								<Input
									style={styles.codeInput}
									autoCapitalize="none"
									onChangeText={(code) => this.setState({ code })}
									value={this.state.code}
								/>
							</Item>
							<Button
								block
								style={styles.codeButton}
								onPress={this.joinChapter}
							>
								{this.state.loading ? (
									<Spinner color={colors.white} />
								) : (
									<Text style={styles.codeButtonText}>Create</Text>
								)}
							</Button>
						</Form>

						<TouchableOpacity
							style={styles.createChapter}
							onPress={() => {
								firebase.auth().signOut();
							}}
						>
							<Text>Sign Out</Text>
						</TouchableOpacity>
					</Content>

					<TouchableWithoutFeedback
						style={styles.createChapter}
						onPress={() => this.props.navigation.navigate("JoinChap")}
					>
						<Footer style={styles.footer}>
							<Text style={styles.redirectText}>Join a Chapter</Text>
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
		alignItems: "center",
		justifyContent: "center",
		marginHorizontal: 30,
	},
	errorText: {
		color: colors.complementAccent,
		fontSize: 13,
		textAlign: "center",
	},
	codeLabelText: {
		color: colors.lightText,
		fontSize: 15,
		textTransform: "uppercase",
	},
	codeButtonText: {
		color: colors.white,
		fontSize: 16,
	},
	codeInput: {
		fontSize: 20,
	},
	codeButton: {
		backgroundColor: colors.complementAccent,
		borderRadius: 4,
		marginTop: 30,
	},
	createChapter: {
		alignSelf: "center",
		marginTop: 32,
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
	noLeftMargin: {
		marginLeft: 0,
	},
});
