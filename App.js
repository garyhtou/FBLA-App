import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase'
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDYezXvKXApGuyXVij_dB7oXhz8ja3b7FU",
  authDomain: "mobile-app-development-15940.firebaseapp.com",
  databaseURL: "https://mobile-app-development-15940.firebaseio.com",
  projectId: "mobile-app-development-15940",
  storageBucket: "mobile-app-development-15940.appspot.com",
  messagingSenderId: "200356083068",
  appId: "1:200356083068:web:d623a36471a0e0ca39e0f9",
  measurementId: "G-NS6FVH7163"
};

firebase.initializeApp(firebaseConfig);

var db = firebase.database();
var fstore = firebase.firestore();

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
	  <Text>This will be the FBLA App (tenative name)</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
