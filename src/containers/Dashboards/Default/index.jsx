import React, { useEffect } from 'react';
import { Col, Row } from 'reactstrap';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
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
      <Row >
        {ROLE === 1 ?
          <>
            {/* <BreakingAdminnews /> */}

            <Visits />
            {/* <PassportDoc />

            <Medical1 /> */}

          </>
          : null}

          <>
            {/* <BreakingAdminnews />

            <Visits />
            <PassportDoc />

            <Medical1 /> */}

          </>
         

      </Row>
      <br />
      {/* <ApplicantDocuSummary /> */ }
    </Col >
  )
}

DefaultDash.propTypes = {
  t: PropTypes.func.isRequired,
};

export default compose(withTranslation('common'), connect(state => ({
  rtl: state.rtl,
})))(DefaultDash);
