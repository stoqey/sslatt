import isEmpty from 'lodash/isEmpty';
import { cookies } from 'next/headers';

import { getMe } from '@/lib/hooksServer/user';
import { getVendor } from '@/lib/hooksServer/vendor';
import { getFeePrices, getMyWallets, getRates } from '@/lib/hooksServer/wallet';

import CreateWithdrawActionPage from './create.page';

const WithdrawPage = async () => {
  const cookieStore = cookies();

  let wallets;
  let rates;
  let user;
  let pairs;
  let feePrices;
  let vendor;
  let message;
  let success;
  let amount;
  let receiver;

  vendor = await getVendor();
  user = await getMe();
  feePrices = await getFeePrices();
  wallets = await getMyWallets(walletscurrencies());

  message = cookieStore.get('message')?.value;
  success = cookieStore.get('success')?.value === 'true';

  // TODO cookies args;
  amount = cookieStore.get('amount')?.value;
  receiver = cookieStore.get('receiver')?.value;

  // console.log("WithdrawPage", { feePrices, wallets });

  if (!isEmpty(wallets)) {
    pairs = wallets
      .map((wal) => `${(wal.currency || '').toUpperCase()}_USD`)
      .join(',');
    rates = await getRates(pairs);
  }

  return (
    <CreateWithdrawActionPage
      rates={rates as any}
      user={user}
      feePrices={feePrices}
      wallets={wallets}
      vendor={vendor}
      amount={amount as any}
      receiver={receiver}
      message={message}
      success={success}
    />
  );
};

export default WithdrawPage;
