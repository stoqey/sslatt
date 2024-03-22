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
  InjectLayout,
  JustifyContent,
  Layout,
  SVGAsset,
  useDialogState,
} from '@uuixjs/uuixweb';
import isEmpty from 'lodash/isEmpty';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

import { useLogoutSession } from '@/lib/apollo.client';
import { useLayoutTheme } from '@/lib/layouts/context/layout.hooks';
import { cdnPath } from '@/lib/utils/api.utils';
import { niceDec } from '@/lib/utils/number';

import { WithLoginWrapper } from '../../containers/SignIn/LoginWrapper';
import { useWalletTotalUsd } from '../../containers/Wallet/MyWallets';
import type { NavProps } from './Nav';

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
    <WithLoginWrapper
      signup={signup}
      TriggerComponent={(triggerProps: any) => {
        const { anchorProps, dialogProps } = useDialogState();
        const { theme, toggleColorMode } = useLayoutTheme();
        return (
          <Layout display={Display.Flex}>
            {/* Login Buttons */}
            <Layout display={Display.Flex}>
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
  );
};

export default RightNav;
