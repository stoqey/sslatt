import { awaitTo } from '@stoqey/client-graphql';
import { cookies, headers } from 'next/headers';
import React from 'react';

import { fetchConfig } from '@/lib/config/server';
import { fetchBadges } from '@/lib/hooksServer/notifications';
import { getMe } from '@/lib/hooksServer/user';
import { getVendor } from '@/lib/hooksServer/vendor';
import { getMyWallets, getRates } from '@/lib/hooksServer/wallet';

import { HtmlPageWrapper } from './html.wrapper';

export async function generateMetadata(): Promise<Metadata> {
  const config = await fetchConfig();
  const siteName = config?.name || '';
  const slogan = config?.slogan || '';

  return {
    title: `${siteName} - ${slogan}`,
    icons: [
      {
        rel: 'apple-touch-icon',
        url: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        url: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        url: '/favicon-16x16.png',
      },
      {
        rel: 'icon',
        url: '/favicon.ico',
      },
    ],
  };
}

const publicRoutes = ['/html/login', '/html/signup', '/html/forgot-password'];

export default async function HtmlLayout({
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
  let badges;

  const [, currentUrl] = await awaitTo(Promise.resolve(new URL(fullUrl)));
  const pathname = currentUrl?.pathname || '';
  const config = await fetchConfig();

  const allCurrencies = [
    { currency: 'BTC', enabled: config.ENABLE_BTC },
    { currency: 'XMR', enabled: config.ENABLE_XMR },
  ];
  const currencies = allCurrencies
    .filter((c) => c.enabled)
    .map((c) => c.currency);

  theme = cookieStore.get('theme')?.value;
  openSideBar = cookieStore.get('openSidebar')?.value === 'true';
  rates = await getRates(
    currencies.map((w) => `${w.toUpperCase()}_USD`).join(','),
  );

  const loginRequired = config.REQUIRE_LOGIN;
  const isIndex = pathname === '/html';

  if (!loginRequired) {
    publicRoutes.push('/html/ad/', '/html/store/', '/html/u/');
  }

  user = await getMe();
  if (user) {
    badges = await fetchBadges({ models: ['Notification', 'Chat'] });
    vendor = await getVendor();
    wallets = await getMyWallets(currencies);
  }

  if (loginRequired) {
    if (
      (isIndex && !user) ||
      (!user &&
        !publicRoutes.some((route) => (pathname || '').startsWith(route)))
    ) {
      return <meta httpEquiv="refresh" content="0; url=/html/login" />;
    }
  } else if (
    !user &&
    !isIndex &&
    !publicRoutes.some((route) => (pathname || '').startsWith(route))
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
      badges={badges}
      config={config}
    >
      {children}
    </HtmlPageWrapper>
  );
}
