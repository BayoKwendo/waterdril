/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import {
  BarChart, Bar, Cell, ResponsiveContainer,
} from 'recharts';
import TrendingUpIcon from 'mdi-react/TrendingUpIcon';
import TrendingDownIcon from 'mdi-react/TrendingDownIcon';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { baseURL } from '../../../../_helpers';
import axios from 'axios';
import { TOKEN } from '../../../../_helpers/exports';

const NO1 = localStorage.getItem('entity');
const NO7 = localStorage.getItem('branch');
const NO2 = localStorage.getItem('staffs');
const NO3 = localStorage.getItem('students');
const NO4 = localStorage.getItem('parents');
const NO5 = localStorage.getItem('nfc-tags');
const NO6 = localStorage.getItem('devices');


const data = [
  { name: 'Entities', uv: NO1 },
  { name: 'Branches', uv: NO7 },
  { name: 'Staffs', uv: NO2 },
  { name: 'Students', uv: NO3 },
  { name: 'Parents', uv: NO4 },
  { name: 'NFC-Tags', uv: NO5 },
  { name: 'NFC-Devices', uv: NO6 },
];

class Passport_Photo extends PureComponent {
  static propTypes = {
    t: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
    };
  }


  componentDidMount() {
    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        "Authorization": TOKEN
      }
    };
    let url = baseURL + "dashboard"

    axios.all([axios.get(url, axiosConfig)]).then(axios.spread((branchResponse) => {
      this.setState({
        doc_name: branchResponse.data.data[0].doc_name,
        doc_remain: branchResponse.data.data[0].remains,
        total: branchResponse.data.data[0].count

      })
    })).catch(error => {
      console.log('jwtcheck', error.response.data.status_code)

      // window.location.href = "/log_in";
    })
  }
  handleClick = (item) => {
    const index = data.indexOf(item.payload);
    this.setState({
      activeIndex: index,
    });
  };

  render() {
    const { activeIndex } = this.state;

    return (

      <Col lg={3} xs={12}>
        <Card>
          <CardBody className="dashboard__card-widget">
            <div className="card__title">
              <h5 className="bold-text">{this.state.doc_name}</h5>
            </div>

            <div className="dashboard__total pull-left" >
              <TrendingDownIcon className="dashboard__trend-icon" />
              <p>Remaining</p>
              <p className="dashboard__total-stat" style={{ fontSize: "20px", color: "red" }}>
                {this.state.doc_remain}
              </p>
              <div className="dashboard__chart-container">
                <ResponsiveContainer height={50}>
                  <BarChart data={data}>
                    <Bar dataKey="uv" onClick={this.handleClick}>
                      {
                        data.map((entry, index) => (
                          <Cell
                            cursor="pointer"
                            fill={index === activeIndex ? '#4ce1b6' : '#4ce1b6'}
                            key={`cell-${index}`}
                          />
                        ))
                      }
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="dashboard__total pull-right" >
              <TrendingUpIcon className="dashboard__trend-icon" />
              <p>Submitted</p>
              <p className="dashboard__total-stat" style={{ fontSize: "20px", color: "green" }}>
                {this.state.total}
              </p>
              <div className="dashboard__chart-container">
                <ResponsiveContainer height={50}>
                  <BarChart data={data}>
                    <Bar dataKey="uv" onClick={this.handleClick}>
                      {
                        data.map((entry, index) => (
                          <Cell
                            cursor="pointer"
                            fill={index === activeIndex ? '#4ce1b6' : '#4ce1b6'}
                            key={`cell-${index}`}
                          />
                        ))
                      }
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

export default withTranslation('common')(Passport_Photo);
