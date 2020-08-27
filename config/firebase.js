import firebase from "firebase";
import "firebase/firestore";

// ========= INITIALIZE FIREBASE =========
const firebaseConfig = {
	apiKey: "AIzaSyDYezXvKXApGuyXVij_dB7oXhz8ja3b7FU",
	authDomain: "mobile-app-development-15940.firebaseapp.com",
	databaseURL: "https://mobile-app-development-15940.firebaseio.com",
	projectId: "mobile-app-development-15940",
	storageBucket: "mobile-app-development-15940.appspot.com",
	messagingSenderId: "200356083068",
	appId: "1:200356083068:web:d623a36471a0e0ca39e0f9",
	measurementId: "G-NS6FVH7163",
};

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
}

// ========= START MANAGED FIRESTORE =========
/*
	TO ADD NEW VALUES:
	1. ADD TO `data`
	2. ADD TO `localListeners`
	3. ADD TO `fieldPaths` (in according to location of value in firestore)
	4. ADD TO `get`, `set`, and `listen` (in according to location of value in firestore)
*/

var started = false;

function checkStarted() {
	// if Firestore has not been started (hasn't gotten values), then throw error.
	if (!started) {
		throw new Error(
			"Firestore has not been started! Run start() and wait for promise before using.\n\nTry saving again or Reload JS. That usually gets rid of this error. -Gary"
		);
	}
}

//inital values
var data = {
	user: {
		isLoggedIn: null,
		uid: "",
		photoURL: "https://www.gravatar.com/avatar/?d=mp",
		email: "",
		name: "",
		nameInitals: "",
		inChapter: null,
		chapterID: "",
		isAdmin: null,
		notification: {
			localChapter: {
				announcements: null,
				events: null,
			},
			stateChapter: {
				announcements: null,
				events: null,
			},
		},
	},
	chapter: {
		chapterID: "",
		chapterName: "",
		code: "",
		compEventLink: "",
		isState: null,
		state: "",
	},
};
var dataTemplate = JSON.parse(JSON.stringify(data));

var authListener = {
	start: function () {},
	end: function () {},
};
var userListener = {
	start: function () {},
	end: function () {},
};
var chapterListener = {
	start: function () {},
	end: function () {},
};

var localListeners = {
	user: {
		isLoggedIn: [],
		uid: [],
		photoURL: [],
		email: [],
		name: [],
		nameInitals: [],
		inChapter: [],
		chapterID: [],
		isAdmin: [],
		notification: {
			localChapter: {
				announcements: [],
				events: [],
			},
			stateChapter: {
				announcements: [],
				events: [],
			},
		},
	},
	chapter: {
		chapterID: [],
		chapterName: [],
		code: [],
		compEventLink: [],
		isState: [],
		state: [],
	},
};
async function start() {
	return new Promise((resolve, reject) => {
		// When firebase user loads

		authListener.start = (function () {
			authListener.end();

			authListener.end = firebase.auth().onAuthStateChanged((user) => {
				if (user !== null) {
					// User is signed in

					// isLoggedIn
					if (data.user.isLoggedIn !== true) {
						data.user.isLoggedIn = true;
						for (let listener of localListeners.user.isLoggedIn) {
							listener(data.user.isLoggedIn);
						}
					}

					// uid
					if (data.user.uid !== user.uid) {
						data.user.uid = user.uid;
						for (let listener of localListeners.user.uid) {
							listener(data.user.uid);
						}
					}

					// photoURL
					if (
						user.photoURL !== "" &&
						user.photoURL !== null &&
						data.user.photoURL !== user.photoURL
					) {
						data.user.photoURL = user.photoURL;
						for (let listener of localListeners.user.photoURL) {
							listener(data.user.photoURL);
						}
					}

					// email
					if (data.user.email !== user.email) {
						data.user.email = user.email;
						for (let listener of localListeners.user.email) {
							listener(data.user.email);
						}
					}

					if (data.user.isLoggedIn) {
						userListener.start = (function () {
							userListener.end();

							userListener.end = firebase
								.firestore()
								.collection("DatabaseUser")
								.doc(data.user.uid)
								.onSnapshot(
									(doc) => {
										var firestoreUserData = doc.data();
										if (firestoreUserData !== null) {
											var databaseUserFields = [
												"name",
												"inChapter",
												"chapterID",
												"isAdmin",
												["notification", "localChapter", "announcements"],
												["notification", "localChapter", "events"],
												["notification", "stateChapter", "announcements"],
												["notification", "stateChapter", "events"],
											];

											for (let fieldPath of databaseUserFields) {
												// console.log(
												// 	"comparing ",
												// 	fieldPath,
												// 	" from firestore DatabseUser"
												// );
												if (!Array.isArray(fieldPath)) {
													// is string
													if (
														data.user[fieldPath] !==
														firestoreUserData[fieldPath]
													) {
														// update local value
														data.user[fieldPath] = firestoreUserData[fieldPath];
														// calls local listeners
														for (let listener of localListeners.user[
															fieldPath
														]) {
															listener(data.user[fieldPath]);
														}
													}
												} else {
													// is array (complex path)

													// get to values and objects
													var localValue = data.user;
													var firestoreValue = firestoreUserData;
													var localObj = data.user;
													var localListenerArr = localListeners.user;
													console.log(firestoreValue)
													for (let i = 0; i < fieldPath.length; i++) {
														localValue = localValue[fieldPath[i]];
														firestoreValue = firestoreValue[fieldPath[i]];
														localListenerArr = localListenerArr[fieldPath[i]];
														if (i < fieldPath.length - 1) {
															// stops one object before the value to keep reference (allows us to update it)
															localObj = localObj[fieldPath[i]];
														}
													}

													if (localValue !== firestoreValue) {
														// update local value
														localObj[fieldPath.slice().pop()] = firestoreValue;
														// call local listeners
														for (let listener of localListenerArr) {
															listener(localValue);
														}
													}
												}
											}

											if (data.user.inChapter) {
												chapterListener.start = (function () {
													chapterListener.end();

													chapterListener.end = firebase
														.firestore()
														.collection("Chapter")
														.doc(data.user.chapterID)
														.onSnapshot(
															(doc) => {
																var firestoreChapterData = doc.data();
																if (firestoreChapterData !== null) {
																	var databaseChapterFields = [
																		"chapterID",
																		"chapterName",
																		"code",
																		"compEventLink",
																		"isState",
																		"state",
																	];

																	for (let fieldPath of databaseChapterFields) {
																		// console.log(
																		// 	"comparing ",
																		// 	fieldPath,
																		// 	" from firestore Chapter"
																		// );
																		if (!Array.isArray(fieldPath)) {
																			// is string
																			if (
																				data.chapter[fieldPath] !==
																				firestoreChapterData[fieldPath]
																			) {
																				// update local value
																				data.chapter[fieldPath] =
																					firestoreChapterData[fieldPath];
																				// calls local listeners
																				for (let listener of localListeners
																					.chapter[fieldPath]) {
																					listener(data.chapter[fieldPath]);
																				}
																			}
																		} else {
																			// is array (complex path)

																			// get to values and objects
																			var localValue = data.chapter;
																			var firestoreValue = firestoreChapterData;
																			var localObj = data.chapter;
																			var localListenerArr =
																				localListeners.chapter;
																			for (
																				let i = 0;
																				i < fieldPath.length;
																				i++
																			) {
																				localValue = localValue[fieldPath[i]];
																				firestoreValue =
																					firestoreValue[fieldPath[i]];
																				localListenerArr =
																					localListenerArr[fieldPath[i]];
																				if (i < fieldPath.length - 1) {
																					// stops one object before the value to keep reference (allows us to update it)
																					localObj = localObj[fieldPath[i]];
																				}
																			}

																			if (localValue !== firestoreValue) {
																				// update local value
																				localObj[
																					fieldPath.slice().pop()
																				] = firestoreValue;
																				// call local listeners
																				for (let listener of localListenerArr) {
																					listener(localValue);
																				}
																			}
																		}
																	}

																	// CALCULATIONS AFTER GETTING DATA FROM FIRESTORE

																	done();
																} else {
																	console.error(
																		"Chapter " +
																			data.user.chapterID +
																			" in Firestore is null. This is probably due to an error with chapter creation"
																	);
																}
															},
															() => {
																(errMessage) => {
																	console.log(
																		"Firestore error getting Chapter info"
																	);
																	error(errMessage);
																};
															}
														);
												})();
											} else {
												done();
											}
										} else {
											console.error(
												"User " +
													data.user.uid +
													" in Firestore is null. This is probably due to an error with user creation"
											);
											done();
										}
									},
									(errMessage) => {
										console.log("Firestore error getting User info");
										error(errMessage);
									}
								);
						})();
					} else {
						done();
					}
				} else {
					console.log("User is not signed in.");
					done();
				}
			});
		})();
		function done() {
			if (!started) {
				started = true;

				// add ons are values which as accessible through this firestore object, but aren't actually stored firestore
				// these values utilze local listeners to update on parent value change
				// Ex. nameInitals updates whenever the name changes
				addOns();
				console.log("SUCCESSFUL STARTED FIRESTORE");
				resolve(firestore);
			}
		}
		function error(reason) {
			console.log("ERROR WHILE ACCESSING FIRESTORE.");
			console.log(reason);
			if (!started) {
				started = true;
				reject(reason);
			}
		}
	});
}

/**
 * End listeners to firebase. Will most likely never need to be used.
 */
function end() {
	started = false;

	authListener.end();
	userListener.end();
	chapterListener.end();
}

function registerLocalListener(type, callback) {
	type.push(callback);
	return function () {
		type = type.filter(callback);
	};
}

function user() {
	checkStarted();

	return {
		get: {
			isLoggedIn: data.user.isLoggedIn,
			uid: data.user.uid,
			photoURL: data.user.photoURL,
			email: data.user.email,
			name: data.user.name,
			nameInitals: data.user.nameInitals,
			inChapter: data.user.inChapter,
			chapterID: data.user.chapterID,
			isAdmin: data.user.isAdmin,
			notification: {
				localChapter: {
					announcements: data.user.notification.localChapter.announcements,
					events: data.user.notification.localChapter.events,
				},
				stateChapter: {
					announcements: data.user.notification.stateChapter.announcements,
					events: data.user.notification.stateChapter.events,
				},
			},
		},
		listen: {
			isLoggedIn: (callback) => {
				callback(data.user.isLoggedIn);
				registerLocalListener(localListeners.user.isLoggedIn, callback);
			},
			uid: (callback) => {
				callback(data.user.uid);
				registerLocalListener(localListeners.user.uid, callback);
			},
			photoURL: (callback) => {
				callback(data.user.photoURL);
				registerLocalListener(localListeners.user.photoURL, callback);
			},
			email: (callback) => {
				callback(data.user.email);
				registerLocalListener(localListeners.user.email, callback);
			},
			name: (callback) => {
				callback(data.user.name);
				registerLocalListener(localListeners.user.name, callback);
			},
			nameInitals: (callback) => {
				callback(data.user.nameInitals);
				registerLocalListener(localListeners.user.nameInitals, callback);
			},
			inChapter: (callback) => {
				callback(data.user.inChapter);
				registerLocalListener(localListeners.user.inChapter, callback);
			},
			chapterID: (callback) => {
				callback(data.user.chapterID);
				registerLocalListener(localListeners.user.chapterID, callback);
			},
			isAdmin: (callback) => {
				callback(data.user.isAdmin);
				registerLocalListener(localListeners.user.isAdmin, callback);
			},
			notification: {
				localChapter: {
					announcements: (callback) => {
						callback(data.user.notification.localChapter.announcements);
						registerLocalListener(
							localListeners.user.notification.localChapter.announcements,
							callback
						);
					},
					events: (callback) => {
						callback(data.user.notification.localChapter.events);
						registerLocalListener(
							localListeners.user.notification.localChapter.events,
							callback
						);
					},
				},
				stateChapter: {
					announcements: (callback) => {
						callback(data.user.notification.stateChapter.announcements);
						registerLocalListener(
							localListeners.user.notification.stateChapter.announcements,
							callback
						);
					},
					events: (callback) => {
						callback(data.user.notification.stateChapter.events);
						registerLocalListener(
							localListeners.user.notification.stateChapter.events,
							callback
						);
					},
				},
			},
		},
		set: {
			// these commented out functions should never be used.

			// isLoggedIn: (value) => {
			// 	console.log("YOU SHOULD NEVER MANUALLY UPDATE isLoggedIn");
			// },
			// uid: (value) => {
			// 	console.log("YOU SHOULD NEVER MANUALLY UPDATE uid");
			// },
			name: (value) => {
				return updateFirestoreUser("name", value.trim());
			},
			chapterID: (value) => {
				var inChapter = value !== null && value === "" ? true : false;

				return Promise.all([
					updateFirestoreUser("chapterID", value.trim()),
					updateFirestoreUser("inChapter", inChapter),
				]);
			},
			isAdmin: (value) => {
				return updateFirestoreUser("isAmdin", value);
			},
			notification: {
				localChapter: {
					announcements: (value) => {
						return updateFirestoreUser(
							"notification.localChapter.announcements",
							value
						);
					},
					events: (value) => {
						return updateFirestoreUser(
							"notification.localChapter.events",
							value
						);
					},
				},
				stateChapter: {
					announcements: (value) => {
						return updateFirestoreUser(
							"notification.stateChapter.announcements",
							value
						);
					},
					events: (value) => {
						return updateFirestoreUser(
							"notification.stateChapter.events",
							value
						);
					},
				},
			},
		},
		// ADDITIONAL METHODS
		create(uid, name) {
			return firebase
				.firestore()
				.collection("DatabaseUser")
				.doc(uid)
				.set(
					{
						chapterID: "",
						inChapter: false,
						isAdmin: false,
						name: name.trim(),
						chapterEvents: {},
						compEvents: "",
						notification: {
							localChapter: {
								announcements: true,
								events: false,
							},
							stateChapter: {
								announcements: true,
								events: false,
							},
						},
					},
					{ merge: false }
				);
		},
		signOut() {
			// reset data
			userListener.end();
			resetLocalData.all();

			// sign out
			firebase.auth().signOut();
		},
		leaveChapter() {
			var promises = Promise.all([
				updateFirestoreUser("chapterID", ""),
				updateFirestoreUser("inChapter", false),
				updateFirestoreUser("isAdmin", false),
			]).then(() => {
				chapterListener.end();
				resetLocalData.chapter();
			});

			return promises;
		},
		joinChapter(code) {
			return new Promise((resolve, reject) => {
				firebase
					.firestore()
					.collection("Chapter")
					.where("code", "==", parseInt(code))
					.get()
					.then((querySnapshot) => {
						if (querySnapshot.size === 0) {
							reject("No chapter with code given");
						} else {
							user()
								.set.chapterID(querySnapshot.docs[0].data().chapterID)
								.then(() => {
									resetLocalData.chapter();
									chapterListener.start();
									resolve();
								});
						}
					});
			});
		},
	};

	function updateFirestoreUser(location, value) {
		return firebase
			.firestore()
			.collection("DatabaseUser")
			.doc(data.user.uid)
			.update({ [location]: value });
	}
}

function chapter() {
	checkStarted();

	return {
		get: {
			chapterID: data.chapter.chapterID,
			chapterName: data.chapter.chapterName,
			code: data.chapter.code,
			compEventLink: data.chapter.compEventLink,
			isState: data.chapter.isState,
			state: data.chapter.state,
		},
		listen: {
			chapterID: (callback) => {
				callback(data.chapter.chapterID);
				registerLocalListener(localListeners.chapter.chapterID, callback);
			},
			chapterName: (callback) => {
				callback(data.chapter.chapterName);
				registerLocalListener(localListeners.chapter.chapterName, callback);
			},
			code: (callback) => {
				callback(data.chapter.code);
				registerLocalListener(localListeners.chapter.code, callback);
			},
			compEventLink: (callback) => {
				callback(data.chapter.compEventLink);
				registerLocalListener(localListeners.chapter.compEventLink, callback);
			},
			isState: (callback) => {
				callback(data.chapter.isState);
				registerLocalListener(localListeners.chapter.isState, callback);
			},
			state: (callback) => {
				callback(data.chapter.state);
				registerLocalListener(localListeners.chapter.state, callback);
			},
		},
		set: {
			chapterID: (value) => {
				return updateFirestoreChapter("chapterID", value.trim());
			},
			chapterName: (value) => {
				return updateFirestoreChapter("chapterName", value.trim());
			},
			code: (value) => {
				return updateFirestoreChapter("code", value.trim());
			},
			compEventLink: (value) => {
				return updateFirestoreChapter("compEventLink", value.trim());
			},
			isState: (value) => {
				return updateFirestoreChapter("isState", value);
			},
			state: (value) => {
				return updateFirestoreChapter("state", value);
			},
		},
		// ADDITIONAL METHODS
		createChapter(chapterName, state, chapterID) {
			return new Promise((resolve, reject) => {
				firebase
					.firestore()
					.collection("Chapter")
					.where("chapterID", "==", chapterID)
					.get()
					.then((queryDocSnapshots) => {
						if (queryDocSnapshots.size === 0) {
							let chapterCode = Math.floor(Math.random() * 90000);

							//TODO: https://github.com/garytou2/FBLA-App/issues/16
							firebase
								.firestore()
								.collection("Codes")
								.doc("Codes")
								.get()
								.then((doc) => {
									const codeList = doc.data().Codes;
									while (codeList.includes(chapterCode)) {
										chapterCode = (chapterCode + 1) % 90000;
									}

									chapterCode = chapterCode + 10000;
									codeList.push(chapterCode);

									//update codes
									firebase
										.firestore()
										.collection("Codes")
										.doc("Codes")
										.set(
											{
												Codes: codeList,
											},
											{ merge: false }
										)
										.then(() => {
											// create chapter
											firebase
												.firestore()
												.collection("Chapter")
												.doc(chapterID)
												.set(
													{
														chapterName: chapterName,
														code: chapterCode,
														state: state,
														chapterID: chapterID,
														compEventLink: "",
														socMedia: {},
														isState: false,
													},
													{ merge: false }
												)
												.then(() => {
													//current user join chapter as admin
													data.user.isAdmin = true;
													user()
														.joinChapter(chapterCode)
														.then(() => {
															resolve();
														})
														.catch(() => {
															// Firestore error
															reject(err);
														});
												})
												.catch((err) => {
													// Firestore error
													reject(err);
												});
										})
										.catch((err) => {
											// Firestore error
											reject(err);
										});
								})
								.catch((err) => {
									// Firestore error
									reject(err);
								});
						} else {
							reject("Chapter ID Taken");
						}
					})
					.catch((err) => {
						// Firestore error
						reject(err);
					});
			});
		},
	};

	function updateFirestoreChapter() {
		return firebase
			.firestore()
			.collection("Chapter")
			.doc(data.chapter.chapterID)
			.update({ [location]: value });
	}
}

const resetLocalData = {
	all: function () {
		resetLocalData.user();
		resetLocalData.chapter();
	},
	user: function () {
		data.user = JSON.parse(JSON.stringify(dataTemplate.user));

		callAllListenersUnder(localListeners.user, data.user);

		function callAllListenersUnder(listenerParent, dataParent) {
			for (field in listenerParent) {
				var listenerFieldObj = listenerParent[field];
				var dataFieldObj = dataParent[field];
				if (!Array.isArray(listenerFieldObj)) {
					callAllListenersUnder(listenerFieldObj, dataFieldObj);
				} else {
					for (listener of listenerFieldObj) {
						listener(dataFieldObj);
					}
				}
			}
		}
	},
	chapter: function () {
		data.chapter = JSON.parse(JSON.stringify(dataTemplate.chapter));
		for (field in localListeners.chapter) {
			var listeners = localListeners.chapter[field];
			for (listener of listeners) {
				listener();
			}
		}
	},
};

/**
 * add ons are values which as accessible through this firestore object, but aren't actually stored firestore
 * these values utilze local listeners to update on parent value change
 * Ex. nameInitals updates whenever the name changes
 */
function addOns() {
	user().listen.name((name) => {
		var initals = "";
		var nameSplit = name.trim().split(" ");
		if (name == "") {
			// do nothing
		} else if (nameSplit.length == 1) {
			initals = name.trim().split("")[0];
		} else {
			initals += nameSplit[0].split("")[0];
			initals += nameSplit[nameSplit.length - 1].split("")[0];
		}
		data.user.nameInitals = initals.toUpperCase();

		// calls local listeners
		for (let listener of localListeners.user.nameInitals) {
			listener(data.user.nameInitals);
		}
	});
}

const firestore = {
	start: start,
	end: end,
	user: user,
	chapter: chapter,
};

export { firebase, firestore };
