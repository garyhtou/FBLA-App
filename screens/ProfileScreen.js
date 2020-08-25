/**
 *
 */

import React from "react";
import { Text, StyleSheet, Dimensions } from "react-native";
import Modal from "react-native-modal";
import {
	Container,
	Header,
	Content,
	Title,
	Body,
	Thumbnail,
	Input,
	Item,
	Icon,
	Button,
	Switch,
	ListItem,
	Right,
	List,
	View,
} from "native-base";
import {
	getUserConverter,
	getUserInitialized,
	getCurUser,
} from "../config/user";
import firebase from "../config/firebase";
import { colors } from "../config/styles";
import { withOrientation } from "react-navigation";
import { preventAutoHide } from "expo/build/launch/SplashScreen";
import ReactNativeModal from "react-native-modal";
import {chapterConverter} from "../config/chapter";

export default class ProfileScreen extends React.Component {
	constructor() {
		super();

		var { email, displayName, photoURL } = firebase.auth().currentUser;
		if (photoURL === null) {
			photoURL = "https://www.gravatar.com/avatar/?d=mp";
		}

		this.state = {
			email: email,
			displayName: displayName,
			photoURL: photoURL,
			editName: false,
			updatePasswordModal: false,
			chapterName: "fake chapter name!", //TODO: GET ACTUAL VALUE FROM curUser
			chapterAnnouncements: true, //TODO: GET ACTUAL VALUE FROM FIRESTORE
			chapterEvents: true, //TODO: GET ACTUAL VALUE FROM FIRESTORE
			stateAnnouncements: true, //TODO: GET ACTUAL VALUE FROM FIRESTORE
			stateEvents: false, //TODO: GET ACTUAL VALUE FROM FIRESTORE
		};

		console.log("Chapter Name: " + getCurUser().chapterID);
	}

	componentDidMount() {}

	signOutUser = () => {
		getUserConverter().signOut();
	};

	saveName = () => {
		var name = this.state.editedName;
		if (name === undefined || name == this.state.displayName) {
			console.log("No edits were made to the display name");
		} else {
			console.log(name);
			//TODO: SAVE TO FIREBASE
		}

		this.setState({ editName: false });
	};

	toogleSwitch(setting) {
		switch (setting) {
			case "chapterAnnouncements":
				var value = !this.state.chapterAnnouncements;
				console.log("Notifications chapterAnnouncements: " + value);
				//TODO: UPDATE VALUE IN FIRESTORE

				this.setState({ chapterAnnouncements: value });
				break;
			case "chapterEvents":
				var value = !this.state.chapterEvents;
				console.log("Notifications chapterEvents: " + value);
				//TODO: UPDATE VALUE IN FIRESTORE

				this.setState({ chapterEvents: value });
				break;
			case "stateAnnouncements":
				var value = !this.state.stateAnnouncements;
				console.log("Notifications stateAnnouncements: " + value);
				//TODO: UPDATE VALUE IN FIRESTORE

				this.setState({ stateAnnouncements: value });
				break;
			case "stateEvents":
				var value = !this.state.stateEvents;
				console.log("Notifications stateEvents: " + value);
				//TODO: UPDATE VALUE IN FIRESTORE

				this.setState({ stateEvents: value });
				break;
		}
	}

	leaveChapter() {
		firebase
			.firestore()
			.collection("DatabaseUser")
			.doc(firebase.auth().currentUser.uid)
			.set(
				{
					chapterID: "",
					inChapter: false,
					isAdmin: false,
				},
				{ merge: true }
			)
			.then(() => {
				chapterConverter.endChapter()
				this.props.navigation.navigate("JoinChap")
			});

	}

	render() {
		return (
			<Container>
				<Header>
					<Body>
						<Title>{this.state.displayName}</Title>
					</Body>
				</Header>
				<Content contentContainerStyle={styles.container}>
					{/* PROFILE PICTURE */}
					<Thumbnail
						source={{ uri: this.state.photoURL }}
						style={styles.profilePicture}
					/>

					{/* NAME */}
					<Item
						style={[
							this.state.editName ? null : styles.itemNoBorder,
							styles.item,
						]}
					>
						<Input
							disabled={this.state.editName ? false : true}
							style={styles.name}
							placeholder="Full Name"
							onChangeText={(value) => {
								this.setState({ editedName: value });
							}}
						>
							{this.state.displayName}
						</Input>
						{/* To change icon color, change color of button */}
						{this.state.editName ? (
							<Button
								transparent
								onPress={() => {
									this.saveName();
								}}
							>
								<Icon active name="check" type="FontAwesome" />
							</Button>
						) : (
							<Button
								transparent
								onPress={() => {
									this.setState({ editName: true });
								}}
							>
								<Icon active name="pencil" type="FontAwesome" />
							</Button>
						)}
					</Item>

					{/* STATIC INFORMATION (EMAIL, CHAPTER NAME, ETC.) */}
					<Item style={[styles.item, styles.itemNoBorder]}>
						<Text style={styles.staticInfo}>{this.state.chapterName}</Text>
					</Item>
					<Item style={[styles.item, styles.itemNoBorder]}>
						<Text style={styles.staticInfo}>{this.state.email}</Text>
					</Item>

					{/* NOTIFICATIONS */}
					<Text style={styles.notificationsTitle}>Notifications</Text>
					<List>
						<ListItem>
							<Text style={styles.notificationsSection}>Local Chapter</Text>
						</ListItem>
						<ListItem>
							<Body>
								<Text>Announcements</Text>
							</Body>
							<Right>
								<Switch
									value={this.state.chapterAnnouncements}
									onValueChange={() => {
										this.toogleSwitch("chapterAnnouncements");
									}}
								/>
							</Right>
						</ListItem>
						<ListItem>
							<Body>
								<Text>Events</Text>
							</Body>
							<Right>
								<Switch
									value={this.state.chapterEvents}
									onValueChange={() => {
										this.toogleSwitch("chapterEvents");
									}}
								/>
							</Right>
						</ListItem>
						<ListItem>
							<Text style={styles.notificationsSection}>State</Text>
						</ListItem>
						<ListItem>
							<Body>
								<Text>Announcements</Text>
							</Body>
							<Right>
								<Switch
									value={this.state.stateAnnouncements}
									onValueChange={() => {
										this.toogleSwitch("stateAnnouncements");
									}}
								/>
							</Right>
						</ListItem>
						<ListItem>
							<Body>
								<Text>Events</Text>
							</Body>
							<Right>
								<Switch
									value={this.state.stateEvents}
									onValueChange={() => {
										this.toogleSwitch("stateEvents");
									}}
								/>
							</Right>
						</ListItem>
					</List>

					{/* ACCOUNT SETTINGS */}
					<View style={styles.accountContainer}>
						{/* Leave Chapter */}
						<Button
							transparent
							style={styles.accountButton}
							onPress={this.leaveChapter}
						>
							<Text style={styles.accountText}>Leave Chapter</Text>
						</Button>

						{/* Update Password (only for Auth by Email & Password) */}
						<Button
							transparent
							style={styles.accountButton}
							onPress={() => {
								this.setState({ updatePasswordModal: true });
							}}
						>
							<Text style={styles.accountText}>Update Password</Text>
						</Button>

						{/* Sign out */}
						<Button
							transparent
							style={styles.accountButton}
							onPress={this.signOutUser}
						>
							<Text style={styles.accountText}>Sign Out</Text>
						</Button>
					</View>

					{/* UPDATE PASSWORD MODAL */}
					<Modal
						isVisible={this.state.updatePasswordModal}
						onBackButtonPress={() => {
							this.setState({ updatePasswordModal: false });
						}}
						onBackdropPress={() => {
							this.setState({ updatePasswordModal: false });
						}}
					>
						<View style={styles.passwordModal}>
							<Text style={styles.passwordModalTitle}>Update Password</Text>
							<Text>asdf Password</Text>
							<Item style={styles.itemNoBorder}></Item>
						</View>
						<View style={{ textAlign: "right" }}>
							<Button
								transparent
								onPress={() => {
									this.setState({ updatePasswordModal: false });
								}}
							>
								<Text style={{ color: "white" }}>Close</Text>
							</Button>
						</View>
					</Modal>
				</Content>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		minHeight: "100%",
		padding: 15,
		backgroundColor: "#f3f3f3",
	},
	accountContainer: {
		marginTop: 30,
		marginLeft: 5,
	},
	accountButton: {},
	accountText: {
		color: colors.complement,
		fontSize: 16,
	},
	profilePicture: {
		width: 128,
		height: 128,
		borderRadius: 64,
		marginBottom: 15,
	},
	item: {
		marginLeft: 0,
	},
	itemNoBorder: {
		borderColor: "transparent",
	},
	name: {
		fontSize: 24,
		fontWeight: "bold",
	},
	staticInfo: {
		marginLeft: 5,
		fontSize: 18,
	},
	notificationsTitle: {
		fontSize: 24,
		fontWeight: "bold",

		marginTop: 50,
		marginLeft: 5,
	},
	notificationsSection: {
		fontSize: 18,
		fontWeight: "bold",
		marginTop: 15,
		// marginBottom: 10,
	},
	passwordModal: {
		flex: 1,
		height: "auto",
		width: "auto",
		maxHeight: Dimensions.get("window").height / 2,
		display: "flex",
		backgroundColor: "white",
		borderRadius: 25,
		padding: 25,
	},
	passwordModalTitle: {
		fontSize: 24,
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 20,
	},
});
