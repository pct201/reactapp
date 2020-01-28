import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import { history } from '../Helpers/history';
import Dashboard from '../Components/Home/Dashboard';
import {Login,Registration,CreatePassword,ForgotPassword} from '../Components/Login';
import {ManageUsers,EditUser} from '../Components/User';
import {ManageEmailTemplate,EmailLogList} from '../Components/Email';

export default class Routes extends React.Component {   
    render() {
        return (
            <Router history={history}>
                <Switch>                    
                    <PrivateRoute exact path="/" component={Dashboard} />
                    <PrivateRoute exact path="/manageuser" component={ManageUsers} />   
                    <PrivateRoute exact path="/edituser/:userId" component={EditUser} />   
                    <PrivateRoute exact path="/manageemailtemplate" component={ManageEmailTemplate} />
                    <PrivateRoute exact path="/emaillog" component={EmailLogList} />                                     
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Registration} />
                    <Route path="/createpassword" component={CreatePassword} />
                    <Route path="/forgotPassword" component={ForgotPassword} /> 
                    <Redirect from="*" to="/" />
                </Switch>
            </Router>
        )
    }
}