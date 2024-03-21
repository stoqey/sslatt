'use client';

import { Display, Layout } from '@uuixjs/uuixweb';
import React from 'react';

import LayoutPage from '@/components/Layout';
import VerticalSideBar from '@/components/sidebar/SideBar';
import TransactionsContainer from '@/containers/Wallet/TransactionsContainer';

const TransactionsPageClient = () => {
  return (
    <LayoutPage auth>
      <Layout display={Display.Flex} fullWidth>
        <VerticalSideBar client />
        <Layout fullWidth>
          <TransactionsContainer />
        </Layout>
      </Layout>
    </LayoutPage>
  );
};

export default TransactionsPageClient;
