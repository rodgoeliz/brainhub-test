/* eslint-disable no-console */
import {
  ApolloClient,
  NormalizedCacheObject,
  HttpLink,
  InMemoryCache,
  defaultDataIdFromObject,
  StoreObject,
} from '@apollo/client';

import { onError } from '@apollo/client/link/error';

const AUTH_TOKEN_EXPIRED_ERROR_PATTERN = /^.*: Expired something$/;

const createClient = (authToken: string | null, onAuthError: () => void): ApolloClient<NormalizedCacheObject> => {
  const httpLink = new HttpLink({
    uri: process.env.STORYBOOK ? process.env.STORYBOOK_GRAPHQL_URI : process.env.REACT_APP_GRAPHQL_URI,
    credentials: 'include',
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) => {
        console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
        if (message.match(AUTH_TOKEN_EXPIRED_ERROR_PATTERN)) onAuthError();
      });
    }
    if (networkError) console.error(`[Network error]: ${networkError}`);
  });

  return new ApolloClient({
    connectToDevTools: process.env.NODE_ENV === 'development',
    cache: new InMemoryCache({
      dataIdFromObject: (object: Readonly<StoreObject>) => {
        switch (object.__typename) {
          default:
            if (process.env.NODE_ENV === 'development') {
              console.warn(`Unhandled __typename = ${object.__typename} for caching`);
              console.warn(object);
            }
            return defaultDataIdFromObject(object);
        }
      },
    }),
    link: errorLink.concat(httpLink),
  });
};

export { createClient };
