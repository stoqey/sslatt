import { AlignItems, CoreInteractive, Display, Layout } from '@uuixjs/uuixweb';
import React from 'react';

import { useIsHome } from '@/lib/layouts/context/layout.hooks';

import { SslattIcon } from '../logo/icon';

export const LeftNav = () => {
  // const isAdmin = get(props.user, 'admin', false);
  const { push } = useIsHome();

  return (
    <Layout display={Display.Flex} alignItems={AlignItems.Center}>
      <CoreInteractive onClick={() => push('/')}>
        <SslattIcon />
      </CoreInteractive>
    </Layout>
  );
};

export default LeftNav;
