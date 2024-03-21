'use client';

import { Display, Layout } from '@uuixjs/uuixweb';
import React from 'react';

import { Container } from '@/components/container';
import LayoutPage from '@/components/Layout';
import VerticalSideBar from '@/components/sidebar/SideBar';
import PgpSettings from '@/containers/Settings/pgp';

export function PgpSettingsPage() {
  return (
    <LayoutPage auth>
      <Layout display={Display.Flex} fullWidth>
        <VerticalSideBar client isOpen={false} />
        <Layout fullWidth>
          <Container>
            <PgpSettings isNew />
          </Container>
        </Layout>
      </Layout>
    </LayoutPage>
  );
}

export default PgpSettingsPage;
