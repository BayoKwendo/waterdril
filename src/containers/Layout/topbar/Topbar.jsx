import React from 'react';
import PropTypes from 'prop-types';
import { UserProps } from '../../../shared/prop-types/ReducerProps';
import TopbarSidebarButton from './TopbarSidebarButton';
import TopbarProfile from './TopbarProfile';
import { Link } from 'react-router-dom';
// import TopbarMail from './TopbarMail';
// import TopbarNotification from './TopbarNotification';
// import TopbarSearch from './TopbarSearch';
// import TopbarLanguage from './TopbarLanguage';

const Topbar = ({
  changeMobileSidebarVisibility, changeSidebarVisibility, user,
}) => (
  <div className="topbar">
    <div className="topbar__left">
      <TopbarSidebarButton
        changeMobileSidebarVisibility={changeMobileSidebarVisibility}
        changeSidebarVisibility={changeSidebarVisibility}
      />
      <h5 style={{marginTop: '18px'}}><b>WaterDrill</b></h5>
      {/* <Link className="topbar__logo" to="/online_marketing_dashboard" /> */}
    </div>
    <div className="topbar__right">
        {/* <TopbarNotification />
        <TopbarMail new /> */}
        <TopbarProfile user={user} />
        {/* <TopbarLanguage /> */}
      </div>
   </div>
);

Topbar.propTypes = {
  changeMobileSidebarVisibility: PropTypes.func.isRequired,
  changeSidebarVisibility: PropTypes.func.isRequired,
  user: UserProps,
};

Topbar.defaultProps = {
  user: {},
};

export default Topbar;
