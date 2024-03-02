import React from 'react';
import PropTypes from 'prop-types';
import SidebarLink from './SidebarLink';
import SidebarCategory from './SidebarCategory';
import { ROLE, USER } from '../../../configs/exports';

const SidebarContent = ({
  onClick, changeToLight, changeToDark, sidebarCollapse,
}) => {
  const hideSidebar = () => {
    onClick();
  };

  return (
    <div className="sidebar__content">

      {ROLE == 'admin' ?
        <>
          <SidebarLink title="Dashboard" route="/dashboard" icon="home" onClick={hideSidebar} />
          <SidebarLink title="Track" route="/googlemap" icon="map" onClick={hideSidebar} />
          <SidebarLink title="Owners" route="/owner" icon="users" onClick={hideSidebar} />

          <SidebarLink title="Agents" route="/customer" icon="users" onClick={hideSidebar} />

          <SidebarLink title="Services" route="/services" icon="briefcase" onClick={hideSidebar} />

          <SidebarLink title="Service Requests" route="/request_water" icon="users" onClick={hideSidebar} />


          <SidebarLink title="Transactions" route="/deposit" icon="briefcase" onClick={hideSidebar} />
          <SidebarLink title="User Profile" route="/user_profile" icon="users" onClick={hideSidebar} />

        </>
        : null}


      {ROLE == 'assistance' ?
        <>
          <SidebarLink title="Dashboard" route="/dashboard" icon="home" onClick={hideSidebar} />
          <SidebarLink title="Track" route="/googlemap" icon="map" onClick={hideSidebar} />
          <SidebarLink title="Owners" route="/owner" icon="users" onClick={hideSidebar} />
          <SidebarLink title="Agents" route="/customer" icon="users" onClick={hideSidebar} />


          <SidebarLink title="Services" route="/services" icon="briefcase" onClick={hideSidebar} />

          <SidebarLink title="Service Requests" route="/request_water" icon="users" onClick={hideSidebar} />

        </>
        : null}

      {ROLE == 'onwer' ?
        <>
          <SidebarLink title="Your Drivers" route="/driver" icon="users" onClick={hideSidebar} />
          <SidebarLink title="Services" route="/services_driver" icon="briefcase" onClick={hideSidebar} />
          <SidebarLink title="Track" route="/googlemap_one" icon="map" onClick={hideSidebar} />
        </>
        : null}


      <ul ul className="sidebar__block" >
        <SidebarCategory title="Layout" icon="layers" sidebarCollapse={sidebarCollapse}>
          <button className="sidebar__link" type="button" onClick={changeToLight}>
            <p className="sidebar__link-title">Light Theme</p>
          </button>
          <button className="sidebar__link" type="button" onClick={changeToDark}>
            <p className="sidebar__link-title">Dark Theme</p>
          </button>
        </SidebarCategory>

      </ul >

      <ul className="sidebar__block">
        <SidebarLink title="Log Out" icon="exit" route="/login" />
      </ul>
    </div >
  );
};

SidebarContent.propTypes = {
  changeToDark: PropTypes.func.isRequired,
  changeToLight: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  sidebarCollapse: PropTypes.bool,
};

SidebarContent.defaultProps = {
  sidebarCollapse: false,
};

export default SidebarContent;
