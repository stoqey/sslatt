'use client';

import { Display, Layout } from '@uuixjs/uuixweb';
import React from 'react';

import type { OrderCheckoutHtmlProps } from '@/containers/Order/order.checkout.html';
import OrderCheckoutHtml from '@/containers/Order/order.checkout.html';

/**
 * order/checkout/new?type=ad&ad=ad_id
 * order/checkout/id finalize
 * @returns
 */
const OrderCheckoutPage = (props: OrderCheckoutHtmlProps) => {
  return (
    <Layout display={Display.Flex} fullWidth>
      <Layout fullWidth>
        <OrderCheckoutHtml {...props} />
      </Layout>
    </Layout>
  );
};

export default OrderCheckoutPage;
