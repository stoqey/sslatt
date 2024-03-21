import gql from 'graphql-tag';

import { WithdrawRequestOutputFragment } from './withdrawRequest.fragment';

export const GET_WITHDRAW_REQUEST_BY_ID = gql`
  query GetWithdrawRequestById($id: String!) {
    data: withdrawRequestById(id: $id) {
      ...WithdrawRequestOutputFragment
    }
  }
  ${WithdrawRequestOutputFragment}
`;

export const GET_MY_WITHDRAW_REQUEST = gql`
  query GetMyWithdrawRequests(
    $filter: String
    $sort: String
    $before: DateTime
    $after: DateTime
    $limit: Float
  ) {
    data: myWithdrawRequests(
      filter: $filter
      sort: $sort
      before: $before
      after: $after
      limit: $limit
    ) {
      items {
        ...WithdrawRequestOutputFragment
      }
      hasNext
      params
    }
  }
  ${WithdrawRequestOutputFragment}
`;

export const GET_All_WITHDRAW_REQUEST = gql`
  query GetAllWithdrawRequests(
    $filter: String
    $sort: String
    $before: DateTime
    $after: DateTime
    $limit: Float
  ) {
    data: allWithdrawRequests(
      filter: $filter
      sort: $sort
      before: $before
      after: $after
      limit: $limit
    ) {
      items {
        ...WithdrawRequestOutputFragment
      }
      hasNext
      params
    }
  }
  ${WithdrawRequestOutputFragment}
`;
