/* eslint-disable import/no-extraneous-dependencies, import/extensions */
import './src/lib/Env.mjs';

import withBundleAnalyzer from '@next/bundle-analyzer';
import withNextIntl from 'next-intl/plugin';
import { withSentryConfig } from '@sentry/nextjs';

// For building on vercel: https://github.com/Automattic/node-canvas/issues/1779
if (
  process.env.LD_LIBRARY_PATH == null ||
  !process.env.LD_LIBRARY_PATH.includes(
    `${process.env.PWD}/node_modules/canvas/build/Release:`,
  )
) {
  process.env.LD_LIBRARY_PATH = `${
    process.env.PWD
  }/node_modules/canvas/build/Release:${process.env.LD_LIBRARY_PATH || ''}`;
}

const withNextIntlConfig = withNextIntl('./src/lib/i18n.ts');

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
export default withSentryConfig(
  bundleAnalyzer(
    withNextIntlConfig({
      eslint: {
        dirs: ['.'],
        ignoreDuringBuilds: true,
      },
      poweredByHeader: false,
      reactStrictMode: true,
      experimental: {
        // instrumentationHook: true,
        // Related to Pino error with RSC: https://github.com/orgs/vercel/discussions/3150
        serverComponentsExternalPackages: ['pino'],
      },
      webpack: (config) => {
        // config.externals is needed to resolve the following errors:
        // Module not found: Can't resolve 'bufferutil'
        // Module not found: Can't resolve 'utf-8-validate'
        config.externals.push({
          bufferutil: 'bufferutil',
          'utf-8-validate': 'utf-8-validate',
        });

        const fileLoaderRule = config.module.rules.find((rule) =>
          rule.test?.test?.('.svg'),
        );

        config.module.rules.push(
          // Reapply the existing rule, but only for svg imports ending in ?url
          {
            ...fileLoaderRule,
            test: /\.svg$/i,
            resourceQuery: /url/, // *.svg?url
          },
          // Convert all other *.svg imports to React components
          {
            test: /\.svg$/i,
            issuer: fileLoaderRule.issuer,
            resourceQuery: {
              not: [...fileLoaderRule.resourceQuery.not, /url/],
            }, // exclude if *.svg?url
            use: ['@svgr/webpack'],
          },
        );

        // Modify the file loader rule to ignore *.svg, since we have it handled now.
        fileLoaderRule.exclude = /\.svg$/i;

        return config;
      },
      swcMinify: true,
      compiler: {
        styledComponents: true,
      },

      typescript: {
        ignoreBuildErrors: true, // TODO: remove this
      },
      // For all available options, see:
      transpilePackages: ['@uuixjs/uuixweb', 'captcha-canvas'],
    }),
  ),
  {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    // Suppresses source map uploading logs during build
    silent: true,
    // FIXME: Add your Sentry organization and project names
    org: 'stoqey',
    project: 'sslatt',
  },
  {
    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Transpiles SDK to be compatible with IE11 (increases bundle size)
    transpileClientSDK: true,

    // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
    tunnelRoute: '/monitoring',

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,

    // Enables automatic instrumentation of Vercel Cron Monitors.
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,
  },
);
