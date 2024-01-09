import React, { useEffect } from 'react';
import { Col, Row } from 'reactstrap';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import img from '../../../_assets/img/logo.png'

import Visits from './components/Visits';
import { ROLE } from '../../../configs/exports';
// import BreakingAdminnews from './components/breakingNews';
// import ApplicantDocuSummary from './components/ApplicantDocuSummary';
// import PassportDoc from './components/Passport_Doc';
// import Medical1 from './components/Medical1';


function DefaultDash({ t, rtl }) {

  useEffect(() => { })

  return (
    <Col className="dashboard">
      <Row>
        <Col md={12}>
          <h3 className="page-title">Dashboard</h3>
        </Col>
      </Row>

      <Row>
        <Col md={3}>
          <img className='center' src={img} alt="logo" />
        </Col>
        <Col md={9} className='center'>
          <br /><br /><br /><br /><br />
          <p><b>SMART DRILLING</b> is a system which helps both agents and drilling equipment owners have a smooth seamless ecosystem</p>
          <p>It helps the agents order any drilling equipment that is within the shortest proximity to the site of need.</p>
          <p>It also helps to link the owners of the drilling equipment to the nearby agent  with the project to be worked on.</p>
          <p>It helps standardize the prices to be paid to the equipment  owners because of the short distances to be covered hence maximizing the profits to be accrued by the agents.</p>
          <p>It helps the agent to track the equipment real time as it comes to the site and that helps him/her to manage the client with exact timelines.</p>
          <p>With the system there will be a neutral moderator between the agent and the equipment owners.This is going to sort payment  issues which arises with the status quo of operations without the system</p>
        </Col>
      </Row>
    </Col >
  )
}

DefaultDash.propTypes = {
  t: PropTypes.func.isRequired,
};

export default compose(withTranslation('common'), connect(state => ({
  rtl: state.rtl,
})))(DefaultDash);
