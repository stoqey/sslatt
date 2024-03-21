import type { NextFetchEvent, NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { AppConfig } from '@/utils/AppConfig';

import type { MiddlewareFactory } from './stackHandler';

const middleware = createMiddleware({
  locales: AppConfig.locales,
  localePrefix: AppConfig.localePrefix,
  defaultLocale: AppConfig.defaultLocale,
});

export const withTranslation: MiddlewareFactory = () => {
  return async (request: NextRequest, _next: NextFetchEvent) =>
    middleware(request);
};

export default withTranslation;

// export const config = {
//   matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
// };
