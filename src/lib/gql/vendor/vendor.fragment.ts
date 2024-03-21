import type { UserType } from '@roadmanjs/auth-client';
import gql from 'graphql-tag';

export interface VendorType {
  name?: string;
  id?: string;
  owner?: string | UserType;
  createdAt?: Date;
  updatedAt?: Date;
  avatar?: string;
  bio?: string;
  vacation?: boolean;
  country: string;
  shipsTo?: string;
  shipsFrom?: string;
  ratings?: number;
  ratingsCount?: number;
  reviewsCount?: number;
  salesCount?: number;
  viewsCount?: number;
}

export const VendorTypeFragment = gql`
  fragment VendorTypeFragment on VendorType {
    name
    id
    owner
    createdAt
    updatedAt
    cover
    avatar
    bio
    vacation
    country
    shipsTo
    shipsFrom
    ratings
    ratingsCount
    reviewsCount
    salesCount
    viewsCount
  }
`;
