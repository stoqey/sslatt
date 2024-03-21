'use client';

import {
  Button,
  ButtonType,
  CoreText,
  Display,
  JustifyContent,
  Layout,
  SVGAsset,
} from '@uuixjs/uuixweb';
import Link from 'next/link';
import React from 'react';

import { Container } from '@/components/container';
import type { UserType, VendorType } from '@/components/types.generated';
import type { WithdrawRequestListHtmlProps } from '@/containers/Withdraw/withdraw.list.html';
import WithdrawRequestList from '@/containers/Withdraw/withdraw.list.html';

const WithdrawRequestsListPage = (
  props: WithdrawRequestListHtmlProps & { vendor: VendorType; user: UserType },
) => {
  return (
    <Layout display={Display.Flex} fullWidth>
      <Layout fullWidth>
        <Container>
          <Layout
            display={Display.Flex}
            justifyContent={JustifyContent.Center}
            fullWidth
            padding={1}
          >
            <Link href="/html/wallet/withdraw/create">
              <Button icon={SVGAsset.New} variant={ButtonType.Primary}>
                Create new withdraw request
              </Button>
            </Link>
          </Layout>
          <Layout
            display={Display.Flex}
            justifyContent={JustifyContent.Center}
            padding={{ top: 2, left: 1, bottom: 2 }}
          >
            <CoreText as="h3">Recent Withdraws</CoreText>
          </Layout>
          <WithdrawRequestList {...props} />
        </Container>
      </Layout>
    </Layout>
  );
};

export default WithdrawRequestsListPage;
