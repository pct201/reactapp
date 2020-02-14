import React, { Fragment } from 'react';
import { emailService } from '../../Services';
import DataTable from 'react-data-table-component';
import { MessagePopup } from '../Popup';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

var columns = [];

export default class EmailLogList extends React.Component {

    constructor(props) {
        super(props);
        columns = [
            {
                selector: "friendly_email_name",
                name: "Email Title",
                sortable: true
            },
            {
                selector: "subject_text",
                name: "Email Subject",
                sortable: true,
                grow: 3
            },
            {
                selector: "to_address",
                name: "To Email Address",
                sortable: true
            },
            {
                selector: "has_failed",
                name: "Status",
                sortable: true,
                cell: row => <span>{row.has_failed ? "Fail" : "Yes"}</span>,
            },
            {
                selector: "response_message",
                name: "Failure Reason"
            },
            {
                selector: "created_date",
                name: "Date/Time",
                sortable: true,
                cell: row => {
                    var dt = new Date(row.created_date);
                    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                    ];
                    return (dt.getDate() + "-" + (monthNames[dt.getMonth()]) + "-" + dt.getFullYear() + " " + dt.getHours() + ":" + (dt.getMinutes() < 10 ? "0" + dt.getMinutes() : dt.getMinutes()) + ":" + (dt.getSeconds() < 10 ? "0" + dt.getSeconds() : dt.getSeconds()));
                }
            },
            {
                cell: row => { return row.has_failed ? <button type="button" className="btn btn-primary btn-sm" onClick={() => { this.resendMail(row.email_id) }}><span>Resend</span></button> : "-" },
                ignoreRowClick: true,
                allowOverflow: true,
                button: true,
            }
        ];
        this.state = {
            emailId: 0,
            rows: [],
            emailTitle: "",
            date: "",            
            totalRows: 0,
            page: 1,
            perPage: process.env.REACT_APP_ROW_PER_Page,
            sortDirection: 'desc',
            sortBy: 'created_date',
            showClear: false,
            popupState: {
                isShow: false,
                title: "",
                message: "",
            }
        };
        this.getAllEmailLog = this.getAllEmailLog.bind(this);
        this.handleModelHide = this.handleModelHide.bind(this);
        this.resendMail = this.resendMail.bind(this);
    }

    getAllEmailLog = async () => {     
        await emailService.getAllEmailLog(this.state.page, this.state.perPage, this.state.sortDirection, this.state.sortBy, this.state.date, this.state.emailTitle).then(result => {
            this.setState({
                ...this.state,
                rows: result,
                totalRows: (result.length > 0) ? result[0].total_records : 0              
            })
        })
    }

    handlePageChange = async (page) => {
        await this.setState({ ...this.state, page: page });
        await this.getAllEmailLog();
    }

    handlePerRowsChange = async (perPage, page) => {
        await this.setState({ ...this.state, page: page, perPage: perPage })
        await this.getAllEmailLog();
    }

    handleSort = async (column, sortDirection) => {
        await this.setState({ ...this.state, sortBy: column.selector, sortDirection: sortDirection });
        await this.getAllEmailLog();
    };

    handleInputChange = event => {
        this.setState({
            ...this.state,
            [event.target.id]: event.target.value
        });
    }

    handleDatepickerChange = (date) => {
        this.setState({
            ...this.state,
            date: date
        });
    }

    resendMail = (emailId) => {
      
        emailService.resendEmail(emailId).then(result => {
            this.setState({
                popupState: {
                    isShow: true,
                    message: result.message,
                    title: (result.success) ? "Success" : "Error",
                }
            })
        })
    }

    handleModelHide = async () => {
        await this.setState({
            popupState: {
                isShow: false,
                message: "",
                title: ""
            }
        })
        await this.getAllEmailLog();
    }

    filterData = async () => {
        await this.setState({
            ...this.state,
            showClear: true
        })
        await this.getAllEmailLog();
    }

    clearFilter = async () => {
        await this.setState({
            ...this.state,
            showClear: false,
            emailTitle: "",
            date: ""
        })
        await this.getAllEmailLog();
    }

    componentWillMount = () => this.getAllEmailLog();

    render() {
        let clearBtnStyle = {
            display: this.state.showClear ? "inline-block" : "none"
        }
        return (
            <Fragment>
                <main className="main-content">
                    <div className="container-fluid">
                        <div className="titlebtn">
                            <div className="title">
                                <h1>Email Logs</h1>
                            </div>
                        </div>
                        <div>
                            <div className="row justify-content-start">
                                <div className="col-md-2 ">
                                    <div className="form-group">
                                        <input type="text" className="form-control" id="emailTitle" value={this.state.emailTitle} placeholder="Email Title" onChange={this.handleInputChange} />
                                    </div>
                                </div>
                                <div className="col-md-2 ">
                                    <div className="form-group">
                                    <DatePicker
                                                    className="form-control"
                                                        onChange={this.handleDatepickerChange}
                                                        selected={this.state.date}                                                       
                                                        maxDate={new Date()}
                                                        showMonthDropdown
                                                        showYearDropdown
                                                        dropdownMode="select"                                                       
                                                        dateFormat="yyyy/MM/dd"
                                                        placeholderText="Date"
                                                        id="date"
                                                        autoComplete="off"
                                                        isClearable={this.state.date!==""?"true":""}
                                                           />     

                                    </div>
                                </div>
                                <div className="col-md-2 ">
                                    <button type="button" className="btn btn-primary" onClick={this.filterData}><span>Search</span></button>
                                    <button type="button" className="btn btn-secondary" style={clearBtnStyle} onClick={this.clearFilter}><span>Clear</span></button>
                                </div>
                            </div>

                        </div>
                        <div className="table-responsive grid-table">
                            <DataTable
                                noHeader
                                keyField={'email_id'}
                                columns={columns}
                                data={this.state.rows}
                                defaultSortField="created_date"
                                highlightOnHover                                                           
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
                    {
                        this.state.popupState.isShow &&
                        <MessagePopup show={this.state.popupState.isShow} title={this.state.popupState.title} message={this.state.popupState.message} popupClose={() => this.handleModelHide()} />
                    }
                </div>
            </Fragment>
        );
    }
}
