import React from 'react';

import {
  CANCEL_ORDER_MUTATION,
  CONFIRM_ORDER_MUTATION,
  FINALIZE_ORDER_MUTATION,
  RATE_ORDER_MUTATION,
  UPDATE_ORDER_TRACKING_MUTATION,
  VERIFY_ORDER_MUTATION,
} from '@/lib/gql';

import {
  CancelActionHtml,
  ConfirmActionHtml,
  ViewActionHtml,
} from '../actions.html';
import type { ActionHtmlType } from '../actions.list.html';
import {
  FinalizeOrderHtml,
  RateOrderHtml,
  TrackingOrderHtml,
  VerifyOrderHtml,
} from './order.actions.html';

export const orderActions: ActionHtmlType[] = [
  // TODO FinalizeOrder,
  {
    id: 'view',
    Action: (p: any) => <ViewActionHtml {...p} label={p.actionId} />,
  },
  {
    id: 'tracking',
    Action: TrackingOrderHtml,
    query: UPDATE_ORDER_TRACKING_MUTATION,
    variables: (fd: FormData) => [
      {
        name: 'id',
        value: fd.get('id'),
        required: true,
        message: 'order id is required',
      },
      {
        name: 'tracking',
        value: fd.get('tracking'),
        required: true,
        message: 'Enter a valid tracking',
      },
    ],
  },
  {
    id: 'finalize',
    Action: FinalizeOrderHtml,
    query: FINALIZE_ORDER_MUTATION,
    variables: (fd: FormData) => [
      {
        name: 'id',
        value: fd.get('id'),
        required: true,
        message: 'order id is required',
      },
    ],
  },
  {
    id: 'verify',
    Action: VerifyOrderHtml,
    query: VERIFY_ORDER_MUTATION,
    variables: (fd: FormData) => [
      {
        name: 'orderId',
        value: fd.get('orderId'),
        required: true,
        message: 'order id is required',
      },
      {
        name: 'orderCode',
        value: fd.get('orderCode'),
        required: true,
        message: 'order id is required',
      },
    ],
  },
  {
    id: 'rate',
    Action: RateOrderHtml,
    query: RATE_ORDER_MUTATION,
    variables: (fd: FormData) => {
      const rating = Math.abs(+(fd.get('rating') || 0));
      if (rating < 1 || rating > 5) {
        return [
          {
            name: 'rating',
            value: '',
            required: true,
            message: 'Rating is a number between 1 and 5',
          },
        ];
      }

      return [
        {
          name: 'id',
          value: fd.get('id'),
          required: true,
          message: 'order id is required',
        },
        {
          name: 'review',
          value: fd.get('review'),
          required: false,
        },
        {
          name: 'rating',
          value: Math.abs(+(fd.get('rating') || 0)),
          required: true,
          message: 'Enter a valid rating',
        },
      ];
    },
  },
  {
    id: 'cancel',
    Action: CancelActionHtml,
    query: CANCEL_ORDER_MUTATION,
    variables: (fd: FormData) => [
      {
        name: 'id',
        value: fd.get('id'),
        required: true,
        message: 'order id is required',
      },
      {
        name: 'reason',
        value: fd.get('reason'),
        required: true,
        message: 'Enter a valid reason',
      },
    ],
  },
  {
    id: 'reject',
    Action: (p: any) => <ConfirmActionHtml {...p} confirm={false} />,
    query: CONFIRM_ORDER_MUTATION,
    variables: (fd: FormData) => [
      {
        name: 'id',
        value: fd.get('id'),
        required: true,
        message: 'order id is required',
      },

      {
        name: 'reason',
        value: fd.get('reason'),
        required: true,
        message: 'reason for rejection is required',
      },

      {
        name: 'confirm',
        value: false,
        required: false,
        message: 'confirm is required',
      },
    ],
  },
  {
    id: 'accept',
    Action: (p: any) => <ConfirmActionHtml {...p} confirm />,
    query: CONFIRM_ORDER_MUTATION,
    variables: (fd: FormData) => [
      {
        name: 'id',
        value: fd.get('id'),
        required: true,
        message: 'order id is required',
      },

      {
        name: 'reason',
        value: fd.get('reason'),
        required: false,
      },

      {
        name: 'confirm',
        value: true,
        required: false,
      },
    ],
  },
];
