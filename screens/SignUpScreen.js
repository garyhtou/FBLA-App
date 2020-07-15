/**
 *
 */

import React from 'react'
import { Text, View, TextInput, TouchableOpacity } from 'react-native'
import strings from '../config/strings'
import styles from '../config/styles'
import colors from '../config/colors'
import firebase from '../config/firebase'

export default class SignUpScreen extends React.Component {

    state = {
        name: "",
        email: "",
        password: "",
        errorMessage: null
    }

    handleSignUp = () => {
        const {name, email, password} = this.state;
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(userCredentials => {
                return userCredentials.user.updateProfile({
                  displayName: name
                })
            })
            .catch(error => this.setState({errorMessage: error.message()}))

    }

    render() {
        return(
            <View style={styles.authContainer}>

                <Text style={styles.heading}>Sign up to get started!</Text>

                <View style={styles.errorContainer}>
                    {this.state.errorMessage && <Text style={styles.errorText}>{this.state.errorMessage}</Text>}
                </View>

                <View style={styles.form}>

                    <View>
                        <Text style={styles.authLabelText}>Full Name</Text>
                        <TextInput
                            style={styles.authInput}
                            autoCapitalize="none"
                            onChangeText={name => this.setState({name})}
                            value={this.state.name}/>
                    </View>

                    <View style={{marginTop: 32}}>
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

                <TouchableOpacity style={styles.authButton} onPress={this.handleSignUp}>
                    <Text style={styles.authButtonText}>Sign Up</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.signUpHere}  onPress={() => this.props.navigation.navigate("SignIn")}>
                    <Text style={styles.authRedirectText}>
                        Already have an account? <Text style={{color: colors.accent}}>Sign In</Text>
                    </Text>
                </TouchableOpacity>

            </View>
        );
    }
}

