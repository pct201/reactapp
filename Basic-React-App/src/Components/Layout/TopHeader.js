import React from 'react';
import { NavLink } from 'react-router-dom';

export default class TopHeader extends React.Component {
    render() {       
        return (
            <header className="header">
                <div className="container-fluid">
                    <div className="row align-items-center no-gutters">
                        <div className="col">
                            <a href="#/" title="ProCare" className="logo">
                                <img src={require('../../images/logo.png')} alt="" />
                            </a>
                        </div>
                        <div className="col-auto">
                            <a href="#" title={this.props.userName} className="profile-block">
                                <img className="profile-img" src={require('../../images/profile.svg')} alt="User" />
                                <span className="name text-truncate">{this.props.userName}</span>
                            </a>
                            <NavLink to="/login" title="Logout" className="logout"><img src={require('../../images/logout.svg')} alt="" /></NavLink>

                            <button className="nav-icon" onClick={() => document.body.classList.toggle('menu-open-mobile')}>
                                <span className="one"></span>
                                <span className="two"></span>
                                <span className="three"></span>
                            </button>

                        </div>
                    </div>
                </div>
            </header>
        )
    }
}



