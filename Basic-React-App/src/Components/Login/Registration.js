import React, { Component, Fragment } from 'react'
import SimpleReactValidator from 'simple-react-validator';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { authenticationService, userService } from '../../Services';
import { MessagePopup } from '../Popup';

export default class Registration extends Component {

    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator({ autoForceUpdate: this });
        this.handleModelHide = this.handleModelHide.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);

    }

    state = {
        mainState: {
            userId: 0,
            first_name: "",
            last_name: "",
            email: "",
            mobile_number: "",
            education_id: "",
            salary: "",
            birth_date: null,
            is_married: false
        },       
        termCondition: false,
        educationData: null,
        popupState: {
            title: "",
            redirect: false,
            message: "",
            isshow: false,

        }
    }

    componentDidMount = () => {

        userService.educationList().then(result => {
            this.setState({
                educationData: result
            })
        });
    }

    handleDatepickerChange = (date) => {              
        this.setState({
            mainState: {
                ...this.state.mainState,
                 birth_date: date
            }
        });
    }

    handleInputChange = event => {
        if (event.target.id === "terms") {
            this.setState({
                ...this.state,
                termCondition: event.target.checked
            });
        }
        else {
            this.setState({
                mainState: {
                    ...this.state.mainState,
                    [event.target.id]: (event.target.id === "is_married") ? event.target.checked : event.target.value
                }
            });
        }
    }

    handleCancel = () => {
        this.props.history.push('/login', null)
    }

    handleModelHide(isRedirect) {
        if (isRedirect) {
            this.props.history.push('/login', null)
        }
        else {
            this.setState({
                popupState: {
                    ...this.state.popupState,
                    message: null,
                    title: null,
                    event_to_do: null,
                    isshow: false
                }
            })
        }
    }

    handleOnSubmit = event => {
        event.preventDefault();
        if (this.validator.allValid()) {           
            authenticationService.register(this.state.mainState).then(result => {               
                switch (result.errorCode) {
                    case 201:
                        this.setState({
                            popupState: {
                                title: "Error",
                                message: "<p>Your mail address is allready registered please use diffrent mail id.</P>",
                                isshow: true,
                                redirect: false
                            }
                        })
                        break
                    case 202:
                        this.setState({
                            popupState: {
                                title: "Error",
                                message: "<p>Something went wrong. Please try again later.</P>",
                                isshow: true,
                                redirect: true
                            }
                        })
                        break
                    default:
                        this.setState({
                            popupState: {
                                title: "Success",
                                message: "<p>Thank you for registration. We have sent set password link to your registered mail address.</P>",
                                isshow: true,
                                redirect: true
                            }
                        })
                }
            })
        }
        else {
            this.validator.showMessages();
        }
    };

    render() {
        return (
            <Fragment>
                <div className="wrapper register-page">
                    <div className="register-panel">
                        <div className="register-block">
                            <div className="card">
                                <span className="login-icon"><span><img src={require('../../images/login-icon.svg')} alt="" /></span></span>
                                <h2>Welcome, Provider!</h2>
                                <form>
                                    <div className="container-fluid user-info">
                                        <div className="row">
                                            <div className="col-md-6 ">
                                                <div className="form-group">
                                                    <input type="text" className="form-control" id="first_name" ref="first_name" value={this.state.mainState.first_name} placeholder="First Name" onChange={this.handleInputChange} error_msg="First Name" />
                                                    <span className="errorfont">{this.validator.message('first_name', this.state.mainState.first_name, 'required')}</span>
                                                </div>
                                            </div>
                                            <div className="col-md-6 ">
                                                <div className="form-group">
                                                    <input type="text" className="form-control" id="last_name" ref="last_name" value={this.state.mainState.last_name} placeholder="Last Name" onChange={this.handleInputChange} error_msg="Last Name" />
                                                    <span className="errorfont">{this.validator.message('last_name', this.state.mainState.last_name, 'required')}</span>
                                                </div>
                                            </div>
                                            <div className="col-md-6 ">
                                                <div className="form-group">

                                                    <input type="text" className="form-control" id="email" ref="email" value={this.state.mainState.email} placeholder="Email" onChange={this.handleInputChange} error_msg="Email" />
                                                    <span className="errorfont">{this.validator.message('email', this.state.mainState.email, 'required|email')}</span>
                                                </div>
                                            </div>
                                            <div className="col-md-6 ">
                                                <div className="form-group">
                                                    <input type="phone" className="form-control" additional_validation="mobile_number" id="mobile_number" ref="mobile_number" placeholder="Mobile No" value={this.state.mainState.mobile_number} onChange={this.handleInputChange} error_msg="Mobile Number" />
                                                    <span className="errorfont">{this.validator.message('mobile_number', this.state.mainState.mobile_number, 'required|phone')}</span>
                                                </div>
                                            </div>
                                            <div className="col-md-6 ">
                                                <div className="form-group">
                                                    <select className="form-control" id="education_id" ref="education_id" value={this.state.mainState.education_id} placeholder="Education" onChange={this.handleInputChange}>
                                                        <option>Select</option>
                                                        {this.state.educationData !== null ? this.state.educationData.map(key => (
                                                            <option value={key.education_Id} key={key.education_Id}>{key.education_Name}</option>
                                                        )) : null}
                                                    </select>
                                                    <span className="errorfont">{this.validator.message('education_id', this.state.mainState.education_id, 'required')}</span>
                                                </div>
                                            </div>
                                            <div className="col-md-6 ">
                                                <div className="form-group">
                                                    <input type="text" className="form-control" id="salary" ref="salary" additional_validation="salary" placeholder="Salary" maxLength="6" value={this.state.mainState.salary} onChange={this.handleInputChange} error_msg="Salary" />
                                                    <span className="errorfont">{this.validator.message('salary', this.state.mainState.salary, 'required|numeric')}</span>
                                                </div>
                                            </div>
                                            <div className="col-md-6 ">
                                                <div className="form-group">
                                                    <DatePicker
                                                    className="form-control"
                                                        onChange={this.handleDatepickerChange}
                                                        selected={this.state.mainState.birth_date }
                                                        minDate={new Date('1960/01/01')}
                                                        maxDate={new Date('2000/12/31')}
                                                        showMonthDropdown
                                                        showYearDropdown
                                                        dropdownMode="select"                                                       
                                                         dateFormat="dd/MM/yyyy"
                                                        placeholderText="Birth Date"
                                                    />                                                    
                                                </div>
                                            </div>
                                            <div className="col-md-6 ">
                                                <div className="form-group">
                                                    <div className="custom-control custom-switch">
                                                        <input type="checkbox" className="custom-control-input" id="is_married" ref="is_married" value={this.state.mainState.is_married} onClick={this.handleInputChange} />
                                                        <label className="custom-control-label" htmlFor="is_married">Married</label>
                                                    </div>

                                                </div>
                                            </div>
                                            <div className=" col-md-12">
                                                <div className="custom-control custom-checkbox">
                                                    <input type="checkbox" name="terms" id="terms" ref="terms" value={this.state.termCondition} className="custom-control-input" onClick={this.handleInputChange} />
                                                    <label className="custom-control-label" htmlFor="terms">I Accept terms and conditions</label>
                                                    <span className="errorfont">{this.validator.message('terms', this.state.termCondition, 'accepted')}</span>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="mt-3 text-right">
                                            <button className="btn btn-primary mr-2 mb-0" value="Sign up" onClick={this.handleOnSubmit} ><span>Sign up</span></button>
                                            <button className="btn btn-primary mb-0" value="Cancel" onClick={() => this.handleCancel()} ><span>Cancel</span></button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <MessagePopup show={this.state.popupState.isshow} title={this.state.popupState.title} message={this.state.popupState.message} popupClose={() => this.handleModelHide(this.state.popupState.redirect)} />
                </div>
            </Fragment>
        )
    }
}


