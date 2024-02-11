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
import DateTimeRangeContainer from 'react-advanced-datetimerange-picker'
import { FormControl } from 'react-bootstrap'


export class DepositMade extends React.Component {
    constructor(props) {
        super(props);

        this.columns = [
            {
                key: "transaction_id",
                TrOnlyClassName: 'tsc',
                text: "Transaction",
                className: "tsc",
                align: "left"
            },
            {
                key: "msisdn",
                TrOnlyClassName: 'tsc',
                text: "Msisdn",
                className: "tsc",
                align: "left"
            },

            {
                key: "amount",
                TrOnlyClassName: 'tsc',
                text: "Amounr",
                className: "tsc",
                align: "left"
            },

            {
                key: "reference",
                TrOnlyClassName: 'tsc',
                text: "Reference",
                className: "tsc",
                align: "left"
            },
            {
                key: "dates1",
                TrOnlyClassName: 'tsc',
                text: "Date Created",
                className: "tsc",
                align: "left"
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
                filter: "Search here",
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

        const start = moment(new Date());
        this.state = {
            admins: [],
            isLoading: true,
            startDate: moment(new Date()),
            endDate: moment(new Date()),
            datevalue: "Today",
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
            isPageLoad: true,

            data: [],
        };



        this.ranges = {
            "Today Only": [moment(this.state.startDate), moment(this.state.endDate)],
            "Yesterday Only": [
                moment(this.state.startDate).subtract(1, "days"),
                moment(this.state.endDate).subtract(1, "days")
            ],
            "3 Days": [moment(this.state.startDate).subtract(3, "days"), moment(this.state.endDate)],
            "5 Days": [moment(this.state.startDate).subtract(5, "days"), moment(this.state.endDate)],
            "1 Week": [moment(this.state.startDate).subtract(7, "days"), moment(this.state.endDate)],
            "2 Weeks": [moment(this.state.startDate).subtract(14, "days"), moment(this.state.endDate)],
            "1 Month": [moment(this.state.startDate).subtract(1, "months"), moment(this.state.endDate)],
            "1 Year": [moment(this.state.startDate).subtract(1, "years"), moment(this.state.endDate)]
        };
        this.local = {
            "format": "DD-MM-YYYY",
            "sundayFirst": false
        };
    }


    async componentDidMount() {
        this.getData("", this.state.startDate, this.state.endDate)
    }

    getData = (querystring = "", startDate, endDate) => {

        let url = baseURL + `transaction?startDate="${moment(startDate).format('YYYY-MM-DD')}"&endDate="${moment(endDate).format('YYYY-MM-DD')}"`;
        this.setState({
            isLoading: true,
        })
        axios.all([
            axios.get(url, CONFIG)
        ]).then(axios.spread((branchResponse) => {
            this.setState({
                admins: branchResponse.data.data,
                isLoading: false,
            }, function () {
                var data = [];
                if (this.state.admins.length > 0) {
                    for (let i = 0; i < this.state.admins.length; i++) {
                        let date1 = { dates1: moment(this.state.admins[i].created_at).utc().format("DD-MMM-yyyy HH:mm:ss") };

                        data.push(Object.assign(date1, this.state.admins[i]));
                        this.setState({
                            data: data
                        })

                        console.log("bugs", data);
                    }
                } else {
                    this.setState({
                        data: data
                    })
                }



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
        this.getData(queryString, this.state.startDate, this.state.endDate)

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


    applyCallback = (startDate, endDate) => {
        const Sdate1 = moment(startDate).format('DD MMM, YYYY');
        const Edate2 = moment(endDate).format('DD MMM, YYYY');
        localStorage.setItem("STARTDATE", startDate)
        localStorage.setItem("ENDDATE", endDate)

        this.setState({ datevalue: Sdate1 + " " + Edate2, startDate: startDate, endDate: endDate })


        this.getData("", startDate, endDate)

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
                                    <div className="col-md-8">
                                        <h5>Transactions Made</h5>
                                    </div>

                                    {/* <div className="col-md-4 float-right">
                                        <button className="btn btn-primary" onClick={this.isOpen} > Add New Geologist
                                        </button>
                                    </div> */}
                                </div>
                                <div className="col-3">
                                    <DateTimeRangeContainer
                                        ranges={this.ranges}
                                        start={this.state.startDate}
                                        end={this.state.endDate}
                                        local={this.local}
                                        applyCallback={this.applyCallback}>
                                        <FormControl
                                            id="formControlsTextB"
                                            type="text"
                                            value={this.state.datevalue}
                                            label="Text"
                                            placeholder="Filter by Date"
                                        />
                                    </DateTimeRangeContainer>
                                </div>


                                <br />
                                <div className="panel-body" >

                                    <ReactDatatable
                                        config={this.config}
                                        records={this.state.data}
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