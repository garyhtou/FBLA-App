/**
 *
 */

import React from 'react'
import {Text, View, TextInput, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Keyboard} from 'react-native'
import {colors, strings} from '../config/styles'
import firebase from '../config/firebase'

export default class SignInScreen extends React.Component {

    state = {
        email: "",
        password: "",
        errorMessage: null
    }

    handleSignIn = () => {
        const {email, password} = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password).catch(error => this.setState({errorMessage: error.message}))
    }

    render() {
        return(

            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.flexBox}>

                    <Text style={styles.heading}>Welcome to {strings.appName}</Text>

                    <View style={styles.errorContainer}>
                        {this.state.errorMessage && <Text style={styles.errorText}>{this.state.errorMessage}</Text>}
                    </View>

                    <View style={styles.form}>

                        <View>
                            <Text style={styles.authLabelText}>Email Address</Text>
                            <TextInput
                                style={styles.authInput}
                                autoCapitalize="none"
                                onChangeText={email => this.setState({email})}
                                value={this.state.email}/>
                        </View>

                        <View style={{marginTop: 32}}>
                            <Text style={styles.authLabelText}>Password</Text>
                            <TextInput
                                style={styles.authInput}
                                secureTextEntry
                                autoCapitalize="none"
                                onChangeText={password => this.setState({password})}
                                value={this.state.password}/>
                        </View>

                    </View>

                    <TouchableOpacity style={styles.authButton} onPress={this.handleSignIn}>
                        <Text style={styles.authButtonText}>Sign In</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.signUpHere} onPress={() => this.props.navigation.navigate("SignUp")}>
                        <Text style={styles.redirectText}>
                            New to {strings.appName}? <Text style={{color: colors.accent}}>Sign Up</Text>
                        </Text>
                    </TouchableOpacity>

                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create ({

    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    flexBox: {
        flex: 1
    },
    heading: {
        marginTop: 32,
        fontSize: 24,
        textAlign: "center"
    },
    errorContainer: {
        height: 72,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 30
    },
    errorText: {
        color: colors.complementAccent,
        fontSize: 13,
        textAlign: "center"
    },
    form: {
        marginBottom: 48,
        marginHorizontal: 30
    },
    authLabelText: {
        color: colors.lightText,
        fontSize: 11,
        textTransform: "uppercase"
    },
    authButtonText: {
        color: colors.white,
        fontSize: 16
    },
    authInput: {
        borderBottomColor: colors.lightText,
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15
    },
    authButton: {
        marginHorizontal: 30,
        backgroundColor: colors.complementAccent,
        borderRadius: 4,
        height: 52,
        alignItems: "center",
        justifyContent: "center"
    },
    signUpHere: {
        alignSelf: "center",
        marginTop: 32
    },
    redirectText: {
        color: colors.mediumText,
        fontSize: 13
    },

});
