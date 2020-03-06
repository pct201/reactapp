import React, { Fragment } from 'react';
import { errorlogService } from '../../Services';
import DataTable from 'react-data-table-component';
import { MessagePopup } from '../Popup';

var columns = [];

export default class ManageUsers extends React.Component {

    constructor(props) {
        super(props);
        columns = [{
            selector: "log_message",
            name: "Log Message",
            sortable: false
        },
        {
            selector: "logger",
            name: "Logger",
            sortable: false,
            maxWidth: '300px',
        },
        {
            selector: "created_date",
            name: "Created Date",
            sortable: true,
            cell: row => {
                var dt = new Date(row.created_date);
                const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                ];
                return (dt.getDate() + "-" + (monthNames[dt.getMonth()]) + "-" + dt.getFullYear());
            },
            maxWidth: '150px',
        },
        {
            selector: "stack_trace",
            name: "Stack Trace",
            sortable: false,
            cell: row => {
                return (<button type="button" className="btn btn-primary btn-sm" onClick={() => { this.stacktracePopup(row.stack_trace) }}><span>Stack trace</span></button>);
            },
            maxWidth: '150px',
        }];
        this.state = {
            selected: [],
            rows: [],
            totalRows: 0,
            page: 1,
            perPage: process.env.REACT_APP_ROW_PER_Page,
            sortDirection: process.env.REACT_APP_DEFAULT_SORT_DIRECTION,
            sortBy: 'log_message',
            popupState: {
                message: "",
                title: "",
                isshow: false
            }
        };
        this.getAllErrorLog = this.getAllErrorLog.bind(this);
        this.handleModelHide = this.handleModelHide.bind(this);
        this.stacktracePopup = this.stacktracePopup.bind(this);
    }

    stacktracePopup = (data) => {
        this.setState({
            popupState: {
                message: data,
                title: "Stack Trace",
                isshow: true
            }
        })
    }
    exportToExcel=()=>{
        errorlogService.exportToExcel().then(result => {
            if (result !== undefined) {
                const url = window.URL.createObjectURL(new Blob([result]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'errorlog.xlsx');
                document.body.appendChild(link);
                link.click();
            }
        })
    }
    getAllErrorLog = async () => {
        await errorlogService.getAllErrorLog(this.state.page, this.state.perPage, this.state.sortDirection, this.state.sortBy).then(result => {
            if (result !== undefined) {
                this.setState({
                    ...this.state,
                    rows: result,
                    totalRows: (result.length > 0) ? result[0].total_records : 0
                })
            }
        })
    }

    handlePageChange = async (page) => {
        await this.setState({ ...this.state, page: page });
        await this.getAllErrorLog();
    }

    handlePerRowsChange = async (perPage, page) => {
        await this.setState({ ...this.state, page: page, perPage: perPage })
        await this.getAllErrorLog();
    }

    handleSort = async (column, sortDirection) => {
        await this.setState({ ...this.state, sortBy: column.selector, sortDirection: sortDirection });
        await this.getAllErrorLog();
    };

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

    componentWillMount = () => this.getAllErrorLog();
    render() {
        return (
            <Fragment>
                <main className="main-content">
                    <div className="container-fluid">
                        <div className="titlebtn">
                            <div className="title">
                                <h1>Manage Error Log</h1>
                            </div>
                            <div className="text-right">
                                <button className="btn btn-primary mr-2" onClick={this.exportToExcel}><span>Export to Excel</span></button>
                            </div>
                        </div>
                        <div className="table-responsive grid-table">
                            <DataTable
                                noHeader
                                keyField={'error_id'}
                                columns={columns}
                                data={this.state.rows}
                                defaultSortField="log_message"
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
                {
                    this.state.popupState.isshow &&
                    <div>
                        <MessagePopup show={this.state.popupState.isshow} title={this.state.popupState.title} message={this.state.popupState.message} popupClose={() => this.handleModelHide()} />
                    </div>
                }
            </Fragment>
        );
    }
}