import firebase from "../config/firebase";
import "firebase/firestore";

class User {
    constructor (name, chapterID, inChapter, isAdmin,chapterEvents, competitiveEvents ) {
        this.name = name;
        this.chapterID = chapterID;
        this.inChapter = inChapter;
        this.isAdmin = isAdmin;
        this.chapterEvents = chapterEvents;
        this.compEvents = competitiveEvents;
    }
    toString() {
        return this.name + ', ' + this.chapterName + ', ' + this.inChapter+', '+this.isAdmin+', '
            +this.chapterEvents+', '+this.compEvents;
    }
}

// Firestore data converter
let userConverter = {
    setCurUser:function(snapshot){
        curUser = this.fromFirestore(snapshot);
    },
    addListener:function (listener){
        activeListeners.push(listener);
        console.log("run");
        console.log(activeListeners);
    },
    signOut:function(){
        this.setInit(false);
        let i = 0;
        while(i<activeListeners.length) {
            activeListeners[i]();
            i++;
        }


        firebase.auth().signOut().then();
    },
    setInit:function(initialized){
        userInitialized = initialized
    },
    toFirestore: function(user) {
        return {
            name: user.name,
            chapterID: user.chapterID,
            inChapter: user.inChapter,
            isAdmin: user.isAdmin,

            chapterEvents: user.chapterEvents,
            compEvents: user.compEvents,
        }
    },
    fromFirestore: function(snapshot){
        const data = snapshot.data();
        return new User(data.name, data.chapterID, data.inChapter,data.isAdmin,
            data.chapterEvents, data.compEvents);
    }
}


let curUser;
let userInitialized = false;
let activeListeners= [];


export {
    curUser,
    userConverter,
    userInitialized
};
