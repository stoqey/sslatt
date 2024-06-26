import '@/styles/globals.css';
import '@/styles/base.css';
import 'react-image-gallery/styles/css/image-gallery.css';

import { isEmpty } from 'lodash';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';

import { fetchConfig } from '@/lib/config/server';
import StyledComponentsRegistry from '@/lib/styled-registry';

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

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const cookieStore = cookies();
  const theme = cookieStore.get('theme');

  const siteSettings = await fetchConfig();

  return (
    <html
      lang="en"
      className={`js-focus-visible tw-root--theme-${
        theme && !isEmpty(theme?.value) ? theme.value : 'light'
      } tw-root--hover`}
    >
      <body>
        <StyledComponentsRegistry config={siteSettings}>
          {props.children}
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
