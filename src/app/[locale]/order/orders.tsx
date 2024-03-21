'use client';

import { CoreText, Display, JustifyContent, Layout } from '@uuixjs/uuixweb';
import React from 'react';

import { Container } from '@/components/container';
import LayoutPage from '@/components/Layout';
import VerticalSideBar from '@/components/sidebar/SideBar';
import OrderList from '@/containers/Order/order.list';

const OrderPage = () => {
  return (
    <LayoutPage auth>
      <Layout display={Display.Flex} fullWidth>
        <VerticalSideBar client />
        <Layout fullWidth>
          {/* Active, Requests, Confirm */}
          <Container>
            <Layout
              display={Display.Flex}
              justifyContent={JustifyContent.Center}
              padding={{ top: 2, left: 1, bottom: 2 }}
            >
              <CoreText as="h3">My Orders</CoreText>
            </Layout>
            <OrderList />
          </Container>
        </Layout>
      </Layout>
    </LayoutPage>
  );
};

export default OrderPage;
