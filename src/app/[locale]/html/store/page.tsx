import { cookies } from 'next/headers';
import React from 'react';

import { getMyOrders, getOrderReviews } from '@/lib/hooksServer/order';
import { getSiteSettings } from '@/lib/hooksServer/settings';
import { getMe } from '@/lib/hooksServer/user';
import { getVendor, getVendorMoneyInEscrow } from '@/lib/hooksServer/vendor';

import StorePage from './store.page';

// TODO into a combined query
const StoreDefaultPage = async () => {
  const cookieStore = cookies();
  const siteSettings = await getSiteSettings();
  const vendor = await getVendor();

  let moneyInEscrow;
  let recentReviews;
  let recentOrders;
  let user;
  let success;
  let message;

  message = cookieStore.get('message')?.value;
  success = cookieStore.get('success')?.value === 'true';

  if (vendor) {
    user = await getMe();
    if (user) {
      recentReviews = await getOrderReviews({ seller: vendor.owner });
    }
    recentOrders = await getMyOrders();
    moneyInEscrow = await getVendorMoneyInEscrow();
  }

  return (
    <StorePage
      {...siteSettings}
      message={message}
      success={success}
      vendor={vendor}
      user={user}
      orders={recentOrders?.items || []}
      ratings={recentReviews?.items}
    />
  );
};

export default StoreDefaultPage;
