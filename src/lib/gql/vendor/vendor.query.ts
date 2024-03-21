import gql from 'graphql-tag';

import { VendorTypeFragment } from './vendor.fragment';

export const GET_VENDOR = gql`
  query GetVendor {
    data: getVendor {
      ...VendorTypeFragment
    }
  }
  ${VendorTypeFragment}
`;

export const GET_VENDOR_MONEY_ESCROW = gql`
  query GetMoneyInEscrow {
    data: getMoneyInEscrow
  }
`;
