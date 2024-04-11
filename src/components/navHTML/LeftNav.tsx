import { AlignItems, Display, Layout } from '@uuixjs/uuixweb';
import Link from 'next/link';
import React from 'react';

import SslattIcon from '../logo/icon';
import type { NavProps } from './Nav';

export const LeftNav = (props: NavProps) => {
  return (
    <Layout display={Display.Flex} alignItems={AlignItems.Center}>
      <Link href="/html">
        <SslattIcon />
      </Link>
    </Layout>
  );
};

export default LeftNav;
