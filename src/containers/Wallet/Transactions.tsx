// TODO  move this Transactions container
import type { Transaction } from '@roadmanjs/wallet-client';
import {
  AlignItems,
  Button,
  ButtonSize,
  CoreText,
  Display,
  FlexDirection,
  JustifyContent,
  Layout,
  Pill,
} from '@uuixjs/uuixweb';
import moment from 'moment';
import React from 'react';

import { getTransactionColor, getTransactionIcon } from '@/lib/utils/status';

import { getStatusColor } from '../actions';

interface TransactionsProps {
  transactions: Transaction[];
  setSelected: (selected: Transaction) => void;
}
export const Transactions = ({
  transactions,
  setSelected,
}: TransactionsProps) => {
  // const transactions = dtransactions;
  return (
    <Layout padding={1}>
      {transactions.map((item) => {
        // const transactionName = (item.source).toLocaleUpperCase();
        const statusText = item.status;
        const statusColor = getTransactionColor(item.status);
        const statusIcon = getTransactionIcon(item.status);
        const time = moment(new Date(item.createdAt)).fromNow();

        // TODO icons by status
        return (
          <Layout
            key={item?.id}
            onClick={() => setSelected(item)}
            padding={1}
            fullWidth
            display={Display.Flex}
            border
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
        );
      })}
    </Layout>
  );
};

export default Transactions;
