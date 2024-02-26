import React, { Fragment } from 'react';
import ReactDatatable from '@ashvin27/react-datatable';
import axios from 'axios';
import { Card, CardBody } from 'reactstrap';
import { baseURL, CONFIG, errorToast, formatCurrency, successToast, ToastTable } from '../../configs/exports';
import * as moment from 'moment';
import Select from 'react-select';
import Modal from 'react-modal';
import { Form } from 'react-bootstrap';
import { Button } from 'reactstrap';
import { MDBCloseIcon } from "mdbreact"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Drillers } from './Drillers';
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
                key: "type",
                TrOnlyClassName: 'tsc',
                text: "Type",
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
                                onClick={() => { this.isOpenGo(record) }}
                            >   More <i className='fa fa-plus'></i>
                            </button>

                            <button className="btn btn-primary btn-sm"
                                style={
                                    { marginRight: '10px' }}
                                onClick={() => { this.isOpen(record) }}

                            >
                                Edit
                            </button>

                            {record.status === 1 ?
                                <button className="btn btn-danger btn-sm"
                                    title="Delete Category"
                                    style={
                                        { marginRight: '10px' }}

                                    onClick={() => { if (window.confirm('Are you sure you want to deactive this service?')) this.onSubmitAccount(record) }} >

                                    Deactivate
                                </button> : null}

                            {record.status === 0 ?
                                <button className="btn btn-success btn-sm"
                                    title="Delete Category"
                                    style={
                                        { marginRight: '10px' }}

                                    onClick={() => { if (window.confirm('Are you sure you want to active this service?')) this.onSubmitAccountActivate(record) }} >

                                    Activate
                                </button> : null}



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
            show_length_menu: false,
            language: {
                loading_text: "Please be patient while data loads...",
                no_data_text: "No data was found",
                filter: "Search here...",
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
            goOpen: false,

            serviceData: [
                {
                    label: 'Test Unit Pump',
                    value: 'test_pump'
                },
                {
                    label: 'Drillers',
                    value: 'drillers'
                },
                {
                    label: 'Pump Installer',
                    value: 'pump_installer'
                },
                {
                    label: 'Geologist',
                    value: 'geologist'
                },
                {
                    label: 'Tank Installation',
                    value: 'tank_installation'
                }
                ,
                {
                    label: 'Surveys',
                    value: 'surveys'
                }
                ,
                {
                    label: 'Other Services',
                    value: 'other_services'
                }
            ]
        }
    }
    componentDidMount() {
        this.getData("")
    }

    getData = () => {
        let url = baseURL + `service_portal`;
        this.setState({
            isLoading: true,
        })
        axios.all([axios.get(url, CONFIG)]).then(axios.spread((branchResponse) => {
            this.setState({
                admins: branchResponse.data.data,
                isLoading: false,
            });
        }))
    }



    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }




    onSubmitAccount = e => {
        let formData = {
            "id": e.id,
            "status": '0'
        }

        this.setState({
            isLoading: true,
        })
        // alert(formData)
        axios.post(baseURL + 'deactivate_service', formData, CONFIG)
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

    onSubmitAccountActivate = e => {
        let formData = {
            "id": e.id,
            "status": '1'
        }

        this.setState({
            isLoading: true,
        })
        // alert(formData)
        axios.post(baseURL + 'deactivate_service', formData, CONFIG)
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

    isOpenAdd = e => {
        this.setState({
            isOpenAdd: true,
        })
    }

    closeModalAdd = e => {
        this.setState({
            isOpenAdd: false,
        })
    }



    isOpenGo = e => {
        localStorage.setItem("unit_name", e.name)
        localStorage.setItem("unit_type", e.type);
        localStorage.setItem("unit_id", e.id);

        this.setState({
            goOpen: true,
            name: e.name,
            id: e.id,
            type: e.type,
            IsEdit: false
        })
    }

    isOpen = e => {
        this.setState({
            isOpen: true,
            name: e.name,
            id: e.id,
            IsEdit: false
        })
    }

    onSelectChangesShort = value => {
        if (value != null) {
            this.setState(
                {
                    type: value.value.toString()
                });
        }
    };

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


    onSubmitAdd = e => {
        e.preventDefault();
        let formData = {
            "name": this.state.name,
            "type": this.state.type,
            "id": this.state.id
        }
        this.setState({
            isLoading: true,
        })
        // alert(formData)
        axios.post(baseURL + 'service_add', formData, CONFIG)
            .then((response) => {
                // console.log("testtesttsttesttest ",  )
                successToast("Success")
                this.getData("")
                this.setState({
                    isLoading: false,
                    isOpenAdd: false
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

                    {this.state.goOpen ?
                        window.location.href = "services_units"
                        :
                        < Card >
                            <CardBody >


                                <Modal
                                    isOpen={this.state.isOpenAdd}
                                    onRequestClose={e => {
                                        this.closeModalAdd(e)
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
                                    <MDBCloseIcon onClick={this.closeModalAdd} />

                                    <h6><b>{"Add Service"}</b></h6>
                                    <br />
                                    <br />
                                    <>
                                        <Form className="form login-form" onSubmit={this.onSubmitAdd}>
                                            {/*n  <h5><b>Get Agent Number</b></h5> */}

                                            <div className="form__form-group col-10 offset-1">
                                                <span className="form__form-group-label">Service Name</span>

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

                                                <Select
                                                    isClearable
                                                    options={
                                                        (this.state.serviceData.length > 0 || this.state.serviceData.length === 0) &&
                                                        this.state.serviceData.map((countyItem, i) => ({
                                                            label: countyItem.label,
                                                            value: countyItem.value
                                                        }))}
                                                    placeholder="Select Service Type"
                                                    autosize={true}
                                                    onChange={this.onSelectChangesShort}
                                                    className="selected"
                                                    menuPortalTarget={document.body}
                                                    name="type"
                                                />
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

                                                <span className="form__form-group-label">Service Brand Name</span>

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
                                        <div className="col-md-8">
                                            <h5>Services Offered</h5>
                                        </div>
                                        <div className="col-md-4 float-right">
                                            <button className="btn btn-primary" onClick={this.isOpenAdd} > Add Service Name                                        </button>
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
                    }
                </>
            </div>

        )
    }
}