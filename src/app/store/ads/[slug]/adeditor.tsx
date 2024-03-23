'use client';

import { Display, Layout } from '@uuixjs/uuixweb';
import type { NextPage } from 'next';
import { useParams } from 'next/navigation';
import React from 'react';

import LayoutPage from '@/components/Layout';
import VerticalSideBar from '@/components/sidebar/SideBar';
import AdsEditor from '@/containers/AdEditor';

const MyAdsEditor: NextPage<{}> = () => {
  const { slug } = useParams();
  return (
    <LayoutPage auth>
      <Layout display={Display.Flex} fullWidth>
        <VerticalSideBar client />
        <Layout fullWidth>
          <AdsEditor postId={slug as any} />
        </Layout>
      </Layout>
    </LayoutPage>
  );
};

export default MyAdsEditor;
