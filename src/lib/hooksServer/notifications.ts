import { awaitTo } from '@stoqey/client-graphql';
import identity from 'lodash/identity';
import pickBy from 'lodash/pickBy';

import type {
  Badge,
  NotificationPagination,
  QueryGetBadgesArgs,
  QueryNotificationsArgs,
} from '@/components/types.generated';

import { getClient } from '../apollo-wrapper.server';
import { GET_BADGES, GET_NOTIFICATIONS } from '../gql/notifications';

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

// readNotification,
// deleteNotification, ....
