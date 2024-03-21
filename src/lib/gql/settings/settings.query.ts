import gql from 'graphql-tag';

export const FeePricesFragment = gql`
  fragment FeePricesFragment on FeePrices {
    withdrawMin {
      BTC
    }
    withdrawFeePerc
    checkoutFeePerc
  }
`;

export const GET_FEE_PRICES = gql`
  query GetFeePrices {
    data: getFeePrices {
      ...FeePricesFragment
    }
  }
  ${FeePricesFragment}
`;

export const GET_SITE_SETTINGS = gql`
  query GetSiteSettings {
    data: getSiteSettings {
      adCount
      userCount
      vendorCount
      vendorBond
      feePrices {
        ...FeePricesFragment
      }
    }
  }
  ${FeePricesFragment}
`;
