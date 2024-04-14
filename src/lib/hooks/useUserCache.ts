import {
  useApolloClient,
  useLazyQuery,
  useMutation,
  useQuery,
} from '@apollo/client';
import type { UserType } from '@roadmanjs/auth-client';
import { GET_ME } from '@roadmanjs/auth-client';
import { awaitTo } from '@stoqey/client-graphql';
import _get from 'lodash/get';
import includes from 'lodash/includes';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { APPEVENTS, AppEvents } from '../AppEvent';
import { CREATE_VENDOR_MUTATION, GET_VENDOR } from '../gql';
import { userCacheManager } from '../storage/deviceStorage';

/**
 * UserType cache hook
 * @returns UserType
 */
export const useUserCache = (): UserType => {
  const [user, setUser] = useState<UserType>();

  useEffect(() => {
    const run = async () => {
      // API call
      const userData = await userCacheManager.get();
      if (userData) {
        setUser(userData);
      }
    };
    run();
  }, []);

  return !user ? ({} as any) : user;
};

/**
 * Get me from API
 * save it to local cache and return it
 * @returns userType
 */
export const useMeApi = (): UserType => {
  const client = useApolloClient();

  const [user, setUser] = useState<UserType>();

  React.useEffect(() => {
    const appEvents = AppEvents.Instance;
    const logout = async () => {
      appEvents.emit(APPEVENTS.LOGOUT, APPEVENTS.LOGOUT);
    };

    const getMe = async () => {
      const [errors, data] = await awaitTo(
        client.query<{ me: UserType }>({
          query: GET_ME,
          fetchPolicy: 'network-only',
        }),
      );

      // update user object from here
      if (data && data.data) {
        const userme: UserType = data.data.me;
        await userCacheManager.set(userme);
        setUser(userme);
      }

      if (errors) {
        // Check if there are any errors
        // Emit to any logout listeners
        const message = errors.toString();
        if (includes(message, 'not authenticated')) {
          await logout();
        }
      }
    };

    getMe();
  }, []);

  return user as UserType;
};

export const useMeApiWithLoading = (): { user: UserType; loading: boolean } => {
  const client = useApolloClient();
  const appEvents = AppEvents.Instance;

  const logout = async () => {
    appEvents.emit(APPEVENTS.LOGOUT, APPEVENTS.LOGOUT);
  };

  const [getMeAPI, { loading, data }] = useLazyQuery<{ me: UserType }>(GET_ME, {
    fetchPolicy: 'network-only',
    onCompleted: async (res) => {
      const userme: UserType = res.me;
      await userCacheManager.set(userme);
    },
    onError: (error) => {
      const message = error.toString();
      if (includes(message, 'not authenticated')) {
        logout();
      }
    },
  });

  React.useEffect(() => {
    if ((data && data.me) || loading) {
      return;
    }

    getMeAPI();
  }, []);

  const user = data?.me;

  return { user, loading };
};

export const useVendor = () => {
  const { push } = useRouter();
  const { data } = useQuery(GET_VENDOR, {
    fetchPolicy: 'network-only',
  });
  const [createVendor, { data: dataCreate }] = useMutation(
    CREATE_VENDOR_MUTATION,
  );
  const success = _get(dataCreate, 'data.success');
  const message = _get(dataCreate, 'data.message');

  const vendor = _get(data, 'data', _get(dataCreate, 'data.data', null));

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (typeof success === 'boolean') {
      const closeTimeout = setTimeout(() => {
        if (success) {
          toast.success(`Store successfully created`);

          push('/store/ads');
        } else {
          toast.error(message);
        }
      }, 1000);
      return () => clearTimeout(closeTimeout);
    }
  }, [success]);

  return {
    vendor,
    createVendor,
    // loading, loadingCreate
  };
};
