'use client';

import { Display, Layout, Title } from '@uuixjs/uuixweb';
import React from 'react';

import { Container } from '@/components/container';
import type { UserType, VendorType } from '@/components/types.generated';
import type { TransactionsHtmlProps } from '@/containers/Wallet/Transactions.html';
import TransactionsHtml from '@/containers/Wallet/Transactions.html';

export function MyTransactionsPage(
  props: TransactionsHtmlProps & { vendor: VendorType; user?: UserType },
) {
  return (
    <Layout display={Display.Flex} fullWidth>
      <Layout fullWidth>
        <Container size={7}>
          <Layout padding={2} textAlign="center">
            <Title>Recent Transactions</Title>
          </Layout>
          <TransactionsHtml transactions={props.transactions} />
        </Container>
      </Layout>
    </Layout>
  );
}

export default MyTransactionsPage;
