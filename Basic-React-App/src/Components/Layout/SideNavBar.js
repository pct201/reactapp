import React from 'react';
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { NavDropdown } from 'react-bootstrap';
import { Link } from "react-router-dom";

export default class SideNavBar extends React.Component {

    handleLinkClick = event => {
        let element = document.querySelectorAll('.active');
        for (var i = 0; i < element.length; i++) {
            element[i].classList.remove('active')
        }
        event.target.classList.add("active");
    }
    componentDidMount = () => {
        const currentActive = this.props.props.pathname

        if (document.querySelectorAll('.main-navigation .active').length === 0) {

            document.querySelectorAll('.main-navigation a').forEach((tag) => {
                if (currentActive === "/") {
                    if (tag.attributes.href.nodeValue === "/") { tag.classList.add("active"); }
                }
                else {                    
                    if (tag.attributes.href.nodeValue === "#") {
                        if (currentActive === '/manageemailtemplate' || currentActive === '/emaillog') {
                            tag.classList.add("active");
                        }
                    }
                    else if (tag.attributes.href.nodeValue.indexOf(currentActive) >= 0) {
                        tag.classList.add("active");
                    }
                }
            });
        }
    }

    render() {
        return (
            <div className="main-navigation">
                <Navbar collapseOnSelect stackedbg="light" variant="dark" string="navbar-collapse">
                    <Navbar.Collapse>
                        <Nav className="mr-auto">
                            <Link to="/" className="nav-link" onClick={(event) => this.handleLinkClick(event)}>
                                <img className="icon" src={require('../../images/dashboard.svg')} alt="Dashboard" />
                                Dashboard
                            </Link>
                            <Link to="/manageuser" className="nav-link" onClick={(event) => this.handleLinkClick(event)}>
                                <img className="icon" src={require('../../images/my-profile.svg')} alt="Manage User" />
                                Manage User
                            </Link>
                            <NavDropdown title={<div> <img className="icon" src={require('../../images/billing.svg')} alt="user pic" />Email</div>} id="basic-nav-dropdown">
                                <Link to="/manageemailtemplate" className="dropdown-item" onClick={(event) => this.handleLinkClick(event)}> Manage Email Template </Link>
                                <Link to="/emaillog" className="dropdown-item" onClick={(event) => this.handleLinkClick(event)}> Email Log</Link>
                            </NavDropdown>
                            <Link to="/managepermissions" className="nav-link" onClick={(event) => this.handleLinkClick(event)}>
                                <img className="icon" src={require('../../images/billing.svg')} alt="Manage Permissions" />
                                Manage Permissions
                            </Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <div className="menu-overlay" onClick={() => document.body.classList.toggle('menu-open-mobile')}></div>
            </div>
        )
    }
}

