import React, { useState, Fragment, useEffect } from 'react';
import ReactDatatable from '@ashvin27/react-datatable';
import axios from 'axios';
import { Card, CardBody, Table } from 'reactstrap';
import { TOKEN } from '../../../../_helpers/exports';
import { baseURL } from '../../../../_helpers';
import { Col } from 'react-bootstrap';

const ApplicantDocuSummary = () => {
    const [payments, setPaymentCategories] = useState([])
    const [isLoading, setLoad] = useState(true)


    useEffect(() => {
        setLoad(true)
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': TOKEN
            },
        };
        let url = baseURL + "dashboard";
        axios.all([
            axios.get(url, config)
        ]).then(axios.spread((paymentResponse) => {
            let data = [];
            if (paymentResponse.data.data.length > 0) {
                setLoad(false)
                setPaymentCategories(paymentResponse.data.data)
            } else {
                setLoad(false)
                setPaymentCategories(data)
            }
        }))

    }, []);


    const config = {
        key_column: "tsc",
        length_menu: [100, 200, 500],
        show_filter: false,
        show_pagination: false,
        pagination: 'advance',
        page_size: 100,
        show_length_menu: false,
        show_info: false,
        language: {
            loading_text: "Please be patient while data loads...",
            filter: "File No.",
            no_data_text: "No data was found",
            pagination: {
                next: <span>&#9658;</span>,
                previous: <span>&#9668;</span>
            }
        }
    }
    const columns = [
        {
            key: "doc_name",
            TrOnlyClassName: 'cell',            text: "Doc Name",
           className: "tsc",
            align: "left"
        },

        {
            key: "total",
            text: "Total Applicants",
            TrOnlyClassName: 'cell',
           className: "tsc",
            width: 250,
            sortable: false,
            cell: record => {
                return (
                    // eslint-disable-next-line
                    <Fragment className="center" >
                        <p href="#"
                            style={{ color: "black", marginRight: '10px' }}
                        >
                            {record.total_count}
                        </p>

                    </Fragment>
                );
            }
        },

        {
            key: "submitted",
            text: "Submitted",
            TrOnlyClassName: 'cell',
           className: "tsc",
            width: 250,
            sortable: false,
            cell: record => {
                return (
                    // eslint-disable-next-line
                    <Fragment className="center" >
                        <p href="#"
                            style={{ color: "green", marginRight: '10px' }}
                        >
                            {record.count}
                        </p>

                    </Fragment>
                );
            }
        },

        {
            key: "remains",
            text: "Remaining",
            TrOnlyClassName: 'cell',
           className: "tsc",
            width: 250,
            sortable: false,
            cell: record => {
                return (
                    // eslint-disable-next-line
                    <Fragment className="center" >
                        <p href="#"
                            style={{ color: "red", marginRight: '10px' }}
                        >
                            {record.remains}
                        </p>

                    </Fragment>
                );
            }
        },
    ];

    return (
        <div style={{ marginTop: "-20px" }} >

                <Col >
                    < Card  >
                        <CardBody >
                            <Table responsive hover>
                                <div className="panel-body" >

                                    <div className="row">
                                        <div className="col-md-12">
                                            <h4> <b>Application Documents</b></h4><br />
                                        </div>
                                    </div>
                                    <ReactDatatable
                                        config={config}
                                        records={payments}
                                        columns={columns}
                                        id="tsc"
                                        loading={isLoading} />
                                </div>
                            </Table>
                        </CardBody>


                    </Card>
                </Col>
        </div>
    )

}
export default ApplicantDocuSummary;
