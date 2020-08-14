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
import DropDownPicker from 'react-native-dropdown-picker';

export default class JoinChapScreen extends React.Component {
	state = {
		chapterName:"",
		stateSelected:null,
		errorMessage: null,
		loading: false,


	};

	createChapter = () => {
		const user = firebase.auth().currentUser;
		const { code } = this.state;

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
							<View style={{zIndex: 999}}>
								<DropDownPicker
									items={[
										{label: 'WA', value: 'WA'},
										{label: 'IA', value: 'IA'},
									]}
									containerStyle={styles.dropDownStyle}
									dropDownStyle={styles.dropDownOverflow}
									onChangeItem={(stateSelected) => this.setState({ stateSelected })}

									defaultNull
									placeholder="Select a state"
								/>
							</View>


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
								this.props.navigation.navigate("JoinChap");
							}}
						>
							<Text style={styles.redirectText}>Want to join a chapter? Enter the code here.</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={styles.createChapter}
							onPress={() => {
								firebase.auth().signOut();
							}}
						>
							<Text style={styles.signOutText}>Sign Out</Text>
						</TouchableOpacity>
					</Content>


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
	dropDownStyle:{
		height: 40,
		marginTop:30
	},
	dropDownItems:{
		alignItems: "center"
	},
	dropDownOverflow:{
		marginTop:2
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
		color: colors.mainColor,
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
