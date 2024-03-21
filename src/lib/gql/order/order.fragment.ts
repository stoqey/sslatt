import type { UserType } from '@roadmanjs/auth-client';
import { UserTypeFragment } from '@roadmanjs/auth-client';
import gql from 'graphql-tag';

import { AdsListingTypeFragment } from '../adslisting';

export const OrderTypeStatus = {
  requested: 'requested',
  accepted: 'accepted',
  cancelled: 'cancelled',
  completed: 'completed',
};

export const OrderTypeDeliver = {
  shipping: 'shipping',
  meeting: 'meeting',
  virtual: 'virtual',
};

export const OrderTypeTracking = {
  // TODO more
  processing: 'processing',
  shipped: 'shipped',
  delivered: 'delivered',
};

export interface OrderType {
  id?: string;
  owner?: string | UserType;
  createdAt?: Date;
  updatedAt?: Date;
  deleted?: boolean;
  seller?: string | UserType;
  name?: string;
  type?: string;
  typeId?: string;
  paid?: boolean;
  status?: keyof typeof OrderTypeStatus;
  reason?: string;
  price?: number;
  quantity?: number;
  details?: string;
  orderType: keyof typeof OrderTypeDeliver;
  tracking: keyof typeof OrderTypeTracking;
  feePerc?: number;
}

export interface OrderTypeOutput extends OrderType {
  owner: UserType;
  seller: UserType;
  product: any;
  sellerRating: any;
  ownerRating: any;
}

export const OrderTypeFragment = gql`
  fragment OrderTypeFragment on OrderType {
    id
    owner
    seller
    createdAt
    updatedAt
    deleted
    name
    type
    typeId
    price
    quantity
    reason
    status
    paid
    orderType
    tracking
    details
    feePerc
  }
`;

export const OrderTypeOutputFragment = gql`
  fragment OrderTypeOutputFragment on OrderTypeOutput {
    id
    owner {
      ...UserTypeFragment
    }
    seller {
      ...UserTypeFragment
    }
    product {
      ...AdsListingTypeFragment
    }
    createdAt
    updatedAt
    deleted
    name
    type
    typeId
    price
    quantity
    reason
    status
    paid
    orderType
    tracking
    details
    feePerc
  }
  ${UserTypeFragment}
  ${AdsListingTypeFragment}
`;
