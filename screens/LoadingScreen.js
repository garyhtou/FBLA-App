/**
 * Loading screen that redirects user after authentication status is received
 */

import React from "react";
import firebase from "../config/firebase";
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { AppLoading } from "expo";
import {curUser, userConverter, userInitialized} from "../config/user";

export default class LoadingScreen extends React.Component {

   async componentDidMount() {
       await Font.loadAsync({
           Roboto: require('native-base/Fonts/Roboto.ttf'),
           Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
           ...Ionicons.font,
       });


       let userListener = null;
      // When firebase user loads
      firebase.auth().onAuthStateChanged((user) => {
         // If the a user is signed in


         if (user !== null) {

             let curID = firebase.auth().currentUser.uid;

             console.log(curID);
             console.log("Here");

             userListener = firebase.firestore().collection("DatabaseUser")
                 .doc(curID)
                 .onSnapshot((doc)=> {
                     userConverter.setCurUser(doc);
                     if (userInitialized === false) {
                         userConverter.setInit(true);
                         userConverter.addListener(userListener);
                         if (curUser.inChapter === false) {
                             this.props.navigation.navigate("Chap");
                         } else {
                             this.props.navigation.navigate("App");
                         }

                     }

                 }, ()=>{
                     console.log("User Logged Out");
                 })

         }


         // If the a user is not signed in - go to sign in screen
         else {
             console.log("Signed Out");
             if(userListener!==null){
                 userListener();
             }
             userConverter.setInit(false);
            this.props.navigation.navigate("Auth");
         }
      });
   }

   render() {
       return <AppLoading />;
   }
}
