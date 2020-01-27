import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import { history } from '../Helpers/history';
import Dashboard from '../Components/Home/Dashboard'
import Login from '../Components/Login/Login'
import Registration from '../Components/Login/Registration'
import CreatePassword from '../Components/Login/CreatePassword'
import ForgotPassword from '../Components/Login/ForgotPassword'
import ManageUsers from '../Components/User/ManageUsers'
import EditUser from '../Components/User/EditUser'
import ManageEmailTemplate from '../Components/Email/ManageEmailTemplate'
import EmailLogList from '../Components/Email/EmailLogList'


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