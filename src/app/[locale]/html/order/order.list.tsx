'use client';

import { CoreText, Display, JustifyContent, Layout } from '@uuixjs/uuixweb';
import React from 'react';

import { Container } from '@/components/container';
import type { OrderListHtmlProps } from '@/containers/Order/order.list.html';
import OrderListHtml from '@/containers/Order/order.list.html';

const OrderListPage = (props: OrderListHtmlProps) => {
  return (
    <Layout display={Display.Flex} fullWidth>
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
          <OrderListHtml {...props} />
        </Container>
      </Layout>
    </Layout>
  );
};

export default OrderListPage;
