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
            {
                key: "action",
                text: "Options",
                TrOnlyClassName: 'cell',
                className: "cell",
                width: 250,
                sortable: false,
                cell: record => {
                    return (
                        <Fragment className="center" >
                            <button className="btn btn-primary btn-sm"
                                style={
                                    { marginRight: '10px' }}
                                onClick={() => { this.isOpen(record) }}

                            >

                                Edit
                            </button>

                        </Fragment>
                    );
                }
            }


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
            isOpen: false,
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
            axios.get(url, CONFIG)
        ]).then(axios.spread((branchResponse) => {
            this.setState({
                admins: branchResponse.data.data,
                isLoading: false,
            });
        }))
    }



    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }



    isOpen = e => {
        this.setState({
            isOpen: true,
            name: e.name,
            id: e.id,
            IsEdit: false
        })
    }

    closeModal = e => {
        this.setState({
            isOpen: false,
            IsEdit: false
        })
    }



    onSubmit = e => {
        e.preventDefault();
        let formData = {
            "name": this.state.name,
            "id": this.state.id
        }
        this.setState({
            isLoading: true,
        })
        // alert(formData)
        axios.post(baseURL + 'service', formData, CONFIG)
            .then((response) => {
                // console.log("testtesttsttesttest ",  )
                successToast("Success")
                this.getData("")
                this.setState({
                    isLoading: false,
                    isOpen: false
                })
            }).catch(error => {
                errorToast(error.response.data.message)
                this.setState({
                    isLoading: false,
                });
            });
    }

    render() {

        return (
            <div style={{ marginTop: '-20px' }} >
                < >
                    {ToastTable()}

                    < Card >
                        <CardBody >
                            <Modal
                                isOpen={this.state.isOpen}
                                onRequestClose={e => {
                                    this.closeModal(e)
                                }}
                                contentLabel="My dialog"
                                className="mymodal"
                                onAfterOpen={() => {
                                    document.body.style.overflow = 'hidden';
                                }}
                                onAfterClose={() => {
                                    document.body.removeAttribute('style');
                                }}
                                overlayClassName="myoverlay"
                                closeTimeoutMS={500}
                            >
                                <MDBCloseIcon onClick={this.closeModal} />

                                <h6><b>{"Edit Service"}</b></h6>
                                <br />
                                <br />
                                <>
                                    <Form className="form login-form" onSubmit={this.onSubmit}>
                                        {/*n  <h5><b>Get Agent Number</b></h5> */}

                                        <div className="form__form-group col-10 offset-1">

                                            <span className="form__form-group-label">Test Unit Brand Name</span>

                                            <div className="form__form-group-field">
                                                <Form.Control
                                                    autoFocus
                                                    type="text"
                                                    name="name"
                                                    style={{ color: "black", borderColor: "hsl(0,0%,80%)" }}
                                                    placeholder="Name"
                                                    className="input-without-border-radius"
                                                    value={this.state.name}
                                                    onChange={this.handleChange}
                                                />
                                            </div>
                                            <br />

                                            <br />
                                        </div>

                                        <div className="account__btns col-8 offset-2">
                                            <Button className="account__btn" type='submit' color="success"> {
                                                this.state.isLoading ? "Please wait..." : "Update"
                                            }</Button>
                                        </div>

                                    </Form>
                                </>
                            </Modal>


                            < >

                                <div className="row">
                                    <div className="col-md-6">
                                        <h5>Services Offered</h5>
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