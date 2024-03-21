import type { CountryType, VendorType } from '@/components/types.generated';

import { getClient } from '../apollo-wrapper.server';
import { GET_VENDOR, GET_VENDOR_MONEY_ESCROW } from '../gql';
import { GET_ALL_COUNTRIES_QUERY } from '../gql/country';

export const getVendor = async (): Promise<VendorType | undefined> => {
  try {
    const data = await getClient().query<{ data: VendorType }>({
      query: GET_VENDOR as any,
    });

    const user = data?.data.data;
    return user;
  } catch (error) {
    console.log('getVendor error', error);
    return undefined;
  }
};

export const getVendorMoneyInEscrow = async (): Promise<number | undefined> => {
  try {
    const data = await getClient().query<{ data: number }>({
      query: GET_VENDOR_MONEY_ESCROW as any,
    });

    const moneyInEscrow = data?.data.data;
    return moneyInEscrow;
  } catch (error) {
    console.log('getVendorMoneyInEscrow error', error);
    return undefined;
  }
};

export const getCountries = async (): Promise<CountryType[]> => {
  try {
    const data = await getClient().query<{ data: CountryType[] }>({
      query: GET_ALL_COUNTRIES_QUERY as any,
    });

    const user = data?.data.data;
    return user;
  } catch (error) {
    console.log('getCountries error', error);
    return [];
  }
};
