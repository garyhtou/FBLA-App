/**
 *
 */

import React from "react";
import {
   Text,
   View,
   TextInput,
   TouchableOpacity,
   StyleSheet,
   TouchableWithoutFeedback,
   Keyboard,
} from "react-native";
import { colors } from "../config/styles";
import firebase from "../config/firebase";

export default class SignUpScreen extends React.Component {
   state = {
      name: "",
      email: "",
      password: "",
      errorMessage: null,
   };

   handleSignUp = () => {
      const { name, email, password } = this.state;
      firebase
         .auth()
         .createUserWithEmailAndPassword(email, password)
         .then((userCredentials) => {
            return userCredentials.user.updateProfile({
               displayName: name,
            });
         })
         .catch((error) => this.setState({ errorMessage: error.message }));
   };

   render() {
      return (
         <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}
         >
            <View style={styles.flexBox}>
               <Text style={styles.heading}>Sign up to get started!</Text>

               <View style={styles.errorContainer}>
                  {this.state.errorMessage && (
                     <Text style={styles.errorText}>
                        {this.state.errorMessage}
                     </Text>
                  )}
               </View>

               <View style={styles.form}>
                  <View>
                     <Text style={styles.authLabelText}>Full Name</Text>
                     <TextInput
                        style={styles.authInput}
                        autoCapitalize="none"
                        onChangeText={(name) => this.setState({ name })}
                        value={this.state.name}
                     />
                  </View>

                  <View>
                     <Text style={styles.authLabelText}>Email Address</Text>
                     <TextInput
                        style={styles.authInput}
                        autoCapitalize="none"
                        onChangeText={(email) => this.setState({ email })}
                        value={this.state.email}
                     />
                  </View>

                  <View style={styles.marginTop}>
                     <Text style={styles.authLabelText}>Password</Text>
                     <TextInput
                        style={styles.authInput}
                        secureTextEntry
                        autoCapitalize="none"
                        onChangeText={(password) => this.setState({ password })}
                        value={this.state.password}
                     />
                  </View>
               </View>

               <TouchableOpacity
                  style={styles.authButton}
                  onPress={this.handleSignUp}
               >
                  <Text style={styles.authButtonText}>Sign Up</Text>
               </TouchableOpacity>

               <TouchableOpacity
                  style={styles.footer}
                  onPress={() => this.props.navigation.navigate("SignIn")}
               >
                  <Text style={styles.redirectText}>
                     Already have an account?{" "}
                     <Text style={{ color: colors.complementAccent }}>
                        Sign In
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
      marginHorizontal: 30,
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
      marginHorizontal: 30,
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
