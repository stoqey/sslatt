import { awaitTo } from '@stoqey/client-graphql';
import identity from 'lodash/identity';
import pickBy from 'lodash/pickBy';

import type {
  Badge,
  Notification,
  NotificationPagination,
  QueryGetBadgesArgs,
  QueryNotificationsArgs,
  QueryReadNotificationsArgs,
} from '@/components/types.generated';

import { getClient } from '../apollo-wrapper.server';
import {
  GET_BADGES,
  GET_NOTIFICATIONS,
  READ_NOTIFICATIONS,
} from '../gql/notifications';

export const fetchBadges = async (
  props: QueryGetBadgesArgs,
): Promise<Badge[] | undefined> => {
  const [errorData, data] = await awaitTo(
    getClient().query<{ data: Badge[] }>({
      query: GET_BADGES,
      variables: props,
      fetchPolicy: 'no-cache',
    }),
  );

  if (errorData) {
    console.error(errorData);
  }

  if (data && data.data) {
    return data.data.data;
  }

  return undefined;
};

export const fetchNotifications = async (
  props: QueryNotificationsArgs,
): Promise<NotificationPagination | undefined> => {
  const { limit = 100, before = new Date(), after } = props;
  const [errorData, data] = await awaitTo(
    getClient().query<{ data: NotificationPagination }>({
      query: GET_NOTIFICATIONS,
      variables: pickBy({ limit, before, after }, identity),
      fetchPolicy: 'no-cache',
    }),
  );

  if (errorData) {
    console.error(errorData);
  }

  if (data && data.data) {
    return data.data.data;
  }

  return undefined;
};

export const readNotifications = async (
  props: QueryReadNotificationsArgs,
): Promise<Notification[] | undefined> => {
  const [errorData, data] = await awaitTo(
    getClient().query<{ data: Notification[] }>({
      query: READ_NOTIFICATIONS,
      variables: pickBy(props, identity),
      fetchPolicy: 'no-cache',
    }),
  );

  if (errorData) {
    console.error(errorData);
  }

  if (data && data.data) {
    return data.data.data;
  }

  return undefined;
};

export const getNotificationNextPath = (notification: Notification): string => {
  const notificationSource = (notification.source || '').toLowerCase();

  switch (notificationSource) {
    case 'user':
      return `/html/u/${notification.sourceId}`;
    case 'vendor':
      return `/html/store/${notification.sourceId}`;
    case 'ordertype':
    case 'order':
      return `/html/order/${notification.sourceId}`;
    case 'notification':
    default:
      return '/html/notifications';
  }
};

// deleteNotification, ....
