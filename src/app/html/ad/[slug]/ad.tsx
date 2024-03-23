'use client';

import { Display, Layout } from '@uuixjs/uuixweb';
import { usePathname } from 'next/navigation';
import React from 'react';

import type { ADPContainerHTMLProps } from '@/containers/ADP/adp.container.html';
import ADPContainer from '@/containers/ADP/adp.container.html';

const AdView = (props: ADPContainerHTMLProps) => {
  const reviews = props.reviews || [];
  const { ad } = props;
  const pathname = usePathname();

  let tab = props.tab || 0;
  const last = pathname.split('/').pop();
  if (last === 'reviews') {
    tab = 1;
  }

  return (
    <Layout display={Display.Flex} fullWidth>
      <ADPContainer ad={ad} tab={tab} reviews={reviews} />
    </Layout>
  );
};

export default AdView;
