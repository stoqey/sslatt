/* eslint-disable no-nested-ternary */
import type { LayoutProps } from '@uuixjs/uuixweb';
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
  '/signup',
  '/forgot-password',
  '/reset-password',
];

function LayoutPage({ children, ...props }: LayoutPageProps) {
  const {
    admin,
    auth,
    fallback = null,
    nav = true,
    user,
    ...otherProps
  } = props;

  const pathname = usePathname();

  const loginRequired = getConfig().REQUIRE_LOGIN || auth;

  const isIndex = pathname === '/';

  if (!loginRequired) {
    publicRoutes.push('/ad/', '/store/');
  }

  // isVendor
  const isAdminUser = (user && user.admin) || false;
  const isLoggedIn = user && user.id;

  const FallbackComponent = () => <BodyContent>{fallback}</BodyContent>;

  const { theme: themeDarkLight } = useLayoutTheme();

  const themeColorConfig = getConfig().theme;

  console.log('LayoutPage', {
    pathname,
    userAuth: user,
    isAdminUser,
    isLoggedIn,
    loginRequired,
    isIndex,
  });

  const Redirect = () => {
    if (loginRequired) {
      if (
        (isIndex && !user) ||
        (!user &&
          !publicRoutes.some((route) => (pathname || '').startsWith(route)))
      ) {
        return <meta httpEquiv="refresh" content="0; url=/login" />;
      }
    } else {
      if (isIndex) {
        return null;
      }

      if (!publicRoutes.some((route) => (pathname || '').startsWith(route))) {
        return <meta httpEquiv="refresh" content="0; url=/login" />;
      }
    }
    return null;
  };
  return (
    <Wrapper id="rootx">
      <Redirect />

      <CoreUIRoot appRootElementId="__next" theme={themeDarkLight} cssVars>
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
                  <Nav user={user} />
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

  if (!userAuth && loading) {
    return null;
  }

  return (
    <LayoutProvider initState={initState}>
      <LayoutPage user={userAuth} {...props} />
    </LayoutProvider>
  );
}

export default WithLayoutProvider;
