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


export class Geologists extends React.Component {
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
                key: "msisdn",
                TrOnlyClassName: 'tsc',
                text: "Contacts",
                className: "tsc",
                align: "left"
            },

            {
                key: "id_number",
                TrOnlyClassName: 'tsc',
                text: "ID Number",
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
                key: "amount",
                TrOnlyClassName: 'tsc',
                text: "Pricing",
                className: "tsc",
                align: "left"
            },

            {
                key: "lat",
                TrOnlyClassName: 'tsc',
                text: "Latitude",
                className: "tsc",
                align: "left"
            },

            {
                key: "longitude",
                TrOnlyClassName: 'tsc',
                text: "Longitude",
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
                            {record.status === 1 ?
                                <div>
                                    <span class="badge-danger" style={{ borderRadius: "5px", padding: "2px" }}>
                                        Booked
                                    </span>
                                </div>
                                : null}
                            {record.status === 0 ?
                                <span class="badge-success" style={{ borderRadius: "5px", padding: "2px" }}>
                                    Available
                                </span>
                                : null}
                        </Fragment >
                    );
                }
            },


            {
                key: "created_on",
                TrOnlyClassName: 'tsc',
                text: "Created On",
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

        let url = baseURL + `users?role=geologist&${queryString}`;
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
            "name": this.state.name,
            "id_number": this.state.id_number,
            "msisdn": this.state.msisdn.toString().replaceAll("+", ""),
            "location": this.state.address,
            "lat": this.state.latitude,
            "long": this.state.longitude,
            "amount": this.state.amount,
            "customer_type": "agent",
            "password": this.state.password,
            "role": "geologist",
        }

        this.setState({
            isLoading: true,
        })
        // alert(formData)
        axios.post(baseURL + 'user', formData, CONFIG)
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
            record_id: e.transaction_id,
            amount: e.amount,
            bank_name: e.bank_name,
            account_name: e.account_name,
            account_number: e.account_number,
            branch: e.branch,
            swift_code: e.swift_code,
            address: e.address,
            country: e.country,
            currency: e.invoice_currency,
            account_type: e.account_type,
            company_id: Number(this.state.company_id)
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

                        <h6><b>{"Add New Geologist"}</b></h6>
                        <br />
                        <br />
                        <>
                            <Form className="form login-form" onSubmit={this.onSubmit}>
                                {/*n  <h5><b>Get Agent Number</b></h5> */}

                                <div className="form__form-group col-10 offset-1">

                                    <span className="form__form-group-label">Name</span>

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
                                    <span className="form__form-group-label">Pricing </span>
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

                                    <span className="form__form-group-label">ID Number</span>
                                    <div className="form__form-group-field">
                                        <Form.Control
                                            autoFocus
                                            type="text"
                                            name="id_number"
                                            style={{ color: "black", borderColor: "hsl(0,0%,80%)" }}
                                            placeholder="Enter Contact ID Number"
                                            className="input-without-border-radius"
                                            value={this.state.id_number}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    <br />


                                    <span className="form__form-group-label">Phone Number</span>
                                    <div className="form__form-group-field">
                                        <div className="form__form-group-icon">
                                            <PhoneOutlineIcon />
                                        </div>
                                        <Input
                                            country="KE"
                                            international
                                            withCountryCallingCode
                                            required
                                            className="form-control"
                                            placeholder="Enter Phone"
                                            name="phone_number"
                                            id="input"
                                            value={this.state.msisdn}
                                            onChange={value => this.setState({ msisdn: value })} />
                                    </div>
                                    <br />

                                    <span className="form__form-group-label">Location</span>

                                    <div className="form__form-group-field">
                                        <PlacesAutocomplete
                                            value={this.state.address}
                                            onChange={this.handleChangeAddress}
                                            style={{ color: "black", borderColor: "hsl(0,0%,80%)" }}
                                            onSelect={this.handleSelect}>
                                            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                                <div>
                                                    <Form.Control
                                                        autoFocus
                                                        style={{ color: "black", borderColor: "hsl(0,0%,80%)" }}
                                                        className="input-without-border-radius"
                                                        value={this.state.address}
                                                        {...getInputProps({
                                                            // placeholder: 'Search Places ...',
                                                            className: 'location-search-input',
                                                        })}
                                                    />
                                                    <div className="autocomplete-dropdown-container">
                                                        {loading && <div>Loading...</div>}
                                                        {suggestions.map(suggestion => {
                                                            const className = suggestion.active
                                                                ? 'suggestion-item--active'
                                                                : 'suggestion-item';
                                                            // inline style for demonstration purpose
                                                            const style = suggestion.active
                                                                ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                                                : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                                            return (
                                                                <div
                                                                    {...getSuggestionItemProps(suggestion, {
                                                                        className,
                                                                        style,
                                                                    })}
                                                                >
                                                                    <span>{suggestion.description}</span>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            )}
                                        </PlacesAutocomplete>
                                    </div>
                                    <br />
                                    <span className="form__form-group-label">Access Password</span>
                                    <div className="form__form-group-field">
                                        <Form.Control
                                            autoFocus
                                            type="password"
                                            name="password"
                                            style={{ color: "black", borderColor: "hsl(0,0%,80%)" }}
                                            placeholder="Enter Password"
                                            className="input-without-border-radius"
                                            value={this.state.password}
                                            onChange={this.handleChange}
                                        />
                                    </div>
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
                                        <h5>Geologist</h5>
                                    </div>
                                    <div className="col-md-4 float-right">
                                        <button className="btn btn-primary" onClick={this.isOpen} > Add New Geologist
                                        </button>
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
            </div >

        )
    }
}