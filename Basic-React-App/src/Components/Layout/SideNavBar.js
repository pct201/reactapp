import React from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { NavDropdown } from 'react-bootstrap'
import { NavLink } from "react-router-dom"

var permissionList
export default class SideNavBar extends React.Component {
    constructor(props) {
        super(props);
        if (localStorage.getItem('user')) {
            permissionList = JSON.parse(JSON.parse(localStorage.getItem('user')).permissions);
        }
    }


    // handleLinkClick = event => {
    //     let element = document.querySelectorAll('.active');
    //     for (var i = 0; i < element.length; i++) {
    //         element[i].classList.remove('active')
    //     }
    //     event.target.classList.add("active");
    // }
    // componentDidMount = () => {
    //     const currentActive = this.props.props.pathname

    //     if (document.querySelectorAll('.main-navigation .active').length === 0) {

    //         document.querySelectorAll('.main-navigation a').forEach((tag) => {
    //             if (currentActive === "/") {
    //                 if (tag.attributes.href.nodeValue === "/") { tag.classList.add("active"); }
    //             }
    //             else {                    
    //                 if (tag.attributes.href.nodeValue === "#") {
    //                     if (currentActive === '/manageemailtemplate' || currentActive === '/emaillog') {
    //                         tag.classList.add("active");
    //                     }
    //                 }
    //                 else if (tag.attributes.href.nodeValue.indexOf(currentActive) >= 0) {
    //                     tag.classList.add("active");
    //                 }
    //             }
    //         });
    //     }
    // }

    render() {
       // alert(permissionList)
        return (
            <div className="main-navigation">
                <Navbar collapseOnSelect stackedbg="light" variant="dark" string="navbar-collapse">
                    <Navbar.Collapse>
                        <Nav className="mr-auto">
                            <NavLink to="/dashboard" className="nav-link">
                                <img className="icon" src={require('../../images/dashboard.svg')} alt="Dashboard" />
                                Dashboard
                            </NavLink>
                            {permissionList.includes('ViewUserList') && <NavLink to="/manageuser" className="nav-link">
                                <img className="icon" src={require('../../images/my-profile.svg')} alt="Manage User" />
                                Manage User
                            </NavLink>}
                            {((permissionList.includes('EmailTemplateList')) || (permissionList.includes('ViewEmailLog'))) && <NavDropdown title={<div> <img className="icon" src={require('../../images/billing.svg')} alt="user pic" />Email</div>} id="basic-nav-dropdown">
                                {permissionList.includes('EmailTemplateList') && <NavLink to="/manageemailtemplate" className="dropdown-item"> Manage Email Template </NavLink>}
                                {permissionList.includes('ViewEmailLog') && <NavLink to="/emaillog" className="dropdown-item"> Email Log</NavLink>}
                            </NavDropdown>}
                            {permissionList.includes('ViewPermission') && <NavLink to="/managepermissions" className="nav-link">
                                <img className="icon" src={require('../../images/billing.svg')} alt="Manage Permissions" />
                                Manage Permissions
                            </NavLink>}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <div className="menu-overlay" onClick={() => document.body.classList.toggle('menu-open-mobile')}></div>
            </div>
        )
    }
}

