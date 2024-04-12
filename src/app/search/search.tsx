'use client';

import {
  Column,
  Display,
  FlexDirection,
  Grid,
  GridGutterSize,
  Layout,
} from '@uuixjs/uuixweb';
import React from 'react';

import LayoutPage from '@/components/Layout';
import VerticalSideBar from '@/components/sidebar/SideBar';
import AdFilters, { useAdFilters } from '@/containers/AdSearch/ad.filters';
import AdSearchList from '@/containers/AdSearch/ad.list';

interface AdsSearchPageProps {
  children?: React.ReactNode;
  nav?: boolean;
}

export function AdsSearchPage(props: AdsSearchPageProps) {
  const { filters, setFilters, resetFilters } = useAdFilters();
  return (
    <LayoutPage nav={props.nav}>
      <Layout display={Display.Flex} fullWidth fullHeight>
        <VerticalSideBar client />

        <Layout
          display={Display.Flex}
          flexDirection={FlexDirection.Column}
          fullWidth
        >
          {/* Top view */}
          {/* <Layout
            fullWidth
            style={{ background: "aliceblue", height: "50px" }}
          /> */}

          <Grid gutterSize={GridGutterSize.Small}>
            {/* Filters */}
            <Column cols={{ default: 3 }}>
              <Layout padding={2}>
                <AdFilters
                  resetFilters={resetFilters}
                  filters={filters}
                  setFilters={setFilters}
                />
              </Layout>
            </Column>
            <Column cols={{ default: 7 }}>
              <Layout padding={2}>
                <AdSearchList
                  resetFilters={resetFilters}
                  isPublic
                  action="view"
                  filters={filters}
                />
              </Layout>
            </Column>
            {/* <Column cols={{ default: 2 }}>
              <Layout
                background={Background.Accent}
                color={Color.Overlay}
                padding={2}
              >
                This column has a default offset of 4, but at a large breakpoint
                that offset is 0.
              </Layout>
            </Column> */}
          </Grid>
        </Layout>
      </Layout>
    </LayoutPage>
  );
}

export default AdsSearchPage;
