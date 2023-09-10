import * as React from 'react';
import '../../_assets/css/file.css';
import axios from 'axios';

import { Card, CardBody, Col, Button } from 'reactstrap';
import PhoneOutlineIcon from 'mdi-react/PhoneOutlineIcon';
import Input from 'react-phone-number-input/input'
import { baseURL, CONFIG } from '../../configs/exports';
// import FarmerDetails from '../Farmers/FarmerDetails';


export class UserSearch extends React.Component {

    constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            phone_number: '',
            showError: false,
            farmerProps: {},
            userDetail: false,
            isShowError: false,
            counts: 0,
        }

        localStorage.setItem("phone_2", null);
    }

    onSubmit(e) {
        e.preventDefault();
        // alert(this.state.phone_number.replaceAll("+", ""))
        // let formData = {
        //     "msisdn": this.state.phone_number.replaceAll("+", "")
        // }

        // alert(baseURL+'customersone/'+this.state.phone_number.replaceAll("+", ""))

        this.setState({ isLoading: true });


        axios.get(baseURL + 'customersone/' + this.state.phone_number.replaceAll("+", ""), CONFIG).then((response) => {
            console.log("bayo", response.data)
            if (response.data.data) {
                localStorage.setItem('phone', this.state.phone_number.replaceAll("+", ""))

                this.setState({
                    statusMessage: "Success! Redirecting....",
                    farmerProps: response.data.data,
                    isShowError: true, isLoading: false, showError: false,

                });
                setTimeout(() => {
                    window.location.href = "/userdetail";
                    this.setState({
                        statusMessage: response.data.message,
                        phone_number: '',
                        userDetail: true,
                        isShowError: true, isLoading: false, showError: false,
                    });
                }, 1000);
            } else {
                this.setState({ statusMessage: "Check our input", phone_number: '', userDetail: false, showError: true, isShowError: false, isLoading: false });
            }
        }).catch(error => {
            console.log('bayoo', error.response)
            this.setState({
                showError: true,
                isShowError: false,
                phone_number: '',
                userDetail: false,
                statusMessage: error.response.data.message,
                submitted: true,
                isLoading: false
            });
        });
    }
    x
    componentDidMount() {
        axios.get(baseURL + 'smscount', CONFIG).then((response) => { this.setState({ counts: response.data.total }) }).catch(error => { })
    }
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { userDetail } = this.state;

        return (
            <div className="pcoded-main-container">
                {userDetail === true ?
                    <h4>dd</h4> :
                    <>
                        <Col md={12} lg={12}>
                            <Card>
                                <CardBody>
                                    <div className="card__title">
                                        <h5 className="bold-text">Fill the Below Field to Proceed </h5>
                                        <br /><br />
                                        <h5 className="bold-text">Total Customers: {this.state.counts}</h5>

                                    </div>

                                    {this.state.showError ? <div style={{ color: 'red' }}>
                                        {this.state.statusMessage}
                                    </div> : null}<br></br>
                                    {this.state.isShowError ? (
                                        <div color="success" style={{ fontSize: "13px", color: "green" }}>

                                            {this.state.statusMessage}

                                        </div>
                                    ) : null}<br></br>
                                    <form className="col-md-8 offset-md-2" onSubmit={this.onSubmit}>


                                        <span className="form__form-group-label">Phone No.</span>

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
                                                placeholder="Ваш телефон"
                                                name="phone_number"
                                                id="input"
                                                value={this.state.phone_number}
                                                onChange={value => this.setState({ phone_number: value })} />
                                        </div>
                                        <br />


                                        <div className="col-12">
                                            <br />
                                            <Button type="submit" outline color="primary" className="float-right" >
                                                {this.state.isLoading ? "Please Wait..." : "Search"}  <i className="fa fa-search"></i>
                                            </Button> &nbsp;&nbsp;&nbsp;
                                        </div>
                                    </form>
                                </CardBody>
                            </Card>
                        </Col>
                    </>
                }
            </div>
        )
    }
}

