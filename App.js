/**
 * App navigation
 */

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AnnouncementScreen from "./screens/AnnouncementScreen";
import ChapterScreen from "./screens/ChapterScreen";
import OppScreen from "./screens/ChapterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { Icon } from "native-base";
import {createAppContainer, createSwitchNavigator} from "react-navigation";
import JoinChapScreen from "./screens/CreateChapScreen";
import CreateChapScreen from "./screens/CreateChapScreen";
import ChapterCodeScreen from "./screens/ChapterCodeScreen";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import LoadingScreen from "./screens/LoadingScreen";

const Tab = createBottomTabNavigator();

function appTabs() {
	return (
		<NavigationContainer>
			<Tab.Navigator
				screenOptions={({ route }) => ({
					tabBarIcon: () => {
						let iconName;

						if (route.name === 'Announcements') {
							iconName = 'home';
						} else if (route.name === 'Chapter') {
							iconName = 'work'
						} else if (route.name === 'Opportunity') {
							iconName = 'search'
						} else {
							iconName = 'person'
						}

						// You can return any component that you like here!
						return <Icon name={iconName} type={"MaterialIcons"}/>;
					},
				})}

			>
				<Tab.Screen name="Announcements" component={AnnouncementScreen} />
				<Tab.Screen name="Chapter" component={ChapterScreen} />
				<Tab.Screen name="Opportunity" component={OppScreen} />
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
