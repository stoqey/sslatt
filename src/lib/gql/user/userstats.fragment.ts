import type { UserType } from '@roadmanjs/auth-client';
import gql from 'graphql-tag';

export interface UserStats {
  id?: string;
  owner?: string | UserType;
  createdAt?: Date;
  updatedAt?: Date;
  ratings?: number;
  ratingsCount?: number;
  orderCount?: number;
  spent?: number;
  viewsCount?: number;
}

export const UserStatsFragment = gql`
  fragment UserStatsFragment on UserStats {
    id
    owner
    createdAt
    updatedAt
    ratings
    ratingsCount
    orderCount
    spent
    viewsCount
  }
`;
