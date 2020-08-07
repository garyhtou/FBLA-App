/**
 * Loading screen that redirects user after authentication status is received
 */

import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
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

      firebase.auth().onAuthStateChanged((user) => {
         if (user !== null) {
            if (user.displayName !== null) {
                let inChapter = false;
                firebase.firestore().collection("DatabaseUser")
                   .doc(user.uid).get()
                   .then(function (DocSnapshot) {
                        inChapter = DocSnapshot.get("inChapter")

                   });
                if(inChapter ===false){
                    this.props.navigation.navigate("InitChap");
                } else{
                    this.props.navigation.navigate("App");
                }
            }
         } else {
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