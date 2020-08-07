/**
 *
 */

import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import firebase from "../config/firebase";
import { colors } from "../config/styles";

export default class MainScreen extends React.Component {
   state = {
      email: "",
      displayName: "",
   };

   componentDidMount() {
      const { email, displayName } = firebase.auth().currentUser;
      this.setState({ email, displayName });
   }

   signOutUser = () => {
      firebase.auth().signOut().then(this.props.navigation.navigate("Auth"));
   };

   render() {
      return (
         <View style={styles.container}>
            <Text>Hello {this.state.displayName}!</Text>

            <TouchableOpacity style={styles.button} onPress={this.signOutUser}>
               <Text style={styles.redirectText}>SignOut</Text>
            </TouchableOpacity>
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
   button: {
      marginTop: 32,
   },
   redirectText: {
      color: colors.mediumText,
      fontSize: 13,
   },
});
