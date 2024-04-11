'use client';

import { usePathname, useServerInsertedHTML } from 'next/navigation';
import React, { useState } from 'react';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

import type { UISiteSettings } from '@/lib/config';
import { setConfig } from '@/lib/config';

export default function StyledComponentsRegistry({
  children,
  config,
}: {
  children: React.ReactNode;
  config?: UISiteSettings;
}) {
  const pathname = usePathname();
  const hasChat = pathname.includes('chat');
  // Only create stylesheet once with lazy initial state
  // x-ref: https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{styles}</>;
  });

  if (config) {
    setConfig(config);
  }

  if (typeof window !== 'undefined') return <body>{children}</body>;

  return (
    <body className={hasChat ? 'fixed-body' : ''}>
      <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
        {children}
      </StyleSheetManager>
    </body>
  );
}
