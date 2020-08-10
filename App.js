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
import CreateChapScreen from "./screens/CreateChapScreen";

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

const ChapSwitch = createSwitchNavigator(
    {
        JoinChap: JoinChapScreen,
        CreateChap: CreateChapScreen,
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
         App: AppStack,
      },
      {
         initialRouteName: "Loading",
      }
   )
);
