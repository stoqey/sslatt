'use client';

import {
  CoreText,
  Display,
  FlexDirection,
  Icon,
  JustifyContent,
  Layout,
  SVGAsset,
} from '@uuixjs/uuixweb';
import { BorderRadius } from '@uuixjs/uuixweb-lib';
import React from 'react';

import type { NotificationType } from '@/components/types.generated';

interface Props {
  notifications?: NotificationType[];
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
        margin={{ top: 2 }}
      >
        <CoreText as="h3">Notifications</CoreText>
      </Layout>

      {notifications.map((notification) => (
        <Layout
          key={notification.id}
          padding={2}
          display={Display.Flex}
          border={BorderRadius.None}
        >
          <Icon asset={SVGAsset.Account} />
          <CoreText as="h5" bold>
            {notification.message}
          </CoreText>{' '}
        </Layout>
      ))}
    </Layout>
  );
};
