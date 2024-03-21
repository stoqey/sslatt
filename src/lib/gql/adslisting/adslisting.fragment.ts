import type { UserType } from '@roadmanjs/auth-client';
import gql from 'graphql-tag';

import type { OrderTypeDeliver } from '../order';
import type { GeoLocationType } from '../shared';

export interface AdsListingType {
  env?: string;
  refUrl?: string;
  id: string;
  owner?: string | UserType;
  createdAt?: Date;
  updatedAt?: Date;
  deleted?: boolean;
  adId?: string;
  name?: string;
  title?: string;
  description?: string;
  category?: string;
  subcategory?: string;
  info?: string;
  status?: string;
  paid?: boolean;
  visible?: boolean;
  phone?: string;
  email?: string;
  age?: number;
  ethnicity?: string;
  availability?: string;
  height?: string;
  weight?: string;
  hair?: string;
  eye?: string;
  price?: number;
  photos?: string[];
  geo?: GeoLocationType;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  shipsFrom?: string;
  shipsTo?: string;
  zipCode?: string;
  orderType?: keyof typeof OrderTypeDeliver;
  ratings?: number;
  ratingsCount?: number;
  reviewsCount?: number;
  salesCount?: number;
  viewsCount?: number;
}

export interface AdsListingOutput extends AdsListingType {
  owner?: UserType;
}

export const AdsListingTypeFragment = gql`
  fragment AdsListingTypeFragment on AdsListingType {
    refUrl
    id
    env
    owner
    createdAt
    updatedAt
    deleted
    adId
    name
    title
    description
    category
    subcategory
    info
    status
    paid
    visible
    phone
    email
    age
    ethnicity
    availability
    height
    weight
    hair
    eye
    price
    photos
    geo {
      lat
      lon
    }
    city
    address
    state
    country
    shipsFrom
    shipsTo
    zipCode
    orderType
    ratings
    ratingsCount
    reviewsCount
    salesCount
    viewsCount
  }
`;

export const AdsListingOutputFragment = gql`
  fragment AdsListingOutputFragment on AdsListingOutput {
    refUrl
    id
    env
    owner {
      id
      avatar
      fullname
      firstname
      lastname
      username
    }
    createdAt
    updatedAt
    deleted
    adId
    name
    title
    description
    category
    subcategory
    info
    status
    paid
    visible
    phone
    email
    age
    ethnicity
    availability
    height
    weight
    hair
    eye
    price
    photos
    geo {
      lat
      lon
    }
    city
    address
    state
    country
    shipsFrom
    shipsTo
    zipCode
    orderType
    ratings
    ratingsCount
    reviewsCount
    salesCount
    viewsCount
  }
`;
