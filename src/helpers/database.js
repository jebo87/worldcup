import firebase from 'firebase';
//THIS IS A PERSONAL PRIVATE PROJECT. THIS SHOULD NEVER BE DONE IN PRODUCTION
//ENVIRONMENT VARIABLES SHOULD BE USED.
const production = {
	apiKey: '***REMOVED***',
	authDomain: '***REMOVED***',
	databaseURL: '***REMOVED***',
	projectId: '***REMOVED***',
	storageBucket: '***REMOVED***.appspot.com',
	messagingSenderId: '***REMOVED***'
};

const development = {
	apiKey: '***REMOVED***',
	authDomain: '***REMOVED***',
	databaseURL: '***REMOVED***',
	projectId: '***REMOVED***',
	storageBucket: '***REMOVED***.appspot.com',
	messagingSenderId: '***REMOVED***'
};

// const firebaseApp = firebase.initializeApp(production);
const firebaseApp = firebase.initializeApp(development);
const database = firebase.database();
const googleProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();
const firebaseAuth = firebase.auth;
export { firebaseApp, googleProvider, facebookProvider, firebaseAuth, database as default };
