import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';
import {
  CustomizerProps, SidebarProps, ThemeProps, RTLProps, UserProps, BlocksShadowsProps, RoundBordersProps,
} from '../../shared/prop-types/ReducerProps';
import { changeMobileSidebarVisibility, changeSidebarVisibility } from '../../redux/actions/sidebarActions';
import {
  changeThemeToDark, changeThemeToLight,
} from '../../redux/actions/themeActions';
import {
  changeDirectionToRTL, changeDirectionToLTR,
} from '../../redux/actions/rtlActions';
import { toggleTopNavigation } from '../../redux/actions/customizerActions';
import {
  changeRoundBordersToOnAction, changeRoundBordersToOffAction,
} from '../../redux/actions/roundBordersActions';
import {
  changeBlocksShadowsToOnAction, changeBlocksShadowsToOffAction,
} from '../../redux/actions/blocksShadowsActions';
import Topbar from './topbar/Topbar';
import TopbarWithNavigation from './topbar_with_navigation/TopbarWithNavigation';
import Sidebar from './sidebar/Sidebar';
import SidebarMobile from './topbar_with_navigation/sidebar_mobile/SidebarMobile';
import Customizer from './customizer/Customizer';
// import WelcomeNotification from './components/WelcomeNotification';

const Layout = ({
  dispatch, customizer, sidebar, theme, rtl, roundBorders, blocksShadows, user,
}) => {
  // const [isNotificationShown, setIsNotificationShown] = useState(false);

  // useEffect(() => {
  //   // if (!isNotificationShown) {
  //   //   WelcomeNotification(theme, rtl, setIsNotificationShown, isNotificationShown);
  //   // }
  // }, [theme, rtl, isNotificationShown]);

  const sidebarVisibility = () => {
    dispatch(changeSidebarVisibility());
  };

  const mobileSidebarVisibility = () => {
    dispatch(changeMobileSidebarVisibility());
  };

  const changeToDark = () => {
    dispatch(changeThemeToDark());
  };

  const changeToLight = () => {
    dispatch(changeThemeToLight());
  };

  const changeToRTL = () => {
    dispatch(changeDirectionToRTL());
  };

  const changeToLTR = () => {
    dispatch(changeDirectionToLTR());
  };

  const topNavigation = () => {
    dispatch(toggleTopNavigation());
  };

  const changeRoundBordersOn = () => {
    dispatch(changeRoundBordersToOnAction());
  };

  const changeRoundBordersOff = () => {
    dispatch(changeRoundBordersToOffAction());
  };

  const changeBlocksShadowsOn = () => {
    dispatch(changeBlocksShadowsToOnAction());
  };

  const changeBlocksShadowsOff = () => {
    dispatch(changeBlocksShadowsToOffAction());
  };

  const layoutClass = classNames({
    layout: true,
    'layout--collapse': sidebar.collapse,
    'layout--top-navigation': customizer.topNavigation,
  });

  return (
    <div className={layoutClass}>

      {customizer.topNavigation
        ? (
          <TopbarWithNavigation
            changeMobileSidebarVisibility={mobileSidebarVisibility}
          />
        )
        : (
          <Topbar
            changeMobileSidebarVisibility={mobileSidebarVisibility}
            changeSidebarVisibility={sidebarVisibility}
            user={user}
          />
        )}
      {customizer.topNavigation
        ? (
          <SidebarMobile
            sidebar={sidebar}
            changeToDark={changeToDark}
            changeToLight={changeToLight}
            changeMobileSidebarVisibility={changeMobileSidebarVisibility}
          />
        )
        : (
          <Sidebar
            sidebar={sidebar}
            changeToDark={changeToDark}
            changeToLight={changeToLight}
            changeMobileSidebarVisibility={changeMobileSidebarVisibility}
          />
        )}
    </div>
  );
};

Layout.propTypes = {
  dispatch: PropTypes.func.isRequired,
  sidebar: SidebarProps.isRequired,
  customizer: CustomizerProps.isRequired,
  theme: ThemeProps.isRequired,
  rtl: RTLProps.isRequired,
  roundBorders: RoundBordersProps.isRequired,
  blocksShadows: BlocksShadowsProps.isRequired,
  user: UserProps.isRequired,
};

export default withRouter(connect(state => ({
  customizer: state.customizer,
  sidebar: state.sidebar,
  theme: state.theme,
  rtl: state.rtl,
  roundBorders: state.roundBorders,
  blocksShadows: state.blocksShadows,
  user: state.user,
}))(Layout));
