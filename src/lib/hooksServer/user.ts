import { GET_ME, type UserType } from '@roadmanjs/auth-client';
import gql from 'graphql-tag';

import type { UserType } from '@/components/types.generated';

import { getClient } from '../apollo-wrapper.server';

const GET_CSRF_TOKEN = gql`
  query GetCSRFToken {
    data: getCSRFToken
  }
`;

export const getCSRFToken = async (): Promise<string | undefined> => {
  try {
    const data = await getClient().query<{ data: string }>({
      query: GET_CSRF_TOKEN as any,
    });

    const token = data?.data?.data;
    return token;
  } catch (error) {
    console.log('getCSRFToken error', error);
    return undefined;
  }
};

export const getMe = async (): Promise<UserType | undefined> => {
  try {
    const data = await getClient().query<{ me: UserType }>({
      query: GET_ME as any,
    });

    const user = data?.data?.me;
    return user;
  } catch (error) {
    console.log('getMe error', error);
    return undefined;
  }
};
