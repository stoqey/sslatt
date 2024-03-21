'use client';

import {
  AlignItems,
  Background,
  Button,
  ButtonType,
  CoreText,
  Display,
  Icon,
  JustifyContent,
  Layout,
  SVGAsset,
} from '@uuixjs/uuixweb';
import { isEmpty } from 'lodash';
import Link from 'next/link';
import React from 'react';

export interface PageNotFoundProps {
  title?: string;
  message?: string;
  icon?: keyof typeof SVGAsset;
  children?: React.ReactNode;
}

export const PageNotFound = (props: PageNotFoundProps) => {
  const {
    message = 'Not found, please try again',
    title = '',
    icon = SVGAsset.Document,
  } = props;
  return (
    <Layout
      background={Background.Alt}
      style={{
        minHeight: '300px',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
      }}
      fullWidth
      fullHeight
    >
      {isEmpty(title) ? null : (
        <Layout padding={{ bottom: 2 }}>
          <CoreText as="h3">{title}</CoreText>
        </Layout>
      )}
      <Icon asset={icon} style={{ width: '70px', height: '70px' }} />
      <Layout margin={{ top: 1 }}>
        <CoreText as="h4">{message}</CoreText>
      </Layout>

      <Layout margin={{ top: 2 }}>{props.children}</Layout>
    </Layout>
  );
};

export const PageRequiredLogin = () => {
  return (
    <PageNotFound
      icon={SVGAsset.Lock}
      title="Not Authorized"
      message="You must be logged in to view this page"
    >
      <Layout
        display={Display.Flex}
        justifyContent={JustifyContent.Center}
        alignItems={AlignItems.Center}
      >
        <Link href="/html/login">
          <Button variant={ButtonType.Primary} type="button">
            Login
          </Button>
        </Link>
      </Layout>
    </PageNotFound>
  );
};
