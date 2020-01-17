import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import { history } from '../Helpers/history';
import Dashboard from '../Components/Home/Dashboard'
import Login from '../Components/Login/login'
import registration from '../Components/Login/registration'
import createPassword from '../Components/Login/createPassword'
import forgotPassword from '../Components/Login/forgotPassword'

export default class Routes extends React.Component {   
    render() {
        return (
            <Router history={history}>
                <Switch>                    
                    <PrivateRoute exact path="/" component={Dashboard} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={registration} />
                    <Route path="/createpassword" component={createPassword} />
                    <Route path="/forgotPassword" component={forgotPassword} />                    
                    {/* <Route path="/register" component={RegisterPage} /> */}
                    <Redirect from="*" to="/" />
                </Switch>
            </Router>
        )
    }
}