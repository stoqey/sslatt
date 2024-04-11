/* eslint-disable no-param-reassign */
import {
  ApolloClient,
  ApolloLink,
  from,
  HttpLink,
  InMemoryCache,
  split,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';
import includes from 'lodash/includes';
import { cookies } from 'next/headers';
import omitDeep from 'omit-deep';

import { APPEVENTS, AppEvents } from './AppEvent';
import { isLocalNetwork, isTorNetwork } from './utils/url.util';

export const apiUrl = process.env.API_URL;

function createApolloClient() {
  const cookieStore = cookies();
  const events = AppEvents.Instance;
  const isTor = isTorNetwork();
  const isBrowser = typeof window !== 'undefined';

  const useHttps = !(isTor || isLocalNetwork(apiUrl));
  const devBaseUrl = `://${apiUrl}/graphql`;
  const backendUrl = `http${useHttps ? 's' : ''}${devBaseUrl}`;
  const wsUrl = `ws${useHttps ? 's' : ''}${devBaseUrl}`;

  console.log('api server server', backendUrl);

  const cleanTypeName = new ApolloLink((operation, forward) => {
    if (operation.variables) {
      operation.variables = omitDeep(operation.variables, '__typename');
    }
    return forward(operation).map((data) => {
      return data;
    });
  });

  const authLink = setContext(async (_, ctx) => {
    const headers = (ctx && ctx.headers) || {};
    // console.log('<-----------> AuthContext <-----------> BEGIN ', getLastChar(token))
    // const authorization = await accessTokenManager.get();
    const authorization = await cookieStore.get('accessToken')?.value;
    // console.log("<-----------> AuthContext <-----------> END ", authorization);

    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${authorization}`,
      },
    };
  });

  const wsLink =
    isBrowser && !isTor
      ? new WebSocketLink({
          // if you instantiate in the server, the error will be thrown
          uri: wsUrl,
          options: {
            reconnect: true,
          },
        })
      : null;

  // Log any GraphQL errors or network error that occurred
  const errorLink = onError(
    ({ graphQLErrors, networkError, operation, response }) => {
      try {
        if (graphQLErrors && (graphQLErrors.forEach as any)) {
          // Not Authorised!
          // eslint-disable-next-line array-callback-return
          graphQLErrors.map(({ message, locations, path, originalError }) => {
            console.error('originalError', {
              message,
              originalError,
              locations,
              path,
            });
            // not authorized
            // if (includes(message, 'Expired')) {
            //   // Refresh to token from here
            //   // authHelper
            //   //   .refreshToken()
            //   //   .then(accessToken => {
            //   //     log.info('Got new refresh token', getLastChar(accessToken));
            //   //     return AsyncStorageDB.Instance.updateUserAuth({
            //   //       accessToken,
            //   //     });
            //   //   })
            //   //   .then(updatedUser => {
            //   //     log.error('updatedUser refresh token', updatedUser);
            //   //   })
            //   //   .catch(error => {
            //   //     log.error('error updatedUser refresh token', error);
            //   //   });

            //   // log.error('Error when refreshing TOKEN', message);
            // }
            if (includes(message.toLocaleLowerCase(), 'not authenticated')) {
              // console.log('APPEVENTS.LOGOUT not authenticated server', message);
              // Ask user to login again
              events.emit(APPEVENTS.LOGOUT, APPEVENTS.LOGOUT); // emit logout
            }
          });

          // @ts-ignore
          response.errors = null; // ignore errors
        }
      } catch (error) {
        // console.error('error with graphql', error);
      }
    },
  );

  const tcpLink =
    isBrowser && !isTor
      ? split(
          ({ query }) => {
            // @ts-ignore
            const { kind, operation } = getMainDefinition(query);
            return (
              kind === 'OperationDefinition' && operation === 'subscription'
            );
          },
          wsLink as any,
          authLink,
        )
      : authLink;

  const link = from([
    errorLink,
    cleanTypeName,
    tcpLink,
    authLink,
    new HttpLink({
      uri: backendUrl,
    }),
  ]);

  return new ApolloClient({
    cache: new InMemoryCache(),
    link,
  });
}

export const { getClient } = registerApolloClient(() => {
  return createApolloClient();
});
