import React from 'react';
import 'rc-datepicker/lib/style.css';
import { DatePickerInput } from 'rc-datepicker';
import Select from "react-dropdown-select";

const options = [{
    value: 'chocolate',
    label: 'Chocolate'
},
{
    value: 'strawberry',
    label: 'Strawberry'
},
{
    value: 'vanilla',
    label: 'Vanilla'
}
]


class Dashboard extends React.Component {


    render() {
        return (
            <main className="main-content">
                <div className="container-fluid">
                    <div className="title">
                        <h1>Payment Status</h1>
                    </div>

                    <div className="row mb-1">
                        <div className="col-12">
                            <div className="form-group">
                                <div className="custom-control custom-radio custom-control-inline">
                                    <input type="radio" id="customRadioInline1" name="customRadioInline1" className="custom-control-input" />
                                    <label className="custom-control-label" htmlFor="customRadioInline1">Date of Service</label>
                                </div>
                                <div className="custom-control custom-radio custom-control-inline">
                                    <input type="radio" id="customRadioInline2" name="customRadioInline1" className="custom-control-input" />
                                    <label className="custom-control-label" htmlFor="customRadioInline2">PO#</label>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-6 col-lg-4">
                            <div className="form-group">
                                <DatePickerInput
                                    onChange={this.handleChange}
                                    value={'2020-Jan-05'}
                                    displayFormat='YYYY-MM-DD'
                                    ref="birth_date"
                                    id="birth_date" className="form-control datepicker" readOnly />
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-6 col-lg-4">
                            <div className="form-group">
                                <Select
                                    className="select-control"
                                    options={options}
                                    values={[]}
                                    onChange={(value) => console.log(value)}
                                />
                            </div>
                        </div>
                        <div className=" col-md-6 col-lg-4">
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary mr-2"><span>Search</span></button>
                                <button type="submit" className="btn btn-secondary"><span>Clear</span></button>
                            </div>
                        </div>

                    </div>

                    <div className="table-responsive grid-table">
                        <table className="table table-hover table-border">
                            <thead>
                                <tr>
                                    <th>PO#</th>
                                    <th>Date of service</th>
                                    <th>Insured worker</th>
                                    <th>Amount invoiced</th>
                                    <th>Date invoiced</th>
                                    <th>Amount paid</th>
                                    <th>Due date</th>
                                    <th>Check/ACH#</th>
                                    <th>Mailed on</th>
                                    <th align="center" className="text-center">Query</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>123456</td>
                                    <td>10/1/2019</td>
                                    <td>David Bough</td>
                                    <td>$250</td>
                                    <td>22/9/2019</td>
                                    <td>$230</td>
                                    <td>30/9/2019</td>
                                    <td>01234</td>
                                    <td>30/9/2019</td>
                                    <td align="center" className="actions">
                                        <a href="#/" title="Query" data-toggle="modal" data-target="#billing-query"><img src={require('../../images/info.svg')} alt="Query" /></a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>123456</td>
                                    <td>10/1/2019</td>
                                    <td>David Bough</td>
                                    <td>$250</td>
                                    <td>22/9/2019</td>
                                    <td>$230</td>
                                    <td>30/9/2019</td>
                                    <td>01234</td>
                                    <td>30/9/2019</td>
                                    <td align="center" className="actions">
                                        <a href="#/" title="Query" data-toggle="modal" data-target="#billing-query"><img src={require('../../images/info.svg')} alt="Query" /></a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>123456</td>
                                    <td>10/1/2019</td>
                                    <td>David Bough</td>
                                    <td>$250</td>
                                    <td>22/9/2019</td>
                                    <td>$230</td>
                                    <td>30/9/2019</td>
                                    <td>01234</td>
                                    <td>30/9/2019</td>
                                    <td align="center" className="actions">
                                        <a href="#/" title="Query" data-toggle="modal" data-target="#billing-query"><img src={require('../../images/info.svg')} alt="Query" /></a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>123456</td>
                                    <td>10/1/2019</td>
                                    <td>David Bough</td>
                                    <td>$250</td>
                                    <td>22/9/2019</td>
                                    <td>$230</td>
                                    <td>30/9/2019</td>
                                    <td>01234</td>
                                    <td>30/9/2019</td>
                                    <td align="center" className="actions">
                                        <a href="#/" title="Query" data-toggle="modal" data-target="#billing-query"><img src={require('../../images/info.svg')} alt="Query" /></a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>123456</td>
                                    <td>10/1/2019</td>
                                    <td>David Bough</td>
                                    <td>$250</td>
                                    <td>22/9/2019</td>
                                    <td>$230</td>
                                    <td>30/9/2019</td>
                                    <td>01234</td>
                                    <td>30/9/2019</td>
                                    <td align="center" className="actions">
                                        <a href="#/" title="Query" data-toggle="modal" data-target="#billing-query"><img src={require('../../images/info.svg')} alt="Query" /></a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>123456</td>
                                    <td>10/1/2019</td>
                                    <td>David Bough</td>
                                    <td>$250</td>
                                    <td>22/9/2019</td>
                                    <td>$230</td>
                                    <td>30/9/2019</td>
                                    <td>01234</td>
                                    <td>30/9/2019</td>
                                    <td align="center" className="actions">
                                        <a href="#/" title="Query" data-toggle="modal" data-target="#billing-query"><img src={require('../../images/info.svg')} alt="Query" /></a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>123456</td>
                                    <td>10/1/2019</td>
                                    <td>David Bough</td>
                                    <td>$250</td>
                                    <td>22/9/2019</td>
                                    <td>$230</td>
                                    <td>30/9/2019</td>
                                    <td>01234</td>
                                    <td>30/9/2019</td>
                                    <td align="center" className="actions">
                                        <a href="#/" title="Query" data-toggle="modal" data-target="#billing-query"><img src={require('../../images/info.svg')} alt="Query" /></a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>123456</td>
                                    <td>10/1/2019</td>
                                    <td>David Bough</td>
                                    <td>$250</td>
                                    <td>22/9/2019</td>
                                    <td>$230</td>
                                    <td>30/9/2019</td>
                                    <td>01234</td>
                                    <td>30/9/2019</td>
                                    <td align="center" className="actions">
                                        <a href="#/" title="Query" data-toggle="modal" data-target="#billing-query"><img src={require('../../images/info.svg')} alt="Query" /></a>
                                    </td>
                                </tr><tr>
                                    <td>123456</td>
                                    <td>10/1/2019</td>
                                    <td>David Bough</td>
                                    <td>$250</td>
                                    <td>22/9/2019</td>
                                    <td>$230</td>
                                    <td>30/9/2019</td>
                                    <td>01234</td>
                                    <td>30/9/2019</td>
                                    <td align="center" className="actions">
                                        <a href="#/" title="Query" data-toggle="modal" data-target="#billing-query"><img src={require('../../images/info.svg')} alt="Query" /></a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>123456</td>
                                    <td>10/1/2019</td>
                                    <td>David Bough</td>
                                    <td>$250</td>
                                    <td>22/9/2019</td>
                                    <td>$230</td>
                                    <td>30/9/2019</td>
                                    <td>01234</td>
                                    <td>30/9/2019</td>
                                    <td align="center" className="actions">
                                        <a href="#/" title="Query" data-toggle="modal" data-target="#billing-query"><img src={require('../../images/info.svg')} alt="Query" /></a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>123456</td>
                                    <td>10/1/2019</td>
                                    <td>David Bough</td>
                                    <td>$250</td>
                                    <td>22/9/2019</td>
                                    <td>$230</td>
                                    <td>30/9/2019</td>
                                    <td>01234</td>
                                    <td>30/9/2019</td>
                                    <td align="center" className="actions">
                                        <a href="#/" title="Query" data-toggle="modal" data-target="#billing-query"><img src={require('../../images/info.svg')} alt="Query" /></a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>123456</td>
                                    <td>10/1/2019</td>
                                    <td>David Bough</td>
                                    <td>$250</td>
                                    <td>22/9/2019</td>
                                    <td>$230</td>
                                    <td>30/9/2019</td>
                                    <td>01234</td>
                                    <td>30/9/2019</td>
                                    <td align="center" className="actions">
                                        <a href="#/" title="Query" data-toggle="modal" data-target="#billing-query"><img src={require('../../images/info.svg')} alt="Query" /></a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>


                    <div className="grid-bottom row">
                        <div className="col-lg">
                            <div className="show-record">
                                <select className="custom-select">
                                    <option value="10">10</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                </select>
                                <span className="form-label">Records per page</span>
                            </div>
                        </div>
                        <div className="col-lg">
                            <div className="paginetion">
                                <ul>
                                    <li><a href="#/" className="prevar first"></a></li>
                                    <li><a href="#/" className="prevar"></a></li>
                                    <li><a href="#/">1</a></li>
                                    <li><a href="#/" className="active">2</a></li>
                                    <li><a href="#/">3</a></li>
                                    <li><a href="#/">4</a></li>
                                    <li><a href="#/" className="nxtar"></a></li>
                                    <li><a href="#/" className="nxtar last"></a></li>
                                </ul>

                            </div>
                        </div>
                    </div>

                </div>
            </main>
        );
    }
}
export default Dashboard;