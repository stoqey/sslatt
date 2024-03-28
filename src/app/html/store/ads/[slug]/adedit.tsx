'use client';

import { Display, Layout } from '@uuixjs/uuixweb';
import React from 'react';

import type { AdsEditorProps } from '@/containers/AdEditor/adeditor.html';
import AdsEditorHtml from '@/containers/AdEditor/adeditor.html';

const AdEditorPage = (props: AdsEditorProps) => {
  return (
    <Layout display={Display.Flex} fullWidth>
      <AdsEditorHtml {...props} />
    </Layout>
  );
};

export default AdEditorPage;
