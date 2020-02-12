import React, { Component, Fragment } from 'react';
import { Modal } from 'react-bootstrap';
import SimpleReactValidator from 'simple-react-validator';
import { userService } from '../../Services';
import { HelpTip } from '../Common';

export default class ChangePassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user_id: this.props.userId,
            old_password: "",
            new_password: "",
            showLoader: false,
        };
        this.validator = new SimpleReactValidator({ autoForceUpdate: this });
    }

    handleInputChange = event => {
        this.setState({
            ...this.state,
            [event.target.id]: event.target.value
        });
    }

    updatePassword = (e) => {
        e.preventDefault();
        if (this.validator.allValid()) {
            this.setState({
                ...this.state,
                showLoader: true
            })
            userService.updatePassword(this.state.user_id,this.state.old_password, this.state.new_password).then(result => {                
                this.setState({
                    ...this.state,
                    showLoader: false
                })
                this.props.popupSave(result);
            })
        }
        else { this.validator.showMessages(); }
    }

    render() {
        return (
            <Modal show={this.props.show} aria-labelledby="contained-modal-title-vcenter" centered="true" onHide={this.props.popupClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Change Password</Modal.Title>
                </Modal.Header>
                <div className="formContainer">
                    <div className="container-fluid user-info">
                        <Modal.Body>                           
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <input type="password" className="form-control" id="old_password" name="old_password" placeholder="Old Password" value={this.state.old_password} onChange={this.handleInputChange} />
                                        <span className="errorfont">
                                            {this.validator.message('old_password', this.state.old_password, `required`)}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-md-12 ">
                                    <div className="form-group tooltipContainer">
                                        <input type="password" className="form-control" id="new_password" name="new_password" placeholder="New Password" value={this.state.new_password} onChange={this.handleInputChange} />
                                        <HelpTip message={"New Password must have 6 to 16 length including at least one number and one special character."} />
                                        <span className="errorfont">{this.validator.message('new_password', this.state.new_password, ['required',{not_in:[this.state.old_password]}, { regex: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/ }], { messages: { regex: 'Password must have 6 to 16 length including at least one number and one special character.', not_in: 'New password must be different than old password!'  } })}</span>
                                    </div>
                                </div>
                                <div className="col-md-12 ">
                                    <div className="form-group">
                                        <input type="password" className="form-control" id="confirm_password" name="confirm_password" placeholder="Confirm Password" value={this.state.confirm_password} onChange={this.handleInputChange} />
                                        <span className="errorfont">
                                            {this.validator.message('confirm_password', this.state.confirm_password, `required|in:${this.state.new_password}`, { messages: { in: 'Passwords need to match!' } })}
                                        </span>
                                    </div>
                                </div>
                            </div>

                        </Modal.Body>
                        <Modal.Footer>
                            <div className="text-right w-100">
                                <button className="btn btn-primary" onClick={(event) => this.updatePassword(event)} ><span>Change Password</span></button>
                                <button className="btn btn-secondary" onClick={this.props.popupClose}><span>Cancel</span></button>
                            </div>
                        </Modal.Footer>
                    </div>
                </div>
            </Modal>
        )
    }
}
