'use client';

import {
  AccentRegion,
  Background,
  CoreUIRoot,
  Display,
  FlexDirection,
  FlexWrap,
  InjectLayout,
  Layout,
  Overflow,
} from '@uuixjs/uuixweb';
import { usePathname } from 'next/navigation';

import Nav from '@/components/navHTML/Nav';

export const BodyContent = ({ children }: any) => {
  return (
    <Layout display={Display.Flex} fullWidth>
      {/* main content */}
      <InjectLayout
        display={Display.Flex}
        flexDirection={FlexDirection.Column}
        fullWidth
        fullHeight
        overflow={Overflow.Hidden}
      >
        <main style={{ marginTop: '5rem' }}>
          <Layout display={Display.Flex} className="scrollable-area">
            <div
              style={{ width: '100%', height: '100%' }}
              className="simple-scroll-content"
            >
              {/* TODO add root alert component */}
              {children}
            </div>
          </Layout>
        </main>
      </InjectLayout>
    </Layout>
  );
};

export const CoreUIWrapper = ({ children, ...otherProps }: any) => {
  const pathname = usePathname();
  console.log('CoreUIWrapper', { pathname });

  return (
    <CoreUIRoot theme="dark" cssVars>
      {/* @ts-ignore */}
      <AccentRegion>
        <Layout
          id="layout-main"
          background={Background.Base}
          display={Display.Flex}
          overflow={Overflow.Hidden}
          fullWidth
          fullHeight
        >
          <Layout
            display={Display.Flex}
            flexWrap={FlexWrap.NoWrap}
            flexDirection={FlexDirection.Column}
            overflow={Overflow.Hidden}
            fullWidth
            fullHeight
            {...otherProps}
          >
            <Nav />

            <BodyContent>{children}</BodyContent>

            {/* all app modals here */}
            {/* <AllAppModels /> */}
            {/* <ToastContainer /> */}
          </Layout>
        </Layout>
      </AccentRegion>
    </CoreUIRoot>
  );
};
