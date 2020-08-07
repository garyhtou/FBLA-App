/**
 *
 */

import React from "react";
import {
   View,
   TextInput,
   TouchableOpacity,
   StyleSheet,
   TouchableWithoutFeedback,
   Keyboard,
   ActivityIndicator
} from "react-native";
import { Text } from "native-base";
import { colors, strings } from "../config/styles";
import firebase from "../config/firebase";
import 'firebase/firestore';

export default class SignInScreen extends React.Component {
   state = {
      email: "",
      password: "",
      errorMessage: null,
      loading: false
   };

   handleSignIn = () => {
      this.setState({errorMessage: null, loading: true})
      const { email, password } = this.state;
      return firebase
         .auth()
         .signInWithEmailAndPassword(email, password)
         .then( (userCredentials) => {
            this.setState({loading: false});
            let inChapter = false;
            firebase.firestore().collection("DatabaseUser")
                .doc(userCredentials.user.uid).get()
                .then(function (DocSnapshot) {
                   inChapter = DocSnapshot.get("inChapter")

               });
            if(inChapter===false){
               this.props.navigation.navigate("InitChap");
            } else{
               this.props.navigation.navigate("App");
            }


         })
         .catch((error) => this.setState({ loading: false, errorMessage: error.message }));
   };

   render() {
      return (
         <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}
         >
            <View style={styles.flexBox}>
               <Text style={styles.heading}>
                  Welcome to {strings.appName}
               </Text>

               <View style={styles.errorContainer}>
                  {this.state.errorMessage && (
                     <Text style={styles.errorText}>
                        {this.state.errorMessage}
                     </Text>
                  )}
               </View>

               <View style={styles.form}>
                  <View>
                     {/* <Text style={styles.authLabelText}>Email Address</Text> */}
                     <TextInput
                        style={styles.authInput}
                        autoCapitalize="none"
                        onChangeText={(email) => this.setState({ email })}
                        value={this.state.email}
                        placeholder="Email Address"
                     />
                  </View>

                  <View>
                     {/* <Text style={styles.authLabelText}>Password</Text> */}
                     <TextInput
                        style={styles.authInput}
                        secureTextEntry
                        autoCapitalize="none"
                        onChangeText={(password) => this.setState({ password })}
                        value={this.state.password}
                        placeholder="Password"
                     />
                  </View>
               </View>

               <TouchableOpacity
                  style={styles.authButton}
                  onPress={this.handleSignIn}
               >
                  {this.state.loading ?
                      (<ActivityIndicator
                        size="large"
                        color={colors.white}/>)
                      :
                      <Text style={styles.authButtonText}>Sign In</Text>
                  }
               </TouchableOpacity>

               <TouchableOpacity
                  style={styles.footer}
                  onPress={() => this.props.navigation.navigate("SignUp")}>

                  <Text style={styles.redirectText}>
                     New to {strings.appName}?{" "}
                     <Text style={{ color: colors.complementAccent }}>Sign Up</Text>
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
      justifyContent: "center",
   },
   heading: {
      fontSize: 24,
      textAlign: "center",
   },
   errorContainer: {
      marginTop: 15,
      alignItems: "center",
      justifyContent: "center",
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
   authLabelText: {
      color: colors.lightText,
      fontSize: 11,
      textTransform: "uppercase",
   },
   authButtonText: {
      color: colors.white,
      fontSize: 16,
   },
   authInput: {
      borderBottomColor: colors.lightText,
      borderBottomWidth: StyleSheet.hairlineWidth,
      height: 40,
      fontSize: 15,
      marginBottom: 30,
   },
   authButton: {
      marginHorizontal: 50,
      backgroundColor: colors.complementAccent,
      borderRadius: 4,
      height: 52,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 50,
   },
   signUpHere: {
      alignSelf: "center",
      marginTop: 32,
   },
   redirectText: {
      color: colors.mediumText,
      fontSize: 13,
   },
   footer: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      alignItems: "center",
      justifyContent: "center",
      height: 60,
      borderTopWidth: 1,
      borderTopColor: "#d5d5d5",
   },
});
