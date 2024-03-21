import gql from 'graphql-tag';

import type { IStatus } from '../shared';

export interface WithdrawRequest {
  id?: string;
  owner?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deleted?: boolean;
  type?: string;
  receiver?: string;
  status?: keyof typeof IStatus;
  reason?: string;
  currency?: string;
  amount?: number;
  walletId?: number;
  transactionHash?: string;
}

export const WithdrawRequestFragment = gql`
  fragment WithdrawRequestFragment on WithdrawRequest {
    id
    owner
    createdAt
    updatedAt
    deleted
    type
    receiver
    status
    reason
    currency
    amount
    walletId
  }
`;

export const WithdrawRequestOutputFragment = gql`
  fragment WithdrawRequestOutputFragment on WithdrawRequestOutput {
    id
    owner {
      id
    }
    createdAt
    updatedAt
    deleted
    type
    receiver
    status
    reason
    currency
    amount
    walletId
    wallet {
      currency
      id
    }
  }
`;
