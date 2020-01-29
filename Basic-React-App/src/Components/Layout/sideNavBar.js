import React from 'react';
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { NavDropdown } from 'react-bootstrap';
import { Link } from "react-router-dom";

export default class SideNavBar extends React.Component{
    handleLinkClick=()=>{}
    render() {
        return (
            <div className="main-navigation">
                 <Navbar collapseOnSelect stackedbg="light" variant="dark" string="navbar-collapse">                   
                    <Navbar.Collapse>
                        <Nav className="mr-auto">
                            <Link to="/" className="nav-link" onClick={this.handleLinkClick()}>
                                <img className="icon" src={require('../../images/dashboard.svg')} alt="Dashboard" />
                                Dashboard
                            </Link>
                            <Link to="/manageuser" className="nav-link" >
                                <img className="icon" src={require('../../images/my-profile.svg')} alt="Manage User" />
                                Manage User
                            </Link>   
                            <NavDropdown title={<div> <img className="icon" src={require('../../images/billing.svg')} alt="user pic" />
                                Email
                                </div>
                            }
                                id="basic-nav-dropdown">
                                <Link to="/manageemailtemplate" className="dropdown-item" > Manage Email Template </Link>
                                <Link to="/emaillog" className="dropdown-item" > Email Log</Link>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <div className="menu-overlay" onClick={() => document.body.classList.toggle('menu-open-mobile')}></div>
            </div>
        )
    }
}

