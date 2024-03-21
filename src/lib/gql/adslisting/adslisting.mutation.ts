import gql from 'graphql-tag';

import { ResTypeFragment } from '../shared';

export const CREATE_AD_LISTING_MUTATION = gql`
  mutation CreateAdListing($args: AdsListingTypeInput!) {
    data: createAdListing(args: $args) {
      ...ResTypeFragment
    }
  }
  ${ResTypeFragment}
`;

export const CHANGE_VISIBILITY_AD_LISTING_MUTATION = gql`
  mutation ChangeVisibilityAdListing(
    $id: String!
    $visible: Boolean!
    $owner: String!
  ) {
    data: changeVisibilityAdListing(id: $id, visible: $visible, owner: $owner) {
      ...ResTypeFragment
    }
  }
  ${ResTypeFragment}
`;

export const DELETE_AD_LISTING_MUTATION = gql`
  mutation DeleteAdListing($id: String!) {
    data: deleteAdListing(id: $id) {
      ...ResTypeFragment
    }
  }
  ${ResTypeFragment}
`;
