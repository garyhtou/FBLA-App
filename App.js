/**
 * App navigation
 */

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import LoadingScreen from "./screens/LoadingScreen";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import MainScreen from "./screens/MainScreen";
import JoinChapScreen from "./screens/JoinChapScreen";

const AppStack = createStackNavigator(
   {
      Main: MainScreen,
   },
   {
      defaultNavigationOptions: {
         cardStyle: { backgroundColor: "white" },
      },
   }
);

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

const InitChapSwitch = createSwitchNavigator(
    {
        JoinChap:JoinChapScreen,
    },
    {
        initialRouteName:"JoinChap",
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
         InitChap: InitChapSwitch,
         App: AppStack,
      },
      {
         initialRouteName: "Loading",
      }
   )
);
