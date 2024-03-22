/* eslint-disable react/jsx-no-useless-fragment */

import { useLazyQuery } from '@apollo/client';
// TODO  move this Transactions container
import type { Transaction } from '@roadmanjs/wallet-client';
import { TRANSACTIONS_QUERY } from '@roadmanjs/wallet-client';
import {
  CoreLink,
  CoreText,
  Layout,
  Modal,
  ModalSize,
  useDialogState,
} from '@uuixjs/uuixweb';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

import { Container } from '@/components/container';

import { ViewAction } from '../actions';
import CryptoWallets from './CryptoWallets';
import MyWallet from './MyWallets';
// import StripeWallet from "./StripeWallet";
import { Transactions } from './Transactions';

interface State {
  selected: Transaction;
  isOpen: boolean;
  amount: number;
  isAddMoneyOpen: boolean;
  currency?: string;
}

export default function Wallet() {
  const { anchorProps: viewAnchorProps, dialogProps: viewDialogProps } =
    useDialogState();

  const [state, setState] = useState<State>({
    selected: null,
    isOpen: false,
    amount: 8,
    isAddMoneyOpen: false,
    currency: 'All',
  });

  const { selected, currency } = state;

  const isAll = currency === 'All';

  const setSelected = (sel: Transaction) => {
    const newState = { ...state, selected: sel };
    if (sel.source === 'nowpayments') {
      newState.isOpen = true; // open modal when nowpayments
    }
    setState(newState);
  };

  // TODO infinite scroll
  const [fetchTransactions, { data }] = useLazyQuery<{
    data: { items: Transaction[] };
  }>(TRANSACTIONS_QUERY);

  useEffect(() => {
    fetchTransactions({
      variables: {
        before: new Date(),
        filters: `${isAll ? '' : `currency=${currency}`}`,
        limit: 1000,
      },
    });
  }, [currency]);

  const transactions = data && data.data ? data.data.items : [];

  const view = {
    label: 'Transaction',
    item: selected,
    fields: [
      {
        label: 'Type',
        view: (item: Transaction) => <CoreText>{item?.type}</CoreText>,
      },
      {
        label: 'Ref-ID',
        view: (item: Transaction) => (
          <CoreText>{item?.id.toUpperCase()}</CoreText>
        ),
      },
      // TODO other crypto
      {
        label: 'Transaction ID',
        view: (item: Transaction) => (
          <>
            {item?.transactionHash && (
              <Layout padding={1}>
                <CoreLink
                  targetBlank
                  linkTo={`https://mempool.space/tx/${item?.transactionHash}`}
                >
                  {`${item?.transactionHash.slice(
                    0,
                    6,
                  )}...${item?.transactionHash.slice(-4)}`}
                </CoreLink>
              </Layout>
            )}
          </>
        ),
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
    ],
  };

  const changeTab = (cur: string) => {
    setState({ ...state, currency: cur });
  };

  // TODO proper formatting and layout
  return (
    <>
      <Modal {...viewDialogProps} size={ModalSize.Large}>
        <ViewAction {...view} close={() => viewDialogProps.onRequestClose()} />
      </Modal>

      <Container size={7}>
        <MyWallet />
        <CryptoWallets setCurrency={changeTab} />
        {/* <Tabs
          activeTabIndex={isAll ? 0 : walletscurrencies.indexOf(currency) + 1}
          tabs={[
            {
              linkTo: "#",
              onClick: () => changeTab("All"),
              label: "All",
            },
            ...walletscurrencies.map((currency) => ({
              linkTo: "#",
              onClick: () => changeTab(currency),
              label: currency,
            })),
          ]}
        /> */}
        <Transactions
          transactions={transactions}
          setSelected={(item) => {
            setSelected(item);
            viewAnchorProps.onClick();
          }}
        />
      </Container>

      {/* <Grid>
        <Column cols={{ default: 12 }}>
          <MyWallet />
        </Column>
        <Column cols={cols}>
          <CryptoWallets setCurrency={changeTab} />
        </Column>

        <Column cols={cols}>
          <Tabs
            activeTabIndex={isAll ? 0 : walletscurrencies.indexOf(currency) + 1}
            tabs={[
              {
                linkTo: "#",
                onClick: () => changeTab("All"),
                label: "All",
              },
              ...walletscurrencies.map((currency) => ({
                linkTo: "#",
                onClick: () => changeTab(currency),
                label: currency,
              })),
            ]}
          />
          <Transactions
            transactions={transactions}
            setSelected={(item) => {
              setSelected(item);
              viewAnchorProps.onClick();
            }}
          />
        </Column>
      </Grid> */}

      {/* TODO without props */}
      {/* {!isTor && (
        <StripeWallet
          isOpen={isAddMoneyOpen}
          onClose={onCloseAddMoneyDialog}
          amount={amount}
          setAmount={setAmount}
        />
      )} */}
    </>
  );
}
