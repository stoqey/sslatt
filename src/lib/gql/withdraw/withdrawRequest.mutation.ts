import gql from 'graphql-tag';

import { ResTypeFragment } from '../shared';

export const CREATE_WITHDRAW_REQUEST_BY_WALLET_MUTATION = gql`
  mutation CreateWithdrawRequestByWallet($args: WithdrawRequestInput!) {
    data: createWithdrawRequestByWallet(args: $args) {
      ...ResTypeFragment
    }
  }
  ${ResTypeFragment}
`;

export const FINALIZE_WITHDRAW_REQUEST_MUTATION = gql`
  mutation FinalizeWithdrawRequest($id: String!) {
    data: finalizeWithdrawRequest(id: $id) {
      ...ResTypeFragment
    }
  }
  ${ResTypeFragment}
`;

export const CONFIRM_WITHDRAW_REQUEST_MUTATION = gql`
  mutation ConfirmWithdrawRequest(
    $id: String!
    $confirm: Boolean
    $reason: String
  ) {
    data: confirmWithdrawRequest(id: $id, confirm: $confirm, reason: $reason) {
      ...ResTypeFragment
    }
  }
  ${ResTypeFragment}
`;

export const CANCEL_WITHDRAW_REQUEST_MUTATION = gql`
  mutation CancelWithdrawRequest($id: String!, $reason: String) {
    data: cancelWithdrawRequest(id: $id, reason: $reason) {
      ...ResTypeFragment
    }
  }
  ${ResTypeFragment}
`;
