import firebase from 'firebase';

const production = {
	apiKey: process.env.REACT_APP_API_KEY_PROD,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN_PROD,
	databaseURL: process.env.REACT_APP_DATABASE_URL_PROD,
	projectId: process.env.REACT_APP_PROJECT_ID_PROD,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET_PROD,
	messagingSenderId: process.env.REACT_APP_MESSAGE_SENDER_ID_PROD
};

const development = {
	apiKey: process.env.REACT_APP_API_KEY_DEV,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN_DEV,
	databaseURL: process.env.REACT_APP_DATABASE_URL_DEV,
	projectId: process.env.REACT_APP_PROJECT_ID_DEV,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET_DEV,
	messagingSenderId: process.env.REACT_APP_MESSAGE_SENDER_ID_DEV
};
let firebaseApp;
if (process.env.REACT_APP_RUN_ENV === 'production') {
	firebaseApp = firebase.initializeApp(production);
} else {
	firebaseApp = firebase.initializeApp(development);
}

const database = firebase.database();
const googleProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();
const firebaseAuth = firebase.auth;
export { firebaseApp, googleProvider, facebookProvider, firebaseAuth, database as default };
