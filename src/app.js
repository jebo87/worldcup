import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';
import AppRouter from './routers/AppRouter';
import { firebaseApp } from './helpers/database';

// firebaseApp.auth().createUserWithEmailAndPassword('jbautista@powertrunk.com', 'micontra123').catch(function(error) {
//     // Handle Errors here.
//     var errorCode = error.code;
//     var errorMessage = error.message;

//     console.log(errorCode,errorMessage);
//     // ...
//   });

const store = configureStore();
const App = () => (
	<Provider store={store}>
		<AppRouter />
	</Provider>
);
export default App;
