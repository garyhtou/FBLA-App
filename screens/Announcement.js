
import {Dimensions, StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native"
import {getCurUser} from "../config/user";
import firebase from "../config/firebase";
import {colors} from "../config/styles";
import {Button, Container, Content, Footer, Switch} from "native-base";
import React from "react";

export default class Announcement extends React.Component {
    state = {
        comments: [],
        latestComment: null,
        commentsEnabled: this.props.commentsEnabled
    }


    updateComments(){
        this.props.docRef.collection("comments")
            .orderBy("time", "desc")
            .get()
            .then((snapshot)=>{
                if(snapshot.size!==0){
                    this.setState({latestComment: snapshot[0]});
                }
                snapshot.foreach((doc)=>{
                    let comments = [];
                    comments.push(doc.data());
                    this.setState({comments:comments});


                })
            })
    }

    componentDidMount() {
        if(this.state.commentsEnabled === true){
            this.updateComments();
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.commentsEnabled === true){
            this.updateComments();
        }
    }

    updateCommentsEnabled(value){
        this.setState({commentsEnabled:value});
        this.props.docRef.set({
            commentsEnabled:value
        }, {merge:true}).then(()=>{
        })

    }

    render(){
        let isAdmin = getCurUser().isAdmin;
        let date = this.props.time.toDate();

        if(isAdmin && this.state.commentsEnabled) {
            return (
                <Container>
                    <Content contentContainerStyle={styles.container}>
                        <View style={styles.inputRow}>
                            <Text style={styles.notificationsTitle}>{this.props.authorName}</Text>
                            <Text style={styles.notificationsTitle}>
                                {date.getMonth()}{"/"}
                                {date.getDate()}{"/"}
                                {date.getFullYear()}</Text>
                        </View>

                        <Text style={styles.notificationsTitle}>{this.props.title}</Text>
                        <Text style={styles.notificationsTitle}>{this.props.message}</Text>

                        <Switch
                            value={this.state.commentsEnabled}
                            onValueChange={(value) => {
                                this.updateCommentsEnabled(value);
                            }}
                        />

                        <Comment
                            lastComment = {this.state.latestComment}
                        />

                        <Button
                            block
                            style={styles.commentButton}
                            onPress={this.joinChapter}
                        >
                            <Text style={styles.commentButtonText}>Write a comment...</Text>
                        </Button>
                    </Content>


                </Container>
            )
        } else if(isAdmin){
            return (
                <View>
                    <Text></Text>
                </View>
            )
        } else if(this.state.commentsEnabled){
            return (
                <View>
                    <Text></Text>
                </View>
            )
        } else{
            return (
                <View>
                    <Text></Text>
                </View>
            )
        }
    }



}

const Comment=({latestComment})=>(
    <View>
        <TouchableWithoutFeedback
            onPress={() => this.props.navigation.navigate("CreateChap")}
        >

            <Text style={styles.commentText}>
                <Text style={{fontWeight: "bold"}}>{latestComment.authorName}</Text>
                {" "}{latestComment.message}
            </Text>
        </TouchableWithoutFeedback>
    </View>
);



const styles = StyleSheet.create({
    container: {
        minHeight: "100%",
        padding: 15,
        backgroundColor: "#f3f3f3",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",

        marginTop: 50,
        marginLeft: 5,
    },
    commentButtonText: {
        color: "#000000",
        fontSize: 16,
    },
    commentButton: {
        backgroundColor: "#eeeeee",
        borderRadius: 2,
        marginTop: 30,
    },
    authorRow: {
        width: 100,
        flex: 1,
        flexDirection: "row",
        marginTop: 40,
        marginLeft: 0,
    },
    commentText: {
        color: colors.mediumText,
        fontSize: 13,
    },

});