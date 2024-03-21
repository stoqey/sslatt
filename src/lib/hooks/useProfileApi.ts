import type { ApolloClient } from '@apollo/client';
import { useApolloClient } from '@apollo/client';
import type { ResType, UserType } from '@roadmanjs/auth-client';
import {
  GET_ME,
  GET_USER_PUBLIC,
  UPDATE_USER_PROFILE,
} from '@roadmanjs/auth-client';
import { awaitTo } from '@stoqey/client-graphql';
import identity from 'lodash/identity';
import pickBy from 'lodash/pickBy';
import { useEffect, useState } from 'react';

import { userCacheManager } from '../storage/deviceStorage';

/**
 * Get the current data for logged user
 * @returns UserType
 */
export function useMyData(): UserType {
  const [userData, setUser] = useState<UserType>();
  const getLocalUserData = async () => {
    const data = await userCacheManager.get();

    if (data) {
      setUser(data);
    }
  };

  useEffect(() => {
    getLocalUserData();
  }, []);

  return !userData ? ({} as any) : userData;
}

/**
 * Update for the current loggedInUser
 * @returns
 */
export const updateUserProfile = async (
  client: ApolloClient<any>,
  user: Partial<UserType>,
): Promise<UserType> => {
  try {
    // remove null values
    const userArg = pickBy(user, identity);

    const [errorData, data] = await awaitTo(
      client.mutate<{ data: ResType }>({
        mutation: UPDATE_USER_PROFILE,
        variables: { user: userArg },
        fetchPolicy: 'network-only',
      }),
    );

    if (data && data.data) {
      return data.data.data as unknown as UserType;
    }

    console.log('apollo errors', errorData);
    throw errorData || new Error('Error running updateUserProfile');
  } catch (error) {
    throw error;
  }
};

/**
 * Fetch for the current loggedInUser
 * @returns
 */
export const fetchMe = async (client: ApolloClient<any>): Promise<UserType> => {
  try {
    const [errorData, data] = await awaitTo(
      client.query<{ me: UserType }>({
        query: GET_ME,
        variables: {},
        fetchPolicy: 'network-only',
      }),
    );

    if (data && data.data) {
      return data.data.me;
    }
    throw errorData || new Error('Error running fetchMe');
  } catch (error) {
    throw error;
  }
};

interface FetchUserQueryProps {
  client: ApolloClient<any>;
  args: {
    id: string;
  };
}

/**
 * Search for any user using phone, username, name e.t.c
 * @param props
 * @returns
 */
export const fetchUserPublic = async (
  props: FetchUserQueryProps,
): Promise<UserType> => {
  const { client, args } = props;
  const { id } = args;

  try {
    const [errorData, data] = await awaitTo(
      client.query<{ data: UserType }>({
        query: GET_USER_PUBLIC,
        variables: { id },
        fetchPolicy: 'network-only',
      }),
    );

    if (data && data.data) {
      return data.data.data;
    }
    throw errorData || new Error('Error running fetchUserPublic');
  } catch (error) {
    throw error;
  }
};

/**
 * Hook to search for a user from GraphQL API
 * @param searchId
 * @returns
 */
export function useUserData(searchId: string): UserType {
  const [userData, setUser] = useState<any>(null);
  const client = useApolloClient();

  const getUserPublic = async (id: string) => {
    const [error, data] = await awaitTo(
      fetchUserPublic({
        client,
        args: {
          id,
        },
      }),
    );

    if (data) {
      setUser(data);
    }
    if (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    getUserPublic(searchId);
  }, [searchId]);

  return !userData ? ({} as any) : userData;
}
