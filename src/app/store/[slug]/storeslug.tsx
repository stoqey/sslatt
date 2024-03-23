'use client';

import { Display, Layout } from '@uuixjs/uuixweb';
import { useParams } from 'next/navigation';
import React from 'react';

import LayoutPage from '@/components/Layout';
import VerticalSideBar from '@/components/sidebar/SideBar';
import UVAContainer from '@/containers/UVA/uva.container';

export function StoreSlugPage() {
  const { slug } = useParams();

  return (
    <LayoutPage auth>
      <Layout display={Display.Flex} fullWidth>
        <VerticalSideBar client isOpen={false} />
        <UVAContainer username={slug as any} />
      </Layout>
    </LayoutPage>
  );
}

export default StoreSlugPage;
