'use client';

import { Display, Layout } from '@uuixjs/uuixweb';
import React from 'react';

import LayoutPage from '@/components/Layout';
import VerticalSideBar from '@/components/sidebar/SideBar';
import UVAContainer from '@/containers/UVA/uva.container';

export function UserSlugPage({ slug }: { slug: string }) {
  return (
    <LayoutPage auth>
      <Layout display={Display.Flex} fullWidth>
        <VerticalSideBar client isOpen={false} />
        <UVAContainer username={slug as any} store={false} />
      </Layout>
    </LayoutPage>
  );
}

export default UserSlugPage;
