import { useLazyQuery } from '@apollo/client';
import type { BtcpayserverRate } from '@roadmanjs/wallet-client';
import { FETCH_RATES_QUERY } from '@roadmanjs/wallet-client';
import {
  AlignItems,
  CoreText,
  Display,
  FlexDirection,
  JustifyContent,
  Layout,
} from '@uuixjs/uuixweb';
import isEmpty from 'lodash/isEmpty';
import startsWith from 'lodash/startsWith';
import React, { useEffect } from 'react';

import { getConfig } from '@/lib/config';
import { useMeApi } from '@/lib/hooks/useUserCache';
import { useWallets } from '@/lib/hooks/useWallet';
import { niceDec } from '@/lib/utils/number';

const allCurrencies = [
  { currency: 'BTC', enabled: getConfig().ENABLE_BTC },
  { currency: 'XMR', enabled: getConfig().ENABLE_XMR },
];

export const walletscurrencies = allCurrencies
  .filter((c) => c.enabled)
  .map((c) => c.currency);

export const useWalletTotalUsd = () => {
  const wallets = useWallets(walletscurrencies, false);

  const [fetchRatesApi, { data: ratesData }] = useLazyQuery<{
    data: BtcpayserverRate[];
  }>(FETCH_RATES_QUERY, {
    fetchPolicy: 'network-only',
  });

  const rates = ratesData?.data;

  useEffect(() => {
    if (!isEmpty(wallets) && !rates) {
      fetchRatesApi({
        variables: {
          pairs: wallets
            .map((wal) => `${wal.currency.toUpperCase()}_USD`)
            .join(','),
        },
      });
    }
  }, [wallets]);

  const getRate = (currency: string) => {
    const CURRENCY = currency.toUpperCase();
    return rates.find((rate) => startsWith(rate.pair, CURRENCY))?.rate || 0;
  };

  const walletsTotal =
    isEmpty(wallets) || isEmpty(rates)
      ? 0
      : wallets
          .map((wal) => wal.amount * getRate(wal.currency))
          .reduce((a, b) => a + b, 0);

  const walletsAmount =
    isEmpty(wallets) || isEmpty(rates)
      ? []
      : wallets.map((wal) => ({
          id: wal.id,
          amount: wal.amount,
          currency: wal.currency,
          amountUsd: wal.amount * getRate(wal.currency),
        }));

  return { walletsTotal, walletsAmount };
};

const MyWallet = () => {
  // const myCurrentUser = useMyData();
  const myCurrentUser = useMeApi();
  const { walletsTotal } = useWalletTotalUsd();

  const firstname = myCurrentUser?.username;

  return (
    <Layout
      padding={1}
      display={Display.Flex}
      justifyContent={JustifyContent.Center}
      alignItems={AlignItems.Center}
      flexDirection={FlexDirection.Column}
    >
      {firstname && <CoreText as="h5">Sup {firstname}</CoreText>}

      <CoreText as="h2">{niceDec(walletsTotal)}</CoreText>
    </Layout>
  );
};

export default MyWallet;
