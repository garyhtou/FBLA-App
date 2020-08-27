
import {Dimensions, StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native"
import {getCurUser} from "../config/user";
import firebase from "../config/firebase";
import {colors} from "../config/styles";
import {Button, Container, Content, Footer, Switch} from "native-base";
import React from "react";
import Modal from "react-native-modal";
import {FlatList} from "react-native-web";

export default class Announcement extends React.Component {
    state = {
        comments: [],
        latestComment: null,
        commentsEnabled: this.props.commentsEnabled,
        commentModalView: false,
        loading:false
    }


    updateComments(){
        if(this.state.loading===false) {
            this.setState({loading: true})
            this.props.docRef.collection("comments")
                .orderBy("time", "desc")
                .get()
                .then((snapshot) => {
                    if (snapshot.size !== 0) {
                        this.setState({latestComment: snapshot[0]});
                    }
                    snapshot.foreach((doc) => {
                        let comments = [];
                        comments.push(doc.data());
                        this.setState({comments: comments});


                    })

                    this.setState({loading: false})
                })
        }
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

                        {isAdmin &&
                            < Switch
                                value={this.state.commentsEnabled}
                                onValueChange={(value) => {
                                this.updateCommentsEnabled(value);
                            }}/>
                        }

                        {this.state.commentsEnabled && this.state.lastComment!=null &&
                            <TouchableWithoutFeedback
                                onPress={() => {
                                    this.setState({commentModalView: true})
                                    this.updateComments();
                                    }
                                }
                            >
                                <Comment
                                    authorName = {this.state.latestComment.authorName}
                                    message = {this.state.latestComment.message}
                                />
                            </TouchableWithoutFeedback>
                        }

                        <Button
                            block
                            style={styles.commentButton}
                            onPress={this.joinChapter}
                        >
                            <Text style={styles.commentButtonText}>Write a comment...</Text>
                        </Button>


                        <Modal
                            isVisible = {this.state.commentModalView}
                            onBackButtonPress={() => {
                                this.setState({ commentModalView: false });
                            }}
                            onBackdropPress={() => {
                                this.setState({ commentModalView: false });
                            }}
                        >
                            <FlatList
                                data = {this.state.comments}
                                refreshing={this.state.loading}
                                onRefresh={this.updateComments()}
                                renderItem = {({item}) =>
                                    <Comment
                                        authorName ={item.authorName}
                                        message = {item.message}
                                    />}
                            />

                        </Modal>
                    </Content>


                </Container>
            )
        }
    }



}

const Comment=({authorName, message})=>(
    <View>
        <Text style={styles.commentText}>
            <Text style={{fontWeight: "bold"}}>{authorName}</Text>
            {" "}{message}
        </Text>
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