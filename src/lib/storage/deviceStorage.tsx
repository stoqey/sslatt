import type { UserType } from '@stoqey/client-graphql';

import { JSONDATA } from './json';

export const serviceProviderManager = {
  get: async () => {
    try {
      const val = await localStorage.getItem('@service-provider');
      return val;
    } catch (e) {
      return 'cibc';
    }
  },
  set: async (value: any) => {
    try {
      await localStorage.setItem('@service-provider', value);
    } catch (e) {
      console.log(e);
    }
  },
};

export const accessTokenManager = {
  get: async () => {
    try {
      const val = await localStorage.getItem('@access-token');
      return val;
    } catch (e) {
      return 'cibc';
    }
  },
  set: async (value: any) => {
    try {
      await localStorage.setItem('@access-token', value);
    } catch (e) {
      console.log(e);
    }
  },
  delete: async () => {
    try {
      await localStorage.removeItem('@access-token');
    } catch (e) {
      console.log(e);
    }
  },
};

const userCacheKey = '@user-cache';

/**
 * For saving and parsing user cache object
 * Object to string and vice verser.
 */
export const userCacheManager = {
  get: async (): Promise<UserType | undefined> => {
    try {
      const val = await localStorage.getItem(userCacheKey);
      if (!val) {
        throw new Error('User cache not found');
      }
      return JSONDATA(val) as UserType;
    } catch (e) {
      console.error(e);
      return undefined;
    }
  },
  set: async (value: UserType): Promise<boolean> => {
    try {
      if (!value) throw new Error('User cache value cannot be undefined');
      const stringifiedValue = JSON.stringify(value);
      await localStorage.setItem(userCacheKey, stringifiedValue);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  },
  delete: async () => {
    try {
      await localStorage.removeItem(userCacheKey);
    } catch (e) {
      console.log(e);
    }
  },
};
