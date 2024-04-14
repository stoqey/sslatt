'use client';

import {
  AccentRegion,
  Background,
  CoreUIRoot,
  Display,
  FlexDirection,
  FlexWrap,
  generateAccentRegionProps,
  Layout,
  Overflow,
  SVGAsset,
} from '@uuixjs/uuixweb';
import { isEmpty } from 'lodash';
import { usePathname } from 'next/navigation';
import React from 'react';

import { PageNotFound } from '@/components/404s/NotFound';
import { Footer } from '@/components/Footer';
import Nav from '@/components/navHTML/Nav';
import VerticalSideBar from '@/components/sidebarHTML/SideBar';

import { BodyContent } from '../coreui';

const isJsOnly = !isEmpty(process.env.NEXT_PUBLIC_JS_ONLY);
const isProduction = process.env.NODE_ENV === 'production';

export const HtmlPageWrapper = ({ children, config, ...otherProps }: any) => {
  const { user } = otherProps;
  const pathname = usePathname();
  const [hasJs, setHasJs] = React.useState(false);

  React.useEffect(() => {
    setHasJs(true);
  }, []);

  const themeColorConfig = config?.theme;
  //
  console.log('HtmlPageWrapper', { pathname, hasJs });

  return (
    <CoreUIRoot cssVars theme={otherProps.theme}>
      {/* @ts-ignore */}
      <AccentRegion
        {...((themeColorConfig &&
          generateAccentRegionProps(themeColorConfig)) ||
          {})}
      >
        <Layout
          id="layout-main"
          background={Background.Base}
          display={Display.Flex}
          overflow={Overflow.Hidden}
          flexDirection="column"
          fullWidth
          fullHeight
        >
          {isJsOnly && hasJs && isProduction ? (
            <PageNotFound
              icon={SVGAsset.Lock}
              message="please disable javascript, and refresh"
              title="NO JavaScript"
            />
          ) : (
            <Layout
              display={Display.Flex}
              flexWrap={FlexWrap.NoWrap}
              flexDirection={FlexDirection.Column}
              overflow={Overflow.Hidden}
              fullWidth
              fullHeight
              {...otherProps}
            >
              <Nav {...otherProps} />

              {/* TODO no global sidebar? */}

              {/* <BodyContent>{children}</BodyContent> */}
              <BodyContent>
                <Layout display={Display.Flex} fullWidth>
                  {user && <VerticalSideBar client {...otherProps} />}

                  <Layout fullWidth>
                    {/* RootMessageHtml */}
                    {children}
                  </Layout>
                </Layout>
              </BodyContent>
            </Layout>
          )}

          <Footer />
        </Layout>
      </AccentRegion>
    </CoreUIRoot>
  );
};
