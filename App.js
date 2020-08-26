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
import { createStackNavigator } from '@react-navigation/stack';

const Tab = createBottomTabNavigator();
const AuthStack  = createStackNavigator();
const ChapStack = createStackNavigator();
const AppStack = createStackNavigator();


function AuthNav () {
	return (

		<AuthStack.Navigator
			initialRouteName ="SignIn"
			headerMode="none"
			screenOptions={{
				headerShown: false,
				cardStyle: {backgroundColor: 'white'},
			}}>
			<AuthStack.Screen name="SignIn" component={SignInScreen} />
			<AuthStack.Screen name="SignUp" component={SignUpScreen} />
		</AuthStack.Navigator>

	);
}

function ChapNav (){
	return(
		<ChapStack.Navigator
			initialRouteName ="JoinChap"
			headerMode="none"
			screenOptions={{
				headerShown: false,
				cardStyle: {backgroundColor: 'white'},
			}}>
			<ChapStack.Screen name="JoinChap" component={JoinChapScreen} />
			<ChapStack.Screen name="CreateChap" component={CreateChapScreen} />
			<ChapStack.Screen name="ChapCode" component={ChapterCodeScreen} />
		</ChapStack.Navigator>
	)
}

function TabNav (){
	return (
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
	)
}

function App() {
	return (
		<NavigationContainer>
			<AppStack.Navigator
				initialRouteName ="Loading"
				headerMode="none"
				screenOptions={{
					headerShown: false,
					cardStyle: {backgroundColor: 'white'},
				}}
			>
				<AppStack.Screen name="Loading" component={LoadingScreen} />
				<AppStack.Screen name="Auth" component={AuthNav} />
				<AppStack.Screen name="Chap" component={ChapNav} />
				<AppStack.Screen name="App" component={TabNav} />
			</AppStack.Navigator>


		</NavigationContainer>
	);
}


export default App;

