/* eslint-disable no-nested-ternary */
import type { LayoutProps } from '@uuixjs/uuixweb';
import {
  AccentRegion,
  Background,
  CoreUIRoot,
  Display,
  FlexDirection,
  FlexWrap,
  Layout,
  Overflow,
} from '@uuixjs/uuixweb';
import { styled } from '@uuixjs/uuixweb-lib';
import { usePathname } from 'next/navigation';
import React from 'react';
// import Nav from "./nav";
import { ToastContainer } from 'react-toastify';

import { AllAppModels } from '@/containers/modals';
import { getConfig } from '@/lib/config';
import { useMeApi } from '@/lib/hooks/useUserCache';
import { useInitialLayoutState } from '@/lib/layouts/context/context';
import { useLayoutTheme } from '@/lib/layouts/context/layout.hooks';
import { LayoutProvider } from '@/lib/layouts/context/layout.provider';

import BodyContent from './body';
import Nav from './nav/Nav';

interface LayoutPageProps extends LayoutProps {
  apps?: string[];
  nav?: boolean;
  auth?: boolean;
  admin?: boolean;
  fallback?: any;
  children: any;
}

const Wrapper = styled.div`
  height: -webkit-fill-available;
`;

const publicRoutes = [
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
];

function LayoutPage({ children, ...props }: LayoutPageProps) {
  const { admin, auth, fallback = null, nav = true, ...otherProps } = props;

  const userAuth = useMeApi();

  const pathname = usePathname();

  if (!getConfig().REQUIRE_LOGIN) {
    publicRoutes.push('/ad/', '/store/');
  }

  // isVendor
  const isAdminUser = (userAuth && userAuth.admin) || false;
  const isLoggedIn = userAuth && userAuth.id;

  const FallbackComponent = () => <BodyContent>{fallback}</BodyContent>;

  const { theme } = useLayoutTheme();

  return (
    <Wrapper id="rootx">
      {!userAuth &&
        pathname !== '/' &&
        auth &&
        !publicRoutes.some((route) => (pathname || '').startsWith(route)) && (
          <meta httpEquiv="refresh" content="0; url=/login" />
        )}

      <CoreUIRoot appRootElementId="__next" theme={theme} cssVars>
        <AccentRegion
        // FIXME: Change theme color
        // e.g {...generateAccentRegionProps("#fffb00")}
        // getConfig().theme
        >
          {/* <LayoutSEO serviceProvider={serviceProvider} /> */}
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
              {nav ? (
                <>
                  <Nav user={userAuth} />
                  {auth ? (
                    // isAdmin
                    admin ? (
                      isAdminUser ? (
                        <BodyContent>{children}</BodyContent>
                      ) : (
                        <FallbackComponent />
                      )
                    ) : // isAuth
                    isLoggedIn ? (
                      <BodyContent>{children}</BodyContent>
                    ) : (
                      <FallbackComponent />
                    )
                  ) : (
                    <BodyContent>{children}</BodyContent>
                  )}
                </>
              ) : (
                <>
                  {auth ? (
                    // isAdmin
                    admin ? (
                      isAdminUser ? (
                        children
                      ) : (
                        <FallbackComponent />
                      )
                    ) : // isAuth
                    isLoggedIn ? (
                      children
                    ) : (
                      <FallbackComponent />
                    )
                  ) : (
                    children
                  )}
                </>
              )}

              {/* all app modals here */}
              <AllAppModels />
              <ToastContainer />
            </Layout>
          </Layout>
        </AccentRegion>
      </CoreUIRoot>
    </Wrapper>
  );
}

function WithLayoutProvider(props: LayoutPageProps) {
  const initState = useInitialLayoutState();

  if (!initState) return null;

  return (
    <LayoutProvider initState={initState}>
      <LayoutPage {...props} />
    </LayoutProvider>
  );
}

export default WithLayoutProvider;
