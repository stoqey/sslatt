'use client';

import { Display, Layout } from '@uuixjs/uuixweb';
import React from 'react';

import LayoutPage from '@/components/Layout';
import VerticalSideBar from '@/components/sidebar/SideBar';
import ADPContainer from '@/containers/ADP/adp.container';

const AdPageSlug = () => {
  return (
    <LayoutPage>
      <Layout display={Display.Flex} fullWidth>
        <VerticalSideBar client />
        <ADPContainer />
      </Layout>
    </LayoutPage>
  );
};

export default AdPageSlug;
