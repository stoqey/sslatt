'use client';

import { CoreText, Display, JustifyContent, Layout } from '@uuixjs/uuixweb';
import React from 'react';

import { Container } from '@/components/container';
import LayoutPage from '@/components/Layout';
import VerticalSideBar from '@/components/sidebar/SideBar';
import OrderDetailsContainer from '@/containers/Order/order.details';

const OrderSlugPage = () => {
  return (
    <LayoutPage auth>
      <Layout display={Display.Flex} fullWidth>
        <VerticalSideBar client />
        <Layout fullWidth>
          <Container>
            <Layout
              display={Display.Flex}
              justifyContent={JustifyContent.Center}
              padding={{ top: 2, left: 1, bottom: 2 }}
            >
              <CoreText as="h3">Orders Details</CoreText>
            </Layout>
            <OrderDetailsContainer />
          </Container>
        </Layout>
      </Layout>
    </LayoutPage>
  );
};

export default OrderSlugPage;
