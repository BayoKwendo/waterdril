import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'reactstrap';
import classNames from 'classnames';

const SidebarCategory = ({
  title, icon, isNew, children, sidebarCollapse,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const categoryClass = classNames({
    'sidebar__category-wrap': true,
    'sidebar__category-wrap--open': isCollapsed,
    'sidebar__link sidebar__category': true,
  });

  const collapseSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={sidebarCollapse ? 'sidebar-collapse-wrapper' : ''}>
      <button className={categoryClass} type="button" onClick={collapseSidebar}>

        {icon ? <span className={`sidebar__link-icon lnr lnr-${icon}`} style={{ color: "black" }} /> : ''}
        <p className="sidebar__link-title" >{title}
          {isNew && <span className="sidebar__category-new" />}
        </p>        <span className="sidebar__category-icon lnr lnr-chevron-right" />
      </button>
      <Collapse isOpen={sidebarCollapse || isCollapsed} className="sidebar__submenu-wrap">
        <ul className="sidebar__submenu">
          <div>
            {children}
          </div>
        </ul>
      </Collapse>
    </div>
  );
};

SidebarCategory.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  isNew: PropTypes.bool,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  sidebarCollapse: PropTypes.bool.isRequired,
};

SidebarCategory.defaultProps = {
  icon: '',
  isNew: false,
};

export default SidebarCategory;
