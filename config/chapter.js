import firebase from "../config/firebase";
import "firebase/firestore";

class Chapter {
    constructor (chapterName, code, state, chapterID, compEventLink, socMedia, isState) {
        this.chapterName = chapterName;
        this.code = code;
        this.state = state;
        this.chapterID  = chapterID;
        this.compEventLink = compEventLink;
        this.socMedia = socMedia;
        this.isState = isState;
    }
    toString() {
        return this.chapterName + ', ' + this.code+ ', ' + this.state+', '+this.compEventLink+', '+this.socMedia+","+
            this.isState;
    }
}

// Firestore data converter
let chapterConverter = {
    toFirestore: function(chapter) {
        return {
            chapterName: chapter.chapterName,
            code: chapter.code,
            state:chapter.state,
            chapterID: chapter.chapterID,
            compEventLink: chapter.compEventLink,
            socMedia: chapter.socMedia,
            isState:chapter.isState

        }
    },
    fromFirestore: function(snapshot){
        const data = snapshot.data();
        return new Chapter(data.chapterName, data.code, data.state,data.chapterID,
            data.compEventLink, data.socMedia, data.isState);
    }
}

export {
    chapterConverter
};
