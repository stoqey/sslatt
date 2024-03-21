'use client';

import {
  AlignItems,
  Background,
  Button,
  ButtonSize,
  ButtonType,
  Color,
  Column,
  CoreText,
  Display,
  FlexDirection,
  FontWeight,
  FormGroup,
  Grid,
  GridGutterSize,
  Icon,
  JustifyContent,
  Layout,
  Radio,
  SVGAsset,
  Title,
} from '@uuixjs/uuixweb';
import { BorderRadius } from '@uuixjs/uuixweb-lib';
import isEmpty from 'lodash/isEmpty';
import React from 'react';

import type {
  OrderRatingOutput,
  OrderTypeOutput,
  UserType,
  VendorType,
} from '@/components/types.generated';
import { MessageSuccessHtml } from '@/containers/actions.html';
import OrderListHtml from '@/containers/Order/order.list.html';
import ReviewsContainer from '@/containers/Review/review.html';
import { niceDec } from '@/lib/utils/number';

interface StoreStatsPageProps extends StorePageProps {
  vendor: VendorType;
  vendorMoneyEscrow?: number;
}
export function StoreStatsPage(props: StoreStatsPageProps) {
  const {
    vendor,
    vendorMoneyEscrow: moneyInEscrow,
    ratings = [],
    orders = [],
    user,
  } = props;
  const { owner } = vendor;
  const salesCount = vendor.salesCount || 0;
  const sections = [
    {
      title: 'Total Money in escrow',
      value: niceDec(moneyInEscrow),
      // values: ["X BTC", "X XMR"],
      icon: SVGAsset.NavDashboard,
      color: 'var(--color-brand-muted-mustard)',
    },

    {
      title: 'Completed orders',
      value: salesCount,
      // values: ["X BTC", "X XMR"],
      icon: SVGAsset.NavDashboard,
      color: 'var(--color-background-success)',
    },
  ];

  const cols = { default: 12, sm: 12, md: 6, lg: 6 };
  return (
    <Layout fullWidth>
      <Layout display={Display.Flex} fullWidth margin={{ left: 2 }}>
        <Grid gutterSize={GridGutterSize.Large} style={{ width: '100%' }}>
          {sections.map((sec) => (
            <Column key={sec.title} cols={cols}>
              <Layout
                fullWidth
                display={Display.Flex}
                style={{ flex: 1 }}
                margin={{ bottom: 1, top: 2 }}
                border={BorderRadius.Medium}
              >
                <Layout padding={1} style={{ background: sec.color }}>
                  <Icon
                    asset={sec.icon}
                    style={{ width: 100, height: 100, color: 'white' }}
                  />
                </Layout>
                <Layout
                  display={Display.Flex}
                  flexDirection={FlexDirection.Column}
                  justifyContent={JustifyContent.Center}
                  padding={1}
                  style={{ flex: 1 }}
                >
                  <CoreText as="h4" color={Color.AccentAlt}>
                    {sec.title}
                  </CoreText>

                  <CoreText as="h2" color={Color.AccentAlt}>
                    {sec.value}
                  </CoreText>

                  {!isEmpty(sec.values) &&
                    sec.values.map((val) => (
                      <CoreText key={val} as="h4" color={Color.AccentAlt}>
                        {val}
                      </CoreText>
                    ))}
                </Layout>
              </Layout>
            </Column>
          ))}

          <Column cols={cols}>
            <Layout
              display={Display.Flex}
              justifyContent={JustifyContent.Center}
              padding={{ top: 1, bottom: 1 }}
            >
              <CoreText as="h4">Recent Orders</CoreText>
            </Layout>
            <OrderListHtml
              ordersPage={{ items: orders, hasNext: false }}
              user={user}
            />
          </Column>

          <Column cols={cols}>
            <Layout
              display={Display.Flex}
              justifyContent={JustifyContent.Center}
              padding={{ top: 1, bottom: 1 }}
            >
              <CoreText as="h4">Recent reviews</CoreText>
            </Layout>
            <ReviewsContainer ratings={ratings} />
          </Column>
        </Grid>
        {/* some text */}
      </Layout>
    </Layout>
  );
}

export function CreateStorePage(props: Partial<StorePageProps>) {
  const vendorBond = props.vendorBond || 0;
  const isPromo = vendorBond < 600;
  const rules = [
    'The following products/services are strictly prohibited from SSLATT Market: Child porn, Prostitution, Poison, Fentanyl, Murder services, Weapons, Covid-19 vaccines and any covid-19 related material',
    'PGP-2FA is mandatory for all vendors.',
    <Layout display={Display.Flex} key="fee">
      <Layout padding={{ right: 1 }}>
        <CoreText fontWeight={FontWeight.Bold} as="h5">
          There's a nonrefundable vendor bond of
        </CoreText>
      </Layout>
      <Layout padding={{ right: 1 }}>
        <CoreText
          style={
            isPromo ? { textDecoration: 'line-through', color: 'red' } : null
          }
        >
          {'$600 (0.022 BTC / 3.93 XMR) '}
        </CoreText>
      </Layout>
      {isPromo && <CoreText>{`${niceDec(vendorBond)}`}</CoreText>}
    </Layout>,
    'Orders of digital products auto-finalizes in 48 hours whilst orders for physical products auto-finalizes in 14 days.',
    'Dox is strictly prohibited.',
    'Product description must be very accurate and void of any misleading information',
    'All transactions including messaging and ordering must be conducted in the market. Any vendor trying to deal outside the market will be banned without any further warning. NO COMMISSIONS NO SERVICE',
  ];

  const { message = '', success = false } = props;
  return (
    <Layout
      fullWidth
      display={Display.Flex}
      // justifyContent={JustifyContent.Center}
      alignItems={AlignItems.Center}
      flexDirection={FlexDirection.Column}
      padding={{ top: 2, bottom: 2, left: 4, right: 4 }}
      background={Background.Base}
    >
      <Icon
        asset={SVGAsset.NavDashboard}
        style={{
          width: '100px',
          height: '100px',
          color: 'var(--color-brand-accent-flamingo)',
        }}
      />

      <Layout padding={{ top: 1, bottom: 2 }}>
        <CoreText as="h3" color={Color.Link}>
          Create a new store and start selling your products
        </CoreText>
      </Layout>

      <Layout>
        <MessageSuccessHtml success={success} message={message} />
      </Layout>

      <Layout fullWidth elevation={3} padding={1}>
        <Layout margin={{ bottom: 1 }} textAlign="center">
          <Title>TOC</Title>
        </Layout>

        <ol className="py-2">
          {rules.map((rule, index) => (
            <li key={`${index}`}>
              <Layout padding={{ top: 1, bottom: 1 }}>
                <CoreText fontWeight={FontWeight.Bold} as="h5">
                  {rule}
                </CoreText>
              </Layout>
            </li>
          ))}
        </ol>
      </Layout>

      <Layout>
        <FormGroup>
          <Layout margin={{ bottom: 2, top: 3 }}>
            <Radio
              checked
              label="I have read and accepted the rules mentioned above."
            />
          </Layout>
        </FormGroup>
      </Layout>

      <form action="/api/store/create" method="POST">
        {/* vendor info */}
        <input type="hidden" name="id" value="" />
        <Button
          type="submit"
          variant={ButtonType.Warning}
          size={ButtonSize.Large}
          icon={SVGAsset.New}
        >
          Create store{' '}
        </Button>
      </form>
    </Layout>
  );
}

interface StorePageProps {
  vendorBond?: number;
  message?: string;
  success?: boolean;
  user?: UserType;
  vendor?: VendorType;
  ratings?: OrderRatingOutput[];
  orders?: OrderTypeOutput[];
}

export function StorePage(props: StorePageProps) {
  const { vendor, ...otherProps } = props;

  const isVendor = vendor && vendor.id;
  return (
    <Layout display={Display.Flex} fullWidth>
      {isVendor ? (
        <StoreStatsPage vendor={vendor} {...otherProps} />
      ) : (
        <CreateStorePage {...otherProps} />
      )}
    </Layout>
  );
}

export default StorePage;
