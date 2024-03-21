'use client';

import { Display, Layout } from '@uuixjs/uuixweb';
import { usePathname } from 'next/navigation';
import React from 'react';

import type { UVAContainerHtmlProps } from '@/containers/UVA/uva.container.html';
import UVAContainerHtml from '@/containers/UVA/uva.container.html';

const UVAview = async (props: UVAContainerHtmlProps & { isStore: boolean }) => {
  const isStore = props.isStore || false;
  const pathname = usePathname();

  let tab = props.tab || 0;
  const last = pathname.split('/').pop();

  if (last === 'ads') {
    tab = 1;
  }
  if (last === 'reviews') {
    tab = isStore ? 2 : 1;
  }

  return (
    <Layout display={Display.Flex} fullWidth>
      <UVAContainerHtml {...props} tab={tab} store={isStore} />
    </Layout>
  );
};

export default UVAview;
