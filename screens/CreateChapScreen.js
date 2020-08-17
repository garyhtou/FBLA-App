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
import {curUser, userConverter} from '../config/user.js';

export default class JoinChapScreen extends React.Component {
	state = {
		chapterName:"",
		stateSelected:"",
		chapterID:-1,
		errorMessage: null,
		loading: false,


	};

	addFirebaseChapter = () =>{
		const { chapterName, stateSelected, chapterID } = this.state;
		firebase.firestore().collection("DatabaseUser")
			.doc(firebase.auth().currentUser.uid).set({
			chapterID: chapterID,
			inChapter: true,
			isAdmin: true
		}, { merge: true }).then(() => {

		});


		firebase.firestore().collection("Chapter")
			.doc(chapterID).set({
			chapterName: chapterName,
			code:"",
			state:stateSelected,
			chapterID: chapterID,
			compEventLink:"",
			socMedia:{},
			isState: false
		}, { merge: false }).then(() => {
			console.log("done");
			this.props.navigation.navigate("App")
		});

	}

	createChapter = () => {
		const { chapterID } = this.state;
		if(chapterID!==-1){
			firebase.firestore().collection("Chapter")
				.where("chapterID","==", chapterID).get()
				.then((queryDocSnapshots) => {
					if(queryDocSnapshots.size===0) {
						this.addFirebaseChapter();
					}
				}

			)


		}


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
									onChangeText={(chapterName) => this.setState({ chapterName })}
									value={this.state.chapterName}
								/>
							</Item>


							<View style={styles.inputRow}>
								<View style={{marginLeft:185, width: 170, height:60}}>
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
								<View style={{marginLeft:20, width: 100}}>
									<DropDownPicker
										items={[
											{label: 'WA', value: 'WA'},
											{label: 'IA', value: 'IA'}

										]}
										containerStyle={styles.dropDownStyle}
										dropDownStyle={styles.dropDownOverflow}
										itemStyle={{
											justifyContent: 'flex-start'
										}}
										onChangeItem={(stateSelected) => this.setState({ stateSelected })}



										defaultNull
										placeholder="Select State"
									/>
								</View>
							</View>



							<TouchableOpacity
								block
								style={styles.codeButton}
								onPress={this.createChapter}
							>
								{this.state.loading ? (
									<Spinner color={colors.white} />
								) : (
									<Text style={styles.codeButtonText}>CREATE</Text>
								)}
							</TouchableOpacity>
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
								userConverter.signOut();
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

	},
	dropDownItems:{
		alignItems: "center",
	},
	dropDownOverflow:{
		marginTop:2,
	},

	codeLabelText: {
		color: colors.lightText,
		fontSize: 15,
		textTransform: "uppercase",
	},
	codeButtonText: {
		color: colors.white,
		fontSize: 16,
		textAlign: "center"
	},
	codeInput: {
		fontSize: 20,
	},
	codeButton: {
		backgroundColor: colors.complementAccent,
		borderRadius: 4,
		marginTop: 40,
		padding:12
	},
	createChapter: {
		alignSelf: "center",
		marginTop: 32,
	},
	inputRow:{
		width:100,
		flex:1,
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'center',
		marginTop: 40,

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
