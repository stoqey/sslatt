import { useLazyQuery, useMutation } from '@apollo/client';
import {
  ButtonState,
  CoreText,
  FormGroup,
  Input,
  InputSize,
  InputType,
  Layout,
  ModalFooter,
  ModalSize,
  Select,
  TextArea,
  Title,
} from '@uuixjs/uuixweb';
import _get from 'lodash/get';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import type { OrderType } from '@/lib/gql';
import {
  FINALIZE_ORDER_MUTATION,
  GET_ORDER_RATING_ID,
  OrderTypeTracking,
  RATE_ORDER_MUTATION,
  UPDATE_ORDER_TRACKING_MUTATION,
  VERIFY_ORDER_MUTATION,
} from '@/lib/gql';

interface Props {
  id: string;
  close?: () => void;
}

// Verify
export const VerifyOrder = (props: Props) => {
  const { id, close } = props;

  const [verifyOrderApi, { loading, data }] = useMutation(
    VERIFY_ORDER_MUTATION,
  );

  const [code, setCode] = useState<string>('');

  const submit = () => {
    verifyOrderApi({ variables: { orderId: id, orderCode: code } });
  };

  const verifiedOrder = _get(data, 'data.success');
  const message = _get(data, 'data.message');

  useEffect(() => {
    if (typeof verifiedOrder === 'boolean') {
      const closeTimeout = setTimeout(() => {
        close();
        verifiedOrder
          ? toast.success(`Order successfully verified.`)
          : toast.error(message);
      }, 1000);
      return () => clearTimeout(closeTimeout);
    }
  }, [verifiedOrder]);

  useEffect(() => {
    if (verifiedOrder) {
      const closeTimeout = setTimeout(() => close(), 1000);
      return () => clearTimeout(closeTimeout);
    }
  }, [verifiedOrder]);

  return (
    <Layout margin={2}>
      <>
        <Title>Verify Order</Title>
        {/* Order view */}

        <Layout margin={{ top: 2 }}>
          <FormGroup label="Code">
            {/* <FormLabel>Order ID</FormLabel> */}
            <Input
              type={InputType.Text}
              size={InputSize.Small}
              name="code"
              value={code}
              onChange={(e) => setCode(e.target.value as any)}
            />
          </FormGroup>
        </Layout>

        <ModalFooter
          size={ModalSize.Medium}
          primaryButtonProps={{
            children: 'Verify Code',
            state: loading ? ButtonState.Loading : ButtonState.Default,
            onClick: () => submit(),
          }}
          secondaryButtonProps={{
            children: 'Cancel',
            state: loading ? ButtonState.Loading : ButtonState.Default,
            onClick: () => close(),
          }}
        />
      </>
    </Layout>
  );
};

// RateOrder
export const RateOrder = (props: Props) => {
  const { id, close } = props;

  const [getOrderRating, { loading: loadingExisting, data: existingRating }] =
    useLazyQuery(GET_ORDER_RATING_ID);

  const [rateOrderApi, { loading, data }] = useMutation(RATE_ORDER_MUTATION);

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const submit = () => {
    rateOrderApi({ variables: { orderId: id, review, rating: +rating } });
  };

  const ratedOrder = _get(data, 'data.success');
  const message = _get(data, 'data.message');

  useEffect(() => {
    if (typeof ratedOrder === 'boolean') {
      const closeTimeout = setTimeout(() => {
        close();
        ratedOrder
          ? toast.success(`Order rating successfully saved.`)
          : toast.error(message);
      }, 1000);
      return () => clearTimeout(closeTimeout);
    }
  }, [ratedOrder]);

  useEffect(() => {
    if (id)
      getOrderRating({
        variables: { orderId: id },
        fetchPolicy: 'network-only',
      });
  }, [id]);

  useEffect(() => {
    const orderRating = existingRating?.data;
    if (orderRating) {
      setRating(orderRating.rating);
      setReview(orderRating.review);
    }
  }, [existingRating]);

  return (
    <Layout margin={2}>
      <>
        <Title>Rate & Review Order</Title>
        {/* Order view */}
        <Layout margin={{ top: 2 }}>
          {/* TODO rating ui stars */}
          <FormGroup label="Rating">
            <Input
              type={InputType.Number}
              size={InputSize.Small}
              name="rating"
              value={rating as any}
              onChange={(e) => setRating(e.target.value as any)}
            />
          </FormGroup>

          <FormGroup label="Review">
            <TextArea
              size={InputSize.Small}
              name="review"
              value={review}
              onChange={(e) => setReview(e.target.value as any)}
            />
          </FormGroup>
        </Layout>

        <ModalFooter
          size={ModalSize.Medium}
          primaryButtonProps={{
            children: 'Save',
            state: loading ? ButtonState.Loading : ButtonState.Default,
            onClick: () => submit(),
          }}
          secondaryButtonProps={{
            children: 'Cancel',
            state: loading ? ButtonState.Loading : ButtonState.Default,
            onClick: () => close(),
          }}
        />
      </>
    </Layout>
  );
};

export const TrackingOrder = (props: Props & OrderType) => {
  const { id, close, tracking: orderTracking } = props;

  const [trackingOrderApi, { loading, data }] = useMutation(
    UPDATE_ORDER_TRACKING_MUTATION,
  );

  const [tracking, setTracking] = useState<string>(orderTracking);

  const submit = () => {
    trackingOrderApi({ variables: { id, tracking } });
  };

  const trackedOrder = _get(data, 'data.success');
  const message = _get(data, 'data.message');

  useEffect(() => {
    if (typeof trackedOrder === 'boolean') {
      const closeTimeout = setTimeout(() => {
        close();
        trackedOrder
          ? toast.success(`Order tracking successfully updated`)
          : toast.error(message);
      }, 1000);
      return () => clearTimeout(closeTimeout);
    }
  }, [trackedOrder]);

  useEffect(() => {
    if (trackedOrder) {
      const closeTimeout = setTimeout(() => close(), 1000);
      return () => clearTimeout(closeTimeout);
    }
  }, [trackedOrder]);

  return (
    <Layout margin={2}>
      <>
        <Title>Update Order Tracking</Title>
        {/* Order view */}

        <Layout margin={{ top: 2 }}>
          <FormGroup label="Order Tracking">
            <Select
              value={tracking}
              onChange={(e: any) => setTracking(e.target.value)}
            >
              {Object.keys(OrderTypeTracking).map((key) => (
                <option value={key}>{OrderTypeTracking[key]}</option>
              ))}
            </Select>
          </FormGroup>
        </Layout>

        <ModalFooter
          size={ModalSize.Medium}
          primaryButtonProps={{
            children: 'Update',
            state: loading ? ButtonState.Loading : ButtonState.Default,
            onClick: () => submit(),
          }}
          secondaryButtonProps={{
            children: 'Cancel',
            state: loading ? ButtonState.Loading : ButtonState.Default,
            onClick: () => close(),
          }}
        />
      </>
    </Layout>
  );
};

export const FinalizeOrder = (props: Props & OrderType) => {
  const { id, close, tracking: orderTracking } = props;

  const [finalizeOrderApi, { loading, data }] = useMutation(
    FINALIZE_ORDER_MUTATION,
  );

  const submit = () => {
    finalizeOrderApi({ variables: { id } });
  };

  const completedOrder = _get(data, 'data.success');
  const message = _get(data, 'data.message');

  useEffect(() => {
    if (typeof completedOrder === 'boolean') {
      const closeTimeout = setTimeout(() => {
        close();
        completedOrder
          ? toast.success(`Order completed successfully, please rate it`)
          : toast.error(message);
      }, 1000);
      return () => clearTimeout(closeTimeout);
    }
  }, [completedOrder]);

  useEffect(() => {
    if (completedOrder) {
      const closeTimeout = setTimeout(() => close(), 1000);
      return () => clearTimeout(closeTimeout);
    }
  }, [completedOrder]);

  return (
    <Layout margin={2}>
      <>
        <Title>Completed Order</Title>
        {/* Order view */}

        <Layout margin={{ top: 2 }}>
          <CoreText>
            Are you sure you want to complete this order, this action cannot be
            undone
          </CoreText>
        </Layout>

        <ModalFooter
          size={ModalSize.Medium}
          primaryButtonProps={{
            children: 'Yes, Complete',
            state: loading ? ButtonState.Loading : ButtonState.Default,
            onClick: () => submit(),
          }}
          secondaryButtonProps={{
            children: 'No, Cancel',
            state: loading ? ButtonState.Loading : ButtonState.Default,
            onClick: () => close(),
          }}
        />
      </>
    </Layout>
  );
};
