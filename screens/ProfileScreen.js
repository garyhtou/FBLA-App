/**
 *
 */

import React from "react";
import { Text, StyleSheet, Dimensions } from "react-native";
import Modal from "react-native-modal";
import { SwitchActions } from "react-navigation";
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
import { userConverter, getUserInitialized, getCurUser } from "../config/user";
import firebase from "../config/firebase";
import { colors } from "../config/styles";
import { withOrientation } from "react-navigation";
import { preventAutoHide } from "expo/build/launch/SplashScreen";
import ReactNativeModal from "react-native-modal";
import {chapterConverter, getCurChapter} from "../config/chapter";
import { StackActions } from '@react-navigation/native';
// any js module

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
			chapterEvents: true, //TODO: GET ATUAL VALUE FROM FIRESTORE
			stateAnnouncements: true, //TODO: GET ACTUAL VALUE FROM FIRESTORE
			stateEvents: false, //TODO: GET ACTUAL VALUE FROM FIRESTORE
		};

	}

	componentDidMount() {

		this.setState({
			chapterName: getCurChapter().chapterName,
			chapterAnnouncements: getCurUser().notification.localChapter.announcements,
			chapterEvents: getCurUser().notification.localChapter.events,
			stateAnnouncements: getCurUser().notification.stateChapter.announcements,
			stateEvents: getCurUser().notification.stateChapter.events,
			oldPassword:"",
			newPassword:"",
			confirmPassword:"",
			errorMessage:""

		})
	}

	signOutUser = () => {
		userConverter.signOut();
	};

	saveName = () => {
		var name = this.state.editedName;
		if (name === undefined || name == this.state.displayName) {
			console.log("No edits were made to the display name");
		} else {
			firebase.firestore()
				.collection("DatabaseUser")
				.doc(user.uid)
				.set(
					{
						name:name,
					},
					{ merge: true }
				)
				.then(() => {});
		}

		this.setState({ editName: false });
	};

	updateNotifications(){
		firebase.firestore()
			.collection("DatabaseUser")
			.doc(firebase.auth().currentUser.uid)
			.set(
				{
					notification:{
						localChapter:{
							announcements:this.state.chapterAnnouncements,
							events:this.state.chapterEvents
						},
						stateChapter:{
							announcements: this.state.stateAnnouncements,
							events:this.state.stateEvents
						}

					}
				},
				{ merge: true}
			)
			.then(() => {
				this.setState({ loading: false });
			});
	}

	toggleSwitch(setting, value) {

		switch (setting) {
			case "chapterAnnouncements":
				console.log(setting+" "+value);
				this.setState({ chapterAnnouncements: value },
					this.updateNotifications);



				break;
			case "chapterEvents":
				console.log(setting+value);
				this.setState({ chapterEvents: value },
					this.updateNotifications);

				break;
			case "stateAnnouncements":
				console.log(setting+value);
				this.setState({ stateAnnouncements: value },
					this.updateNotifications);

				break;
			case "stateEvents":
				console.log(setting+value);
				this.setState({ stateEvents: value },
					this.updateNotifications);

				break;
		}
	}

	leaveChapter = () => {
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
				chapterConverter.endChapter();
				this.props.navigation.dispatch(StackActions.replace("Chap", {screen:"JoinChap"}));
			});
	};

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
									onValueChange={(value) => {
										this.toggleSwitch("chapterAnnouncements", value);
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
									onValueChange={(value) => {
										this.toggleSwitch("chapterEvents", value);
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
									onValueChange={(value) => {
										this.toggleSwitch("stateAnnouncements", value);
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
									onValueChange={(value) => {
										this.toggleSwitch("stateEvents", value);
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
							<Input
								secureTextEntry
								style={styles.passwordText}
								placeholder="New Password"
								onChangeText={(value) => {
									this.setState({ oldPassword: value });
								}}
							>
								{this.state.oldPassword}
							</Input>

							<Input
								secureTextEntry
								style={styles.passwordText}
								placeholder="Confirm Password"
								onChangeText={(value) => {
									this.setState({ confirmPassword: value });
								}}
							>
								{this.state.confirmPassword}
							</Input>

							<Text style={{ color: "red" }}>{this.state.errorMessage}</Text>

							<Button
								block
								style={styles.passwordButton}
								onPress={() => {
									if(this.state.confirmPassword===this.state.newPassword){
										firebase.auth().currentUser.updatePassword(this.state.confirmPassword).then(
											()=> {
												this.setState({ updatePasswordModal: false ,
													newPassword:"", confirmPassword:""});
											});
									} else if(this.state.confirmPassword===""||this.state.newPassword===""){
										this.setState({ errorMessage:"Fill out all fields"});
									}else{
										this.setState({ errorMessage:"Messages did not match"});
									}




								}}
							>
								<Text style={{ color: "white" }}>Enter</Text>
							</Button>

							<Item style={styles.itemNoBorder}></Item>
						</View>
						<View style={{ textAlign: "right" }}>
							<Button
								transparent
								onPress={() => {
									this.setState({ updatePasswordModal: false,
										newPassword:"", oldPassword:""});
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
		height: 500,
		width: "auto",
		maxHeight: Dimensions.get("window").height / 3,
		display: "flex",
		backgroundColor: "white",
		borderRadius: 25,
		padding: 25,
	},
	passwordText: {
		fontSize: 15,
		textAlign: "left",
		marginBottom: 10,
	},
	passwordModalTitle: {
		fontSize: 24,
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 20,
	},
	passwordButton: {
		alignSelf: "flex-end",
		borderRadius: 4,
		padding:10
	}
});
