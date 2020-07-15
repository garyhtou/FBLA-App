/**
 *
 */

import React from 'react'
import { Text, View, TextInput, TouchableOpacity } from 'react-native'
import strings from '../config/strings'
import styles from '../config/styles'
import colors from '../config/colors'
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
            <View style={styles.authContainer}>

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
                    <Text style={styles.authRedirectText}>
                        New to {strings.appName}? <Text style={{color: colors.accent}}>Sign Up</Text>
                    </Text>
                </TouchableOpacity>

            </View>
        );
    }
}

