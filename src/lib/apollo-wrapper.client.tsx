/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-param-reassign */

'use client';

import type { ApolloClient } from '@apollo/client';
import { ApolloLink, from, HttpLink, split } from '@apollo/client';
import { loadDevMessages, loadErrorMessages } from '@apollo/client/dev';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import {
  ApolloNextAppProvider,
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr';
import includes from 'lodash/includes';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { setVerbosity } from 'ts-invariant';

import { APPEVENTS, AppEvents } from './AppEvent';
import { useAppEvent } from './hooks/useAppEvent';
import { accessTokenManager } from './storage/deviceStorage';
import { isLocalNetwork, isTorNetwork } from './utils/url.util';

if (process.env.NODE_ENV === 'development') {
  setVerbosity('debug');
  loadDevMessages();
  loadErrorMessages();
}

// @ts-ignore
let apolloClient: ApolloClient;

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function createApolloClient() {
  const events = AppEvents.Instance;
  const isTor = isTorNetwork();
  const isBrowser = typeof window !== 'undefined';

  const urlFromJson = API_URL;
  const useHttps = !(isTor || isLocalNetwork(urlFromJson));
  const devBaseUrl = `://${urlFromJson}/graphql`;
  const backendUrl = `http${useHttps ? 's' : ''}${devBaseUrl}`;
  const wsUrl = `ws${useHttps ? 's' : ''}${devBaseUrl}`;

  console.log('api server', backendUrl);

  const authLink = setContext(async (_, ctx) => {
    const headers = (ctx && ctx.headers) || {};
    // console.log('<-----------> AuthContext <-----------> BEGIN ', getLastChar(token))
    const authorization = await accessTokenManager.get();
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
  const errorLink = onError(({ graphQLErrors, response }) => {
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
  });

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
    tcpLink,
    authLink,
    errorLink,
    new HttpLink({
      uri: backendUrl,
    }),
  ]);

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link: !isBrowser
      ? ApolloLink.from([
          // in a SSR environment, if you use multipart features like
          // @defer, you need to decide how to handle these.
          // This strips all interfaces with a `@defer` directive from your queries.
          new SSRMultipartLink({
            stripDefer: true,
          }),
          link,
        ])
      : link,
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={createApolloClient}>
      {children}
    </ApolloNextAppProvider>
  );
}

export function initializeApollo(initialState = {}) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();
    // Restore the cache using the data passed from getStaticProps/getServerSideProps
    // combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState?: ApolloClient<any>) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}

/**
 * Use logout session
 * @returns
 */
export function useLogoutSession(): [() => Promise<void>] {
  const { push } = useRouter();

  const logoutUser = async () => {
    await accessTokenManager.delete();
    return push('/login');
  };

  return [logoutUser];
}

export const apolloClientEvents = () => {
  const logoutEvent = useAppEvent(APPEVENTS.LOGOUT);
  const [logout] = useLogoutSession();

  useEffect(() => {
    if (logoutEvent) {
      logout();
    }
  }, [logoutEvent]);
};
