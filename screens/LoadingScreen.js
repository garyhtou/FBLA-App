/**
 * Loading screen that redirects user after authentication status is received
 */

import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import firebase from "../config/firebase";

export default class LoadingScreen extends React.Component {

   componentDidMount() {
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
      return (
         <View style={styles.container}>
            <Text>Loading</Text>
            <ActivityIndicator size="large" />
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
   },
});