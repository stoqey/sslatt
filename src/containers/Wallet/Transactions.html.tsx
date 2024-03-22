import {
  AlignItems,
  Button,
  ButtonSize,
  CoreLink,
  CoreText,
  Display,
  FlexDirection,
  JustifyContent,
  Layout,
  Pill,
} from '@uuixjs/uuixweb';
import { BorderRadius } from '@uuixjs/uuixweb-lib';
import { isEmpty } from 'lodash';
import moment from 'moment';
import Link from 'next/link';
import React from 'react';

import { PageNotFound } from '@/components/404s/NotFound';
import type { Transaction } from '@/components/types.generated';
import { getTransactionColor, getTransactionIcon } from '@/lib/utils/status';

import { getStatusColor } from '../actions';

export const txIdUrl = {
  BTC: (id: string) => `https://mempool.space/tx/${id}`,
  XMR: (id: string) => `https://xmrchain.net/tx/${id}`,
};

export const transactionsFields = [
  {
    label: 'Type',
    view: (item: Transaction) => <CoreText>{item?.type}</CoreText>,
  },
  {
    label: 'Ref-ID',
    view: (item: Transaction) => <CoreText>{item?.id.toUpperCase()}</CoreText>,
  },
  // TODO other crypto
  {
    label: 'Transaction ID',
    view: (item: Transaction) => {
      const currency = (item?.currency || '').toLocaleUpperCase() as any;
      // eslint-disable-next-line react/jsx-no-useless-fragment
      return (
        <>
          {!isEmpty(item?.transactionHash) && item?.transactionHash && (
            <Layout padding={1}>
              {(txIdUrl as any)[currency] && (
                <CoreLink
                  targetBlank
                  linkTo={(txIdUrl as any)[currency](item.transactionHash)}
                >
                  {`${item?.transactionHash.slice(
                    0,
                    6,
                  )}...${item?.transactionHash.slice(-4)}`}
                </CoreLink>
              )}
            </Layout>
          )}
        </>
      );
    },
  },
  {
    label: 'Date',
    view: (item: Transaction) => (
      <CoreText>{moment(item?.createdAt).fromNow()}</CoreText>
    ),
  },
  {
    label: 'Address',
    view: (item: Transaction) => <CoreText>{item?.sourceId}</CoreText>,
  },
];

export interface TransactionsHtmlProps {
  transactions: Transaction[];
}

export const TransactionsHtml = (props: TransactionsHtmlProps) => {
  const transactions = props.transactions || [];
  // const transactions = dtransactions;
  if (isEmpty(transactions)) {
    return (
      <PageNotFound
        title="no transactions"
        message="Transactions will appear here"
      />
    );
  }
  return (
    <Layout padding={1}>
      {transactions.map((item, index) => {
        // const transactionName = (item.source).toLocaleUpperCase();
        const statusText = item.status;
        const statusColor = getTransactionColor(item?.status);
        const statusIcon = getTransactionIcon(item?.status);

        // const isPending = isStatusPending(item?.status);
        const time = moment(new Date(item.createdAt)).fromNow();

        const transactionViewLink = `/html/wallet/transactions/${item.id}`;

        // TODO icons by status
        return (
          <Link key={item.id} href={transactionViewLink}>
            <Layout
              padding={1}
              fullWidth
              display={Display.Flex}
              border
              borderRadius={BorderRadius.Rounded}
            >
              <Layout
                display={Display.Flex}
                justifyContent={JustifyContent.Center}
                alignItems={AlignItems.Center}
              >
                <Button
                  icon={statusIcon}
                  size={ButtonSize.Default}
                  onClick={() => {}}
                  variant={statusColor}
                />
              </Layout>
              <Layout fullWidth display={Display.Flex}>
                <Layout
                  display={Display.Flex}
                  flexDirection={FlexDirection.Column}
                  style={{ flex: 1 }}
                >
                  <Layout
                    display={Display.Flex}
                    justifyContent={JustifyContent.Between}
                  >
                    <CoreText padding={{ left: 1 }} as="h4" bold>
                      {item.currency} {item.amount}
                    </CoreText>
                    <Layout
                      display={Display.Flex}
                      justifyContent={JustifyContent.Center}
                      alignItems={AlignItems.Center}
                    >
                      <Pill
                        type={getStatusColor(item?.status as any)}
                        label={statusText}
                      />
                    </Layout>
                  </Layout>

                  <Layout
                    display={Display.Flex}
                    justifyContent={JustifyContent.Between}
                  >
                    <CoreText padding={{ left: 1 }} as="h5">
                      {time}
                    </CoreText>

                    <CoreText padding={{ left: 1 }} as="h5">
                      {item.type}
                    </CoreText>
                  </Layout>
                </Layout>
              </Layout>
            </Layout>
          </Link>
        );
      })}
    </Layout>
  );
};

export default TransactionsHtml;
