'use client';

import { useQuery } from '@apollo/client';
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
  FormGroup,
  Grid,
  GridGutterSize,
  Icon,
  JustifyContent,
  Layout,
  Radio,
  SVGAsset,
  TextArea,
} from '@uuixjs/uuixweb';
import { BorderRadius } from '@uuixjs/uuixweb-lib';
import _get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import React from 'react';

import LayoutPage from '@/components/Layout';
import VerticalSideBar from '@/components/sidebar/SideBar';
import OrderList from '@/containers/Order/order.list';
import ReviewsContainer from '@/containers/Review/review';
import type { VendorType } from '@/lib/gql';
import { GET_VENDOR_MONEY_ESCROW } from '@/lib/gql';
import { useVendor } from '@/lib/hooks/useUserCache';
import { niceDec } from '@/lib/utils/number';

export function StoreStatsPage({ vendor }: { vendor: VendorType }) {
  const { owner } = vendor;
  const salesCount = vendor.salesCount || 0;
  const { data, loading } = useQuery(GET_VENDOR_MONEY_ESCROW, {
    nextFetchPolicy: 'network-only',
  });
  const moneyInEscrow = _get(data, 'data.data', 0);

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
            <OrderList />
          </Column>

          <Column cols={cols}>
            <Layout
              display={Display.Flex}
              justifyContent={JustifyContent.Center}
              padding={{ top: 1, bottom: 1 }}
            >
              <CoreText as="h4">Recent reviews</CoreText>
            </Layout>
            <ReviewsContainer filters={{ seller: owner }} />
          </Column>
        </Grid>
        {/* some text */}
      </Layout>
    </Layout>
  );
}

export function CreateStorePage({ createVendor }) {
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
          width: '150px',
          height: '150px',
          color: 'var(--color-brand-accent-flamingo)',
        }}
      />

      <Layout padding={{ top: 2, bottom: 1 }}>
        <CoreText as="h4" color={Color.Link}>
          Create a new store and start selling your products
        </CoreText>
      </Layout>

      <Layout fullWidth>
        <FormGroup label="TOC">
          <TextArea
            readOnly
            rows={15}
            value={`
                    #1.  The following products/services are strictly prohibited from SSLATT Market: Child porn, Prostitution, Poison, Fentanyl, Murder services, Weapons, Covid-19 vaccines and any covid-19 related material 

                    #2. PGP-2FA is mandatory for all vendors.
              
                    #3. There's a nonrefundable vendor bond of $600 (0.022 BTC / 3.93 XMR)
              
                    #4. Orders of digital products auto-finalizes in 48 hours whilst orders for physical products auto-finalizes in 14 days.
              
                    #5. Dox is strictly prohibited.  
              
                    #6. Product description must be very accurate and void of any misleading information
              
                    #7. All transactions including messaging and ordering must be conducted in the market. Any vendor trying to deal outside the market will be banned without any further warning. NO COMMISSIONS NO SERVICE
              `}
          />
        </FormGroup>
      </Layout>

      <Layout>
        <FormGroup>
          <Layout margin={{ bottom: 2, top: 1 }}>
            <Radio
              checked
              label="I have read and accepted the rules mentioned above."
            />
          </Layout>
        </FormGroup>
      </Layout>

      <Button
        variant={ButtonType.Warning}
        size={ButtonSize.Large}
        icon={SVGAsset.New}
        onClick={createVendor}
      >
        Create store{' '}
      </Button>
    </Layout>
  );
}

export function StorePage() {
  const { vendor, createVendor } = useVendor();

  const isVendor = vendor && vendor.id;
  return (
    <LayoutPage auth>
      <Layout display={Display.Flex} fullWidth>
        <VerticalSideBar client />
        {isVendor ? (
          <StoreStatsPage vendor={vendor} />
        ) : (
          <CreateStorePage createVendor={createVendor} />
        )}
      </Layout>
    </LayoutPage>
  );
}

export default StorePage;
