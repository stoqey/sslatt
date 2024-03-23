import { isEmpty } from 'lodash';
import { cookies } from 'next/headers';
import React from 'react';

import { walletscurrencies } from '@/lib/const';
import { getMe } from '@/lib/hooksServer/user';
import { getVendor } from '@/lib/hooksServer/vendor';
import {
  getMyTransactions,
  getMyWallets,
  getRates,
} from '@/lib/hooksServer/wallet';

import MyWalletPage from './wallet.page';

// TODO into a combined query
const WalletPage = async () => {
  const cookieStore = cookies();
  const vendor = await getVendor();

  // TODO into a combined query
  let transactions;
  let wallets;
  let rates;
  let user;
  let pairs;
  let message;
  let success;

  message = cookieStore.get('message')?.value;
  success = cookieStore.get('success')?.value === 'true';
  //   transactions: TransactionPagination;
  //   wallets: WalletOutput[];
  //   rates: PairRate[];

  user = await getMe();
  wallets = await getMyWallets(walletscurrencies, true);

  if (!isEmpty(wallets)) {
    pairs = wallets
      .map((wal) => `${(wal.currency || '').toUpperCase()}_USD`)
      .join(',');
    rates = await getRates(pairs);
  }

  transactions = await getMyTransactions();

  return (
    <MyWalletPage
      message={message}
      success={success}
      vendor={vendor}
      user={user}
      wallets={wallets}
      transactions={transactions}
      rates={rates}
    />
  );
};

export default WalletPage;
