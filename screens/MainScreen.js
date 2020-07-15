/**
 *
 */

import React from 'react'
import { Text, View, TouchableOpacity} from 'react-native'
import styles from '../config/styles'
import firebase from '../config/firebase'

export default class MainScreen extends React.Component {

    state = {
        email: "",
        displayName: ""
    }

    componentDidMount(){
        const {email, displayName} = firebase.auth().currentUser;
        this.setState({email, displayName});
    }

    signOutUser = () => {
        firebase.auth().signOut();
        this.props.navigation.navigate("SignIn");
    }

    render() {
        return (
            <View style={styles.container}>

                <Text>Hello {this.state.displayName}!</Text>

                <TouchableOpacity style={{marginTop: 32}} onPress={this.signOutUser}>
                    <Text style={styles.authRedirectText}>SignOut</Text>
                </TouchableOpacity>

            </View>
        )
    }
}