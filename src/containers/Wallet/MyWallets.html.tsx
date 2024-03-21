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
import React from 'react';

import type {
  PairRate,
  UserType,
  WalletOutput,
} from '@/components/types.generated';
import { niceDec } from '@/lib/utils/number';

export const useWalletTotalUsdHtml = (props: Omit<MyWalletProps, 'user'>) => {
  const { wallets = [], rates = [] } = props;

  const getRate = (currency: string) => {
    const CURRENCY = currency.toUpperCase();

    if (isEmpty(rates) || !rates.find) return 0;

    return (
      rates.find((rate) => startsWith(rate.pair as string, CURRENCY))?.rate || 0
    );
  };

  const walletsTotal =
    isEmpty(wallets) || isEmpty(rates)
      ? 0
      : wallets
          .map((wal: any) => wal.amount * getRate(wal.currency))
          .reduce((a, b) => a + b, 0);

  const walletsAmount =
    isEmpty(wallets) || isEmpty(rates)
      ? []
      : wallets.map((wal: any) => ({
          id: wal.id,
          amount: wal.amount,
          currency: wal.currency,
          amountUsd: wal.amount * getRate(wal.currency),
          rate: getRate(wal.currency),
        }));

  return { walletsTotal, walletsAmount };
};

interface MyWalletProps {
  wallets: WalletOutput[];
  rates: PairRate[];
  user?: UserType;
}

const MyWallet = (props: MyWalletProps) => {
  const { wallets, rates, user } = props;

  const { walletsTotal } = useWalletTotalUsdHtml({ wallets, rates });

  const firstname = user?.username;

  return (
    <Layout
      padding={1}
      display={Display.Flex}
      justifyContent={JustifyContent.Center}
      alignItems={AlignItems.Center}
      flexDirection={FlexDirection.Column}
    >
      {firstname && <CoreText as="h5">Hello {firstname}</CoreText>}

      <CoreText as="h2">{niceDec(walletsTotal)}</CoreText>
    </Layout>
  );
};

export default MyWallet;
