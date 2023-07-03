import React, { Fragment } from 'react';
import ReactDatatable from '@ashvin27/react-datatable';
import axios from 'axios';
import { Card, CardBody, Col, Button } from 'reactstrap';
import { baseURL, CONFIG, formatCurrency } from '../../configs/exports';
import { Link } from 'react-router-dom';
import * as moment from 'moment';
import './style.css';
import '../Users/style.css'




export class UserDetails extends React.Component {
    constructor(props) {
        super(props);
        this.toggleModalCreate = this.toggleModalCreate.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);


        this.onSubmitblacklist = this.onSubmitblacklist.bind(this);


        this.columns = [
            {
                key: "id",
                TrOnlyClassName: 'tsc',
                text: "id",
                className: "tsc",
                align: "left"
            },
            {
                key: "msisdn",
                TrOnlyClassName: 'tsc',
                text: "Phone",
                className: "tsc",
                align: "left"
            },
            {
                key: "mname",
                TrOnlyClassName: 'tsc',
                text: "Name",
                className: "tsc",
                align: "left"
            },
            {
                key: "stake",
                TrOnlyClassName: 'tsc',
                text: "Stake",
                className: "tsc",
                align: "left"
            },
            {
                key: "mbalance",
                TrOnlyClassName: 'tsc',
                text: "Balance",
                className: "tsc",
                align: "left"
            },
            {
                key: "mbonus_balance",
                TrOnlyClassName: 'tsc',
                text: "Bonus Balance",
                className: "tsc",
                align: "left"
            },
            {
                key: "mtotal_deposit_amount",
                TrOnlyClassName: 'tsc',
                text: "Total Deposit Amount",
                className: "tsc",
                align: "left"
            },


        ];

        this.columns3 = [
            {
                key: "mtotal_deposit_count",
                TrOnlyClassName: 'tsc',
                text: "Join KeyWord",
                className: "tsc",
                align: "left"
            },

            {
                key: "mtotal_withdrawal_amount",
                TrOnlyClassName: 'tsc',
                text: "Total Withdrawal Amount",
                className: "tsc",
                align: "left"
            },
            {
                key: "mtotal_withdrawal_count",
                TrOnlyClassName: 'tsc',
                text: "Total Withdrawal Counts",
                className: "tsc",
                align: "left"
            },

            {
                key: "mdaily_withdrawal_amount",
                TrOnlyClassName: 'tsc',
                text: "Daily Withdrawal Amount",
                className: "tsc",
                align: "left"
            },

            {
                key: "mdaily_withdrawal_count",
                TrOnlyClassName: 'tsc',
                text: "Daily Withdrawal Counts",
                className: "tsc",
                align: "left"
            },

            {
                key: "mtimeCreated",
                TrOnlyClassName: 'tsc',
                text: "TIme Created",
                className: "tsc",
                align: "left"
            },
            {
                key: "action",
                text: "Blacklist?",
                TrOnlyClassName: 'cell',
                className: "cell",
                width: 250,
                sortable: false,
                cell: record => {
                    return (
                        <Fragment className="center" >
                            <button className="btn btn-danger"
                                title="Blacklist?"
                                style={
                                    { marginRight: '10px' }}
                                onClick={
                                    () => {
                                        if (window.confirm('Are you sure you want to add this customer to blacklist?'))
                                            this.onSubmitblacklist(record)
                                    }
                                } >

                                <span className="" > Click here </span>
                            </button>

                        </Fragment>
                    );
                }
            }

        ]
        this.config = {
            key_column: "tsc",
            length_menu: [10, 20, 50],
            show_filter: false,
            show_pagination: false,
            pagination: 'basic',
            page_size: 10,
            show_info: false,
            show_length_menu: false,
            language: {
                loading_text: "Please be patient while data loads..."
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
            data: [],
            oncall: true,
            call_status: "On Call",
            remarks: "Pending",
            isOpen: false,
            isOpenModel: false,
            call_value: [
                { value: 'On Call', label: 'On Call' }],

            remark_value: [

                { value: 'Pending', label: 'Pending' }],

        };
    }

    toggleModalCreate = e => {
        this.setState({
            isOpen: true,
        });
    };

    closeModalUpload = e => {
        this.setState({
            isOpen: false,
        });
    };

    onSubmitblacklist(record) {

        let formData = {
            "mobile": record.msisdn
        }

        console.log("DATA", JSON.stringify(formData))
        // this.setState({ isLoading: true });

        axios.post(baseURL + 'createBlackList', formData, CONFIG).then((response) => {
            console.log("bayo", response)
            // eslint-disable-next-line
            if (response.data.success == true) {
                console.log("records", formData)
                this.setState({ isShowError: true, isLoading: false });

                alert(response.data.message)

            } else {
                alert(response.data.message)

                this.setState({ isShowError: true, isLoading: false });

            }

        })
            .catch(error => {
                console.log('bayoo', error.response)

                this.setState({ isShowError: true, isLoading: false });


                alert(error.response.data.message)

            });

    }

    componentDidMount() {

        this.setState({ isLoading: true });
        axios.get(baseURL + 'customerOneDetails/' + localStorage.getItem("phone"), CONFIG).then((response) => {
            console.log("bayo", response.data)

            axios.get(baseURL + 'getCountOutMsgs/' + localStorage.getItem("phone"), {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
            }).then((response) => {
                localStorage.setItem('customerMsgOut', response.data.total_page)

            })
            var data = [];
            for (let i = 0; i < response.data.length; i++) {
                let mname;
                if (response.data[i].name === null) {
                    mname = { mname: "_" };
                } else {
                    mname = { mname: response.data[i].name };
                }

                let mbalance = { mbalance: formatCurrency(response.data[i].balance) };
                let mbonus_balance = { mbonus_balance: formatCurrency(response.data[i].bonus_balance) };
                let mtotal_deposit_amount = { mtotal_deposit_amount: formatCurrency(response.data[i].total_deposit_amount) };
                let mtotal_deposit_count = { mtotal_deposit_count: response.data[i].total_deposit_count.toString() };
                let mtotal_withdrawal_amount = { mtotal_withdrawal_amount: formatCurrency(response.data[i].total_withdrawal_amount) };
                let mtotal_withdrawal_count = { mtotal_withdrawal_count: response.data[i].total_withdrawal_count.toString() };
                let mdaily_withdrawal_amount = { mdaily_withdrawal_amount: formatCurrency(response.data[i].daily_withdrawal_amount) };
                let mdaily_withdrawal_count = { mdaily_withdrawal_count: response.data[i].daily_withdrawal_count.toString() };
                localStorage.setItem('customerID', response.data[i].customer_id)

                // let dates = { dates2: moment(response.data[i].date_last_active).format('DD MMM, YYYY HH:MM') };
                let mtimeCreated = { mtimeCreated: moment(response.data[i].date_created).format('DD MMM, YYYY HH:MM') };

                data.push(Object.assign(mtimeCreated, mbalance, mtotal_deposit_amount, mtotal_deposit_count,
                    mtotal_withdrawal_amount, mtotal_withdrawal_count,
                    mdaily_withdrawal_amount, mdaily_withdrawal_count, mbonus_balance, mname, response.data[i]));
                this.setState({
                    data: data,
                    isLoading: false,
                    number: response.data[i].msisdn
                })
            }

        }
        );

    }


    handleChange = value => {
        if (value != null) {
            this.setState(
                {
                    // ...this.state.editedInvoice,
                    call_status: value.value.toString(),
                    call_value: [{ value: value.value.toString(), label: value.value.toString() }],
                    // customer_name: value.label.toString(),
                });
        }
    };

    handleChangeMessage = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }


    handleChangeRemarks = value => {
        if (value != null) {

            this.setState(
                {
                    // ...this.state.editedInvoice,
                    remarks: value.value.toString(),
                    remark_value: [

                        { value: value.value.toString(), label: value.value.toString() }],

                    // customer_name: value.label.toString(),
                    // customer_nameinvoice2: value.customer_nameinvoice.toString(),
                    // customer_email: value.customer_email.toString(),
                });
        }
    };

    handleChangeCallType = value => {
        if (value != null) {

            this.setState(
                {
                    // ...this.state.editedInvoice,
                    call_type: value.value.toString(),
                    call_type_value: [

                        { value: value.value.toString(), label: value.value.toString() }],

                    // customer_name: value.label.toString(),
                    // customer_nameinvoice2: value.customer_nameinvoice.toString(),
                    // customer_email: value.customer_email.toString(),
                });
        }
    };


    render() {
        // console.log("Load", isLoading);
        return (
            <div>
                <>
                    <Col md={12}>
                        <h3>User Details</h3>

                    </Col>
                    < Col md={12} lg={12} >
                        < Card >
                            <CardBody >
                                <div className="panel-body" >
                                    <Link to="/find_user">
                                        <Button className="pull-right"
                                            color="primary" outline>Go Back</Button><br /> <br /><br />
                                    </Link>
                                    {this.state.isShowError ?
                                        <div className="alert alert-success" >
                                            {this.state.statusMessage}
                                        </div> : null
                                    }
                                    <div className="row">

                                        <div className="col-md-2">
                                            <div className="col-md-8 offset-md-2">

                                                <Link to="/game">
                                                    <Button className=""
                                                        color="primary" outline>Bets </Button><br /> <br /><br />
                                                </Link>
                                                <Link to="/statement">
                                                    <Button className=""
                                                        color="primary" outline>Statements</Button><br /> <br /><br />
                                                </Link>
                                                <Link to="/ussdlogs">
                                                    <Button className=""
                                                        color="primary" outline>USSD Replies</Button><br /> <br /><br />
                                                </Link>


                                                <Link to="/deposit_request_one">
                                                    <Button className=""
                                                        color="primary" outline>Deposits</Button><br /> <br /><br />
                                                </Link>

                                                <Link to="/withdraw_request_one">
                                                    <Button className=""
                                                        color="primary" outline>Withdrawals</Button><br /> <br /><br />
                                                </Link>

                                                {/* <h3 className=""
                                                    color="primary" >Messages</h3><br /> <br />
                                                <Link to="/incoming">
                                                    <Button className=""
                                                        color="primary" outline> Incoming Messages </Button><br /> <br /><br />
                                                </Link>
                                                <Link to="/outgoing">
                                                    <Button className=""
                                                        color="primary" outline> Outgoing Messages </Button><br /> <br /><br />
                                                </Link>
                                                <Link to="/allmessages">
                                                    <Button className=""
                                                        color="primary" outline> All Messages </Button><br /> <br /><br />
                                                </Link> */}
                                            </div>
                                        </div>

                                        <div className="col-md-10">
                                            <h3>More about {localStorage.getItem("phone")}</h3><br />


                                            < ReactDatatable config={this.config}
                                                records={this.state.data}
                                                id="tsc"
                                                columns={this.columns}
                                                loading={this.state.isLoading}
                                                extraButtons={this.extraButtons}
                                            />


                                            < ReactDatatable config={this.config}
                                                records={this.state.data}
                                                id="tsc"
                                                columns={this.columns3}
                                                loading={this.state.isLoading}
                                                extraButtons={this.extraButtons}
                                            />

                                        </div></div>
                                </div>

                            </CardBody>

                        </Card>
                    </Col>
                </>
            </div>

        )
    }
}