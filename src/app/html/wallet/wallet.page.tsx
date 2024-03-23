'use client';

import { Display, Layout } from '@uuixjs/uuixweb';
import React from 'react';

import type { VendorType } from '@/components/types.generated';
import Wallet from '@/containers/Wallet/Wallet.html';

export function MyWalletPage(props: any & { vendor: VendorType }) {
  return (
    <Layout display={Display.Flex} fullWidth>
      <Wallet {...props} />
    </Layout>
  );
}

export default MyWalletPage;
