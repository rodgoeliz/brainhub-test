import React, { useCallback, useMemo } from 'react';
import { ApolloProvider } from '@apollo/client';

import { createClient as createApolloClient } from './apollo';
import { logout } from 'redux/UserSlice';
import { useDispatch } from 'react-redux';

const CustomApolloProvider: React.FC = ({ children }) => {
  const dispatch = useDispatch();

  const handleGraphQLError = useCallback(() => {
    dispatch(logout());
  }, [logout]);

  const client = useMemo(() => createApolloClient(handleGraphQLError), [handleGraphQLError]);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export { CustomApolloProvider };
