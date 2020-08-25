/**
 * App navigation
 */

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AnnouncementScreen from "./screens/AnnouncementScreen";
import ChapterScreen from "./screens/ChapterScreen";
import OppScreen from "./screens/OppScreen";
import ProfileScreen from "./screens/ProfileScreen";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import JoinChapScreen from "./screens/JoinChapScreen";
import CreateChapScreen from "./screens/CreateChapScreen";
import ChapterCodeScreen from "./screens/ChapterCodeScreen";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import LoadingScreen from "./screens/LoadingScreen";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

function appTabs() {
	return (
		<NavigationContainer>
			<Tab.Navigator
				screenOptions={({ route }) => ({
					tabBarIcon: ({ focused, color, size }) => {
						let iconName;

						if (route.name === "Announcements") {
							iconName = focused ? "home" : "home-outline";
							return (
								<MaterialCommunityIcons
									name={iconName}
									color={color}
									size={size}
								/>
							);
						} else if (route.name === "Chapter") {
							iconName = focused ? "briefcase" : "briefcase-outline";
							return (
								<MaterialCommunityIcons
									name={iconName}
									color={color}
									size={size}
								/>
							);
						} else if (route.name === "Opportunity") {
							iconName = focused ? "cloud-search" : "cloud-search-outline";
							return (
								<MaterialCommunityIcons
									name={iconName}
									color={color}
									size={size}
								/>
							);
						} else {
							iconName = focused ? "person" : "person-outline";
							return (
								<MaterialIcons name={iconName} color={color} size={size} />
							);
						}
					},
				})}
				tabBarOptions={{
					showLabel: false,
				}}
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
