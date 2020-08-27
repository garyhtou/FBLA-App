/**
 *
 */

import React from "react";
import {Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback} from "react-native";
import {Container, Header, Content, Title, Body, Footer} from "native-base";
import { userConverter, getUserInitialized } from "../config/user";
import firebase from "../config/firebase";
import {colors, strings} from "../config/styles";
import View, {FlatList} from "react-native-web";

import {Announcement, Comments} from "./Announcement";
import {chapterConverter, getCurChapter} from "../config/chapter";
import TouchableHighlight from "react-native-web";

const announcementRef = firebase.firestore
	.collection("Chapter")
	.doc(getCurChapter().chapterID)
	.collection("Announcements");;

export default class AnnouncementScreen extends React.Component {

	state = {
		email: "",
		displayName: "",
		announcements:[],
		numPosts:5,
		last:null,
		loading:false,
		newest: null
	};



	async initAnnouncements(){
		if(this.state.loading===false){
			this.setState({loading:true})

			let query= announcementRef.orderBy("time", "desc")

			if(this.state.last!=null){
				query.endAt(this.state.last);
			} else{
				query.limit(this.state.numPosts);
			}

			let newAnnouncements = [];

			query
			.get()
			.then((docs)=>{
				docs.forEach((doc)=>{
					newAnnouncements.push(doc.data());
				})
				this.setState({
					announcements:newAnnouncements,
					last: docs[docs.size-1].data().time,
					loading: false
				})

			})
		}
	}

	async getMoreAnnouncements(){
		if(this.state.loading===false){
			this.setState({loading:true})

			let query= announcementRef.orderBy("time", "desc")

			if(this.state.last!=null){
				query.startAfter(this.state.last);
			}

			let newAnnouncements = this.state.announcements;

			query.limit(this.state.numPosts)
				.get()
				.then((docs)=>{
					docs.forEach((doc)=>{
						newAnnouncements.push(doc.data());
					})
					this.setState({
						announcements:newAnnouncements,
						last: docs[docs.size-1].data().time,
						loading: false
					})

				})
		}

	}

	componentDidMount() {
		const { email, displayName } = firebase.auth().currentUser;
		this.setState({ email, displayName });
		this.initAnnouncements().then(()=>{} );


		let announcementListener = announcementRef.onSnapshot(
				(snapshot)=>{
					snapshot.docChanges().forEach((change) =>{
						if (change.type === "added") {
							let newAnnouncements = this.state.announcements;
							newAnnouncements.unshift(change.doc.data());
							this.setState({
								announcements:newAnnouncements,
							})
						}
					});
			}
		)

		chapterConverter.addListener(announcementListener);
	}


	render() {

		return (
			<View style={styles.flexBox}>
				<FlatList
					data = {this.state.announcements}
					refreshing={this.state.loading}
					onRefresh={this.initAnnouncements()}
					renderItem = {({item}) =>
						<Announcement
							authorName ={item.authorName}
							title = {item.title}
							message = {item.message}
							time = {item.time}
							commentsEnabled = {item.commentsEnabled}
							docRef = {item.ref}
						/>}
					/>
				<TouchableHighlight
					underlayColor={'#eeeeee'}
					onPress={this.getMoreAnnouncements()}
					style={styles.touchable}
				>
					<Text style={styles.footerText}>Load More...</Text>
				</TouchableHighlight>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	flexBox:{
		flex:1
	},
	footer: {
		paddingVertical: 16,
		paddingHorizontal: 16,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderTopWidth: StyleSheet.hairlineWidth,
		borderTopColor: 'rgba(0,0,0,0.3)',
	},
	footerText:
		{ fontWeight: 'bold', fontSize: 16 },
});
