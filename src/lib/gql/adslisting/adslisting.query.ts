import { UserTypeFragment } from '@roadmanjs/auth-client';
import gql from 'graphql-tag';

import { UserStatsFragment } from '../user/userstats.fragment';
import { VendorTypeFragment } from '../vendor';
import {
  AdsListingOutputFragment,
  AdsListingTypeFragment,
} from './adslisting.fragment';

export const ON_MAP_REGION = gql`
  query OnMapRegion($lat: Float!, $lon: Float!, $env: String!, $zoom: Float) {
    data: onMapRegion(lon: $lon, lat: $lat, env: $env, zoom: $zoom) {
      ...AdsListingTypeFragment
    }
  }
  ${AdsListingTypeFragment}
`;

export const SEARCH_AD_LISTING_PUBLIC = gql`
  query SearchAdListingPublic(
    $search: String
    $filters: String
    $sort: String
    $after: DateTime
    $before: DateTime
    $env: String
    $limit: Float
  ) {
    data: searchAdListingPublic(
      search: $search
      filters: $filters
      sort: $sort
      after: $after
      before: $before
      env: $env
      limit: $limit
    ) {
      items {
        ...AdsListingOutputFragment
      }
      hasNext
      params
    }
  }
  ${AdsListingOutputFragment}
`;

export const SEARCH_AD_LISTING = gql`
  query SearchAdListing($search: String!, $limit: Float, $env: String) {
    data: searchAdListing(search: $search, limit: $limit, env: $env) {
      ...AdsListingTypeFragment
    }
  }
  ${AdsListingTypeFragment}
`;

export const GET_AD_LISTING = gql`
  query GetAdListing($id: String!) {
    data: getAdListing(id: $id) {
      ...AdsListingOutputFragment
    }
  }
  ${AdsListingOutputFragment}
`;

export const MY_AD_LISTING = gql`
  query GetMyAdListing(
    $filter: String
    $owner: String!
    $limit: Float
    $page: Float
  ) {
    data: myAdListing(
      filter: $filter
      owner: $owner
      limit: $limit
      page: $page
    ) {
      ...AdsListingTypeFragment
    }
  }
  ${AdsListingTypeFragment}
`;

export const GET_USER_VENDOR_ADS_LISTING = gql`
  query GetUserVendorAdsListing(
    $username: String
    $after: DateTime
    $before: DateTime
    $limit: Float
  ) {
    data: getUserVendorAdsListing(
      username: $username
      after: $after
      before: $before
      limit: $limit
    ) {
      item {
        ads {
          ...AdsListingTypeFragment
        }
        store {
          ...VendorTypeFragment
        }
        user {
          ...UserTypeFragment
          createdAt
          updatedAt
        }
        userstats {
          ...UserStatsFragment
        }
      }
      hasNext
    }
  }
  ${AdsListingTypeFragment}
  ${VendorTypeFragment}
  ${UserTypeFragment}
  ${UserStatsFragment}
`;

export const GET_USER_AD_LISTING_PUBLIC = gql`
  query GetUserAdListing(
    $owner: String!
    $after: DateTime
    $before: DateTime
    $limit: Float
    $env: String
  ) {
    data: getUserAdListing(
      owner: $owner
      after: $after
      before: $before
      limit: $limit
      env: $env
    ) {
      items {
        ...AdsListingTypeFragment
      }
      hasNext
      params
    }
  }
  ${AdsListingTypeFragment}
`;

export const GET_MY_ADS_PAGINATION = gql`
  query GetMyAdListing(
    $filter: String
    $sort: String
    $before: DateTime
    $after: DateTime
    $limit: Float
  ) {
    data: myAds(
      filter: $filter
      sort: $sort
      before: $before
      after: $after
      limit: $limit
    ) {
      items {
        ...AdsListingTypeFragment
      }
      hasNext
      params
    }
  }
  ${AdsListingTypeFragment}
`;

export const ADS_LISTING_PAGE = gql`
  query AdsListingTypePagination(
    $after: DateTime
    $before: DateTime
    $limit: Float
    $sort: String
    $filter: String
  ) {
    data: adsListingTypePagination(
      after: $after
      before: $before
      limit: $limit
      sort: $sort
      filter: $filter
    ) {
      items {
        ...AdsListingTypeFragment
      }
      hasNext
      params
    }
  }
  ${AdsListingTypeFragment}
`;
