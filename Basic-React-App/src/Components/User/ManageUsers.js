import React, { Fragment } from 'react';
import { userService } from '../../Services';
import DataTable from 'react-data-table-component';
import { MessagePopup, ActionPopup } from '../Popup';
import { Loader } from '../Common';


const columns = [
    {
        selector: "first_name",
        name: "First Name",
        sortable: true
    },
    {
        selector: "last_name",
        name: "Last Name",
        sortable: true

    },
    {
        selector: "email",
        name: "Email Address",
        sortable: true
    },
    {
        selector: "mobile_number",
        name: "Contact Number",
        sortable: true
    },
    {
        selector: "education_Name",
        name: "Education",
        sortable: true
    },
    {
        selector: "salary",
        name: "Salary",
        sortable: true
    },
    {
        selector: "birth_Date",
        name: "Birth Date",
        sortable: true,
        cell: row => {
            var dt = new Date(row.birth_Date);
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
            ];
            return (dt.getDate() + "-" + (monthNames[dt.getMonth()]) + "-" + dt.getFullYear());
        }
    },
    {
        selector: "is_Married",
        name: "Married",
        sortable: true,
        cell: row => <span>{row.is_Married ? "Yes" : "No"}</span>,
    },
    {
        selector: "address",
        name: "Address"
    },
    {
        selector: "updated_date",
        name: "Updated On",
        sortable: true,
        cell: row => {
            var dt = new Date(row.updated_date);
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
            ];
            return (dt.getDate() + "-" + (monthNames[dt.getMonth()]) + "-" + dt.getFullYear());
        }
    }];

var selectedUserId = [];
var canDelete = false;
var canEdit= false;
export default class ManageUsers extends React.Component {

    constructor(props) {
        super(props);
        if (localStorage.getItem('user')) {
            let permissionList = JSON.parse(JSON.parse(localStorage.getItem('user')).permissions);
            canDelete = permissionList.includes("DeleteUser");
            canEdit = permissionList.includes("EditUser");
        }

        selectedUserId = [];

        this.state = {
            selected: [],
            rows: [],
            loading: false,
            totalRows: 0,
            page: 1,
            perPage: process.env.REACT_APP_ROW_PER_Page,
            sortDirection: process.env.REACT_APP_DEFAULT_SORT_DIRECTION,
            sortBy: 'first_name',
            popupState: {
                isActionPopup: false,
                message: "",
                title: "",
                isshow: false
            }
        };
        this.getAllUserDetail = this.getAllUserDetail.bind(this);
        this.deleteConfirmation = this.deleteConfirmation.bind(this);
        this.handleModelHide = this.handleModelHide.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }

    getAllUserDetail = async () => {
        await this.setState({ ...this.state, loading: true });
        await userService.getAllUser(this.state.page, this.state.perPage, this.state.sortDirection, this.state.sortBy).then(result => {
            if (result !== undefined) {
                this.setState({
                    ...this.state,
                    rows: result,
                    totalRows: (result.length > 0) ? result[0].total_records : 0,
                    loading: false,
                })
            }
        })
    }

    handlePageChange = async (page) => {
        await this.setState({ ...this.state, page: page });
        await this.getAllUserDetail();
    }

    handlePerRowsChange = async (perPage, page) => {
        await this.setState({ ...this.state, page: page, perPage: perPage })
        await this.getAllUserDetail();
    }

    handleSort = async (column, sortDirection) => {
        await this.setState({ ...this.state, sortBy: column.selector, sortDirection: sortDirection });
        await this.getAllUserDetail();
    };

    handleRowSelected = (rows) => {
        selectedUserId = [];//need to flush every time
        rows.selectedRows.map((row) =>
            selectedUserId.push(row.userId)
        )
    }

    editUser = (row) => {
        if(canEdit)
        this.props.history.push(`/edituser/${row.userId}`, null)
    }

    handleModelHide = () => {
        this.setState({
            popupState: {
                isActionPopup: false,
                message: null,
                title: null,
                isshow: false
            }
        })
    }

    deleteConfirmation = (event) => {
        event.preventDefault();
        if (selectedUserId.length <= 0) {
            this.setState({
                popupState: {
                    isActionPopup: false,
                    message: "Please select at least one record to delete",
                    title: "Error",
                    isshow: true
                }
            })

        } else {
            this.setState({
                popupState: {
                    isActionPopup: true,
                    message: "Do you want to proceed deleting the selected user?",
                    title: "Warning",
                    isshow: true
                }
            })
        }
    }
    deleteUser = (selectedUserId) => {
        this.handleModelHide()
        userService.deleteUser(selectedUserId.toString()).then(result => {
            this.setState({
                popupState: {
                    isActionPopup: false,
                    message: (result) ? "Selected user deleted Successfully." : "Somthing went wrong please try again later.",
                    title: (result) ? "Success" : "Error",
                    isshow: true
                }
            })
            this.getAllUserDetail()
        })
    }
    componentWillMount = () => this.getAllUserDetail();
    render() {       
        return (
            <Fragment>
                <main className="main-content">
                    <div className="container-fluid">
                        <div className="titlebtn">
                            <div className="title">
                                <h1>Manage Users</h1>
                            </div>
                            <div className="text-right">
                                {canDelete &&
                                    <button className="btn btn-primary mr-2" onClick={this.deleteConfirmation}><span>Delete</span></button>}
                            </div>
                        </div>
                        <div className="table-responsive grid-table">
                            <DataTable
                                noHeader
                                keyField={'userId'}
                                pointerOnHover
                                columns={columns}
                                data={this.state.rows}
                                defaultSortField="first_name"
                                highlightOnHover
                                progressPending={this.state.loading}
                                progressComponent={<Loader show={this.state.loading} />}
                                onSort={this.handleSort}
                                selectableRows={canDelete}
                                selectableRowsHighlight
                                noContextMenu
                                onSelectedRowsChange={this.handleRowSelected}
                                onRowClicked={this.editUser}
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
                    {this.state.popupState.isActionPopup ?
                        <ActionPopup show={this.state.popupState.isshow} title={this.state.popupState.title} message={this.state.popupState.message} popupClose={() => this.handleModelHide()} popupAction={() => this.deleteUser(selectedUserId)} />
                        : <MessagePopup show={this.state.popupState.isshow} title={this.state.popupState.title} message={this.state.popupState.message} popupClose={() => this.handleModelHide()} />
                    }
                </div>
            </Fragment>
        );
    }
}
