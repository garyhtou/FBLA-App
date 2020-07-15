/**
 * Loading screen that redirects user after authentication status is received
 */

import React from 'react'
import { View, Text, StyleSheet, ActivityIndicator} from 'react-native'
import firebase from '../config/firebase'
import styles from '../config/styles'

export default class LoadingScreen extends React.Component {

    componentDidMount(){
        firebase.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? "App" : "Auth")
        })
    }

    render() {
        return(
            <View style = {styles.container}>
                <Text>Loading</Text>
                <ActivityIndicator size='large'></ActivityIndicator>
            </View>
        )
    }
}