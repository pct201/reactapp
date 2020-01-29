import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { SideNavBar, TopHeader } from '../Components/Layout';
import { UnAuthorize } from '../Components/Common'

export const PrivateRoute = ({ component: Component, permission: Permission, ...rest }) => {
    var hasPermission = true;
    if (Permission !== undefined && localStorage.getItem('user')) {
        let permissionList = JSON.parse(JSON.parse(localStorage.getItem('user')).permissions);
        hasPermission = permissionList.includes(Permission);
    }
    return (
        <Route {...rest} render={props => (
            localStorage.getItem('user')
                ? <div className="wrapper"> <TopHeader /><SideNavBar />{hasPermission ? <Component {...props} /> : <UnAuthorize />} </div>
                : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )} />)
}
