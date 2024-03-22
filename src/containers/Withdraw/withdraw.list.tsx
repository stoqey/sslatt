/* eslint-disable react/no-unstable-nested-components */
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
  PillType,
  SVGAsset,
} from '@uuixjs/uuixweb';
import { BorderRadius } from '@uuixjs/uuixweb-lib';
import moment from 'moment';
import React from 'react';

import { Container } from '@/components/container';
import type { WithdrawRequest } from '@/lib/gql';
import {
  CANCEL_WITHDRAW_REQUEST_MUTATION,
  CONFIRM_WITHDRAW_REQUEST_MUTATION,
  CREATE_WITHDRAW_REQUEST_BY_WALLET_MUTATION,
  GET_All_WITHDRAW_REQUEST,
  GET_MY_WITHDRAW_REQUEST,
  GET_WITHDRAW_REQUEST_BY_ID,
  IStatus,
} from '@/lib/gql';
import { useMeApi } from '@/lib/hooks/useUserCache';

import type { CreateActionProps } from '../actions';
import type { ListItemProps } from '../actions.list';
import { ActionList } from '../actions.list';
import { CreateWithdrawForm } from './withdraw.actions';

interface WithdrawRequestItemProps<T> extends ListItemProps<T> {}

const getWithdrawStatusColor = (status: keyof typeof IStatus) => {
  switch (status) {
    case IStatus.cancelled:
      return PillType.Alert;

    case IStatus.accepted:
      return PillType.Notification;

    case IStatus.completed:
      return PillType.Success;

    case IStatus.requested:
    default:
      return PillType.Info;
  }
};

function WithdrawRequestListItem({
  item,
  onClickView,
  onClickCancel,
  onClickReject,
  onClickAccept,
}: WithdrawRequestItemProps<WithdrawRequest>) {
  const { id, status, owner, amount, currency, transactionHash } = item;
  const user = useMeApi();

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
              <Button onClick={onClickAccept} variant={ButtonType.Success}>
                Accept
              </Button>
              <Button onClick={onClickReject} variant={ButtonType.Alert}>
                Reject
              </Button>
            </Layout>
          );
        }

        return (
          <Layout display={Display.Flex} justifyContent={JustifyContent.Center}>
            <Button variant={ButtonType.Secondary}>View</Button>
            <Button variant={ButtonType.Primary} onClick={onClickCancel}>
              Cancel
            </Button>
          </Layout>
        );

      case IStatus.accepted:
      case IStatus.cancelled:
      case IStatus.completed:
      default:
        return (
          <Layout display={Display.Flex} justifyContent={JustifyContent.Center}>
            <Button variant={ButtonType.Secondary}>View</Button>
          </Layout>
        );
    }
  };

  return (
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
        onClick={onClickView}
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
        {/* <ActionItems /> */}

        <Layout
          display={Display.Flex}
          alignItems={AlignItems.Center}
          flexDirection={FlexDirection.Column}
        >
          <Layout padding={1}>
            <Pill
              type={getWithdrawStatusColor(item.status)}
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
  );
}

interface WithdrawRequestListProps {
  admin: boolean;
}

export default function WithdrawRequestList(
  { admin }: WithdrawRequestListProps = { admin: false },
) {
  const label = 'Withdraw Request';

  const view = {
    name: `${label}s`,
    label,
    query: GET_WITHDRAW_REQUEST_BY_ID,
    fields: [
      {
        label: 'Ref-ID',
        path: 'id',
        view: (item: WithdrawRequest) => (
          <CoreText>{(item?.id || '').toUpperCase()}</CoreText>
        ),
      },
      // TODO other crypto
      {
        label: 'Transaction ID',
        path: 'id',
        view: (item: WithdrawRequest) => (
          <CoreLink
            linkTo={`https://mempool.space/tx/${item?.transactionHash}`}
          >
            {item?.transactionHash}
          </CoreLink>
        ),
      },
      {
        label: 'Date',
        path: 'id',
        view: (item: WithdrawRequest) =>
          item?.createdAt && (
            <CoreText>{moment(new Date(item.createdAt)).fromNow()}</CoreText>
          ),
      },
      {
        label: 'Address',
        path: 'id',
        view: (item: WithdrawRequest) => <CoreText>{item?.receiver}</CoreText>,
      },
    ],
  };

  const list = {
    name: `${label}s`,
    label,
    query: admin ? GET_All_WITHDRAW_REQUEST : GET_MY_WITHDRAW_REQUEST,
    itemComponent: WithdrawRequestListItem,
  };

  const create: CreateActionProps<WithdrawRequest> = {
    query: GET_WITHDRAW_REQUEST_BY_ID, // TODO
    mutate: CREATE_WITHDRAW_REQUEST_BY_WALLET_MUTATION, // TODO
    label,
    CreateButton: ({ onClick }) => {
      return (
        <Layout
          display={Display.Flex}
          justifyContent={JustifyContent.Center}
          fullWidth
          padding={1}
        >
          <Button
            icon={SVGAsset.New}
            onClick={onClick}
            variant={ButtonType.Primary}
          >
            Create new withdraw request
          </Button>
        </Layout>
      );
    },

    FormItem: CreateWithdrawForm,
  };

  const actions = [
    {
      name: 'cancel',
      query: CANCEL_WITHDRAW_REQUEST_MUTATION,
    },
  ];

  if (admin) {
    actions.push({
      name: 'confirm',
      query: CONFIRM_WITHDRAW_REQUEST_MUTATION,
    });
  }

  return (
    <Container>
      <ActionList<WithdrawRequest>
        view={view}
        create={create}
        list={list}
        actions={actions}
      />
    </Container>
  );
}
