'use client';

import { Display, Layout } from '@uuixjs/uuixweb';
import React from 'react';

import LayoutPage from '@/components/Layout';
import VerticalSideBar from '@/components/sidebar/SideBar';
import AccountSettings from '@/containers/Settings/account';

function AccountSettingsPage() {
  return (
    <LayoutPage auth>
      <Layout display={Display.Flex} fullWidth>
        <VerticalSideBar client isOpen={false} />
        <Layout fullWidth>
          <AccountSettings />
        </Layout>
      </Layout>
    </LayoutPage>
  );
}

export default AccountSettingsPage;
