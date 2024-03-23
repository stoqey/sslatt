import { isEmpty } from 'lodash';
import { cookies } from 'next/headers';

import { walletscurrencies } from '@/lib/const';
import { getAdById } from '@/lib/hooksServer/ads';
import { getMe } from '@/lib/hooksServer/user';
import { getFeePrices, getMyWallets, getRates } from '@/lib/hooksServer/wallet';

import OrderCheckoutSlug from './checkoutslug';

/**
 *
 * @returns
 *
 */
const OrderCheckoutPage = async ({
  searchParams,
}: {
  searchParams: { type: string; typeId: string; qty: number };
}) => {
  const cookieStore = cookies();
  const adId = searchParams.typeId;
  let feePrices;
  let rates;
  let wallets;
  let pairs;
  let adItem;
  const user = await getMe();
  if (user) {
    feePrices = await getFeePrices();

    wallets = await getMyWallets(walletscurrencies);

    if (!isEmpty(wallets)) {
      pairs = wallets
        .map((wal) => `${(wal.currency || '').toUpperCase()}_USD`)
        .join(',');
      rates = await getRates(pairs);
    }

    adItem = await getAdById(adId);
  }

  const details = cookieStore.get('details')?.value;
  const quantity = cookieStore.get('quantity')?.value;
  const message = cookieStore.get('message')?.value;
  const success = cookieStore.get('success')?.value === 'true';

  return (
    <OrderCheckoutSlug
      user={user}
      adItem={adItem}
      wallets={wallets}
      rates={rates}
      quantity={isEmpty(quantity) ? searchParams.qty : +(quantity || 0)}
      details={details}
      feePrices={feePrices}
      message={message}
      success={success}
    />
  );
};

export default OrderCheckoutPage;
