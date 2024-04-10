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

export const GET_SITE_SETTINGS_ADMIN = gql`
  query GetSiteSettings {
    data: allSiteSettings {
      adCount
      userCount
      vendorCount
      vendorBond
      feePrices {
        ...FeePricesFragment
      }

      name
      slogan
      description

      ENABLE_BTC
      ENABLE_XMR

      BTCPAYSERVER_URL
      BTCPAYSERVER_BTC
      BTCPAYSERVER_CRON_ENABLED
      BTCPAYSERVER_CRON

      WALLET_RPC_URL
      WALLET_RPC_USER
      WALLET_RPC_PASSWORD
      WALLET_PATH
      WALLET_PASSWORD
      WALLETS_DIR

      MONEROX_URL
      MONEROX_WALLET
      MONEROX_CRON

      ENABLE_XMPP
      XMPP_HOST
      XMPP_PORT
      XMPP_JID
      XMPP_PASSWORD

      ENABLE_PGP
      PGP_PUBLIC_KEY

      theme
    }
  }
  ${FeePricesFragment}
`;
