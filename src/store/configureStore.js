import {createStore, combineReducers,applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import userReducer from '../reducers/userReducer';
import matchesReducer from '../reducers/matchesReducer';
import scoreReducer from '../reducers/scoreReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose ;

//create the store
export default() =>{
    const store = createStore(
        combineReducers({
            user: userReducer,
            fechas: matchesReducer,
            scoreToUpdate:scoreReducer,
        }),
        composeEnhancers(applyMiddleware(thunk))
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

    return store;
}