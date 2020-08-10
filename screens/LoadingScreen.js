/**
 * Loading screen that redirects user after authentication status is received
 */

import React from "react";
import firebase from "../config/firebase";
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { AppLoading } from "expo";

export default class LoadingScreen extends React.Component {

   async componentDidMount() {
       await Font.loadAsync({
           Roboto: require('native-base/Fonts/Roboto.ttf'),
           Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
           ...Ionicons.font,
       });

      // When firebase user loads
      firebase.auth().onAuthStateChanged((user) => {

         // If the a user is signed in
         if (user !== null) {

            // If it's not the signup flow (that's handled in SignupScreen)
            if (user.displayName !== null) {

                let inChapter = false;

                // Get in chapter status
                firebase.firestore().collection("DatabaseUser")
                   .doc(user.uid).get()
                   .then((DocSnapshot) => {
                       inChapter = DocSnapshot.get("inChapter")

                       // If not in chapter - go to chapter selection/creation
                       if(inChapter ===false){
                           this.props.navigation.navigate("Chap");
                       }

                       // If in chapter - go to app screen
                       else{
                           this.props.navigation.navigate("App");
                       }
                   });

            }
         }

         // If the a user is not signed in - go to sign in screen
         else {
            this.props.navigation.navigate("Auth");
         }
      });
   }

   render() {
       return <AppLoading />;
   }
}

// render() {
//     return (
//         <View style={styles.container}>
//             <Text>Loading</Text>
//             <ActivityIndicator size="large" />
//         </View>
//     );
// }
// }
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//     },
// });