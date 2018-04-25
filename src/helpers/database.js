
import firebase from 'firebase';

const  config = {
    apiKey: "***REMOVED***",
    authDomain: "***REMOVED***",
    databaseURL: "***REMOVED***",
    projectId: "***REMOVED***",
    storageBucket: "***REMOVED***.appspot.com",
    messagingSenderId: "***REMOVED***"
  };
const firebaseApp = firebase.initializeApp(config);

export {firebaseApp}

