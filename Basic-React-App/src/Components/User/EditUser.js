import React, { Component, Fragment } from 'react'
import SimpleReactValidator from 'simple-react-validator';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { userService } from '../../Services';
import { MessagePopup } from '../Popup';
import { ChangePassword } from '../User';

export default class Registration extends Component {

    constructor(props) {
        super(props);

        this.state = {
            mainState: {
                userId: this.props.match.params.userId,
                first_name: "",
                last_name: "",
                email: "",
                mobile_number: "",
                role_Id: "",
                education_id: "",
                salary: "",
                is_active: false,
                birth_date: null,
                is_married: false,
                address: "",
                blog: "",
                document: "",
                document_name: ""
            },
            otherState: {
                fileName: "No file selected",
                isDeleteShow: false,
                educationData: null,
                userRoleData: null,
                showLoader: true,
            }, popupState: {
                title: "",
                redirect: false,
                message: "",
                isshow: false,

            }
        }
        this.validator = new SimpleReactValidator({ autoForceUpdate: this });
        // this.handleModelHide = this.handleModelHide.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDatepickerChange = this.handleDatepickerChange.bind(this);
        this.handleSunEditorChange = this.handleSunEditorChange.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);

    }

    componentWillMount = async () => {
        let educationList = await userService.educationList();
        let userRoleList = await userService.userRoleList();
        let user = await userService.getUserById(this.state.mainState.userId);
        if (user !== undefined) {
            await this.setState({
                mainState: {
                    userId: user.userId,
                    is_active: user.is_Active,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    mobile_number: user.mobile_number,
                    education_id: user.education_Id,
                    role_Id: user.role_Id,
                    salary: user.salary,
                    is_married: user.is_Married,
                    address: user.address,
                    document: user.document,
                    document_name: user.document_Name,
                    blog: user.blog,
                    birth_date: new Date(user.birth_Date)
                },
                otherState: {
                    showLoader: false,
                    educationData: educationList,
                    userRoleData: userRoleList,
                    fileName: (user.document_Name === null || user.document_Name === '') ? "No file selected" : user.document_Name,
                    isDeleteShow: (user.document_Name === null || user.document_Name === '') ? false : true
                }
            })
        }
    }

    uploadFile = (event) => {
        this.setState({
            otherState: {
                ...this.state.otherState,
                fileName: event.target.files[0].name,
                isDeleteShow: true
            }
        });
    }

    removeUpload = (event) => {
        event.preventDefault()
        this.setState({
            mainState: {
                ...this.state.mainState,
                document: null,
                document_name: null
            },
            otherState: {
                ...this.state.otherState,
                fileName: "No file selected",
                isDeleteShow: false
            }
        });
    }
    dowloadDocument = (event) => {
        event.preventDefault()
        this.setState({
            mainState: {
                ...this.state.mainState,
                document: null,
                document_name: null
            },
            otherState: {
                ...this.state.otherState,
                fileName: "No file selected",
                isDeleteShow: false
            }
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

    handleSunEditorChange = (content) => {
        this.setState({
            mainState: {
                ...this.state.mainState,
                blog: content
            }
        });
    }

    handleInputChange = event => {
        if (event.target.id === "document") {
            var savedTarget = event.target;
            const reader = new FileReader();
            reader.onload = () => {
                this.setState({
                    mainState: {
                        ...this.state.mainState,
                        [savedTarget.id]: reader.result,
                        document_name: savedTarget.files[0].name
                    },
                    otherState: {
                        ...this.state.otherState,
                        fileName: savedTarget.files[0].name,
                        isDeleteShow: true
                    }
                });
            }
            reader.readAsDataURL(savedTarget.files[0]);
        }
        else {
            this.setState({
                mainState: {
                    ...this.state.mainState,
                    [event.target.id]: (event.target.id === "is_married" || event.target.id === "is_active") ? event.target.checked : event.target.value
                }
            });
        }
    }

    handleOnSubmit = event => {
        event.preventDefault();
        if (this.validator.allValid()) {
            this.setState({
                otherState: {
                    ...this.state.otherState,
                    showLoader: true
                }
            })
            userService.updateUserDetail(this.state.mainState).then(result => {
                this.setState({
                    otherState: {
                        ...this.state.otherState,
                        showLoader: false
                    },
                    popupState: {
                        isActionPopup: true,
                        message: (result > 0) ? "User Details saved successfully." : "Something went wrong. Please try again later.",
                        title: (result > 0) ? "Success" : "Error",
                        isshow: true
                    }
                })
            })
        }
        else { this.validator.showMessages(); }
    }

    openChangePasswordPopup = (e) => {
        e.preventDefault();
        this.setState({
            popupState: {
                isEditShow: true
            }
        })
    }

    handleModelSave = (result) => {   
        this.setState({
            popupState: {
                isEditShow: false,
                message: (result===200) ? "Password changed successfully." : ((result===201)? "You have enter wrong old password.":"Somthing went wrong please try again later."),
                title: (result===200) ? "Success" : "Error",
                msgPopupShow: true
            }
        })
    }

    handleModelHide = () => {
        this.setState({
            popupState: {
                isEditShow: false,
                message: "",
                title: "",
                msgPopupShow: false
            }
        })
    }

    hideMessagePopup = () => {
        this.setState({
            popupState: {
                isEditShow: false,
                message: "",
                title: "",
                msgPopupShow: false
            }
        })       
    }

    render() {

        let deleteStyle = {
            display: this.state.otherState.isDeleteShow ? "inline-block" : "none"
        }
        return (
            <Fragment>                
                <main className="main-content">
                    <div className="container-fluid">
                        <div className="titlebtn">
                            <div className="title">
                                <h1>Manage Users</h1>
                            </div>
                        </div>
                    </div>
                    <div className="formContainer">
                        <form>
                            <div className="container-fluid user-info">
                                <div className="row ">
                                    <div className="col-md-4 ">
                                        <div className="form-group">
                                            <input type="text" className="form-control" id="first_name" ref="first_name" value={this.state.mainState.first_name} placeholder="First Name" onChange={this.handleInputChange} error_msg="First Name" />
                                            <span className="errorfont">{this.validator.message('first_name', this.state.mainState.first_name, 'required')}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-4 ">
                                        <div className="form-group">
                                            <input type="text" className="form-control" id="last_name" ref="last_name" value={this.state.mainState.last_name} placeholder="Last Name" onChange={this.handleInputChange} error_msg="Last Name" />
                                            <span className="errorfont">{this.validator.message('last_name', this.state.mainState.last_name, 'required')}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-4 ">
                                        <div className="form-group">
                                            <input type="text" className="form-control" id="email" ref="email" value={this.state.mainState.email} placeholder="Email" error_msg="Email" disabled />
                                            <span className="errorfont">{this.validator.message('email', this.state.mainState.email, 'required|email')}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-4 ">
                                        <div className="form-group">
                                            <input type="phone" className="form-control" additional_validation="mobile_number" id="mobile_number" ref="mobile_number" placeholder="Mobile No" value={this.state.mainState.mobile_number} onChange={this.handleInputChange} error_msg="Mobile Number" />
                                            <span className="errorfont">{this.validator.message('mobile_number', this.state.mainState.mobile_number, 'required|phone')}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-4 ">
                                        <div className="form-group">
                                            <select className="form-control" id="education_id" ref="education_id" value={this.state.mainState.education_id} placeholder="Education" onChange={this.handleInputChange}>
                                                <option>Select</option>
                                                {this.state.otherState.educationData !== null ? this.state.otherState.educationData.map(key => (
                                                    <option value={key.education_Id} key={key.education_Id}>{key.education_Name}</option>
                                                )) : null}
                                            </select>
                                            <span className="errorfont">{this.validator.message('education_id', this.state.mainState.education_id, 'required')}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-4 ">
                                        <div className="form-group">
                                            <select className="form-control" id="role_Id" ref="role_Id" value={this.state.mainState.role_Id} placeholder="User Role" onChange={this.handleInputChange}>
                                                {this.state.otherState.userRoleData !== null ? this.state.otherState.userRoleData.map(key => (
                                                    <option value={key.role_Id} key={key.role_Id}>{key.role_Name}</option>
                                                )) : null}
                                            </select>
                                            <span className="errorfont">{this.validator.message('role_Id', this.state.mainState.role_Id, 'required')}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-4 ">
                                        <div className="form-group">
                                            <input type="text" className="form-control" id="salary" ref="salary" additional_validation="salary" placeholder="Salary" value={this.state.mainState.salary} onChange={this.handleInputChange} error_msg="Salary" />
                                            <span className="errorfont">{this.validator.message('salary', this.state.mainState.salary, 'required|numeric')}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-4 ">
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
                                                        dateFormat="yyyy/MM/dd"
                                                        placeholderText="Birth Date"
                                                    />      
                                            {/* <DatePickerInput
                                                onChange={this.handleDatepickerChange}
                                                value={this.state.mainState.birth_date}
                                                displayFormat='YYYY-MM-DD'
                                                ref="birth_date"
                                                id="birth_date" placeholder="Birth Date" readOnly /> */}
                                        </div>
                                    </div>
                                    <div className="col-md-4 ">
                                        <div className="form-group">
                                            <div className="custom-control custom-switch">
                                                <input type="checkbox" className="custom-control-input" id="is_married" ref="is_married" value={this.state.mainState.is_married} onClick={this.handleInputChange} />
                                                <label className="custom-control-label" htmlFor="is_married">Married</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="form-group cus-file-select">
                                            <div className="file-select-button" id="fileName">CHOOSE FILE</div>
                                            <div className="file-select-name" ref="noFile">{this.state.otherState.fileName}</div>
                                            <div className="file-select-delete" style={deleteStyle}>
                                                <button className="fileiconbtn" style={deleteStyle} onClick={(event) => this.removeUpload(event)}><img src={require('../../images/close-icon.svg')} alt="Remove" /></button>
                                                <a className="fileiconbtn" href={this.state.mainState.document} download={this.state.mainState.document_name} style={deleteStyle} ><img src={require('../../images/install-icon.svg')} alt="Download" /></a>
                                            </div>
                                            <input type="file" name="1" id="document" ref="document" onChange={this.handleInputChange} />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <div className="custom-control custom-switch">
                                                <input type="checkbox" className="custom-control-input" id="is_active" ref="is_active" value={this.state.mainState.is_active} onClick={this.handleInputChange} defaultChecked={this.state.mainState.is_active} />
                                                <label className="custom-control-label" htmlFor="is_active">Active</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <textarea className="form-control" rows="5" id="address" ref="address" value={this.state.mainState.address} onChange={this.handleInputChange} style={{ height: '251px', resize: 'none' }} placeholder="Address"></textarea>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <SunEditor setContents={this.state.mainState.blog} setOptions={{ "placeholder": "Blog" }} onChange={this.handleSunEditorChange} />
                                        </div>
                                    </div>

                                </div>
                                <div className="mt-3 text-right">
                                    <button className="btn btn-primary mr-2 mb-0" value="Change Password" onClick={this.openChangePasswordPopup}><span>Change Password</span></button>
                                    <button className="btn btn-primary mr-2 mb-0" value="Save" onClick={this.handleOnSubmit}><span>Save</span></button>
                                    <button className="btn btn-secondary mb-0" value="Cancel" onClick={() => this.props.history.push('/manageuser/', null)}><span>Cancel</span></button>
                                </div>
                            </div>
                        </form>
                    </div>
                </main>
                <div>
                    {this.state.popupState.isEditShow &&
                        <ChangePassword show={this.state.popupState.isEditShow} userId={this.state.mainState.userId} popupClose={this.handleModelHide} popupSave={this.handleModelSave} />
                    }
                    {
                        this.state.popupState.msgPopupShow &&
                        <MessagePopup show={this.state.popupState.msgPopupShow} title={this.state.popupState.title} message={this.state.popupState.message} popupClose={() => this.hideMessagePopup()} />
                    }
                </div>

            </Fragment>
        )
    }
}

