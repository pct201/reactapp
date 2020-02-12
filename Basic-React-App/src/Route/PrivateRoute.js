import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { SideNavBar, TopHeader } from '../Components/Layout';
import { UnAuthorize } from '../Components/Common'

var userName;   
export const PrivateRoute = ({ component: Component, permission: Permission, ...rest }) => {
    var hasPermission = true;   
    var user = localStorage.getItem('user');

    if (user != null && user !== '') {
        userName = JSON.parse(user).userName;
        if (Permission !== undefined) {
            let permissionList = JSON.parse(JSON.parse(user).permissions);
            hasPermission = permissionList.includes(Permission);
        }
    }
    return (
        <Route {...rest} render={props => (
            (user !== null && user !== '')
                ? <div className="wrapper"> <TopHeader userName={userName} /> <SideNavBar />{hasPermission ? <Component {...props} /> : <UnAuthorize />} </div>
                : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )} />)
}
