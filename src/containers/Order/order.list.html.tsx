/* eslint-disable react/no-unstable-nested-components */

'use client';

import {
  AlignItems,
  Button,
  ButtonType,
  CoreText,
  Display,
  FlexDirection,
  JustifyContent,
  Layout,
  Pill,
  SVGAsset,
} from '@uuixjs/uuixweb';
// import { AdViewContainer } from "../AdSearch/ad.view.container";
import { isEmpty } from 'lodash';
import moment from 'moment';
import Link from 'next/link';
import React from 'react';

import AdsSearchItem, { parseAdItem } from '@/components/AdLists/ads.item';
import type {
  OrderType,
  OrderTypeOutput,
  UserType,
} from '@/components/types.generated';
import { IStatus, OrderTypeDeliver, OrderTypeStatus } from '@/lib/gql';
import { getPillStatusColor } from '@/lib/utils/colors';
import { niceDec } from '@/lib/utils/number';

import type { ListItemHtmlProps } from '../actions.list.html';
import { ActionList } from '../actions.list.html';
import { orderActions } from './order.list.html.names';

export const orderFields = [
  {
    label: 'Ref-ID',
    view: (item: OrderType) => (
      <CoreText>{(item?.id || '').toUpperCase()}</CoreText>
    ),
  },
  {
    label: 'Type',
    view: (item: OrderType) => (
      <CoreText>{(item?.orderType || '').toUpperCase()}</CoreText>
    ),
  },
  {
    label: 'Details',
    view: (item: OrderType) => (
      <CoreText lines={2}>{item?.details || ''}</CoreText>
    ),
  },
  {
    label: 'Date',
    view: (item: OrderType) =>
      item?.createdAt && (
        <CoreText>{moment(new Date(item.createdAt)).fromNow()}</CoreText>
      ),
  },
];

interface OrderItemProps<T> extends ListItemHtmlProps<T> {
  linkView?: string;
  linkTracking?: string;
  linkFinalize?: string;
  linkVerify?: string;
  linkRate?: string;
  user?: UserType;
}

const OrderListItemHtml = ({
  user,
  item,
  linkView = '',
  linkTracking = '',
  linkVerify = '',
  linkCancel = '',
  linkReject = '',
  linkAccept = '',
  linkRate = '',
  linkFinalize = '',
}: OrderItemProps<OrderTypeOutput>) => {
  const {
    status,
    owner,
    seller,
    product,
    orderType,
    price = 0,
    quantity = 1,
    reason,
    tracking,
  } = item;

  // console.log("item", { id, type, typeId, item });

  const isSeller = user?.id === seller?.id;
  const isBuyer = user?.id === owner?.id;

  const isCancelled = status === OrderTypeStatus.cancelled;

  const ActionItems = () => {
    switch (status) {
      case IStatus.requested:
        if (isBuyer) {
          return (
            <Layout
              display={Display.Flex}
              justifyContent={JustifyContent.Center}
            >
              <Link href={linkCancel}>
                <Button variant={ButtonType.Primary}>Cancel</Button>
              </Link>
            </Layout>
          );
        }
        // seller
        return (
          <Layout display={Display.Flex} justifyContent={JustifyContent.Center}>
            <Layout padding={{ right: 1 }}>
              <Link href={linkAccept}>
                <Button icon={SVGAsset.Check} variant={ButtonType.Success}>
                  Accept
                </Button>
              </Link>
            </Layout>

            <Link href={linkReject}>
              <Button icon={SVGAsset.Close} variant={ButtonType.Alert}>
                Reject
              </Button>
            </Link>
          </Layout>
        );
      case IStatus.accepted:
        if (isBuyer) {
          // view, finalize if escrow
          return (
            <Layout
              display={Display.Flex}
              justifyContent={JustifyContent.Center}
            >
              <Link href={linkFinalize}>
                <Button variant={ButtonType.Primary}>Finalize</Button>
              </Link>
            </Layout>
          );
        }
        // verify if escrow
        if (orderType === OrderTypeDeliver.meeting) {
          return (
            <Layout
              display={Display.Flex}
              justifyContent={JustifyContent.Center}
            >
              <Link href={linkVerify}>
                <Button variant={ButtonType.Primary}>Verify</Button>
              </Link>
            </Layout>
          );
        }

        // if (orderType === IOrderType.shipping) {
        return (
          <Layout display={Display.Flex} justifyContent={JustifyContent.Center}>
            <Link href={linkTracking}>
              <Button variant={ButtonType.Primary}>Update Tracking</Button>
            </Link>
          </Layout>
        );
      // }

      case IStatus.cancelled:
        // view all
        return undefined;

      case IStatus.completed:
        // rate if not rated
        if (isSeller) return undefined;

        return (
          <Layout display={Display.Flex} justifyContent={JustifyContent.Center}>
            <Link href={linkRate}>
              <Button variant={ButtonType.Secondary}>Rate</Button>
            </Link>
          </Layout>
        );

      default:
        return undefined;
    }
  };

  return (
    <Layout
      fullWidth
      padding={1}
      margin={{ bottom: 1 }}
      display={Display.Flex}
      border
    >
      {/* Content */}
      <Link href={linkView} style={{ flex: 1 }}>
        <Layout style={{ flex: 1, width: '200px' }}>
          {!isEmpty(product) && (
            <AdsSearchItem viewMode="list" {...parseAdItem(product)} />
          )}
          <Layout
            padding={{ left: 2 }}
            display={Display.Flex}
            justifyContent={JustifyContent.Between}
          >
            <CoreText ellipsis>
              {niceDec((price || 0) * (quantity || 1))}
            </CoreText>
            {isCancelled ? (
              <CoreText style={{ color: 'red' }}>{reason}</CoreText>
            ) : (
              <CoreText>{(tracking || '').toUpperCase()}</CoreText>
            )}
          </Layout>
        </Layout>
      </Link>

      {/* Actions */}
      <Layout display={Display.Flex} flexDirection={FlexDirection.Column}>
        <ActionItems />

        <Layout
          display={Display.Flex}
          alignItems={AlignItems.Center}
          flexDirection={FlexDirection.Column}
        >
          <Layout padding={1}>
            <Pill
              type={getPillStatusColor(item.status as any)}
              label={item?.status || ''}
            />
          </Layout>
          <CoreText>{moment(new Date(item.createdAt)).fromNow()}</CoreText>
        </Layout>
      </Layout>
    </Layout>
  );
};

export interface OrderListHtmlProps {
  user?: UserType;
  orders?: OrderTypeOutput[];
}

export default function OrderListHtml(props: OrderListHtmlProps) {
  const { orders, user } = props;

  // TODO PAGE
  const ordersPage = { items: orders, hasNext: false };

  const label = 'Order';

  // const view = {
  //   name: `${label}s`,
  //   label,
  // };

  const list = {
    id: 'order',
    name: 'order',
    label,
    itemComponent: (p: any) => <OrderListItemHtml user={user} {...p} />,
  };

  return (
    <ActionList<OrderTypeOutput>
      list={list}
      actions={orderActions}
      data={ordersPage}
    />
  );
}
