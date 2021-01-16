import React, { useCallback, useMemo } from 'react';
import { ApolloProvider } from '@apollo/client';

import { createClient as createApolloClient } from './apollo';

const CustomApolloProvider: React.FC = ({ children }) => {
  const { authToken, doLogout } = { authToken: '', doLogout: () => null };

  const handleGraphQLError = useCallback(() => {
    doLogout();
  }, [doLogout]);

  const client = useMemo(() => createApolloClient(authToken, handleGraphQLError), [authToken, handleGraphQLError]);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export { CustomApolloProvider };
