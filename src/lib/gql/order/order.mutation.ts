import gql from 'graphql-tag';

import { ResTypeFragment } from '../shared';

export const CHECKOUT_ORDER = gql`
  mutation CheckoutOrder($order: OrderTypeInput!, $walletId: String!) {
    data: checkoutOrder(order: $order, walletId: $walletId) {
      ...ResTypeFragment
    }
  }
  ${ResTypeFragment}
`;

export const UPDATE_ORDER_TRACKING_MUTATION = gql`
  mutation UpdateOrderTracking($id: String!, $tracking: String!) {
    data: updateOrderTracking(id: $id, tracking: $tracking) {
      ...ResTypeFragment
    }
  }
  ${ResTypeFragment}
`;

export const FINALIZE_ORDER_MUTATION = gql`
  mutation FinalizeOrder($id: String!) {
    data: finalizeOrder(id: $id) {
      ...ResTypeFragment
    }
  }
  ${ResTypeFragment}
`;

export const CONFIRM_ORDER_MUTATION = gql`
  mutation ConfirmOrder($id: String!, $confirm: Boolean, $reason: String) {
    data: confirmOrder(id: $id, confirm: $confirm, reason: $reason) {
      ...ResTypeFragment
    }
  }
  ${ResTypeFragment}
`;

export const VERIFY_ORDER_MUTATION = gql`
  mutation VerifyOrder($orderId: String!, $orderCode: String!) {
    data: verifyOrder(orderId: $orderId, orderCode: $orderCode) {
      ...ResTypeFragment
    }
  }
  ${ResTypeFragment}
`;

export const CANCEL_ORDER_MUTATION = gql`
  mutation CancelOrder($id: String!, $reason: String) {
    data: cancelOrder(id: $id, reason: $reason) {
      ...ResTypeFragment
    }
  }
  ${ResTypeFragment}
`;

export const RATE_ORDER_MUTATION = gql`
  mutation rateOrder($id: String!, $rating: Float, $review: String) {
    data: rateOrder(id: $id, rating: $rating, review: $review) {
      ...ResTypeFragment
    }
  }
  ${ResTypeFragment}
`;

// confirm .e.t.c
