import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import configureStore from './store/configureStore';
import AppRouter from './routers/AppRouter';
import { firebaseApp } from './helpers/database';

import './styles/styles.scss';
import 'normalize.css/normalize.css';

// firebaseApp.auth().createUserWithEmailAndPassword('jbautista@powertrunk.com', 'micontra123').catch(function(error) {
//     // Handle Errors here.
//     var errorCode = error.code;
//     var errorMessage = error.message;

//     console.log(errorCode,errorMessage);
//     // ...
//   });

const store = configureStore(); 
const jsx = (
    <Provider store={store}>
    
        <AppRouter />
    </Provider>
);
ReactDOM.render(jsx, document.getElementById('app'));