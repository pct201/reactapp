import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import { history } from '../Helpers/history';
import Dashboard from '../Components/Home/Dashboard';
import { Login, Registration, CreatePassword, ForgotPassword } from '../Components/Login';
import { ManageUsers, EditUser } from '../Components/User';
import { ManageEmailTemplate, EmailLogList } from '../Components/Email';
import { ManagePermissions } from '../Components/Permission';
import { Error } from '../Components/Common';

export default class Routes extends React.Component {
    render() {
        return (
            <Router history={history}>               
                <Switch>
                    <PrivateRoute exact path="/dashboard" component={Dashboard} />
                    <PrivateRoute exact path="/manageuser" component={ManageUsers} permission="ViewUserList" />
                    <PrivateRoute exact path="/edituser/:userId" component={EditUser} permission="EditUser" />
                    <PrivateRoute exact path="/manageemailtemplate" component={ManageEmailTemplate} permission="EmailTemplateList" />
                    <PrivateRoute exact path="/emaillog" component={EmailLogList} permission="ViewEmailLog" />
                    <PrivateRoute exact path="/managepermissions" component={ManagePermissions} permission="ViewPermission" />
                    <Route path="/error/:message" component={Error} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Registration} />
                    <Route path="/createpassword" component={CreatePassword} />
                    <Route path="/forgotPassword" component={ForgotPassword} />
                    <Redirect from="*" to="/dashboard" />
                </Switch>               
            </Router>
        )
    }
}