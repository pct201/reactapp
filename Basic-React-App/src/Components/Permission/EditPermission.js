import React from 'react';
import { Modal } from 'react-bootstrap';
import { permissionService } from '../../Services';
import SimpleReactValidator from 'simple-react-validator';

var selectedRole;
class EditPermission extends React.Component {
    constructor(props) {
        super(props);
        selectedRole=[];
        this.state = {
            mainState: {
                permission_uid: this.props.permissionUid,
                permission_code: "",
                permission_name: "",
                permission_description: "",
                page_name: "",
                assign_role_list: ""
            },
            otherState: {
                role_List: null
            }
        };

        this.validator = new SimpleReactValidator({ autoForceUpdate: this });

    }

    getPermissionDetail = async () => {
        let permissionDetail = await permissionService.getPermissionDetailById(this.state.mainState.permission_uid);
        if (permissionDetail !== undefined) {
            await this.setState({
                mainState: {
                    permission_uid: permissionDetail.permission_uid,
                    permission_code: permissionDetail.permission_code,
                    permission_name: permissionDetail.permission_name,
                    permission_description: permissionDetail.permission_description,
                    page_name: permissionDetail.page_name,

                },
                otherState: {
                    assign_role_list: JSON.parse(permissionDetail.assign_role_list),
                    role_List: permissionDetail.role_List                 
                }
            })

            permissionDetail.assign_role_list !== null &&JSON.parse(permissionDetail.assign_role_list).map(result => (
                (result!== undefined && result !== null && result !== '') &&
                selectedRole.push(result.role_id.toString())
            ))

        }
    }

    handleInputChange = event => {
        if (event.currentTarget.attributes.type.value === "checkbox") {
            if (event.target.checked) {
                selectedRole.push(event.target.value);
            }
            else {
                var index = selectedRole.indexOf(event.target.value);
                if (index > -1) {
                    selectedRole.splice(index, 1);
                }
            }
        }
        else {          
            this.setState({
                mainState: {
                    ...this.state.mainState,
                    [event.target.id]: event.target.value
                }
            });
        }      
    }
    
    componentWillMount = async () => this.getPermissionDetail();


    updatePermission = (e) => {
        e.preventDefault();
        if (this.validator.allValid()) {
            permissionService.updatePermissionDetail(this.state.mainState, selectedRole).then(result => {               
                this.props.popupSave(result);
            })
        }
        else { this.validator.showMessages(); }
    }


    render() {
        return (

            <Modal show={this.props.show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered="true" onHide={this.props.popupClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Permission</Modal.Title>
                </Modal.Header>

                <div className="formContainer">
                    <div className="container-fluid user-info">
                        <Modal.Body>                            
                            <div className="row">

                                <div className="col-md-6 ">
                                    <div className="form-group">
                                        <input type="text" className="form-control" id="permission_code" value={this.state.mainState.permission_code} placeholder="Permission Code" readOnly />
                                    </div>
                                </div>
                                <div className="col-md-6 ">
                                    <div className="form-group">
                                        <input type="text" className="form-control" id="permission_name" value={this.state.mainState.permission_name} placeholder="Permission Name" onChange={this.handleInputChange} />
                                        <span className="errorfont">{this.validator.message('permission_name', this.state.mainState.permission_name, 'required')}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 ">
                                    <div className="form-group">
                                        <input type="" className="form-control" id="page_name" value={this.state.mainState.page_name} placeholder="Page Name" onChange={this.handleInputChange} />
                                        <span className="errorfont">{this.validator.message('page_name', this.state.mainState.page_name, 'required')}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 ">
                                    <div className="form-group">
                                        <textarea type="text" rows="2" className="form-control" id="permission_description" value={this.state.mainState.permission_description} placeholder="Description" style={{ resize: 'none' }} onChange={this.handleInputChange} />
                                        <span className="errorfont">{this.validator.message('permission_description', this.state.mainState.permission_description, 'required')}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className=" col-md-12">
                                    {this.state.otherState.role_List !== null ? this.state.otherState.role_List.map(key => {
                                        return (
                                            <div className="custom-control custom-checkbox custom-control-inline" key={key.role_Id}>
                                                <input type="checkbox" id={"chk-" + key.role_Id} value={key.role_Id} className="custom-control-input" onClick={this.handleInputChange} defaultChecked={(this.state.otherState.assign_role_list!== null && this.state.otherState.assign_role_list.filter((result) => { return result.role_id === key.role_Id }).length) > 0 ? true : false} />
                                                <label className="custom-control-label" htmlFor={"chk-" + key.role_Id}>{key.role_Name}</label>
                                            </div>
                                        )
                                    }) : ""}
                                </div>
                            </div>

                        </Modal.Body>
                        <Modal.Footer>
                            <div className="text-right w-100">
                                <button className="btn btn-primary" value="Save" onClick={(event) => this.updatePermission(event)} ><span>Save</span></button>
                                <button className="btn btn-secondary" value="Cancel" onClick={this.props.popupClose}><span>Cancel</span></button>
                            </div>

                        </Modal.Footer>
                    </div>
                </div>

            </Modal>)
    }
}

export default EditPermission;