import type { UserType } from '@roadmanjs/auth-client';
import gql from 'graphql-tag';

export interface Notification {
  id: string;
  owner?: string | UserType;
  createdAt?: Date;
  updatedAt?: Date;
  message?: string;
  read?: boolean;
  source?: string;
  sourceId?: string;
}

export const NotificationFragment = gql`
  fragment NotificationFragment on Notification {
    id
    owner
    createdAt
    updatedAt
    message
    read
    source
    sourceId
  }
`;
