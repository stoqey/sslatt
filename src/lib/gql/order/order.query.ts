import gql from 'graphql-tag';

import { OrderTypeOutputFragment } from './order.fragment';

export const GET_ORDER = gql`
  query OrderById($id: String!) {
    data: orderById(id: $id) {
      ...OrderTypeOutputFragment
    }
  }
  ${OrderTypeOutputFragment}
`;

export const GET_MY_ORDERS = gql`
  query GetMyOrders(
    $filter: String
    $sort: String
    $before: DateTime
    $after: DateTime
    $limit: Float
  ) {
    data: myOrders(
      filter: $filter
      sort: $sort
      before: $before
      after: $after
      limit: $limit
    ) {
      items {
        ...OrderTypeOutputFragment
      }
      hasNext
      params
    }
  }
  ${OrderTypeOutputFragment}
`;
