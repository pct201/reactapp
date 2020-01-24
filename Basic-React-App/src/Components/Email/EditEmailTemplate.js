import React from 'react';
import { Modal } from 'react-bootstrap';
import { emailService } from '../../Services';
import SimpleReactValidator from 'simple-react-validator';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import Loader from '../Common/Loader';
import PopOver from '../Common/PopOver';

class EditEmailTemplate extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mainState: {
                bcc_list: "",
                body_text: "",
                cc_list: "",
                from_address: "",
                to_address: "",
                email_name: "",
                email_uid: this.props.emailUid,
                friendly_email_name: "",
                subject_text: "",
            },
            otherState: {
                showLoader: false
            }
        };

        this.validator = new SimpleReactValidator({ autoForceUpdate: this });
        this.handleSunEditorChange = this.handleSunEditorChange.bind(this);
    }

    getEmailTemplateDetail = async () => {
        let placeholderList = await emailService.getPlaceholderList().then(result => {
            if (result != null) {
                let placeholderTable = "<table class='custom-table' ><tr><th> Placeholder Name</th><th>Placeholder Tag</th></tr>"
                result.map(placeholder => {
                    placeholderTable += `<tr><td>${placeholder.placeholder_name}</td><td>${placeholder.placeholder_tag}</td></tr>`;
                })
                placeholderTable += "</table>"
                return placeholderTable;
            }
            else return "";
        });
      
        let emailDetail = await emailService.getEmailTemplateById(this.state.mainState.email_uid);
        await this.setState({
            mainState: {
                bcc_list: emailDetail.bcc_list,
                body_text: emailDetail.body_text,
                cc_list: emailDetail.cc_list,
                from_address: emailDetail.from_address,
                to_address: emailDetail.to_address,
                email_name: emailDetail.email_name,
                email_uid: emailDetail.email_uid,
                friendly_email_name: emailDetail.friendly_email_name,
                subject_text: emailDetail.subject_text,
            },
            otherState: {
                placeholderList: placeholderList,
                showLoader: false
            }
        })
    }

    handleSunEditorChange = (content) => {
        this.setState({
            mainState: {
                ...this.state.mainState,
                body_text: content
            }
        });
    }

    handleInputChange = event => {
        this.setState({
            mainState: {
                ...this.state.mainState,
                [event.target.id]: event.target.value
            }
        });
    }
    componentWillMount = async () => this.getEmailTemplateDetail();


    updateTemplate = (e) => {
        e.preventDefault();
        if (this.validator.allValid()) {

            this.setState({
                otherState: {
                    ...this.state.otherState,
                    showLoader: true
                }
            })

            emailService.updateEmailTemplate(this.state.mainState).then(result => {
                this.setState({
                    otherState: {
                        ...this.state.otherState,
                        showLoader: false
                    }

                })
                this.props.popupSave(result);
            })
        }
        else { this.validator.showMessages(); }
    }


    render() {
        return (

            <Modal show={this.props.show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered="true" onHide={this.props.popupClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Email Template</Modal.Title>
                </Modal.Header>
               
                    <div className="formContainer">
                        <div className="container-fluid user-info">
                        <Modal.Body>
                    <Loader show={this.state.otherState.showLoader} />
                            <div className="row">
                           
                                <div className="col-md-6 ">
                                    <div className="form-group">
                                        <input type="text" className="form-control" id="email_name" value={this.state.mainState.email_name} placeholder="Email Name" onChange={this.handleInputChange} />
                                        <span className="errorfont">{this.validator.message('email_name', this.state.mainState.email_name, 'required')}</span>
                                    </div>
                                </div>
                                <div className="col-md-6 ">
                                    <div className="form-group">
                                        <input type="text" className="form-control" id="friendly_email_name" value={this.state.mainState.friendly_email_name} placeholder="Friendly Name" onChange={this.handleInputChange} />
                                        <span className="errorfont">{this.validator.message('friendly_email_name', this.state.mainState.friendly_email_name, 'required')}</span>
                                    </div>
                                </div>
                                <div className="col-md-6 ">
                                    <div className="form-group">
                                        <input type="text" className="form-control" id="from_address" value={this.state.mainState.from_address} placeholder="From" onChange={this.handleInputChange} />
                                        <span className="errorfont">{this.validator.message('from_address', this.state.mainState.from_address, 'required')}</span>
                                    </div>
                                </div>
                                <div className="col-md-6 ">
                                    <div className="form-group">
                                        <input type="text" className="form-control" id="to_address" value={this.state.mainState.to_address} placeholder="To" onChange={this.handleInputChange} />
                                        <span className="errorfont">{this.validator.message('to_address', this.state.mainState.to_address, 'required')}</span>
                                    </div>
                                </div>
                                <div className="col-md-6 ">
                                    <div className="form-group">
                                        <input type="text" className="form-control" id="cc_list" value={this.state.mainState.cc_list} placeholder="CC List" onChange={this.handleInputChange} />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input type="text" className="form-control" id="bcc_list" value={this.state.mainState.bcc_list} placeholder="BCC List" onChange={this.handleInputChange} />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <input type="text" className="form-control" id="subject_text" placeholder="Subject" value={this.state.mainState.subject_text} onChange={this.handleInputChange} />
                                        <span className="errorfont">{this.validator.message('subject_text', this.state.mainState.subject_text, 'required')}</span>
                                    </div>
                                </div>
                                <div className="col-md-12 ">
                                    <SunEditor setContents={this.state.mainState.body_text} setOptions={{ "placeholder": "Email Body" }} onChange={this.handleSunEditorChange} />
                                </div>
                            </div>
                        
                        </Modal.Body>
                        <Modal.Footer>
                    <div className="text-right w-100">
                        <div className="placeholderdiv"><PopOver title="Place Holder List" message={this.state.otherState.placeholderList} buttonText="Place Holder List"  customClass="placeholder-container"/></div>
                        <button className="btn btn-primary" value="Save" onClick={(event) => this.updateTemplate(event)} ><span>Save</span></button>
                        <button className="btn btn-secondary" value="Cancel" onClick={this.props.popupClose}><span>Cancel</span></button>
                    </div>

                </Modal.Footer>
                    </div>
                    </div>
               
            </Modal>)
    }
}

export default EditEmailTemplate;