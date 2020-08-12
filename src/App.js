import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';
import AppRouter from './routers/AppRouter';
import { firebaseApp } from './helpers/database';

const store = configureStore();
const App = () => (
	<Provider store={store}>
		<AppRouter />
	</Provider>
);
export default App;
