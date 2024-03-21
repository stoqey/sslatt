import type { UserType } from '@roadmanjs/auth-client';
import { UserTypeFragment } from '@roadmanjs/auth-client';
import gql from 'graphql-tag';

import type { AdsListingType } from '../adslisting';
import { AdsListingTypeFragment } from '../adslisting';
import type { OrderType } from './order.fragment';
import { OrderTypeFragment } from './order.fragment';

export interface OrderRatingType {
  id?: string;
  owner?: string | UserType;
  createdAt?: Date;
  updatedAt?: Date;
  deleted?: boolean;
  buyer?: string | UserType;
  seller?: string | UserType;
  typeId?: string;
  orderId?: string;
  rating?: number;
  review?: string;
}

export interface OrderRatingOutput extends OrderRatingType {
  owner?: UserType;
  seller?: UserType;
  buyer?: UserType;
  order?: OrderType;
  ad?: AdsListingType;
}

export const OrderRatingOutputFragment = gql`
  fragment OrderRatingOutputFragment on OrderRatingOutput {
    id

    owner {
      ...UserTypeFragment
    }
    buyer {
      ...UserTypeFragment
    }
    seller {
      ...UserTypeFragment
    }
    ad {
      ...AdsListingTypeFragment
    }
    order {
      ...OrderTypeFragment
    }

    createdAt
    updatedAt
    deleted

    typeId
    rating
    review
  }
  ${UserTypeFragment}
  ${AdsListingTypeFragment}
  ${OrderTypeFragment}
`;
