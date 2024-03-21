import {
  FETCH_RATES_QUERY,
  MY_WALLET_QUERY,
  TRANSACTIONS_QUERY,
} from '@roadmanjs/wallet-client';

import type {
  FeePrices,
  PairRate,
  TransactionPagination,
  WalletOutput,
} from '@/components/types.generated';

import { getClient } from '../apollo-wrapper.server';
import { GET_FEE_PRICES } from '../gql';

export const getMyTransactions = async (): Promise<
  TransactionPagination | undefined
> => {
  try {
    const data = await getClient().query<{
      data: TransactionPagination;
    }>({
      query: TRANSACTIONS_QUERY as any,
      variables: {
        before: new Date(),
        limit: 1000,
      },
    });

    const user = data?.data?.data;
    return user;
  } catch (error) {
    console.log('getMyTransactions error', error);
    return undefined;
  }
};

export const getMyWallets = async (
  currencies: string[],
  createNew: boolean = false,
): Promise<WalletOutput[]> => {
  try {
    const data = await getClient().query<{
      data: WalletOutput[];
    }>({
      query: MY_WALLET_QUERY as any,
      variables: { currency: currencies, createNew },
    });

    const user = data?.data?.data;
    return user;
  } catch (error) {
    console.log('getMyWallets error', error);
    return [];
  }
};

export const getRates = async (pairs: string): Promise<PairRate[]> => {
  try {
    const data = await getClient().query<{
      data: PairRate[];
    }>({
      query: FETCH_RATES_QUERY as any,
      variables: { pairs },
      fetchPolicy: 'network-only',
    });

    const pairRates = data?.data?.data;
    return pairRates;
  } catch (error) {
    console.log('getRates error', error);
    return [];
  }
};

export const getFeePrices = async (): Promise<FeePrices | undefined> => {
  try {
    const data = await getClient().query<{
      data: FeePrices;
    }>({
      query: GET_FEE_PRICES as any,
    });

    const pairRates = data?.data?.data;
    return pairRates;
  } catch (error) {
    console.log('getFeePrices error', error);
    return undefined;
  }
};
