const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// exports.generateCode = functions.https.onRequest((request, response) => {
//     admin.firestore().collection('Codes').doc('Codes').get().then((DocumentSnapshot) => {
//         let dictionary = DocumentSnapshot.data().Codes;
//         let keys = Object.keys(dictionary);
//
//         let index = Math.floor(Math.random()*90000 + 10000);
//         let code = dictionary[index];
//
//         dictionary.delete(keys);
//
//         admin.firestore().collection('Codes').doc('Codes').set({
//             Codes: dictionary
//         }).then(() => {
//             response.send(code);
//             return code;
//         }).catch(error => {
//             response.status(500).send(error);
//         })
//
//         return code;
//
//     })
//     .catch(error => {
//         response.status(500).send(error);
//     })
// });