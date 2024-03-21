import { GET_TRANSACTIONS_BY_ID_QUERY } from '@roadmanjs/wallet-client';
import React from 'react';

import type { Transaction } from '@/components/types.generated';
import { getClient } from '@/lib/apollo-wrapper.server';
import { getMe } from '@/lib/hooksServer/user';
import { getVendor } from '@/lib/hooksServer/vendor';

import TransactionViewActionPage from './view';

const WalletTransactionsSlugPage = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const vendor = await getVendor();
  const user = await getMe();

  const transactionId = params.slug;

  const { data } = await getClient().query<{
    data: Transaction;
  }>({
    query: GET_TRANSACTIONS_BY_ID_QUERY,
    variables: { id: transactionId },
  });

  const transaction = data?.data || {};

  return (
    <TransactionViewActionPage vendor={vendor} user={user} item={transaction} />
  );
};

export default WalletTransactionsSlugPage;
