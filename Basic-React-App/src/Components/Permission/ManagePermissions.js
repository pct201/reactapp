import React, { Fragment } from 'react';
import { permissionService } from '../../Services';
import DataTable from 'react-data-table-component';
import { EditPermission } from '../Permission'
import { Loader } from '../Common';
import { MessagePopup } from '../Popup';


var columns = [];
var canEdit = false;
export default class ManagePermissions extends React.Component {

    constructor(props) {
        super(props);

        if (localStorage.getItem('user')) {
            let permissionList = JSON.parse(JSON.parse(localStorage.getItem('user')).permissions);
            canEdit = permissionList.includes("EditPermission");
        }

         columns = [   
            {
                selector: "permission_code",
                name: "Permission Code",
                sortable: true
            },
            {
                selector: "permission_name",
                name: "Permission Name"      
            },
            {
                selector: "permission_description",
                name: "Description",       
                grow: 3
            }, 
            {
                selector: "page_name",
                name: "Page Name",
                sortable: true,
               
            },           
            {  
                cell: row => { return  <button type="button" className="btn btn-primary btn-sm" onClick={() => { this.editPermission(row.permission_uid) }}><span>View</span></button> },
                ignoreRowClick: true,
                allowOverflow: true,
                button: true
            }];

       

        this.state = {
            permissionUid: "",
            rows: [],
            loading: false,
            totalRows: 0,
            page: 1,
            perPage: process.env.REACT_APP_ROW_PER_Page,
            sortDirection: process.env.REACT_APP_DEFAULT_SORT_DIRECTION,
            sortBy: 'permission_code',
            popupState: {
                isEditShow: false,
                msgPopupShow: false,
                title: "",
                message: "",
            }
        };
        this.getAllPermissions = this.getAllPermissions.bind(this);
        this.handleModelHide = this.handleModelHide.bind(this);
        this.handleModelSave = this.handleModelSave.bind(this);

    }

    getAllPermissions = async () => {
        await this.setState({ ...this.state, loading: true });
        await permissionService.getAllPermissionList(this.state.page, this.state.perPage, this.state.sortDirection, this.state.sortBy).then(result => {
            this.setState({
                ...this.state,
                rows: result,
                totalRows: (result.length > 0) ? result[0].total_records : 0,
                loading: false,
            })
        })
    }

    handlePageChange = async (page) => {
        await this.setState({ ...this.state, page: page });
        await this.getAllPermissions();
    }

    handlePerRowsChange = async (perPage, page) => {
        await this.setState({ ...this.state, page: page, perPage: perPage })
        await this.getAllPermissions();
    }

    handleSort = async (column, sortDirection) => {
        await this.setState({ ...this.state, sortBy: column.selector, sortDirection: sortDirection });
        await this.getAllPermissions();
    };

    editPermission = (permissionUid) => {   
       
        // if (canEdit) {            
            this.setState({
                ...this.state,
                permissionUid: permissionUid,
                popupState: {
                    isEditShow: true
                }
            })
        // }
    }

    handleModelSave = (result) => {      
        this.setState({
            popupState: {
                isEditShow: false,
                message: (result) ? "Permission detail updated successfully." : "Somthing went wrong please try again later.",
                title: (result) ? "Success" : "Error",
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

    hideMessagePopup = async () => {
        await this.setState({
            popupState: {
                isEditShow: false,
                message: "",
                title: "",
                msgPopupShow: false
            }
        })
        await this.getAllPermissions();
    }

    componentWillMount = () => this.getAllPermissions();

    render() {       
        return (
            <Fragment>
                <main className="main-content">
                    <div className="container-fluid">
                        <div className="titlebtn">
                            <div className="title">
                                <h1>Manage Permissions</h1>
                            </div>
                        </div>
                        <div className="table-responsive grid-table">
                            <DataTable
                                noHeader
                                keyField={'permission_uid'}
                                pointerOnHover
                                columns={columns}
                                data={this.state.rows}
                                defaultSortField="permission_code"
                                highlightOnHover
                                progressPending={this.state.loading}
                                progressComponent={<Loader show={this.state.loading} />}
                                onSort={this.handleSort}
                                noContextMenu                               
                                sortServer
                                pagination
                                paginationServer
                                paginationTotalRows={this.state.totalRows}
                                onChangeRowsPerPage={this.handlePerRowsChange}
                                onChangePage={this.handlePageChange}
                            />
                        </div>

                    </div>
                </main>
                <div>
                    {this.state.popupState.isEditShow &&                    
                        <EditPermission show={this.state.popupState.isEditShow} permissionUid={this.state.permissionUid} popupClose={this.handleModelHide} popupSave={this.handleModelSave} />
                    }
                    {
                        this.state.popupState.msgPopupShow &&
                        <MessagePopup show={this.state.popupState.msgPopupShow} title={this.state.popupState.title} message={this.state.popupState.message} popupClose={() => this.hideMessagePopup()} />
                    }
                </div>
            </Fragment>
        );
    }
}
