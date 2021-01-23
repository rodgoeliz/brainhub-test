import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import { Routes } from './Routes';
import { CustomApolloProvider } from './utils/react-apollo';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from 'redux/Store';

export const App: React.FC = () => {
  return (
    <ReduxProvider store={store}>
      <BrowserRouter>
        <CustomApolloProvider>
          <Switch>
            <Routes />
          </Switch>
        </CustomApolloProvider>
      </BrowserRouter>
    </ReduxProvider>
  );
};
