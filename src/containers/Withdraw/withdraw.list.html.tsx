'use client';

import {
  AlignItems,
  Button,
  ButtonType,
  CoreLink,
  CoreText,
  Display,
  FlexDirection,
  JustifyContent,
  Layout,
  Pill,
} from '@uuixjs/uuixweb';
import { BorderRadius } from '@uuixjs/uuixweb-lib';
import moment from 'moment';
import Link from 'next/link';
import React from 'react';

import type {
  UserType,
  WithdrawRequestOutput,
  WithdrawRequestOutputPagination,
} from '@/components/types.generated';
import { IStatus } from '@/lib/gql';
import { getPillStatusColor } from '@/lib/utils/colors';

import type { ListItemHtmlProps } from '../actions.list.html';
import { ActionList } from '../actions.list.html';
import { withdrawActions } from './withdraw.actions.html.names';

export const withdrawFields = [
  {
    label: 'Ref-ID',
    path: 'id',
    view: (item: WithdrawRequestOutput) => (
      <CoreText>{(item?.id || '').toUpperCase()}</CoreText>
    ),
  },
  // TODO other crypto
  {
    label: 'Transaction ID',
    path: 'id',
    view: (item: WithdrawRequestOutput) => (
      <CoreLink linkTo={`https://mempool.space/tx/${item?.transactionHash}`}>
        {item?.transactionHash}
      </CoreLink>
    ),
  },
  {
    label: 'Date',
    path: 'id',
    view: (item: WithdrawRequestOutput) =>
      item?.createdAt && (
        <CoreText>{moment(new Date(item.createdAt)).fromNow()}</CoreText>
      ),
  },
  {
    label: 'Address',
    path: 'id',
    view: (item: WithdrawRequestOutput) => (
      <CoreText>{item?.receiver}</CoreText>
    ),
  },
];

interface WithdrawRequestItemProps<T> extends ListItemHtmlProps<T> {
  user: UserType;
}

function WithdrawRequestListItem({
  user,
  item,
  linkView,
  linkCancel,
  linkReject,
  linkAccept,
}: WithdrawRequestItemProps<WithdrawRequestOutput>) {
  const { id, status, owner, amount, currency, transactionHash } = item;

  // isAdmin
  const isAdmin = user?.admin;

  const ActionItems = () => {
    switch (status) {
      case IStatus.requested:
        if (isAdmin) {
          return (
            <Layout
              display={Display.Flex}
              justifyContent={JustifyContent.Center}
            >
              <Layout padding={{ left: 1, right: 1 }}>
                <Link href={linkAccept as any}>
                  <Button variant={ButtonType.Success}>Accept</Button>
                </Link>
              </Layout>

              <Link href={linkReject as any}>
                <Button variant={ButtonType.Alert}>Reject</Button>
              </Link>
            </Layout>
          );
        }

        return (
          <Layout display={Display.Flex} justifyContent={JustifyContent.Center}>
            <Layout padding={{ left: 1, right: 1 }}>
              <Link key={id} href={linkView as any}>
                <Button variant={ButtonType.Secondary}>View</Button>
              </Link>
            </Layout>

            <Link key={id} href={linkCancel as any}>
              <Button variant={ButtonType.Primary}>Cancel</Button>
            </Link>
          </Layout>
        );

      default:
      case IStatus.accepted:
      case IStatus.cancelled:
      case IStatus.completed:
        return (
          <Link key={id} href={linkView as any}>
            <Layout
              display={Display.Flex}
              justifyContent={JustifyContent.Center}
            >
              <Button variant={ButtonType.Secondary}>View</Button>
            </Layout>
          </Link>
        );
    }
  };

  return (
    <Link key={id} href={linkView as any}>
      <Layout
        fullWidth
        padding={1}
        display={Display.Flex}
        justifyContent={JustifyContent.Between}
        border={BorderRadius.Rounded}
      >
        <Layout
          display={Display.Flex}
          fullWidth
          // style={{ flex: 1, background: "blue" }}
          // onClick={onClickView}
        >
          {/* Icon */}
          {/* <Layout style={{ width: "50px", height: "50px", background: "red" }} /> */}
          {/* Content */}
          <Layout fullWidth>
            <CoreText as="h3">{`${currency} ${amount}`}</CoreText>
            <CoreText as="h5">
              {moment(new Date(item.createdAt)).fromNow()}
            </CoreText>
          </Layout>
        </Layout>

        {/* Actions */}
        <Layout
          display={Display.Flex}
          flex={1}
          flexDirection={FlexDirection.Column}
        >
          <ActionItems />

          <Layout
            display={Display.Flex}
            alignItems={AlignItems.Center}
            flexDirection={FlexDirection.Column}
          >
            <Layout padding={1}>
              <Pill
                type={getPillStatusColor(item.status as any)}
                label={item.status}
              />
            </Layout>
            {transactionHash && (
              <Layout padding={1}>
                <CoreLink
                  targetBlank
                  linkTo={`https://mempool.space/tx/${transactionHash}`}
                >
                  {`${transactionHash.slice(0, 6)}...${transactionHash.slice(
                    -4,
                  )}`}
                </CoreLink>
              </Layout>
            )}
          </Layout>
        </Layout>
      </Layout>
    </Link>
  );
}

export interface WithdrawRequestListHtmlProps {
  admin: boolean;
  user?: UserType;
  withdrawPage?: WithdrawRequestOutputPagination;
}

export default function WithdrawRequestList(
  props: WithdrawRequestListHtmlProps,
) {
  const {
    admin = false,
    withdrawPage = { items: [], hasNext: false },
    user,
  } = props;

  const actionId = 'withdraw';
  const label = 'Withdraw Request';

  const view = {
    name: `${label}s`,
    label,
  };

  const list = {
    id: actionId,
    name: actionId,
    label,
    itemComponent: WithdrawRequestListItem,
  };

  return (
    <ActionList<WithdrawRequestOutput>
      view={view}
      list={list}
      actions={withdrawActions}
      data={withdrawPage}
    />
  );
}
