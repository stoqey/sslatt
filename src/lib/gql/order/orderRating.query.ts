import gql from 'graphql-tag';

import { OrderRatingOutputFragment } from './orderRating.fragment';

export const GET_ORDER_RATING_ID = gql`
  query GetOrderRating($orderId: String!) {
    data: getOrderRating(orderId: $orderId) {
      rating
      review
    }
  }
`;

export const GET_ORDER_RATINGS = gql`
  query GetOrderRatings(
    $filters: String
    $sort: String
    $before: DateTime
    $after: DateTime
    $limit: Float
  ) {
    data: getOrderRatings(
      filters: $filters
      sort: $sort
      before: $before
      after: $after
      limit: $limit
    ) {
      items {
        ...OrderRatingOutputFragment
      }
      hasNext
      params
    }
  }
  ${OrderRatingOutputFragment}
`;
