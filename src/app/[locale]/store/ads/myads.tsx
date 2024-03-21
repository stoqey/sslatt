'use client';

import { CoreText, Display, Layout } from '@uuixjs/uuixweb';
import React from 'react';

import { Container } from '@/components/container';
import LayoutPage from '@/components/Layout';
import VerticalSideBar from '@/components/sidebar/SideBar';
import AdSearchList from '@/containers/AdSearch/ad.list';

/**
 * Ads editor and ads lists
 * TODO a better name when prod, like ad/ads or ad/listings
 * @returns
 */
export function MyAdsPage() {
  return (
    <LayoutPage auth>
      <Layout display={Display.Flex} fullWidth>
        <VerticalSideBar client />
        <Layout fullWidth margin={{ top: 1 }}>
          <Container size={9}>
            <CoreText as="h3"> All ads </CoreText>
            <AdSearchList
              itemProps={{ meta: false }}
              isPublic={false}
              action="edit"
            />
          </Container>
        </Layout>
      </Layout>
    </LayoutPage>
  );
}

export default MyAdsPage;
