/**
 * Loading screen that redirects user after authentication status is received
 */

import React from "react";
import firebase from "../config/firebase";
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { AppLoading } from "expo";
import {curUser, userConverter, userInitialized} from "../config/user";

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
             console.log("ready");

             firebase.firestore().collection("DatabaseUser")
                 .doc(firebase.auth().currentUser.uid)
                 .onSnapshot((doc)=> {
                     userConverter.setCurUser(doc);
                     if(userInitialized===false){
                         userConverter.setInit(true);
                         if(curUser.inChapter ===false){
                             this.props.navigation.navigate("Chap");
                         }
                         else{
                             this.props.navigation.navigate("App");
                         }

                     }
                     console.log("found");



                 })
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