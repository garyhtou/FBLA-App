import firebase from "../config/firebase";
import "firebase/firestore";

class User {
    constructor (name, chapterName, inChapter, isAdmin,chapterEvents, competitiveEvents ) {
        this.name = name;
        this.chapterName = chapterName;
        this.inChapter = inChapter;
        this.isAdmin = isAdmin;
        this.chapterEvents = chapterEvents;
        this.competitiveEvents = competitiveEvents;
    }
    toString() {
        return this.name + ', ' + this.chapterName + ', ' + this.inChapter+', '+this.isAdmin+', '
            +this.chapterEvents+', '+this.competitiveEvents;
    }
}

// Firestore data converter
let userConverter = {
    toFirestore: function(user) {
        return {
            chapterName: user.chapterName,
            inChapter: user.inChapter,
            isAdmin: user.isAdmin,
            name: user.name,
            chapterEvents: user.chapterEvents,
            competitiveEvents: user.competitiveEvents,
        }
    },
    fromFirestore: function(snapshot){
        const data = snapshot.data();
        return new User(data.name, data.chapterName, data.inChapter,data.isAdmin,
            data.chapterEvents, data.competitiveEvents);
    }
}


let curUser;
let userInitialized = false;

const userListener = {
    init: function(user){
        firebase.firestore().collection("DatabaseUser")
            .doc(firebase.auth().currentUser.uid)
            .onSnapshot(function(doc) {
                curUser = userConverter.fromFirestore(doc);
                userInitialized = true;
                console.log("found");
            });
    }

}


export {
    curUser,
    userConverter,
    userListener,
    userInitialized
};
