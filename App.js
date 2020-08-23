/**
 * App navigation
 */

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import LoadingScreen from "./screens/LoadingScreen";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import JoinChapScreen from "./screens/JoinChapScreen";
import CreateChapScreen from "./screens/CreateChapScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AnnouncementScreen from "./screens/AnnouncementScreen";
import ChapterScreen from "./screens/ChapterScreen";
import OppScreen from "./screens/ChapterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import ChapterCodeScreen from "./screens/ChapterCodeScreen";

const Tab = createBottomTabNavigator();

function appTabs() {
	return (
		<NavigationContainer>
			<Tab.Navigator>
				<Tab.Screen name="Announcements" component={AnnouncementScreen} />
				<Tab.Screen name="Chapter" component={ChapterScreen} />
				<Tab.Screen name="Opportuninty" component={OppScreen} />
				<Tab.Screen name="Profile" component={ProfileScreen} />
			</Tab.Navigator>
		</NavigationContainer>
	);
}

const AuthSwitch = createSwitchNavigator(
	{
		SignIn: SignInScreen,
		SignUp: SignUpScreen,
	},
	{
		initialRouteName: "SignIn",
		defaultNavigationOptions: {
			cardStyle: { backgroundColor: "white" },
		},
	}
);

const ChapSwitch = createSwitchNavigator(
	{
		JoinChap: JoinChapScreen,
		CreateChap: CreateChapScreen,
		ChapCode: ChapterCodeScreen,
	},
	{
		initialRouteName: "JoinChap",
		defaultNavigationOptions: {
			cardStyle: { backgroundColor: "white" },
		},
	}
);

export default createAppContainer(
	createSwitchNavigator(
		{
			Loading: LoadingScreen,
			Auth: AuthSwitch,
			Chap: ChapSwitch,
			App: appTabs,
		},
		{
			initialRouteName: "Loading",
		}
	)
);
