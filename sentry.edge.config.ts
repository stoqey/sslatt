// This file configures the initialization of Sentry for edge features (middleware, edge routes, and so on).
// The config you add here will be used whenever one of the edge features is loaded.
// Note that this config is unrelated to the Vercel Edge Runtime and is also required when running locally.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

Sentry.init({
  // FIXME: Add your Sentry DSN
  // dsn: '___DSN___',

  // Enable Spotlight in development
  spotlight: process.env.NODE_ENV === 'development',

  ignoreErrors: [
    // Workaround for React RSC and Suspense boundaries: https://github.com/amannn/next-intl/issues/614#issuecomment-1862508393
    // Can be removed once the change is integrated into Sentry SDK.
    "This is not a real error! It's an implementation detail of `use`",
  ],

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});
