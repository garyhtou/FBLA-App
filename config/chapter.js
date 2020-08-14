import firebase from "../config/firebase";
import "firebase/firestore";

class Chapter {
    constructor (chapterName, code, state, competitiveEvents, chapterEvents ) {
        this.chapterName = chapterName;
        this.code = code;
        this.state = state;
        this.competitiveEvents = competitiveEvents;
        this.chapterEvents = chapterEvents;
    }
    toString() {
        return this.chapterName + ', ' + this.code+ ', ' + this.state+', '+this.competitiveEvents+', '
            +this.chapterEvents;
    }
}

// Firestore data converter
let chapterConverter = {
    toFirestore: function(chapter) {
        return {
            chapterName: chapter.chapterName,
            code: chapter.code,
            state:chapter.state,
            competitiveEvents:chapter.competitiveEvents,
            chapterEvents:chapter.chapterEvents

        }
    },
    fromFirestore: function(snapshot){
        const data = snapshot.data();
        return new Chapter(data.chapterName, data.code, data.state,
            data.chapterEvents, data.competitiveEvents);
    }
}

export {
    chapterConverter
};
