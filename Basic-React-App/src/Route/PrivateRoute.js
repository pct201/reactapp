import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import SideNavBar from '../Components/Layout/SideNavBar';
import TopHeader from '../Components/Layout/TopHeader';


export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('user')
            ?  <div className="wrapper"><TopHeader/><SideNavBar/><Component {...props} /> </div>
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)
