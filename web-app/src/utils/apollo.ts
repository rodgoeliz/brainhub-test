/* eslint-disable no-console */
import { ApolloClient, NormalizedCacheObject, HttpLink, InMemoryCache, defaultDataIdFromObject } from '@apollo/client';

import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { store } from 'redux/Store';

const createClient = (onAuthError: () => void): ApolloClient<NormalizedCacheObject> => {
  const httpLink = new HttpLink({
    uri: process.env.REACT_APP_ENDPOINT_GQL,
    credentials: 'include',
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path, extensions }) => {
        console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
        if (extensions?.code === 'UNAUTHENTICATED') onAuthError();
      });
    }
    if (networkError) console.error(`[Network error]: ${networkError}`);
  });

  const authLink = setContext((_, { headers }) => {
    const {
      user: { token },
    } = store.getState();
    return {
      headers: {
        ...headers,
        ...(token && { authorization: `Bearer ${token}` }),
      },
    };
  });

  return new ApolloClient({
    connectToDevTools: process.env.NODE_ENV === 'development',
    cache: new InMemoryCache({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      dataIdFromObject: (object: any) => {
        switch (object?.__typename) {
          case 'Event':
            return object.id;
          case 'EventUpdateResponse':
            return object.event.id;
          default:
            if (process.env.NODE_ENV === 'development') {
              console.warn(`Unhandled __typename = ${object.__typename} for caching`);
              console.warn(object);
            }
            return defaultDataIdFromObject(object);
        }
      },
    }),
    link: errorLink.concat(authLink.concat(httpLink)),
  });
};

export { createClient };
