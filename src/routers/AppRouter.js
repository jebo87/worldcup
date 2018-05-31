import React from 'react';
import {BrowserRouter, Switch,Route} from 'react-router-dom';
import LoginPage from '../components/LoginPage';
import Header from '../components/Header'
import HomePage from '../components/HomePage';
import AdminPage from '../components/AdminPage';

const AppRouter = ()=>(
    <BrowserRouter>
        <Switch>
                <Route path="/" component={HomePage} exact={true} />
                <Route path="/login" component={LoginPage} />
                <Route path="/admin" component={AdminPage} />
            </Switch>
    </BrowserRouter>
);

export default AppRouter;