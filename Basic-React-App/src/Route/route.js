import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import { history } from '../Helpers/history';
import Dashboard from '../Components/Home/Dashboard'
import Login from '../Components/Login/login'
import registration from '../Components/Login/registration'

export default class Routes extends React.Component {   
    render() {
        return (
            <Router history={history}>
                <Switch>                    
                    <PrivateRoute exact path="/" component={Dashboard} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={registration} />
                    {/* <Route path="/register" component={RegisterPage} /> */}
                    <Redirect from="*" to="/" />
                </Switch>
            </Router>
        )
    }
}