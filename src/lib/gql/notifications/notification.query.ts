import gql from 'graphql-tag';

import { NotificationFragment } from './notification.fragment';

export const GET_BADGES = gql`
  query GetBadges($models: [String!]!) {
    data: getBadges(models: $models) {
      id
      model
      count
    }
  }
`;

export const GET_NOTIFICATIONS = gql`
  query GetNotifications(
    $read: Boolean
    $filter: String
    $sort: String
    $before: DateTime
    $after: DateTime
    $limit: Float
  ) {
    data: notifications(
      read: $read
      filter: $filter
      sort: $sort
      before: $before
      after: $after
      limit: $limit
    ) {
      items {
        ...NotificationFragment
      }
      hasNext
      params
    }
  }
  ${NotificationFragment}
`;

export const READ_NOTIFICATIONS = gql`
  query ReadNotification($id: String, $before: DateTime, $limit: Float) {
    data: readNotifications(id: $id, before: $before, limit: $limit) {
      ...NotificationFragment
    }
  }
  ${NotificationFragment}
`;
