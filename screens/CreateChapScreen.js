import React from "react";
import {
   Text,
   View,
   TextInput,
   TouchableOpacity,
   CheckBox,
   TouchableWithoutFeedback,
   Keyboard,
   StyleSheet,
} from "react-native";
import SearchableDropdown from "react-native-searchable-dropdown";
import { colors, strings } from "../config/styles";
import * as firebase from "firebase";
import firestore from '@react-native-firebase/firestore';

export default class JoinChapScreen extends React.Component {
   state = {
      code: "",
      errorMessage: null,
   };

   joinChapter = () => {
      const user = firebase.auth().currentUser;
      const { code } = this.state;
      firestore()
         .collection("Chapter")
         .where("code", "==", code)
         .get()
         .then(function (querySnapshot) {
            if (querySnapshot.size === 0) {
               this.setState({ errorMessage: "No chapter with code given" });
            } else {
               const setChapter =
                   firestore()
                  .collection("DatabaseUser")
                  .doc(user.uid)
                  .set(
                     {
                        chapterName: querySnapshot[0].data().get("chapterName"),
                     },
                     { merge: true }
                  );
            }
         });
   };

   render() {
      return (
         <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}
         >
            <View style={styles.flexBox}>
               <Text style={styles.heading}>Join a Chapter!</Text>

               <View style={styles.errorContainer}>
                  {this.state.errorMessage && (
                     <Text style={styles.errorText}>
                        {this.state.errorMessage}
                     </Text>
                  )}
               </View>

               <View style={styles.form}>
                  <View>
                     <TextInput
                        placeholder="Enter Chapter Code"
                        style={styles.codeInput}
                        autoCapitalize="none"
                        onChangeText={(code) => this.setState({ code })}
                        value={this.state.code}
                     />
                  </View>
               </View>

               <TouchableOpacity
                  style={styles.codeButton}
                  onPress={this.joinChapter}
               >
                  <Text style={styles.authButtonText}>Join</Text>
               </TouchableOpacity>

               <TouchableOpacity
                  style={styles.createChapter}
                  onPress={() =>
                     this.props.navigation.navigate("CreateChapter")
                  }
               >
                  <Text style={styles.redirectText}>
                     <Text style={{ color: colors.accent }}>
                        Create a Chapter
                     </Text>
                  </Text>
               </TouchableOpacity>
            </View>
         </TouchableWithoutFeedback>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
   },
   flexBox: {
      flex: 1,
   },
   heading: {
      marginTop: 32,
      fontSize: 24,
      textAlign: "center",
   },
   errorContainer: {
      height: 72,
      alignItems: "center",
      justifyContent: "center",
      marginHorizontal: 30,
   },
   errorText: {
      color: colors.complementAccent,
      fontSize: 13,
      textAlign: "center",
   },
   form: {
      marginBottom: 48,
      marginHorizontal: 30,
   },

   codeButtonText: {
      color: colors.white,
      fontSize: 16,
   },
   codeInput: {
      borderBottomColor: colors.lightText,
      borderBottomWidth: StyleSheet.hairlineWidth,
      height: 40,
      fontSize: 15,
   },
   codeButton: {
      marginHorizontal: 30,
      backgroundColor: colors.complementAccent,
      borderRadius: 4,
      height: 52,
      alignItems: "center",
      justifyContent: "center",
   },
   createChapter: {
      alignSelf: "center",
      marginTop: 32,
   },
   redirectText: {
      color: colors.mediumText,
      fontSize: 13,
   },
});
