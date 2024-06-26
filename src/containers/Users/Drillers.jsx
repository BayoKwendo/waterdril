import React, { Fragment } from 'react';
import ReactDatatable from '@ashvin27/react-datatable';
import axios from 'axios';
import { Card, CardBody } from 'reactstrap';
import { baseURL, CONFIG, errorToast, formatCurrency, mdata, successToast, ToastTable } from '../../configs/exports';
import Modal from 'react-modal';
import { Form } from 'react-bootstrap';
import { Button } from 'reactstrap';
import { MDBCloseIcon } from "mdbreact";
import 'bootstrap/dist/css/bootstrap.min.css';
import PhoneOutlineIcon from 'mdi-react/PhoneOutlineIcon';
import Input from 'react-phone-number-input/input';
import Select from "react-select";
import {
    geocodeByAddress,
    geocodeByPlaceId,
    getLatLng,
} from 'react-places-autocomplete';
import PlacesAutocomplete from 'react-places-autocomplete';


export class Drillers extends React.Component {
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
                key: "name_internal",
                TrOnlyClassName: 'tsc',
                text: "Internal Name",
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
            {
                key: "amount",
                TrOnlyClassName: 'tsc',
                text: "Pricing",
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
                key: "driver_name",
                TrOnlyClassName: 'tsc',
                text: "Owners Name",
                className: "tsc",
                align: "left"
            },
            {
                key: "driver_msisdn",
                TrOnlyClassName: 'tsc',
                text: "Owners Contacts",
                className: "tsc",
                align: "left"
            },
            {
                key: "driver_id_number",
                TrOnlyClassName: 'tsc',
                text: "Owners ID Number",
                className: "tsc",
                align: "left"
            },
            {
                key: "created_on",
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
                            <button className="btn btn-primary btn-sm"
                                style={
                                    { marginRight: '10px' }}
                                onClick={() => { this.isOpenEdit(record) }}

                            >

                                Edit
                            </button>
                            <button className="btn btn-primary btn-sm"
                                style={
                                    { marginRight: '10px' }}
                                onClick={() => { this.isOpenEditPhoto(record) }}

                            >

                                Update Logo
                            </button>

                            <button className="btn btn-danger btn-sm"
                                title="Delete Category"
                                style={
                                    { marginRight: '10px' }}

                                onClick={() => { if (window.confirm('Are you sure you want to deactive this test unit?')) this.onSubmitDelete(record) }} >

                                Deactivate
                            </button>
                            {/* 
                            <button className="btn btn-danger btn-sm"
                                style={
                                    { marginRight: '10px' }}
                                onClick={() => { this.isOpenEditPhoto(record) }}

                            >

                                Deactivate
                            </button> */}
                        </Fragment>
                    );
                }
            }
        ];


        this.config = {
            key_column: "tsc",
            length_menu: [100, 200, 500],
            show_filter: true,
            show_pagination: true,
            pagination: 'advance',
            page_size: 100,
            show_length_menu: true,
            language: {
                loading_text: "Please be patient while data loads...",
                no_data_text: "No data was found",
                filter: "Search here...",
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
            amount: 0,
            password: "",
            currencylabel: 'KSH',
            IsEdit: false,
            company: [],
            record_id: '',
            onwerData: [],
            amount: 0,
            description: "",
            debit_account: 0,
            folio: "PETTY CASH",
            isOpenEditPhoto: false,
            status: "",
            data: [],
            isPageLoad: true,
            referred_id: 0,

        };
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

        let url = baseURL + `users?role=${localStorage.getItem('unit_type')}&${queryString}`;
        let url_own = baseURL + `users?role=onwer&${queryString}`;

        this.setState({
            isLoading: true,
        })
        axios.all([
            axios.get(url, CONFIG),
            axios.get(url_own, CONFIG)
        ]).then(axios.spread((branchResponse, ownerResponse) => {
            this.setState({
                onwerData: ownerResponse.data.data,
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


    onSubmitDelete = e => {
        let formData = {
            "id": e.id,
            "status": 'inactive'
        }

        this.setState({
            isLoading: true,
        })
        // alert(formData)
        axios.post(baseURL + 'deactivate_user', formData, CONFIG)
            .then((response) => {
                // console.log("testtesttsttesttest ",  )
                successToast("Success")
                this.getData("")
                this.setState({
                    isLoading: false,
                })
            }).catch(error => {
                errorToast(error.response.data.message)
                this.setState({
                    isLoading: false,
                });
            });
    }


    onSubmitDelete = e => {
        let formData = {
            "id": e.id,
            "status": 'inactive'
        }
        this.setState({
            isLoading: true,
        })
        // alert(formData)
        axios.post(baseURL + 'deactivate_user', formData, CONFIG)
            .then((response) => {
                // console.log("testtesttsttesttest ",  )
                successToast("Success")
                this.getData("")
                this.setState({
                    isLoading: false,
                })
            }).catch(error => {
                errorToast(error.response.data.message)
                this.setState({
                    isLoading: false,
                });
            });
    }
    onSubmit = e => {
        e.preventDefault();

        if (Number(this.state.referred_id) > 0) {
            let formData = {
                "name": this.state.name,
                "internal_name": this.state.internal_name,
                "id_number": this.state.id_number,
                "msisdn": this.state.msisdn.toString().replaceAll("+", ""),
                "location": this.state.address,
                "onwer_id": this.state.referred_id,
                "lat": this.state.latitude,
                "long": this.state.longitude,
                "role": localStorage.getItem('unit_type'),
                "amount": this.state.amount,
                "customer_type": "agent",
                "password": this.state.password
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
        } else {
            errorToast("Please attach owner")
        }
    }



    onEditSubmit = e => {
        e.preventDefault();
        let formData = {
            "name": this.state.name,
            "id_number": this.state.id_number,
            "internal_name": this.state.internal_name,
            "msisdn": this.state.msisdn.toString().replaceAll("+", ""),
            "location": this.state.address,
            "lat": this.state.latitude,
            "long": this.state.longitude,
            "onwer_id": this.state.referred_id,
            "role": localStorage.getItem('unit_type'),
            "id": this.state.id,
            "customer_type": "agent",
            "amount": this.state.amount,
            "password": this.state.password
        }

        this.setState({
            isLoading: true,
        })
        if (Number(this.state.referred_id) > 0) {
            // alert(formData)
            axios.post(baseURL + 'user_edit', formData, CONFIG)
                .then((response) => {
                    successToast("Success")
                    this.getData("")
                    this.setState({
                        isLoading: false,
                        isOpenEdit: false
                    })
                }).catch(error => {
                    errorToast(error.response.data.message)
                    this.setState({
                        isLoading: false,
                    });
                });
        } else {
            errorToast("Please attach owner")
        }
    }

    handleLogo = event => {
        console.log("FETCHER", event.target.files);
        this.setState({
            logo: event.target.files[0]
        });
    };



    onEditSubmithoto = e => {
        e.preventDefault();

        var data = new FormData();
        data.append("applicantion_form", this.state.logo);
        data.append("id", this.state.id);

        this.setState({
            isLoading: true,
        })
        // alert(formData)
        axios.post(baseURL + 'user_edit_photo', data, CONFIG)
            .then((response) => {
                successToast("Success")
                this.getData("")
                this.setState({
                    isLoading: false,
                    isOpenEditPhoto: false
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
            isOpenEdit: true,
            IsEdit: true,
            referred_id: 0,
            internal_name:e.name_internal,
            record_id: e.transaction_id,
            amount: e.amount,
            name: e.name,
            msisdn: e.msisdn,
            id_number: e.id_number,
            id: e.id,
            password: e.password
        })
    }

    isOpenEditPhoto = e => {
        this.setState({
            isOpenEditPhoto: true,
            id: e.id,
            password: e.password
        })
    }


    onSelectHandle = e => {
        this.setState({
            referred_id: e.value
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



    closeModalEditPhoto = e => {
        this.setState({
            isOpenEditPhoto: false,
        })
    }
    closeModalEdit = e => {
        this.setState({
            isOpenEdit: false,
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
                        <h6><b>{"Add " + localStorage.getItem('unit_name')}</b></h6>
                        <br />
                        <br />
                        <>
                            <Form className="form login-form" onSubmit={this.onSubmit}>
                                {/*n  <h5><b>Get Agent Number</b></h5> */}

                                <div className="form__form-group col-10 offset-1">

                                    <span className="form__form-group-label">{localStorage.getItem('unit_name')}</span>

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

                                    <span className="form__form-group-label">Internal Name</span>
                                    <div className="form__form-group-field">
                                        <Form.Control
                                            autoFocus
                                            type="text"
                                            name="internal_name"
                                            style={{ color: "black", borderColor: "hsl(0,0%,80%)" }}
                                            placeholder="Internal Name"
                                            className="input-without-border-radius"
                                            value={this.state.internal_name}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    <br />
                                    <div className="col-md-10-offset-1">
                                        <div className="form-group">
                                            <div className="col-md-12">
                                                <label className="form-label">Attach Owner</label>
                                            </div>
                                            <div className="col-md-12">

                                                <Select
                                                    isClearable
                                                    options={
                                                        (this.state.onwerData.length > 0 || this.state.onwerData.length === 0) &&
                                                        this.state.onwerData.map((countyItem, i) => ({
                                                            label: countyItem.name + " - " + countyItem.id_number,
                                                            value: countyItem.id
                                                        }))}

                                                    placeholder="Select Owner"
                                                    autosize={true}
                                                    onChange={this.onSelectHandle}
                                                    className="selected"
                                                    menuPortalTarget={document.body}
                                                    name="namffe"
                                                />
                                            </div>

                                        </div>
                                    </div>


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

                                    <span className="form__form-group-label">ID Number of Main Contact</span>
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


                                    <span className="form__form-group-label">Phone Number of Main Contact</span>
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

                                    <span className="form__form-group-label">Location Area</span>
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


                    <Modal
                        isOpen={this.state.isOpenEdit}
                        onRequestClose={e => {
                            this.closeModalEdit(e)
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
                        closeTimeoutMS={500}>
                        <MDBCloseIcon onClick={this.closeModalEdit} />
                        <h6><b>{"Edit " + localStorage.getItem('unit_name')}</b></h6>
                        <br />
                        <br />
                        <>
                            <Form className="form login-form" onSubmit={this.onEditSubmit}>
                                <div className="form__form-group col-10 offset-1">
                                    <span className="form__form-group-label">{localStorage.getItem('unit_name')}</span>
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

                                    <span className="form__form-group-label">Internal Name</span>
                                    <div className="form__form-group-field">
                                        <Form.Control
                                            autoFocus
                                            type="text"
                                            name="internal_name"
                                            style={{ color: "black", borderColor: "hsl(0,0%,80%)" }}
                                            placeholder="Internal Name"
                                            className="input-without-border-radius"
                                            value={this.state.internal_name}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    <br />

                                    <div className="col-md-10-offset-1">
                                        <div className="form-group">
                                            <div className="col-md-12">
                                                <label className="form-label">Attach Owner</label>
                                            </div>
                                            <div className="col-md-12">

                                                <Select
                                                    isClearable
                                                    options={
                                                        (this.state.onwerData.length > 0 || this.state.onwerData.length === 0) &&
                                                        this.state.onwerData.map((countyItem, i) => ({
                                                            label: countyItem.name + " - " + countyItem.id_number,
                                                            value: countyItem.id
                                                        }))}

                                                    placeholder="Select Owner"
                                                    autosize={true}
                                                    onChange={this.onSelectHandle}
                                                    className="selected"
                                                    menuPortalTarget={document.body}
                                                    name="namffe"
                                                />
                                            </div>

                                        </div>
                                    </div>

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
                                    <span className="form__form-group-label">ID Number of Main Contact</span>
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
                                    <span className="form__form-group-label">Phone Number of Main Contact</span>
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
                                        this.state.isLoading ? "Please wait..." : "Update"
                                    }</Button>
                                </div>

                            </Form>
                        </>
                    </Modal>



                    <Modal
                        isOpen={this.state.isOpenEditPhoto}
                        onRequestClose={e => {
                            this.closeModalEditPhoto(e)
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
                        closeTimeoutMS={500}>
                        <MDBCloseIcon onClick={this.closeModalEditPhoto} />
                        <h6><b>{localStorage.getItem('unit_name') + " Logo"}</b></h6>
                        <br />
                        <br />
                        <>
                            <Form className="form login-form" onSubmit={this.onEditSubmithoto}>
                                <div className="form__form-group col-10 offset-1">
                                    <span className="form__form-group-label">Update Logo</span>
                                    <div className="form__form-group-field">
                                        <input
                                            // className="csv-input"
                                            type="file"
                                            ref={input => {
                                                this.filesInput = input;
                                            }}
                                            name="file"
                                            required
                                            customHeight
                                            placeholder={null}
                                            onChange={this.handleLogo}
                                        />
                                    </div>
                                    <br />
                                </div>

                                <div className="account__btns col-8 offset-2">
                                    <Button className="account__btn" type='submit' color="success"> {
                                        this.state.isLoading ? "Please wait..." : "Upload"
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
                                        <h5>{localStorage.getItem('unit_name')}</h5>
                                    </div>
                                    <div className="col-md-4 float-right">
                                        <button className="btn btn-primary" onClick={this.isOpen} > Add {localStorage.getItem('unit_name')}
                                        </button>
                                    </div>

                                    <div className="col-md-4 float-right">
                                        <button className="btn btn-primary" onClick={e => window.location.href = "services"} > Back
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