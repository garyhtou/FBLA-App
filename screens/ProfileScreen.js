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
import { colors } from "../config/styles";
import { withOrientation } from "react-navigation";
import { preventAutoHide } from "expo/build/launch/SplashScreen";
import ReactNativeModal from "react-native-modal";
import { StackActions } from "@react-navigation/native";
import { firestore } from "../config/firebase";

export default class ProfileScreen extends React.Component {
	constructor() {
		super();

		this.state = {
			email: firestore.user().get.email,
			photoURL: firestore.user().get.photoURL,
			editName: false,
			updatePasswordModal: false,
			name: firestore.user().get.name,
			chapterAnnouncements: firestore.user().get.notification.localChapter
				.announcements,
			chapterEvents: firestore.user().get.notification.localChapter.events,
			stateAnnouncements: firestore.user().get.notification.stateChapter
				.announcements,
			stateEvents: firestore.user().get.notification.stateChapter.events,
		};
	}

	componentDidMount() {
		firestore.user().listen.email((value) => {
			this.setState({ email: value });
		});
		firestore.user().listen.photoURL((value) => {
			this.setState({ photoURL: value });
		});
	}

	signOutUser = () => {
		firestore.user().signOut();
	};

	saveName = () => {
		var name = this.state.name;
		if (name === undefined || name === firestore.user().get.name) {
			console.log("No edits were made to the display name");
		} else {
			firestore.user().set.name(name);
		}

		this.setState({ editName: false });
	};

	updateSwitches(setting, value) {
		switch (setting) {
			case "chapterAnnouncements":
				console.log(setting + " " + value);
				this.setState({ chapterAnnouncements: value });
				firestore.user().set.notification.localChapter.announcements(value);

				break;
			case "chapterEvents":
				console.log(setting + value);
				this.setState({ chapterEvents: value });
				firestore.user().set.notification.localChapter.events(value);

				break;
			case "stateAnnouncements":
				console.log(setting + value);
				this.setState({ stateAnnouncements: value });
				firestore.user().set.notification.stateChapter.announcements(value);

				break;
			case "stateEvents":
				console.log(setting + value);
				this.setState({ stateEvents: value });
				firestore.user().set.notification.stateChapter.events(value);

				break;
		}
	}

	leaveChapter = () => {
		firestore
			.user()
			.leaveChapter()
			.then(() => {
				this.props.navigation.dispatch(
					StackActions.replace("Chap", { screen: "JoinChap" })
				);
			});
	};

	render() {
		return (
			<Container>
				<Header>
					<Body>
						<Title>{this.state.name}</Title>
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
								this.setState({ name: value });
							}}
						>
							{firestore.user().get.name}
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
						<Text style={styles.staticInfo}>
							{firestore.chapter().get.chapterName}
						</Text>
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
										this.updateSwitches("chapterAnnouncements", value);
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
										this.updateSwitches("chapterEvents", value);
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
										this.updateSwitches("stateAnnouncements", value);
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
										this.updateSwitches("stateEvents", value);
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
