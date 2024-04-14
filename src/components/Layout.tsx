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
import { useMeApiWithLoading } from '@/lib/hooks/useUserCache';
import { useInitialLayoutState } from '@/lib/layouts/context/context';
import { useLayoutTheme } from '@/lib/layouts/context/layout.hooks';
import { LayoutProvider } from '@/lib/layouts/context/layout.provider';

import BodyContent from './body';
import Footer from './Footer';
import Nav from './nav/Nav';

interface LayoutPageProps extends LayoutProps {
  apps?: string[];
  nav?: boolean;
  auth?: boolean;
  user?: UserType;
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
  const {
    admin,
    auth,
    fallback = null,
    nav = true,
    user: userAuth,
    ...otherProps
  } = props;

  const pathname = usePathname();

  if (!getConfig().REQUIRE_LOGIN) {
    publicRoutes.push('/ad/', '/store/');
  }

  // isVendor
  const isAdminUser = (userAuth && userAuth.admin) || false;
  const isLoggedIn = userAuth && userAuth.id;

  const FallbackComponent = () => <BodyContent>{fallback}</BodyContent>;

  const { theme } = useLayoutTheme();

  console.log('LayoutPage', { pathname, userAuth, isAdminUser, isLoggedIn });

  return (
    <Wrapper id="rootx">
      {!userAuth &&
        auth &&
        pathname !== '/' &&
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
            minHeight="100vh"
            flexDirection="column"
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

            <Footer />
          </Layout>
        </AccentRegion>
      </CoreUIRoot>
    </Wrapper>
  );
}

function WithLayoutProvider(props: LayoutPageProps) {
  const initState = useInitialLayoutState();

  const isAuth = props?.auth || false;
  const { user: userAuth, loading } = useMeApiWithLoading();

  if (!initState) return null;

  if (isAuth && !userAuth && loading) {
    return null;
  }

  return (
    <LayoutProvider initState={initState}>
      <LayoutPage user={userAuth} {...props} />
    </LayoutProvider>
  );
}

export default WithLayoutProvider;
