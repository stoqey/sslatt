'use client';

import { Display, Layout } from '@uuixjs/uuixweb';
import React from 'react';

import LayoutPage from '@/components/Layout';
import VerticalSideBar from '@/components/sidebar/SideBar';
import WithdrawRequestList from '@/containers/Withdraw/withdraw.list';

const WithdrawRequestPage = () => {
  return (
    <LayoutPage auth>
      <Layout display={Display.Flex} fullWidth>
        <VerticalSideBar client />
        <Layout fullWidth>
          {/* Active, Requests, Confirm */}
          <WithdrawRequestList admin={false} />
        </Layout>
      </Layout>
    </LayoutPage>
  );
};

export default WithdrawRequestPage;
