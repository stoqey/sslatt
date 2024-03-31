import {
  AlignItems,
  Avatar,
  BadgeType,
  Button,
  ButtonIcon,
  ButtonIconType,
  ButtonSize,
  CoreText,
  Display,
  FlexDirection,
  JustifyContent,
  Layout,
  NumberBadge,
  SVGAsset,
} from '@uuixjs/uuixweb';
import { isEmpty } from 'lodash';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { useWalletTotalUsdHtml } from '@/containers/Wallet/MyWallets.html';
import { cdnPath } from '@/lib/utils/api.utils';
import { niceDec } from '@/lib/utils/number';

import type { Badge } from '../types.generated';
import type { NavProps } from './Nav';

const ThemeToggle = ({ theme }: { theme: string }) => {
  const pathname = usePathname();
  const isDark = theme === 'dark';
  return (
    <Layout padding={{ left: 1, right: 1 }}>
      <form action="/api/theme" method="POST">
        <input type="hidden" name="pathname" value={pathname} />
        <ButtonIcon
          type="submit"
          size={ButtonSize.Default}
          aria-label="aria label"
          icon={isDark ? SVGAsset.ChannelPoints : SVGAsset.Moon}
          variant={ButtonIconType.Primary}
        />
      </form>
    </Layout>
  );
};
const AuthRightNav = ({
  user: currentUser,
  rates,
  wallets,
  theme,
  badges,
}: NavProps) => {
  const { walletsTotal, walletsAmount } = useWalletTotalUsdHtml({
    wallets,
    rates,
  });

  console.log('walletsAmount', walletsAmount);

  const notificationBadge: Badge = badges?.find(
    (b) => (b.model || '').toLowerCase() === BadgeType.Notification,
  );

  const notificationBadgeCount = notificationBadge?.count || 0;

  const avatarUri = cdnPath(currentUser && currentUser.avatar); // TODO default image

  const username = currentUser.username || '';
  return (
    <Layout
      display={Display.Flex}
      justifyContent={JustifyContent.Center}
      alignItems={AlignItems.Center}
    >
      {/* Avatar / Account login / Dropdown */}

      {/* USD balance */}
      <Layout display={Display.Flex} alignItems={AlignItems.Center}>
        <Layout>
          {!isEmpty(walletsAmount) &&
            walletsAmount.map((wallet) => (
              <Layout
                key={wallet.currency}
                display={Display.Flex}
                flexDirection={FlexDirection.Row}
                justifyContent={JustifyContent.Between}
              >
                <CoreText style={{ marginRight: '10px' }} />
                <CoreText style={{ marginRight: '10px' }}>
                  {niceDec(wallet.rate, false)}
                </CoreText>
              </Layout>
            ))}
        </Layout>

        <Layout>
          {!isEmpty(walletsAmount) &&
            walletsAmount.map((wallet) => (
              <Layout
                key={wallet.currency}
                display={Display.Flex}
                flexDirection={FlexDirection.Row}
                justifyContent={JustifyContent.Between}
              >
                <CoreText bold style={{ marginRight: '10px' }}>
                  {wallet.currency}:{' '}
                </CoreText>

                <CoreText bold style={{ marginRight: '10px' }}>
                  {' '}
                  {wallet.amount.toFixed(7)}
                </CoreText>
              </Layout>
            ))}
        </Layout>
        <Link href="/html/wallet">
          <Button
            size={ButtonSize.Default}
            aria-label="aria label"
            variant={ButtonIconType.Secondary}
          >
            <CoreText as="h4">{niceDec(walletsTotal)}</CoreText>
          </Button>
        </Link>
      </Layout>

      <Layout padding={{ left: 1 }}>
        <Link href="/html/chat">
          <ButtonIcon
            type="submit"
            size={ButtonSize.Default}
            aria-label="aria label"
            icon={SVGAsset.Whisper}
            variant={ButtonIconType.Primary}
          />
        </Link>
      </Layout>

      <Layout padding={{ left: 1 }}>
        <Link href="/html/notifications">
          <Layout display={Display.Flex}>
            <ButtonIcon
              type="submit"
              size={ButtonSize.Default}
              aria-label="aria label"
              icon={SVGAsset.NotificationBell}
              variant={ButtonIconType.Primary}
            />

            {notificationBadgeCount > 0 && (
                <div style={{ marginLeft: '-15px', marginTop: '-10px' }}>
                  <NumberBadge value={notificationBadge.count} />
                </div>
              )}
          </Layout>
        </Link>
      </Layout>

      <Layout padding={{ left: 1, right: 2 }}>
        <Link href="/html/settings/profile">
          <ButtonIcon
            size={ButtonSize.Large}
            aria-label="aria label"
            icon={
              <Avatar
                userLogin={username}
                size={30}
                src={!isEmpty(avatarUri) && avatarUri}
                alt={username}
              />
            }
            variant={ButtonIconType.Primary}
          />
        </Link>
      </Layout>

      <ThemeToggle theme={theme} />
    </Layout>
  );
};

export const RightNav = (props: NavProps) => {
  const { rates = [] } = props;
  return (
    <Layout display={Display.Flex}>
      {/* Login Buttons */}
      <Layout display={Display.Flex}>
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

        <Layout padding={{ right: 1 }}>
          <Link href="/html/login">
            <Button
              size={ButtonSize.Default}
              onClick={() => {
                // setSignup(false);
                // props.onPress();
              }}
              variant={ButtonIconType.Secondary}
            >
              Login In
            </Button>
          </Link>
        </Layout>
        <Layout padding={{ right: 1 }}>
          <Link href="/html/signup">
            <Button
              size={ButtonSize.Default}
              onClick={() => {
                // setSignup(true);
                // props.onPress();
              }}
              variant={ButtonIconType.Primary}
            >
              Sign Up
            </Button>
          </Link>
        </Layout>
      </Layout>

      {/* Avatar / Account login / Dropdown */}
      <Layout display={Display.Flex}>
        <ThemeToggle {...props} />
      </Layout>
    </Layout>
  );
};

export const RightNavHtml = (props: NavProps) => {
  const { user } = props;
  if (user) {
    return <AuthRightNav {...props} />;
  }
  return <RightNav {...props} />;
};

export default RightNavHtml;
