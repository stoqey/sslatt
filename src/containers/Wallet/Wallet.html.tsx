import { Layout } from '@uuixjs/uuixweb';
import React from 'react';

import { Container } from '@/components/container';
import type {
  PairRate,
  TransactionPagination,
  UserType,
  WalletOutput,
} from '@/components/types.generated';

import { MessageSuccessHtml } from '../actions.html';
import CryptoWallets from './CryptoWallets.html';
import MyWallet from './MyWallets.html';
import { TransactionsHtml } from './Transactions.html';

export interface WalletHtmlProps {
  message?: string;
  success?: boolean;
  user: UserType;
  transactions: TransactionPagination;
  wallets: WalletOutput[];
  rates: PairRate[];
}

export default function Wallet(props: WalletHtmlProps) {
  const {
    transactions: transactionsData,
    message = '',
    success = false,
  } = props;

  const transactions =
    transactionsData && transactionsData.items ? transactionsData.items : [];

  // TODO proper formatting and layout
  return (
    <Layout fullWidth>
      <Container size={7}>
        <MyWallet {...props} />
        <Layout padding={{ bottom: 2, top: 2 }}>
          <MessageSuccessHtml message={message} success={success} />
        </Layout>
        <CryptoWallets {...props} />
        <TransactionsHtml {...props} transactions={transactions} />
      </Container>
    </Layout>
  );
}
