import React, { Fragment } from 'react';
import ReactDatatable from '@ashvin27/react-datatable';
import axios from 'axios';
import { Card, CardBody } from 'reactstrap';
import { baseURL, CONFIG, errorToast, formatCurrency, successToast, ToastTable } from '../../configs/exports';
import * as moment from 'moment';
import Modal from 'react-modal';
import { Form } from 'react-bootstrap';
import { Button } from 'reactstrap';
import { MDBCloseIcon } from "mdbreact"
import 'bootstrap/dist/css/bootstrap.min.css';
// import { RadioGroup, RadioButton } from 'react-radio-buttons'

export class Services extends React.Component {
    constructor(props) {
        super(props);

        this.columns = [
            {
                key: "name",
                TrOnlyClassName: 'tsc',
                text: "Name",
                className: "tsc",
                align: "left"
            },

            {
                key: "status",
                TrOnlyClassName: 'tsc',
                text: "Status",
                TrOnlyClassName: 'cell',

                className: "cell",
                align: "left",
                cell: record => {
                    return (
                        <Fragment className="center"  >
                            {record.status === 0 ?
                                <div>
                                    <span class="badge-danger" style={{ borderRadius: "5px", padding: "2px" }}>
                                        InActive
                                    </span>
                                </div>
                                : null}
                            {record.status === 1 ?
                                <span class="badge-success" style={{ borderRadius: "5px", padding: "2px" }}>
                                    Active
                                </span>
                                : null}
                        </Fragment >
                    );
                }
            },
            {
                key: "created_on",
                TrOnlyClassName: 'tsc',
                text: "Date",
                className: "tsc",
                align: "left"
            },
          

        ];


        this.config = {
            key_column: "tsc",
            length_menu: [100, 200, 500],
            show_filter: false,
            show_pagination: true,
            pagination: 'advance',
            page_size: 100,
            show_length_menu: false,
            language: {
                loading_text: "Please be patient while data loads...",
                no_data_text: "No data was found",
                filter: "Enter date (YYYY-MM-DD)",
                pagination: {
                    next: <span>&#9658;</span>,
                    previous: <span>&#9668;</span>
                }
            },
            button: {
                excel: true,
                print: false,
                csv: true
            }
        }
        this.state = {
            admins: [],
            isLoading: true,
            data: [],
        };
        this.state = {
            isPageLoad: true,
        }
    }
    componentDidMount() {
        this.getData("")
    }

    getData = () => {

        let url = baseURL + `service`;
        this.setState({
            isLoading: true,
        })
        axios.all([
            axios.post(url, CONFIG)
        ]).then(axios.spread((branchResponse) => {
            this.setState({
                admins: branchResponse.data.data,
                isLoading: false,
            });
        }))
    }





    render() {

        return (
            <div style={{ marginTop: '-20px' }} >
                < >
                    {ToastTable()}

                    < Card >
                        <CardBody >
                            < >

                                <div className="row">
                                    <div className="col-md-6">
                                        <h3>Services Offered</h3>
                                    </div>

                                </div>
                                <br />
                                <div className="panel-body" >

                                    <ReactDatatable
                                        config={this.config}
                                        records={this.state.admins}
                                        columns={this.columns}
                                        id="tsc"
                                        loading={this.state.isLoading}
                                        onChange={this.tableChangeHandler} />
                                </div>
                            </>

                        </CardBody>

                    </Card>
                </>
            </div>

        )
    }
}