'use client';

import { Display, Layout } from '@uuixjs/uuixweb';

import LayoutPage from '@/components/Layout';
import VerticalSideBar from '@/components/sidebar/SideBar';
import Wallet from '@/containers/Wallet';

export function WalletPageClient() {
  return (
    <LayoutPage auth>
      <Layout display={Display.Flex} fullWidth>
        <VerticalSideBar client />
        <Layout fullWidth>
          <Wallet />
        </Layout>
      </Layout>
    </LayoutPage>
  );
}

export default WalletPageClient;
