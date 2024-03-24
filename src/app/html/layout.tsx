import { awaitTo } from '@stoqey/client-graphql';
import { cookies, headers } from 'next/headers';
import React from 'react';

import { walletscurrencies } from '@/lib/const';
import { getMe } from '@/lib/hooksServer/user';
import { getVendor } from '@/lib/hooksServer/vendor';
import { getMyWallets, getRates } from '@/lib/hooksServer/wallet';

import { HtmlPageWrapper } from './html.wrapper';

const publicRoutes = ['/html/login', '/html/signup', '/html/forgot-password'];
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const headersList = headers();
  const fullUrl = headersList.get('x-url') || '';
  let vendor;
  let wallets;
  let rates;
  let user;
  let openSideBar;
  let theme;

  const [, currentUrl] = await awaitTo(Promise.resolve(new URL(fullUrl)));

  theme = cookieStore.get('theme')?.value;
  openSideBar = cookieStore.get('openSidebar')?.value === 'true';
  rates = await getRates(
    walletscurrencies.map((w) => `${w.toUpperCase()}_USD`).join(','),
  );

  user = await getMe();
  if (user) {
    vendor = await getVendor();
    wallets = await getMyWallets(walletscurrencies);
  } else if (
    !publicRoutes.some((route) =>
      (currentUrl?.pathname || '').startsWith(route),
    )
  ) {
    return <meta httpEquiv="refresh" content="0; url=/html/login" />;
  }

  return (
    <HtmlPageWrapper
      user={user as any}
      vendor={vendor as any}
      wallets={wallets}
      rates={rates}
      openSideBar={openSideBar}
      theme={theme}
    >
      {children}
    </HtmlPageWrapper>
  );
}
