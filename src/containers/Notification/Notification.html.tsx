'use client';

import {
  Background,
  CoreText,
  Display,
  FlexDirection,
  Icon,
  JustifyContent,
  Layout,
  SVGAsset,
} from '@uuixjs/uuixweb';
import { BorderRadius } from '@uuixjs/uuixweb-lib';
import Link from 'next/link';
import React from 'react';

import type { Notification } from '@/components/types.generated';

interface Props {
  notifications?: Notification[];
  // todo pagination
}

export const NotificationsContainerHtml = (props: Props) => {
  const { notifications = [] } = props;
  if (!notifications.length) {
    return null;
  }
  return (
    <Layout display={Display.Flex} flexDirection={FlexDirection.Column}>
      <Layout
        display={Display.Flex}
        justifyContent={JustifyContent.Center}
        margin={{ top: 2, bottom: 2 }}
      >
        <CoreText as="h3">Notifications</CoreText>
      </Layout>

      {notifications.map((notification) => (
        <Link
          key={notification.id}
          href={`/html/notifications/${notification.id}`}
        >
          <Layout
            padding={2}
            display={Display.Flex}
            border={BorderRadius.None}
            background={
              notification.read ? Background.Alt2 : Background.Inherit
            }
          >
            <Icon asset={SVGAsset.Account} />
            <CoreText as="h5" bold>
              {notification.message}
            </CoreText>{' '}
          </Layout>
        </Link>
      ))}
    </Layout>
  );
};
