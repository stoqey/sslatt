'use client';

import {
  Button,
  ButtonSize,
  ButtonType,
  CoreText,
  Display,
  FormGroup,
  Input,
  InputSize,
  InputType,
  Layout,
  Select,
  SVGAsset,
  TextArea,
  Title,
} from '@uuixjs/uuixweb';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { Container } from '@/components/container';
import type { OrderType } from '@/lib/gql';
import { OrderTypeTracking } from '@/lib/gql';

import type { ActionHtmlProps } from '../actions.html';
import { actionBtnStyle, MessageSuccessHtml } from '../actions.html';

interface Props extends ActionHtmlProps {}

// Verify
export const VerifyOrderHtml = (props: Props) => {
  const {
    id,
    backLink,
    submitLink,
    actionId,
    actionName,
    message = '',
    success = false,
  } = props;

  return (
    <Container>
      <Layout margin={2}>
        <>
          <Title>Verify Order</Title>
          {/* Order view */}
          <MessageSuccessHtml
            title="Verify Order"
            message={message}
            success={success}
          />

          <form action={submitLink} method="POST">
            <input type="hidden" name="actionId" value={actionId} />
            <input type="hidden" name="actionName" value={actionName} />
            <input type="hidden" name="id" value={id} />

            <Layout margin={{ top: 2 }}>
              <FormGroup label="Code">
                {/* <FormLabel>Order ID</FormLabel> */}
                <Input
                  type={InputType.Text}
                  size={InputSize.Small}
                  name="code"
                />
              </FormGroup>
            </Layout>

            <Layout display={Display.Flex} {...actionBtnStyle}>
              <Layout margin={{ left: 1, right: 1 }}>
                <Button
                  type="submit"
                  icon={SVGAsset.Edit}
                  size={ButtonSize.Large}
                  variant={ButtonType.Primary}
                >
                  Verify Code
                </Button>
              </Layout>

              <Layout margin={{ right: 1 }}>
                <Link href={backLink}>
                  <Button
                    size={ButtonSize.Large}
                    icon={SVGAsset.Close}
                    variant={ButtonType.Secondary}
                    type="button"
                  >
                    Close
                  </Button>
                </Link>
              </Layout>
            </Layout>
          </form>
        </>
      </Layout>
    </Container>
  );
};

// RateOrder
export const RateOrderHtml = (
  props: Props & { rating: number; review: string },
) => {
  const {
    id,
    backLink,
    submitLink,
    actionId,
    actionName,
    rating,
    review,
    message = '',
    success = false,
  } = props;

  const pathname = usePathname();

  return (
    <Container>
      <Layout margin={2}>
        <>
          <Title>Rate & Review Order</Title>
          {/* Order view */}

          <MessageSuccessHtml
            title="Rate & Review Order"
            message={message}
            success={success}
          />

          <form action={submitLink} method="POST">
            <input hidden name="pathname" defaultValue={pathname} />
            <input hidden name="actionId" defaultValue={actionId} />
            <input hidden name="actionName" defaultValue={actionName} />
            <input hidden name="id" defaultValue={id} />

            <Layout margin={{ top: 2 }}>
              {/* TODO rating ui stars */}
              <FormGroup label="Rating (1 - 5)">
                <Input
                  type={InputType.Number}
                  size={InputSize.Small}
                  name="rating"
                  min={1}
                  max={5}
                  defaultValue={rating as any}
                />
              </FormGroup>

              <FormGroup label="Review">
                <TextArea
                  size={InputSize.Small}
                  name="review"
                  defaultValue={review}
                  rows={5}
                />
              </FormGroup>
            </Layout>

            <Layout display={Display.Flex} {...actionBtnStyle}>
              <Layout margin={{ left: 1, right: 1 }}>
                <Button
                  type="submit"
                  icon={SVGAsset.Edit}
                  size={ButtonSize.Large}
                  variant={ButtonType.Primary}
                >
                  Save
                </Button>
              </Layout>

              <Layout margin={{ right: 1 }}>
                <Link href={backLink}>
                  <Button
                    size={ButtonSize.Large}
                    icon={SVGAsset.Close}
                    variant={ButtonType.Secondary}
                    type="button"
                  >
                    Cancel
                  </Button>
                </Link>
              </Layout>
            </Layout>
          </form>
        </>
      </Layout>
    </Container>
  );
};

export const TrackingOrderHtml = (props: Props & OrderType) => {
  const {
    id,
    backLink,
    submitLink,
    tracking: orderTracking,
    actionId,
    actionName,
    message = '',
    success = false,
  } = props;

  const pathname = usePathname();

  return (
    <Container>
      <Layout margin={2}>
        <>
          <Title>Update Order Tracking</Title>
          {/* Order view */}
          <MessageSuccessHtml
            title="Update Order Tracking"
            message={message}
            success={success}
          />

          <form action={submitLink} method="POST">
            <input hidden name="pathname" defaultValue={pathname} />
            <input hidden name="actionId" defaultValue={actionId} />
            <input hidden name="actionName" defaultValue={actionName} />
            <input hidden name="id" defaultValue={id} />

            <Layout margin={{ top: 2 }}>
              <FormGroup label="Order Tracking">
                <Select name="tracking" defaultValue={orderTracking}>
                  {Object.keys(OrderTypeTracking).map((key) => (
                    <option key={key} value={key}>
                      {OrderTypeTracking[key]}
                    </option>
                  ))}
                </Select>
              </FormGroup>
            </Layout>

            <Layout display={Display.Flex} {...actionBtnStyle}>
              <Layout margin={{ left: 1, right: 1 }}>
                <Button
                  type="submit"
                  icon={SVGAsset.Edit}
                  size={ButtonSize.Large}
                  variant={ButtonType.Primary}
                >
                  Update
                </Button>
              </Layout>

              <Layout margin={{ right: 1 }}>
                <Link href={backLink}>
                  <Button
                    size={ButtonSize.Large}
                    icon={SVGAsset.Close}
                    variant={ButtonType.Secondary}
                    type="button"
                  >
                    Cancel
                  </Button>
                </Link>
              </Layout>
            </Layout>
          </form>
        </>
      </Layout>
    </Container>
  );
};

export const FinalizeOrderHtml = (props: Props & OrderType) => {
  const {
    id,
    backLink,
    submitLink,
    actionId,
    actionName,
    message = '',
    success = false,
  } = props;

  const pathname = usePathname();

  return (
    <Container>
      <Layout margin={{ top: 2 }}>
        <>
          <Title style={{ textAlign: 'center' }}>Complete Order</Title>
          {/* Order view */}

          <MessageSuccessHtml
            title="Update Order Tracking"
            message={message}
            success={success}
          />

          <Layout margin={{ top: 2, bottom: 2 }}>
            <CoreText as="h4" style={{ textAlign: 'center' }}>
              Are you sure you want to complete this order, this action cannot
              be undone
            </CoreText>
          </Layout>

          <form action={submitLink} method="POST">
            <input hidden name="pathname" defaultValue={pathname} />
            <input hidden name="actionId" defaultValue={actionId} />
            <input hidden name="actionName" defaultValue={actionName} />
            <input hidden name="id" defaultValue={id} />

            <Layout display={Display.Flex} {...actionBtnStyle}>
              <Layout margin={{ left: 1, right: 1 }}>
                <Button
                  type="submit"
                  icon={SVGAsset.Edit}
                  size={ButtonSize.Large}
                  variant={ButtonType.Primary}
                >
                  Yes, Complete
                </Button>
              </Layout>

              <Layout margin={{ right: 1 }}>
                <Link href={backLink}>
                  <Button
                    size={ButtonSize.Large}
                    icon={SVGAsset.Close}
                    variant={ButtonType.Secondary}
                    type="button"
                  >
                    No, Cancel
                  </Button>
                </Link>
              </Layout>
            </Layout>
          </form>
        </>
      </Layout>
    </Container>
  );
};
