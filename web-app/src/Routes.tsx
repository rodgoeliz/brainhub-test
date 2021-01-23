import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';
import { RootState } from 'redux/Store';

import EventRegistrationPage from './pages/EventRegistrationPage';
import LoginPage from './pages/LoginPage';

const PATHS = {
  login: '/login',
  event: '/event',
};

export const Routes: React.FC = () => {
  const { token } = useSelector((state: RootState) => state.user);
  return (
    <Switch>
      {!token && <Route exact path={PATHS.login} component={LoginPage} />}
      {token && <Route exact path={PATHS.event} component={EventRegistrationPage} />}
      {!token && <Redirect to={PATHS.login} />}
      <Redirect to={PATHS.event} />
    </Switch>
  );
};
