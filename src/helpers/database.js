
import firebase from 'firebase';

const config = {
  apiKey: "***REMOVED***",
  authDomain: "***REMOVED***",
  databaseURL: "***REMOVED***",
  projectId: "***REMOVED***",
  storageBucket: "***REMOVED***.appspot.com",
  messagingSenderId: "***REMOVED***"
};

const config2 = {
  apiKey: "***REMOVED***",
  authDomain: "***REMOVED***",
  databaseURL: "***REMOVED***",
  projectId: "***REMOVED***",
  storageBucket: "***REMOVED***.appspot.com",
  messagingSenderId: "***REMOVED***"
};


const firebaseApp = firebase.initializeApp(config);
const database = firebase.database();
const googleProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();
const firebaseAuth = firebase.auth;
export { firebaseApp, googleProvider,facebookProvider, firebaseAuth, database as default }

