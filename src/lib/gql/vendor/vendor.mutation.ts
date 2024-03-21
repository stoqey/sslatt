import gql from 'graphql-tag';

export const CREATE_VENDOR_MUTATION = gql`
  mutation CreateVendor {
    data: createVendor {
      success
      message
      data
    }
  }
`;
// ResType

export const UPDATE_VENDOR_MUTATION = gql`
  mutation UpdateVendor($vendor: VendorTypeInput!) {
    data: updateVendor(vendor: $vendor) {
      success
      message
      data
    }
  }
`;
