import React from "react";
import {
	TouchableOpacity,
	TouchableWithoutFeedback,
	Keyboard,
	StyleSheet,
} from "react-native";
import { colors } from "../config/styles";
import { firebase } from "firebase";
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
	Picker,
	Icon,
} from "native-base";
import DropDownPicker from "react-native-dropdown-picker";
import { StackActions } from "@react-navigation/native";
import { firestore } from "../config/firebase";

export default class CreateChapScreen extends React.Component {
	state = {
		chapterName: "",
		stateSelected: "WA",
		chapterID: "",
		errorMessage: null,
		loading: false,
	};

	createChapter = () => {
		this.setState({ errorMessage: null, loading: true });
		const { chapterName, stateSelected, chapterID } = this.state;
		if (chapterID !== "" && stateSelected !== "" && chapterName != "") {
			firestore
				.chapter()
				.createChapter(chapterName, stateSelected, chapterID)
				.then(() => {
					this.setState({
						loading: false,
					});
				})
				.catch((errMessage) => {
					this.setState({
						errorMessage: errMessage,
						loading: false,
					});
				});
		} else {
			this.setState({
				errorMessage: "Enter input for all fields",
				loading: false,
			});
		}
	};

	render() {
		return (
			<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
				<Container>
					<Content contentContainerStyle={styles.content}>
						<Text style={styles.heading}>Create a Chapter!</Text>

						<Form>
							<Item floatingLabel style={styles.noLeftMargin}>
								<Label style={styles.codeLabelText}>Enter Chapter Name</Label>
								<Input
									style={styles.codeInput}
									autoCapitalize="none"
									onChangeText={(chapterName) => this.setState({ chapterName })}
									value={this.state.chapterName}
								/>
							</Item>

							<View style={styles.inputRow}>
								<View style={{ marginLeft: 185, width: 170, height: 60 }}>
									<Item floatingLabel>
										<Label style={styles.codeLabelText}>Chapter ID</Label>
										<Input
											style={styles.codeInput}
											autoCapitalize="none"
											onChangeText={(chapterID) => this.setState({ chapterID })}
											value={this.state.chapterID}
										/>
									</Item>
								</View>
								<View style={{ marginLeft: 20, width: 100 }}>
									<Picker
										note
										mode="dropdown"
										selectedValue={this.state.stateSelected}
										onValueChange={(value) => {
											this.setState({ stateSelected: value });
										}}
									>
										<Picker.Item label="WA" value="WA" />
										<Picker.Item label="IA" value="IA" />
									</Picker>
								</View>
							</View>

							<Button
								block
								style={styles.codeButton}
								onPress={this.createChapter}
							>
								{this.state.loading ? (
									<Spinner color={colors.white} />
								) : (
									<Text style={styles.codeButtonText}>CREATE</Text>
								)}
							</Button>
						</Form>

						<TouchableOpacity
							style={styles.signOutButton}
							onPress={() => {
								firestore.user().signOut();
							}}
						>
							<Text style={styles.signOutText}>Sign Out</Text>
						</TouchableOpacity>

						<View style={styles.errorContainer}>
							<Text style={styles.errorText}>{this.state.errorMessage}</Text>
						</View>
					</Content>

					<TouchableWithoutFeedback
						onPress={() => this.props.navigation.navigate("JoinChap")}
					>
						<Footer style={styles.footer}>
							<Text style={styles.redirectText}>
								Want to join a chapter?{" "}
								<Text style={{ color: colors.complementAccent }}>
									Enter the code here.
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
		alignItems: "center",
		justifyContent: "center",
		marginHorizontal: 30,
		marginTop: 15,
	},
	errorText: {
		color: colors.complementAccent,
		fontSize: 13,
		textAlign: "center",
	},
	dropDownStyle: {
		height: 40,
	},
	dropDownItems: {
		alignItems: "center",
	},
	dropDownOverflow: {
		marginTop: 2,
	},

	codeLabelText: {
		color: colors.lightText,
		fontSize: 15,
		textTransform: "uppercase",
	},
	codeButtonText: {
		color: colors.white,
		fontSize: 16,
		textAlign: "center",
	},
	codeInput: {
		fontSize: 20,
		paddingLeft: 0,
	},
	codeButton: {
		backgroundColor: colors.complementAccent,
		borderRadius: 4,
		marginTop: 40,
		padding: 12,
		alignItems: "center",
		justifyContent: "center",
	},
	signOutButton: {
		alignSelf: "center",
		marginTop: 20,
	},
	inputRow: {
		width: 100,
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		marginTop: 40,
		marginLeft: 0,
	},
	redirectText: {
		color: colors.mediumText,
		fontSize: 13,
	},
	signOutText: {
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
