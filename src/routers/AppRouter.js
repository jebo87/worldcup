import React from 'react';
import {BrowserRouter, Switch,Route} from 'react-router-dom';
import LoginPage from '../components/LoginPage';
import Header from '../components/Header'
import HomePage from '../components/HomePage';

const AppRouter = ()=>(
    <BrowserRouter>
        <Switch>
                <Route path="/" component={HomePage} exact={true} />
                <Route path="/login" component={LoginPage} />
            </Switch>
    </BrowserRouter>
);

export default AppRouter;