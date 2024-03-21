import type { UserType } from '@roadmanjs/auth-client';
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
  PillType,
} from '@uuixjs/uuixweb';
import { BorderRadius } from '@uuixjs/uuixweb-lib';
import { isEmpty } from 'lodash';
import moment from 'moment';
import React from 'react';

import type { OrderType, OrderTypeOutput } from '@/lib/gql';
import {
  CANCEL_ORDER_MUTATION,
  CONFIRM_ORDER_MUTATION,
  GET_MY_ORDERS,
  GET_ORDER,
  IStatus,
  OrderTypeDeliver,
  OrderTypeStatus,
  RATE_ORDER_MUTATION,
} from '@/lib/gql';
import { useMeApi } from '@/lib/hooks/useUserCache';
import { niceDec } from '@/lib/utils/number';

import type { ActionType, ListItemProps } from '../actions.list';
import { ActionList } from '../actions.list';
import { AdViewContainer } from '../AdSearch/ad.view.container';
import {
  FinalizeOrder,
  RateOrder,
  TrackingOrder,
  VerifyOrder,
} from './order.actions';

const getOrderStatusColor = (status: keyof typeof IStatus) => {
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

export interface OrderItemProps extends ListItemProps<OrderTypeOutput> {
  onClickView: () => void;
  onClickTracking: () => void;
  onClickFinalize: () => void;
  onClickVerify: () => void;
  onClickRate: () => void;
  user?: UserType;
}

export const OrderListItem = ({
  user,
  item,
  onClickView,
  onClickTracking,
  onClickVerify,
  onClickCancel,
  onClickReject,
  onClickAccept,
  onClickRate,
  onClickFinalize,
}: OrderItemProps) => {
  const {
    id,
    type,
    typeId,
    status,
    owner,
    seller,
    product,
    orderType,
    price,
    quantity,
    reason,
    tracking,
  } = item;

  const isSeller = user?.id === seller?.id;
  const isBuyer = user?.id === owner?.id;

  const isCancelled = status === OrderTypeStatus.cancelled;

  const isEscrow = product?.escrow;

  const ActionItems = () => {
    switch (status) {
      case IStatus.requested:
        if (isBuyer) {
          return (
            <Layout
              display={Display.Flex}
              justifyContent={JustifyContent.Center}
            >
              <Button variant={ButtonType.Primary} onClick={onClickCancel}>
                Cancel
              </Button>
            </Layout>
          );
        }
        // seller
        return (
          <Layout display={Display.Flex} justifyContent={JustifyContent.Center}>
            <Layout padding={{ right: 1 }}>
              <Button onClick={onClickAccept} variant={ButtonType.Success}>
                Accept
              </Button>
            </Layout>

            <Button onClick={onClickReject} variant={ButtonType.Alert}>
              Reject
            </Button>
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
              <Button variant={ButtonType.Primary} onClick={onClickFinalize}>
                Finalize
              </Button>
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
              <Button variant={ButtonType.Primary} onClick={onClickVerify}>
                Verify
              </Button>
            </Layout>
          );
        }

        // if (orderType === IOrderType.shipping) {
        return (
          <Layout display={Display.Flex} justifyContent={JustifyContent.Center}>
            <Button variant={ButtonType.Primary} onClick={onClickTracking}>
              Update Tracking
            </Button>
          </Layout>
        );
      // }

      case IStatus.cancelled:
        // view all
        return undefined;

      case IStatus.completed:
        // rate if not rated
        // TODO seller, owner rate
        return (
          <Layout display={Display.Flex} justifyContent={JustifyContent.Center}>
            <Button variant={ButtonType.Secondary} onClick={onClickRate}>
              Rate
            </Button>
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
      border={BorderRadius.Rounded}
    >
      {/* Content */}
      <Layout style={{ flex: 1, width: '200px' }} onClick={onClickView}>
        <AdViewContainer id={typeId} viewMode="list" />
        <Layout
          padding={{ left: 2 }}
          display={Display.Flex}
          justifyContent={JustifyContent.Between}
        >
          <CoreText ellipsis>{niceDec(price * quantity)}</CoreText>
          {isCancelled ? (
            <CoreText style={{ color: 'red' }}>{reason}</CoreText>
          ) : (
            <CoreText>{(tracking || '').toUpperCase()}</CoreText>
          )}
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
            <Pill type={getOrderStatusColor(item.status)} label={item.status} />
          </Layout>
          <CoreText>{moment(new Date(item.createdAt)).fromNow()}</CoreText>
        </Layout>
      </Layout>
    </Layout>
  );
};

const label = 'Order';

export const orderViewFields = [
  // TODO order details fields
  {
    label: 'Ref-ID',
    view: (item: OrderType) => (
      <CoreText lines={1}>{(item?.id || '').toUpperCase()}</CoreText>
    ),
  },
  {
    label: 'Type',
    view: (item: OrderType) => (
      <CoreText lines={1}>{(item?.orderType || '').toUpperCase()}</CoreText>
    ),
  },
  {
    label: 'Tracking',
    view: (item: OrderType) => (
      <CoreText lines={1}>{(item?.tracking || '').toUpperCase()}</CoreText>
    ),
  },
  {
    label: 'Details',
    view: (item: OrderType) => (
      <CoreText lines={1}>{item?.details || ''}</CoreText>
    ),
  },
  {
    label: 'Date',
    view: (item: OrderType) =>
      item?.createdAt && (
        <CoreText lines={1}>
          {moment(new Date(item.createdAt)).fromNow()}
        </CoreText>
      ),
  },
];

interface OrderListProps {
  user?: UserType;
  orders?: OrderTypeOutput[];
  refetch?: () => void;
}

export default function OrderList(props: OrderListProps) {
  const user = props.user ? props.user : useMeApi();

  let listDefault = null;
  if (!isEmpty(props.orders)) {
    listDefault = {
      data: {
        data: {
          items: props.orders,
        },
      },
      refetch: props.refetch,
    };
  }

  const list = {
    name: 'order',
    label,
    query: GET_MY_ORDERS,
    itemComponent: (p: any) => <OrderListItem user={user} {...p} />,
  };

  const view = {
    name: `${label}s`,
    label,
    query: GET_ORDER,
    fields: orderViewFields,
  };

  // Finalize
  const actions: ActionType[] = [
    // TODO FinalizeOrder,
    // {
    //   name: "view",
    //   query: null, // not required since model is provided
    //   model: ViewAction,
    // },
    {
      name: 'tracking',
      query: null, // not required since model is provided
      model: TrackingOrder,
    },
    {
      name: 'finalize',
      query: null, // not required since model is provided
      model: FinalizeOrder,
    },
    {
      name: 'verify',
      query: null, // not required since model is provided
      model: VerifyOrder,
    },
    {
      name: 'rate',
      query: RATE_ORDER_MUTATION,
      model: RateOrder,
    },
    {
      name: 'cancel',
      query: CANCEL_ORDER_MUTATION,
    },
    {
      name: 'confirm',
      query: CONFIRM_ORDER_MUTATION,
    },
  ];
  return (
    <ActionList<OrderTypeOutput>
      view={view}
      list={list}
      actions={actions}
      listDefault={listDefault}
    />
  );
}
