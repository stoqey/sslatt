import '@/styles/global.css';
import './globals.css';
import './base.css';
import 'react-image-gallery/styles/css/image-gallery.css';

import { isEmpty } from 'lodash';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider, useMessages } from 'next-intl';

import StyledComponentsRegistry from '@/lib/styled-registry';
import { AppConfig } from '@/utils/AppConfig';

export const metadata: Metadata = {
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

export default function RootLayout(props: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const cookieStore = cookies();
  const theme = cookieStore.get('theme');

  // Validate that the incoming `locale` parameter is valid
  if (!AppConfig.locales.includes(props.params.locale)) notFound();

  // Using internationalization in Client Components
  const messages = useMessages();

  return (
    <html
      lang={props.params.locale}
      className={`js-focus-visible tw-root--theme-${
        theme && !isEmpty(theme?.value) ? theme.value : 'light'
      } tw-root--hover`}
    >
      <body>
        <NextIntlClientProvider
          locale={props.params.locale}
          messages={messages}
        >
          <StyledComponentsRegistry>{props.children}</StyledComponentsRegistry>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
