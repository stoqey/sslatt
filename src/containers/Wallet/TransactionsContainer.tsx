import { useLazyQuery } from '@apollo/client';
import type { Transaction } from '@roadmanjs/wallet-client';
import { TRANSACTIONS_QUERY } from '@roadmanjs/wallet-client';
import {
  CoreLink,
  CoreText,
  Display,
  FlexDirection,
  Layout,
  Modal,
  ModalSize,
  useDialogState,
} from '@uuixjs/uuixweb';
import moment from 'moment';
// TODO proper styling, proper config
import React, { useEffect } from 'react';

import { Container } from '@/components/container';

import { ViewAction } from '../actions';
import Transactions from './Transactions';

const TransactionsContainer = () => {
  const { anchorProps: viewAnchorProps, dialogProps: viewDialogProps } =
    useDialogState();
  const [getTx, { data }] = useLazyQuery(TRANSACTIONS_QUERY);
  const [selected, setSelected] = React.useState<Transaction>(null);
  const transactions = data && data.data ? data.data.items : [];

  useEffect(() => {
    getTx({
      variables: {
        before: new Date(),
        limit: 1000,
      },
    });
  }, []);

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

  console.log('dataTransactions', transactions);

  return (
    <Layout
      display={Display.Flex}
      flexDirection={FlexDirection.Column}
      padding={1}
    >
      <Modal {...viewDialogProps} size={ModalSize.Large}>
        <ViewAction {...view} close={() => viewDialogProps.onRequestClose()} />
      </Modal>
      <Layout fullWidth>
        <Container size={7}>
          <Layout padding={1}>
            <CoreText as="h3"> Transactions </CoreText>
          </Layout>
          <Transactions
            transactions={transactions}
            setSelected={(item) => {
              setSelected(item);
              viewAnchorProps.onClick();
            }}
          />
        </Container>
      </Layout>
    </Layout>
  );
};

export default TransactionsContainer;
