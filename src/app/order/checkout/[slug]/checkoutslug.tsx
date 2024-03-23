'use client';

import { Display, Layout } from '@uuixjs/uuixweb';
import React from 'react';

import LayoutPage from '@/components/Layout';
import VerticalSideBar from '@/components/sidebar/SideBar';
import OrderCheckout from '@/containers/Order/order.checkout';

/**
 * order/checkout/new?type=ad&ad=ad_id
 * order/checkout/id finalize
 * @returns
 */
const OrderCheckoutPage = () => {
  return (
    <LayoutPage auth>
      <Layout display={Display.Flex} fullWidth>
        <VerticalSideBar client />
        <Layout fullWidth>
          <OrderCheckout />
        </Layout>
      </Layout>
    </LayoutPage>
  );
};

export default OrderCheckoutPage;
