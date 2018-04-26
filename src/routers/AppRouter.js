import React from 'react';
import {BrowserRouter, Switch,Route} from 'react-router-dom';
import Login from '../components/Login';
import Header from '../components/Header'
import HomePage from '../components/HomePage';

const AppRouter = ()=>(
    <BrowserRouter>
        <Switch>
                <Route path="/" component={HomePage} exact={true} />
                <Route path="/login" component={Login} />
            </Switch>
    </BrowserRouter>
);

export default AppRouter;