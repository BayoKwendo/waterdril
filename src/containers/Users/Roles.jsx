import React, { Fragment } from 'react';
import ReactDatatable from '@ashvin27/react-datatable';
import axios from 'axios';
import { Card, CardBody } from 'reactstrap';
import { baseURL, CONFIG, errorToast, formatCurrency, successToast, ToastTable } from '../../configs/exports';
import * as moment from 'moment';
import Modal from 'react-modal';
import { Form } from 'react-bootstrap';
import { Button } from 'reactstrap';
import Select from 'react-select';
import { MDBCloseIcon } from "mdbreact"
import 'bootstrap/dist/css/bootstrap.min.css';
// import { RadioGroup, RadioButton } from 'react-radio-buttons'

export class Roles extends React.Component {
    constructor(props) {
        super(props);

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
                key: "description",
                TrOnlyClassName: 'tsc',
                text: "Description",
                className: "tsc",
                align: "left"
            }, {
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

                                Assign
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
            isOpen: false,

            IsEdit: false,

            record_id: '',
            amount: 0,
            description: "",
            debit_account: 0,
            folio: "PETTY CASH",

            status: "",
            data: [],
        };
        this.state = {
            isPageLoad: true,
        }
    }
    async componentDidMount() {
        const [userResponse] = await Promise.all([
            axios.get(baseURL + `users?page_id=1&page_size=10`, CONFIG)
        ]);

        this.setState({
            startDate: moment(new Date()).format('DD MMM, YYYY'),
            endDate: moment(new Date()).format('DD MMM, YYYY'),
            isPageLoad: true,
            isLoading: false,
            users: userResponse.data.users,
            invoice_currency: 'KSH',
            valuedate: "Today"
        })

        this.getData("")
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleChangeSelect = (e) => {
        this.setState({ folio: e });
    }

    getData = (queryString = "") => {

        let url = baseURL + `roles?page_id=1&page_size=100&${queryString}`;
        this.setState({
            isLoading: true,
        })
        axios.all([
            axios.get(url, CONFIG)
        ]).then(axios.spread((branchResponse) => {
            this.setState({
                admins: branchResponse.data,
                isLoading: false,
            }, function () {
                var data = [];
                if (this.state.admins && this.state.admins.length > 0) {
                    this.setState({
                        data: this.state.admins
                    })
                } else {
                    this.setState({
                        data: data,
                        isLoading: false,

                    })
                }
            }
            );
        }))
    }


    Customer() {
        return (
            this.state.users &&
            (this.state.users.length > 0 || this.state.users.length === 0) &&
            this.state.users.map((countyItem, i) => ({
                label: countyItem.full_name + " " + countyItem.username,
                value: countyItem.id,
            }))
        );
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
            "name": String(this.state.name),
            "description": this.state.description
        }
        this.setState({
            isLoading: true,
        })
        // alert(formData)
        axios.post(baseURL + 'roles', formData, CONFIG)
            .then((response) => {
                // console.log("testtesttsttesttest ",  )
                successToast("Success")
                this.getData("")
                this.setState({
                    isLoading: false,
                    isOpen: false
                })
            }).catch(error => {
                if (error.response.data.error) {
                    errorToast(error.response.data.error)
                } else {

                    errorToast(error.response.data)
                }
                this.setState({
                    isLoading: false,
                });
            });
    }


    isOpenEdit = e => {
        this.setState({
            // isOpen: true,
            record_id: e.id,
            // name: e.name,
            // title: e.title,
            IsEdit: true
        })
    }


    isOpen = e => {
        this.setState({
            isOpen: true,
            IsEdit: false
        })
    }

    // isOpenEdit = e => {
    //     this.setState({
    //         IsEdit: true
    //     })
    // }

    closeModal = e => {
        this.setState({
            isOpen: false,
            IsEdit: false
        })
    }


    onSubmitEdit = e => {
        e.preventDefault()

        let formData = {
            "user_id": Number(this.state.user_id),
            "role_id": Number(this.state.record_id)

        }

        this.setState({
            isLoading: true,
        })

        axios.post(baseURL + 'user-roles', formData, CONFIG)
            .then((response) => {

                // console.log("testtesttsttesttest ",  )
                successToast("Success")


                this.getData("")
                this.setState({

                    isLoading: false,
                    isOpen: false,
                    IsEdit: false
                })

            }).catch(error => {
                this.setState({
                    isLoading: false,
                })
                if (error.response.data.error) {
                    errorToast(error.response.data.error)
                } else {

                    errorToast(error.response.data)
                }
            });

    }


    onSelectChangesShort = value => {
        if (value != null) {
            this.setState(
                {
                    user_id: value.value.toString()
                });
        }
    };


    render() {

        return (
            <div style={{ marginTop: '-20px' }} >
                < >
                    {ToastTable()}

                    <Modal
                        isOpen={this.state.IsEdit}
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
                        <h4><b>{"Assign Role User"}</b></h4>
                        <>
                            <Form className="form login-form" onSubmit={this.state.IsEdit ? this.onSubmitEdit : this.onSubmit}>
                                {/*n  <h5><b>Get Agent Number</b></h5> */}
                                <div className="form__form-group">
                                    <br></br>


                                    <div className="form-group centre col-md-10">

                                        <div className="row">

                                            <span className="form__form-group-label">Select User</span>
                                            <br />
                                            <div className="col-md-12">
                                                <Select
                                                    isClearable
                                                    options={this.Customer()}
                                                    placeholder={"Select users"}
                                                    autosize={true}
                                                    onChange={this.onSelectChangesShort}
                                                    isLoading={this.state.isLoading}
                                                    menuPortalTarget={document.body}
                                                    name="name"
                                                /><br />
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className="account__btns col-8 offset-2">
                                    <Button className="account__btn" type='submit' color="success"> {
                                        this.state.isLoading ? "Please wait..." : "Assign"
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
                        <h4><b>{this.state.IsEdit ? "Edit Role" : "Create Role"}</b></h4>
                        <>
                            <Form className="form login-form" onSubmit={this.onSubmit}>
                                {/*n  <h5><b>Get Agent Number</b></h5> */}
                                <div className="form__form-group">
                                    <br></br>

                                    <span className="form__form-group-label">Name</span>
                                    <div className="form__form-group-field">
                                        <Form.Control
                                            autoFocus
                                            type="text"
                                            name="name"
                                            style={{ color: "black", borderColor: "hsl(0,0%,80%)" }}
                                            placeholder="Enter Role Name"
                                            className="input-without-border-radius"
                                            value={this.state.name}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    <br />

                                    <span className="form__form-group-label">Description</span>
                                    <div className="form__form-group-field">
                                        <Form.Control
                                            autoFocus
                                            type="text"
                                            name="description"
                                            style={{ color: "black", borderColor: "hsl(0,0%,80%)" }}
                                            placeholder="Enter Description"
                                            className="input-without-border-radius"
                                            value={this.state.description}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    <br />
                                    <br />

                                    <br />
                                </div>
                                <div className="account__btns col-8 offset-2">
                                    <Button className="account__btn" type='submit' color="success"> {
                                        this.state.isLoading ? "Please wait..." : "Create"
                                    }</Button>
                                </div>

                            </Form>
                        </>
                    </Modal>
                    < Card >
                        <CardBody >
                            < >

                                <div className="row">
                                    <div className="col-md-6">

                                        <h3>Roles</h3>
                                    </div>

                                    <div className="col-md-6">
                                        <button className="btn btn-success" onClick={this.isOpen} > Add Role
                                        </button>
                                    </div>
                                </div>
                                <br />
                                <div className="panel-body" >

                                    <ReactDatatable
                                        config={this.config}
                                        records={this.state.data}
                                        columns={this.columns}
                                        dynamic={true}
                                        id="tsc"
                                        loading={this.state.isLoading}
                                        total_record={this.state.mdata}
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