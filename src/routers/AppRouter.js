import React from 'react';
import {BrowserRouter, Switch,Route} from 'react-router-dom';
import Login from '../components/Login';
import Header from '../components/Header'
import MatchList from '../components/MatchList';

const AppRouter = ()=>(
    <BrowserRouter>
        <div>
        <Header></Header>
            <Switch>
                <Route path="/" component={MatchList} exact={true} />
                <Route path="/login" component={Login} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;