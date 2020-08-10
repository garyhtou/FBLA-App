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
import {Button, Content, Spinner} from "native-base";
let firestore = firebase.firestore();

export default class JoinChapScreen extends React.Component {
   state = {
      code: "",
      errorMessage: null,
      loading: false
   };

   joinChapter = () => {
      const user = firebase.auth().currentUser;
      const { code } = this.state;
      firestore
         .collection("Chapter")
         .where("code", "==", code)
         .get()
         .then(function (querySnapshot) {
            if (querySnapshot.size === 0) {
               this.setState({ errorMessage: "No chapter with code given" });
            } else {
               const setChapter =
                   firestore
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
               <Text style={styles.heading}>Create a Chapter!</Text>

               <View style={styles.form}>
                  <View>
                     <TextInput
                        placeholder="Enter Chapter Name"
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
                  {this.state.loading ? (
                      <Spinner color={colors.white} />
                  ) : (
                      <Text style={styles.codeButtonText}>Create</Text>
                  )}
               </TouchableOpacity>

               <TouchableOpacity
                  style={styles.createChapter}
                  onPress={() =>
                     this.props.navigation.navigate("JoinChap")
                  }
               >
                  <Text style={styles.redirectText}>
                     Join a Chapter
                  </Text>

               </TouchableOpacity>

               <TouchableOpacity
                   style={styles.createChapter}
                   onPress={() => {
                       firebase.auth().signOut();
                   }}
               >
                  <Text>
                     Sign Out
                  </Text>

               </TouchableOpacity>

               <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>
                     {this.state.errorMessage}
                  </Text>
               </View>

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
      justifyContent: "center",
   },
   heading: {
      fontSize: 24,
      textAlign: "center",
   },
   errorContainer: {
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
      marginTop: 15,
      marginHorizontal: 50,

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
      marginBottom: 30,
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
