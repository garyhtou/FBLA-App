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
} from "react-native";
import { Title, Text } from "native-base";
import { colors, strings } from "../config/styles";
import firebase from "../config/firebase";

export default class SignInScreen extends React.Component {
   state = {
      email: "",
      password: "",
      errorMessage: null,
   };

   handleSignIn = () => {
      const { email, password } = this.state;
      firebase
         .auth()
         .signInWithEmailAndPassword(email, password)
         .catch((error) => this.setState({ errorMessage: error.message }));
   };

   render() {
      return (
         <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}
         >
            <View style={styles.flexBox}>
               <Title style={styles.heading}>
                  Welcome to {strings.appName}
               </Title>

               <View style={styles.errorContainer}>
                  {this.state.errorMessage && (
                     <Text style={styles.errorText}>
                        {this.state.errorMessage}
                     </Text>
                  )}
               </View>

               <View style={styles.form}>
                  <View>
                     <Text style={styles.authLabelText}>Email Address</Text>
                     <TextInput
                        style={styles.authInput}
                        autoCapitalize="none"
                        onChangeText={(email) => this.setState({ email })}
                        value={this.state.email}
                     />
                  </View>

                  <View>
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
                  onPress={this.handleSignIn}
               >
                  <Text style={styles.authButtonText}>Sign In</Text>
               </TouchableOpacity>

               <TouchableOpacity
                  style={styles.footer}
                  onPress={() => this.props.navigation.navigate("SignUp")}
               >
                  <Text style={styles.redirectText}>
                     New to {strings.appName}?{" "}
                     <Text style={{ color: colors.accent }}>Sign Up</Text>
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
