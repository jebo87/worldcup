
import firebase from 'firebase';

const config = {
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
const firebaseAuth = firebase.auth;
export { firebaseApp, googleProvider, firebaseAuth, database as default }

