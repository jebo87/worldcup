import firebase from 'firebase';

const production = {
	apiKey: process.env.API_KEY_PROD,
	authDomain: process.env.AUTH_DOMAIN_PROD,
	databaseURL: process.env.DATABASE_URL_PROD,
	projectId: process.env.PROJECT_ID_PROD,
	storageBucket: process.env.STORAGE_BUCKET_PROD,
	messagingSenderId: process.env.MESSAGE_SENDER_ID_PROD
};

const development = {
	apiKey: process.env.API_KEY_DEV,
	authDomain: process.env.AUTH_DOMAIN_DEV,
	databaseURL: process.env.DATABASE_URL_DEV,
	projectId: process.env.PROJECT_ID_DEV,
	storageBucket: process.env.STORAGE_BUCKET_DEV,
	messagingSenderId: process.env.MESSAGE_SENDER_ID_DEV
};

// const firebaseApp = firebase.initializeApp(production);
const firebaseApp = firebase.initializeApp(development);
const database = firebase.database();
const googleProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();
const firebaseAuth = firebase.auth;
export { firebaseApp, googleProvider, facebookProvider, firebaseAuth, database as default };
