import React, { Fragment } from 'react';
import { emailService } from '../../Services';
import DataTable from 'react-data-table-component';
import { EditEmailTemplate } from '../Email'
import { MessagePopup } from '../Popup';

const columns = [
    {
        selector: "email_name",
        name: "Email Name",
        sortable: true
    },
    {
        selector: "friendly_email_name",
        name: "Friendly Name",
        sortable: true
    },
    {
        selector: "to_address",
        name: "To",
        sortable: true
    },
    // {
    //     selector: "cc_list",
    //     name: "CC",
    //     sortable: true
    // }, 
    // {
    //     selector: "bcc_list",
    //     name: "BCC",
    //     sortable: true
    // }, 
    {
        selector: "subject_text",
        name: "Subject",
        sortable: true,
        grow: 3,
    },
    {
        selector: "language_code",
        name: "Language"
    }];

var canEdit = false;
export default class ManageEmailTemplate extends React.Component {

    constructor(props) {
        super(props);

        if (localStorage.getItem('user')) {
            let permissionList = JSON.parse(JSON.parse(localStorage.getItem('user')).permissions);
            canEdit = permissionList.includes("DeleteUser");
        }

        this.state = {
            emailUid: "",
            rows: [],
            loading: false,
            totalRows: 0,
            page: 1,
            perPage: process.env.REACT_APP_ROW_PER_Page,
            sortDirection: process.env.REACT_APP_DEFAULT_SORT_DIRECTION,
            sortBy: 'to_address',
            popupState: {
                isEditShow: false,
                msgPopupShow: false,
                title: "",
                message: "",
            }
        };
        this.getAllEmailTemplate = this.getAllEmailTemplate.bind(this);
        this.handleModelHide = this.handleModelHide.bind(this);
        this.handleModelSave = this.handleModelSave.bind(this);

    }

    getAllEmailTemplate = async () => {
        await this.setState({ ...this.state, loading: true });
        await emailService.getAllEmailTemplate(this.state.page, this.state.perPage, this.state.sortDirection, this.state.sortBy).then(result => {
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
        await this.getAllEmailTemplate();
    }

    handlePerRowsChange = async (perPage, page) => {
        await this.setState({ ...this.state, page: page, perPage: perPage })
        await this.getAllEmailTemplate();
    }

    handleSort = async (column, sortDirection) => {
        await this.setState({ ...this.state, sortBy: column.selector, sortDirection: sortDirection });
        await this.getAllEmailTemplate();
    };

    editEmailTemplate = (row) => {
        if (canEdit) {
            this.setState({
                ...this.state,
                emailUid: row.email_uid,
                popupState: {
                    isEditShow: true
                }
            })
        }
    }

    handleModelSave = (result) => {
        this.setState({
            popupState: {
                isEditShow: false,
                message: (result) ? "Email template saved successfully." : "Somthing went wrong please try again later.",
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
        await this.getAllEmailTemplate();
    }

    componentWillMount = () => this.getAllEmailTemplate();

    render() {      
        return (
            <Fragment>
                <main className="main-content">
                    <div className="container-fluid">
                        <div className="titlebtn">
                            <div className="title">
                                <h1>Manage Email Template</h1>
                            </div>
                        </div>
                        <div className="table-responsive grid-table">
                            <DataTable
                                noHeader
                                keyField={'email_uid'}
                                pointerOnHover
                                columns={columns}
                                data={this.state.rows}
                                defaultSortField="to_address"
                                highlightOnHover
                                progressPending={this.state.loading}                               
                                onSort={this.handleSort}
                                noContextMenu
                                onRowClicked={this.editEmailTemplate}
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
                        <EditEmailTemplate show={this.state.popupState.isEditShow} emailUid={this.state.emailUid} popupClose={this.handleModelHide} popupSave={this.handleModelSave} />
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
