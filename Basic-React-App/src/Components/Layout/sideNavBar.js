import React from 'react';
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { NavDropdown } from 'react-bootstrap';
import { Link } from "react-router-dom";

export default class SideNavBar extends React.Component{
  
    render() {
        return (
            <div className="main-navigation">
                <Navbar collapseOnSelect stackedbg="light" variant="dark" string="navbar-collapse">
                    {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" /> */}
                    <Navbar.Collapse>
                        <Nav className="mr-auto">
                            <Nav.Link href="/dashboard">
                                <img className="icon" src={require('../../images/dashboard.svg')} alt="Dashboard" />
                                Dashboard
                            </Nav.Link>
                            <Nav.Link href="/manageuser">
                                <img className="icon" src={require('../../images/my-profile.svg')} alt="Manage User" />
                                Manage User
                            </Nav.Link>
                            <Nav.Link href="/manageemailtemplate">
                                <img className="icon" src={require('../../images/my-profile.svg')} alt="Manage Email Template" />
                                Manage Email Template
                            </Nav.Link>
                            <NavDropdown title={<div> <img className="icon" src={require('../../images/billing.svg')} alt="user pic" />
                                Billing
                                </div>
                            }
                                id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1"> Payment Status </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2"> Submit an Invoice </NavDropdown.Item>
                            </NavDropdown>
                            {/* <Nav.Link href="#documentation">
                                <img className="icon" src={require('../../images/documentation.svg')} alt="Documentation" />
                                Documentation
                            </Nav.Link>
                            <Nav.Link href="#my-profile">
                                <img className="icon" src={require('../../images/my-profile.svg')} alt="My Profile" />
                                Documentation
                            </Nav.Link>
                            <Nav.Link href="#Feedback">
                                <img className="icon" src={require('../../images/feedback.svg')} alt="Feedback" />
                                Feedback
                            </Nav.Link> */}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <div className="menu-overlay" onClick={() => document.body.classList.toggle('menu-open-mobile')}></div>
            </div>
        )
    }
}

