import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MainWrapper from '../MainWrapper';
import NotFound404 from '../../DefaultPage/404/index';
import LogIn from '../../Account/LogIn/index';
import WrappedRoutes from './WrappedRoutes';

const Router = () => (
  <MainWrapper>
    <main>
      <Switch>
        <Route path="/404" component={NotFound404} />
        <Route exact path="/" component={LogIn} />
        <Route path="/login" component={LogIn} />

        <Route path="/" component={WrappedRoutes} />
      </Switch>
    </main>
  </MainWrapper>
);

export default Router;