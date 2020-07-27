/**
 * App navigation
 */

import {createAppContainer, createSwitchNavigator} from "react-navigation"
import {createStackNavigator} from "react-navigation-stack"
import LoadingScreen from './screens/LoadingScreen'
import SignInScreen from './screens/SignInScreen'
import SignUpScreen from './screens/SignUpScreen'
import MainScreen from './screens/MainScreen'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const AppStack = createStackNavigator({
    Main: MainScreen,
    },
{
    defaultNavigationOptions: {
        cardStyle: { backgroundColor: 'white' },
    },
});

const AuthStack = createStackNavigator({
        SignIn: SignInScreen,
        SignUp: SignUpScreen
    },
    {
        defaultNavigationOptions: {
            cardStyle: { backgroundColor: 'white' },
        },
    }
);

export default createAppContainer(
  createSwitchNavigator(
      {
        Loading: LoadingScreen,
        Auth: AuthStack,
        App: AppStack
      },
      {
        initialRouteName: "Loading"
      }
  )
);

const Stack = createStackNavigator();
const myStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ title: 'Welcome' }}
                />
                <Stack.Screen name="Chapter" component={screens/chapter}/>
                <Stack.Screen name="Opportunities" component={screens/opportunities}/>
                <Stack.Screen name="Profile" component={screens/ProfileScreen} />
   \        </Stack.Navigator>
        </NavigationContainer>
    );
};