'use client';

import { Display, Layout } from '@uuixjs/uuixweb';

import { Container } from '@/components/container';
import type { AccountSettingsProps } from '@/containers/Settings/account.html';
import AccountSettings from '@/containers/Settings/account.html';

export const MyProfilePage = (props: AccountSettingsProps) => {
  return (
    <Layout display={Display.Flex} fullWidth>
      <Layout fullWidth>
        <Container>
          <AccountSettings {...props} />
        </Container>
      </Layout>
    </Layout>
  );
};

export default MyProfilePage;
