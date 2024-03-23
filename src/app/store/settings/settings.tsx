'use client';

import { Display, Layout } from '@uuixjs/uuixweb';
import React from 'react';

import { Container } from '@/components/container';
import LayoutPage from '@/components/Layout';
import VerticalSideBar from '@/components/sidebar/SideBar';
import VendorSettings from '@/containers/Vendor/vendor.settings';

export const StoreSettingsPage = () => {
  return (
    <LayoutPage auth>
      <Layout display={Display.Flex} fullWidth>
        <VerticalSideBar client />
        <Layout fullWidth>
          <Container>
            <VendorSettings />
          </Container>
        </Layout>
      </Layout>
    </LayoutPage>
  );
};

export default StoreSettingsPage;
