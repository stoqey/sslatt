import { awaitTo } from '@stoqey/client-graphql';
import { headers } from 'next/headers';
import React from 'react';

import { getConfig } from '@/lib/config';
import { getMe } from '@/lib/hooksServer/user';

import { JsPageWrapper } from './js.wrapper';

const publicRoutes = ['/login', '/signup', '/forgot-password'];
export default async function JsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getMe();
  const headersList = headers();
  const fullUrl = headersList.get('x-url') || '';
  const [, currentUrl] = await awaitTo(Promise.resolve(new URL(fullUrl)));
  if (
    getConfig().REQUIRE_LOGIN &&
    !user &&
    !publicRoutes.some((route) =>
      (currentUrl?.pathname || '').startsWith(route),
    )
  ) {
    return <meta httpEquiv="refresh" content="0; url=/login" />;
  }

  return <JsPageWrapper user={user as any}>{children}</JsPageWrapper>;
}
