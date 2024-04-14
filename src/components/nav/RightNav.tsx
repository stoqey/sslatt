/* eslint-disable react-hooks/rules-of-hooks */
import {
  AlignItems,
  Avatar,
  Button,
  ButtonIcon,
  ButtonIconType,
  ButtonSize,
  CoreText,
  DialogLayer,
  Display,
  DropDownMenuHeading,
  DropDownMenuInputItem,
  DropDownMenuInputItemType,
  DropDownMenuItem,
  DropDownMenuSeparator,
  DropDownMenuWrapper,
  FlexDirection,
  InjectLayout,
  JustifyContent,
  Layout,
  SVGAsset,
  useDialogState,
} from '@uuixjs/uuixweb';
import isEmpty from 'lodash/isEmpty';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

import { ApolloWrapper, useLogoutSession } from '@/lib/apollo-wrapper.client';
import { APPEVENTS } from '@/lib/AppEvent';
import { useEvent } from '@/lib/hooks/useEvent';
import useRates from '@/lib/hooks/useRates';
import { useLayoutTheme } from '@/lib/layouts/context/layout.hooks';
import { cdnPath } from '@/lib/utils/api.utils';
import { niceDec } from '@/lib/utils/number';

import { WithLoginWrapper } from '../../containers/SignIn/LoginWrapper';
import { useWalletTotalUsd } from '../../containers/Wallet/MyWallets';
import type { NavProps } from './Nav';

const NavRates = () => {
  const { rates } = useRates();
  return (
    <Layout padding={{ right: 2 }}>
      {!isEmpty(rates) &&
        rates &&
        rates.map((rate) => (
          <Layout
            key={rate.pair}
            display={Display.Flex}
            flexDirection={FlexDirection.Row}
            justifyContent={JustifyContent.Between}
          >
            <CoreText bold style={{ marginRight: '10px' }}>
              {rate.pair?.replace('_USD', '')}
            </CoreText>
            <CoreText style={{ marginRight: '10px' }}>
              {niceDec(rate.rate || 0, false)}
            </CoreText>
          </Layout>
        ))}
    </Layout>
  );
};

const AuthRightNav = (props: NavProps) => {
  const { user: currentUser } = props;
  const { push } = useRouter();
  const { anchorProps, dialogProps } = useDialogState();
  const { theme, toggleColorMode } = useLayoutTheme();
  // const walletsTotal = 0;
  const { walletsTotal } = useWalletTotalUsd();
  const [logout] = useLogoutSession();
  const avatarUri = cdnPath(currentUser && currentUser.avatar); // TODO default image

  return (
    <Layout
      display={Display.Flex}
      justifyContent={JustifyContent.Center}
      alignItems={AlignItems.Center}
    >
      {/* Avatar / Account login / Dropdown */}

      <NavRates />

      {/* USD balance */}
      <Layout>
        <Link href="/wallet">
          <Button
            size={ButtonSize.Default}
            aria-label="aria label"
            variant={ButtonIconType.Secondary}
          >
            <CoreText as="h4">{niceDec(walletsTotal)}</CoreText>
          </Button>
        </Link>
      </Layout>

      <InjectLayout>
        <ButtonIcon
          size={ButtonSize.Large}
          aria-label="aria label"
          icon={
            isEmpty(avatarUri) ? (
              SVGAsset.Account
            ) : (
              <Avatar
                userLogin="xxx"
                size={30}
                src={avatarUri}
                alt="aria label"
                {...anchorProps}
              />
            )
          }
          variant={ButtonIconType.Primary}
          {...anchorProps}
        />
      </InjectLayout>

      <DialogLayer {...dialogProps}>
        <DropDownMenuWrapper elevation={3}>
          <DropDownMenuInputItem
            type={DropDownMenuInputItemType.Toggle}
            id="dark-mode"
            name="dark-mode"
            label="Dark Mode"
            figure={{ icon: SVGAsset.Moon }}
            checked={theme === 'dark'}
            onChange={(e) => {
              toggleColorMode();
            }}
          />
          <DropDownMenuSeparator />
          <DropDownMenuHeading>Account</DropDownMenuHeading>
          <DropDownMenuItem
            label="Profile"
            figure={{ icon: SVGAsset.Account }}
            onClick={() => {
              push('/settings/profile');
            }}
          />
          <DropDownMenuItem
            label="Wallet"
            figure={{ icon: SVGAsset.Account }}
            onClick={() => {
              push('/wallet');
            }}
          />
          <DropDownMenuItem
            label="Logout"
            figure={{ icon: SVGAsset.NavLogout }}
            onClick={() => logout()}
          />
        </DropDownMenuWrapper>
      </DialogLayer>
    </Layout>
  );
};

export const RightNav = (props: NavProps) => {
  const [signup, setSignup] = React.useState(false);
  // return undefined;

  return (
    <ApolloWrapper>
      <WithLoginWrapper
        signup={signup}
        TriggerComponent={(triggerProps: any) => {
          const { anchorProps, dialogProps } = useDialogState();
          const { theme, toggleColorMode } = useLayoutTheme();
          const pathname = usePathname();
          const isRoot = pathname === '/';

          const usedSignin = useEvent(APPEVENTS.LOGOUT);
          useEffect(() => {
            if (usedSignin && !dialogProps.show && !isRoot) {
              triggerProps.onPress();
            }
          }, [usedSignin]);

          return (
            <Layout display={Display.Flex}>
              {/* Login Buttons */}
              <Layout
                display={Display.Flex}
                justifyContent={JustifyContent.Center}
                alignItems={AlignItems.Center}
              >
                <NavRates />

                <Layout padding={{ right: 1 }}>
                  <Button
                    size={ButtonSize.Default}
                    onClick={() => {
                      setSignup(false);
                      triggerProps.onPress();
                    }}
                    variant={ButtonIconType.Secondary}
                  >
                    Login In
                  </Button>
                </Layout>
                <Layout padding={{ right: 1 }}>
                  <Button
                    size={ButtonSize.Default}
                    onClick={() => {
                      setSignup(true);
                      triggerProps.onPress();
                    }}
                    variant={ButtonIconType.Primary}
                  >
                    Sign Up
                  </Button>
                </Layout>
              </Layout>

              {/* Avatar / Account login / Dropdown */}
              <Layout>
                {/* @ts-ignore */}
                <ButtonIcon
                  size={ButtonSize.Default}
                  aria-label="aria label"
                  icon={SVGAsset.Account}
                  variant={ButtonIconType.Primary}
                  {...anchorProps}
                />

                <DialogLayer {...dialogProps}>
                  <DropDownMenuWrapper elevation={3}>
                    <DropDownMenuInputItem
                      type={DropDownMenuInputItemType.Toggle}
                      id="dark-mode"
                      name="dark-mode"
                      label="Dark Mode"
                      figure={{ icon: SVGAsset.Moon }}
                      checked={theme === 'dark'}
                      onChange={(e) => {
                        toggleColorMode();
                      }}
                    />
                  </DropDownMenuWrapper>
                </DialogLayer>
              </Layout>
            </Layout>
          );
        }}
      >
        <AuthRightNav {...props} />
      </WithLoginWrapper>
    </ApolloWrapper>
  );
};

export default RightNav;
