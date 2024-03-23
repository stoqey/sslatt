'use client';

import { Display, Layout } from '@uuixjs/uuixweb';

import { Container } from '@/components/container';
import type { VendorSettingsProps } from '@/containers/Vendor/vendor.settings.html';
import VendorSettings from '@/containers/Vendor/vendor.settings.html';

export const MyStoreSettingsPage = (props: VendorSettingsProps) => {
  return (
    <Layout display={Display.Flex} fullWidth>
      <Layout fullWidth>
        <Container>
          <VendorSettings {...props} />
        </Container>
      </Layout>
    </Layout>
  );
};

export default MyStoreSettingsPage;
