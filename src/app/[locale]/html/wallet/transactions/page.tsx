import React from 'react';

import { getMe } from '@/lib/hooksServer/user';
import { getVendor } from '@/lib/hooksServer/vendor';
import { getMyTransactions } from '@/lib/hooksServer/wallet';

import MyTransactionsPage from './transactions.page';

const WalletTransactionPage = async () => {
  const vendor = await getVendor();
  let transactions;
  let user;
  user = await getMe();
  transactions = await getMyTransactions();

  return (
    <MyTransactionsPage
      vendor={vendor}
      user={user}
      transactions={transactions?.items || []}
    />
  );
};

export default WalletTransactionPage;
