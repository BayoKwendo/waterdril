import React, { Fragment } from 'react';
import ReactDatatable from '@ashvin27/react-datatable';
import axios from 'axios';
import { Card, CardBody } from 'reactstrap';
import { baseURL, CONFIG, errorToast, formatCurrency, mdata, successToast, ToastTable } from '../../configs/exports';
import * as moment from 'moment';
import Modal from 'react-modal';
import { Form } from 'react-bootstrap';
import { Button } from 'reactstrap';
import { MDBCloseIcon } from "mdbreact"
import 'bootstrap/dist/css/bootstrap.min.css';
import PhoneOutlineIcon from 'mdi-react/PhoneOutlineIcon';
import Input from 'react-phone-number-input/input'
import {
    geocodeByAddress,
    geocodeByPlaceId,
    getLatLng,
} from 'react-places-autocomplete';
import PlacesAutocomplete from 'react-places-autocomplete';


export class RequestWater extends React.Component {
    constructor(props) {
        super(props);

        this.handleSelect = this.handleSelect.bind(this);

        this.isOpen = this.isOpen.bind(this);
        this.closeModal = this.closeModal.bind(this);

        this.columns = [
            {
                key: "name",
                TrOnlyClassName: 'tsc',
                text: "Name",
                className: "tsc",
                align: "left"
            },
            {
                key: "location",
                TrOnlyClassName: 'tsc',
                text: "Location",
                className: "tsc",
                align: "left"
            },

            {
                key: "user_id",
                TrOnlyClassName: 'tsc',
                text: "Service ID",
                className: "tsc",
                align: "left"
            },

            {
                key: "msisdn",
                TrOnlyClassName: 'tsc',
                text: "User Contacts",
                className: "tsc",
                align: "left"
            },
            {
                key: "id_number",
                TrOnlyClassName: 'tsc',
                text: "User ID Number",
                className: "tsc",
                align: "left"
            },
            {
                key: "amount_paid",
                TrOnlyClassName: 'tsc',
                text: "Amount Paid",
                className: "tsc",
                align: "left"
            },
            {
                key: "full_amount",
                TrOnlyClassName: 'tsc',
                text: "Total Amount",
                className: "tsc",
                align: "left"
            },
            
            {
                key: "amount_to_pay",
                TrOnlyClassName: 'tsc',
                text: "Full Amount to Pay",
                className: "tsc",
                align: "left"
            },
            // deno-lint-ignore no-dupe-keys
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
                                        Pending
                                    </span>
                                </div>
                                : null}
                            {record.status === 1 ?
                                <span class="badge-success" style={{ borderRadius: "5px", padding: "2px" }}>
                                    Accepted
                                </span>
                                : null}
                            {record.status === 2 ?
                                <span class="badge-" style={{ borderRadius: "5px", padding: "2px" }}>
                                    Closed
                                </span>
                                : null}
                        </Fragment >
                    );
                }
            },


            {
                key: "created_at",
                TrOnlyClassName: 'tsc',
                text: "Created On",
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
                            {record.status !== 2 ?

                                <button className="btn btn-primary btn-sm"
                                    title="EditCategory"
                                    style={
                                        { marginRight: '10px' }}
                                    onClick={() => { this.isOpenEdit(record) }} >

                                    Edit
                                </button>
                                : null}


                            {/* <button className="btn btn-danger btn-sm"
                                title="Delete Category"
                                style={
                                    { marginRight: '10px' }}

                                onClick={() => { if (window.confirm('Are you sure you want to delete this user?')) onSubmitDelete(record) }} >

                                Delete
                            </button> */}


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
            show_length_menu: true,
            language: {
                loading_text: "Please be patient while data loads...",
                no_data_text: "No data was found",
                filter: "Enter date (YYYY-MM-DD)",
                pagination: {
                    next: <span>&#9658;</span>,
                    previous: <span>&#9668;</span>
                    // next
                    // previous
                }
            },
            button: {
                // excel: true,
                // print: false,
                // csv: true
            }
        }
        this.state = {
            admins: [],
            isLoading: true,
            showModal: false,
            showError: false,
            isShowError: false,
            showComponent: false,
            hideComponent: false,
            invoice_currency: 'KSH',
            mdata: mdata,
            isOpen: false,
            currencylabel: 'KSH',
            IsEdit: false,
            company: [],
            record_id: '',
            amount: 0,
            data: [],
        };
        this.state = {
            isPageLoad: true,
        }
    }
    async componentDidMount() {
        this.getData("")
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleChangeSelect = (e) => {
        this.setState({ folio: e });
    }

    getData = (queryString = "") => {

        let url = baseURL + `service_request`;
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





    tableChangeHandler = data => {
        let queryString = Object.keys(data).map((key) => {
            if (key === "sort_order" && data[key]) {
                return encodeURIComponent("sort_order") + '=' + encodeURIComponent(data[key].order) + '&' + encodeURIComponent("sort_column") + '=' + encodeURIComponent(data[key].column)
            } else {
                return encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
            }
        }).join('&');
        this.getData(queryString)
    }

    onSubmit = e => {
        e.preventDefault();
        let formData = {
            "id_number": this.state.record_id,
            "amount": this.state.amount,
            "transaction_id": this.state.transaction_id,
            "role": "geologist",
        }

        this.setState({
            isLoading: true,
        })
        // alert(formData)
        axios.post(baseURL + 'reconcile', formData, CONFIG)
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


    isOpenEdit = e => {
        this.setState({
            isOpen: true,
            IsEdit: true,
            record_id: e.id_number,
        })
    }


    isOpen = e => {
        this.setState({
            isOpen: true,
            IsEdit: false
        })
    }

    closeModal = e => {
        this.setState({
            isOpen: false,
            IsEdit: false
        })
    }

    handleSelect = address => {
        this.setState({ address: address });
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => { this.setState({ latitude: latLng.lat.toString(), longitude: latLng.lng.toString() }) })
            .catch(error => console.error('Error', error));
    };
    handleChangeAddress = address => {

        this.setState({ address });
    };



    render() {

        return (
            <div style={{ marginTop: '-20px' }} >
                < >
                    {ToastTable()}

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

                        <h6><b>{"Reconcile Transaction"}</b></h6>
                        <br />
                        <br />
                        <>
                            <Form className="form login-form" onSubmit={this.onSubmit}>
                                {/*n  <h5><b>Get Agent Number</b></h5> */}

                                <div className="form__form-group col-10 offset-1">

                                    <span className="form__form-group-label">Transaction ID</span>

                                    <div className="form__form-group-field">
                                        <Form.Control
                                            autoFocus
                                            type="text"
                                            name="transaction_id"
                                            style={{ color: "black", borderColor: "hsl(0,0%,80%)" }}
                                            placeholder="Name"
                                            className="input-without-border-radius"
                                            value={this.state.transaction_id}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    <br />
                                    <span className="form__form-group-label">AMount </span>
                                    <div className="form__form-group-field">
                                        <Form.Control
                                            autoFocus
                                            type="number"
                                            name="amount"
                                            style={{ color: "black", borderColor: "hsl(0,0%,80%)" }}
                                            placeholder="Enter Amount"
                                            className="input-without-border-radius"
                                            value={this.state.amount}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    <br />
                                    <br />


                                </div>

                                <div className="account__btns col-8 offset-2">
                                    <Button className="account__btn" type='submit' color="success"> {
                                        this.state.isLoading ? "Please wait..." : "Add"
                                    }</Button>
                                </div>

                            </Form>
                        </>
                    </Modal>


                    < Card >
                        <CardBody >
                            < >
                                <div className="row">
                                    <div className="col-md-8">
                                        <h5>Service Requests</h5>
                                    </div>
                                    {/* <div className="col-md-4 float-right">
                                        <button className="btn btn-primary" onClick={this.isOpen} > Add New Geologist
                                        </button>
                                    </div> */}
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
            </div >

        )
    }
}