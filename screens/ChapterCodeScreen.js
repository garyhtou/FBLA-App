/**
 * Screen that displays the chapter code after chapter creation
 */

import React from "react";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, Button } from "native-base";
import { StyleSheet } from "react-native";
import { colors } from "../config/styles";

export default class ChapterCodeScreen extends React.Component {
	async componentDidMount() {
		await Font.loadAsync({
			Roboto: require("native-base/Fonts/Roboto.ttf"),
			Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
			...Ionicons.font,
		});
	}

	render() {
		console.log("PROPS");

		return (
			<View style={styles.content}>
				<Text selectable style={styles.heading}>
					Join Code: {this.props.navigation.state.params.code}
				</Text>
				<Text>You can access this code in the app as well</Text>
				<Button
					block
					style={styles.button}
					onPress={() => this.props.navigation.navigate("App")}
				>
					<Text style={styles.buttonText}>Got It</Text>
				</Button>
			</View>
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
		marginBottom: 20,
		textAlign: "center",
	},
	button: {
		backgroundColor: colors.complementAccent,
		borderRadius: 4,
		marginTop: 30,
	},
	buttonText: {
		color: colors.white,
		fontSize: 16,
	},
});
