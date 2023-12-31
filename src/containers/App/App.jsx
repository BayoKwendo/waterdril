import React, { Component, Fragment } from 'react';
import { connect, Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'bootstrap/dist/css/bootstrap.css';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import '../../scss/app.scss';
import PropTypes from 'prop-types';
import Router from './Router';
import store from './store';
import ScrollToTop from './ScrollToTop';
import { config as i18nextConfig } from '../../translations';
import firebaseConfig from '../../config/firebase';
import Auth0Provider from '../../shared/components/auth/withAuth0';
import auth0Config from '../../config/auth0';
import IdleTimer from 'react-idle-timer'

i18n.init(i18nextConfig);

const ThemeComponent = ({ children, themeName }) => {
  const theme = createMuiTheme({
    palette: {
      type: themeName === 'theme-dark' ? 'dark' : 'light',
    },
  });
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
};

ThemeComponent.propTypes = {
  children: PropTypes.shape().isRequired,
  themeName: PropTypes.string.isRequired,
};

const ConnectedThemeComponent = connect(state => ({ themeName: state.theme.className }))(ThemeComponent);
class App extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      loaded: false,
    };
    this.idleTimer = null
    this.handleOnAction = this.handleOnAction.bind(this)
    this.handleOnActive = this.handleOnActive.bind(this)
    this.handleOnIdle = this.handleOnIdle.bind(this)
  }

  componentDidMount() {
    // axios.get(baseURL).then(res => { })
    window.addEventListener('load', () => {
      this.setState({ loading: false });
      setTimeout(() => this.setState({ loaded: true }), 100);
    });
    firebase.initializeApp(firebaseConfig);


  }

  onRedirectCallbackAuth0 = (appState) => {
    window.history.replaceState(
      {},
      document.title,
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname,
    );
  }

  render() {
    return (
      <Provider store={store}>
        <Auth0Provider
          domain={auth0Config.domain}
          clientId={auth0Config.clientId}
          // redirectUri={`${window.location.origin}/luckybox/dashboard_default`}
          // returnTo={`${window.location.origin}/luckybox/dashboard_default`}
          onRedirectCallback={this.onRedirectCallbackAuth0}
        >
          <BrowserRouter >
            <I18nextProvider>
              <ScrollToTop>
                <Fragment>
                  <ConnectedThemeComponent>
                    <IdleTimer
                      ref={ref => { this.idleTimer = ref }}
                      timeout={1000 * 60 * 15}
                      onActive={this.handleOnActive}
                      onIdle={this.handleOnIdle}
                      onAction={this.handleOnAction}
                      debounce={250}
                    />
                    <Router />
                  </ConnectedThemeComponent>
                </Fragment>
              </ScrollToTop>
            </I18nextProvider>
          </BrowserRouter>
        </Auth0Provider>
      </Provider>
    );
  }

  handleOnAction(event) {
    console.log('user did something', event)
  }

  handleOnActive(event) {
    console.log('user is active', event)
    console.log('time remaining', this.idleTimer.getRemainingTime())
  }

  handleOnIdle(event) {
    console.log('user is idle', event)
    console.log('last active', this.idleTimer.getLastActiveTime())
    window.location.href = "/";
    localStorage.removeItem('token');
  }
}


export default App;

