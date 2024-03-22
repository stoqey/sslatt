import {
  Accordion,
  Button,
  ButtonSize,
  ButtonType,
  Display,
  FlexDirection,
  FormGroup,
  Input,
  InputSize,
  InputType,
  JustifyContent,
  Layout,
  SVGAsset,
  Select,
  TextArea,
  Title,
  TitleSize,
} from '@uuixjs/uuixweb';
import type {
  AdsListingOutput,
  FeePrices,
  PairRate,
  UserType,
  WalletOutput,
} from '@/components/types.generated';
import { endsWith, sumBy } from 'lodash';
import { useParams, usePathname, useSearchParams } from 'next/navigation';

import { Container } from '@/components/container';
import { MessageSuccessHtml } from '../actions.html';
import React from 'react';
import { currencies } from '../Wallet/MyWallets';
import isEmpty from 'lodash/isEmpty';
import { niceDec } from '@/lib/utils/number';
import { parseAdItem } from '../../components/AdLists/ads.item';
import { useWalletTotalUsdHtml } from '../Wallet/MyWallets.html';

const walletscurrencies = currencies.slice(1, currencies.length); // BTC, XMR

export interface OrderCheckoutHtmlProps {
  quantity?: number;
  details?: string;

  feePrices?: FeePrices;

  user?: UserType;
  rates?: PairRate[];
  wallets?: WalletOutput[];

  message?: string;
  success?: boolean;

  adItem?: AdsListingOutput;
}

/**
 * order/checkout/new?type=ad&ad=ad_id
 * order/checkout/id finalize
 * @returns
 */
const OrderCheckoutHtml = (props: OrderCheckoutHtmlProps) => {
  const pathname = usePathname();
  const { slug } = useParams();
  const query = useSearchParams();
  const qtyQuery = +(query.get('qty') || 0);
  const orderType = query.get('type') || '';
  const orderTypeId = query.get('typeId') || '';

  const { walletsAmount } = useWalletTotalUsdHtml({
    wallets: props.wallets,
    rates: props.rates,
  });
  const {
    details = '',
    adItem,
    rates = [],
    feePrices,
    message = '',
    success = false,
  } = props;

  const orderSummary = [];

  if (adItem && adItem.id) {
    const price = (adItem.price || 0) * qtyQuery;

    orderSummary.push({
      name: 'Price',
      label: (
        <Layout display={Display.Flex} margin={{ top: 1 }}>
          <Layout margin={{ right: 1 }}>
            <Title size={TitleSize.Small}>{adItem.price}</Title>
          </Layout>
          <Title size={TitleSize.Small}>USD</Title>
        </Layout>
      ),
      value: price,
    });

    const feesPerc = feePrices.checkoutFeePerc;

    orderSummary.push({
      name: 'Fee',
      label: (
        <Layout display={Display.Flex} margin={{ top: 1 }}>
          <Layout margin={{ right: 2 }}>
            <Title size={TitleSize.Small}>{(feesPerc / 100) * price}</Title>
          </Layout>
          <Title size={TitleSize.Small}>{`${feesPerc}%`}</Title>
        </Layout>
      ),
      value: (feesPerc / 100) * price,
    });
  }

  const totalAmount = sumBy(orderSummary, 'value');

  const getRate = (currency: string) => {
    const rate = rates.find((rat) => endsWith(rat.pair as string, currency));
    return rate?.rate ? rate.rate : 0;
  };

  const ad = adItem && adItem.id ? parseAdItem(adItem) : null;

  return (
    <Container>
      {/* Checkout */}
      {/* <Title size={TitleSize.Default}>Checkout</Title> */}
      <form method="POST" action="/api/order/checkout">
        <input type="hidden" name="pathname" value={pathname} />
        <input type="hidden" name="slug" value={slug} />
        <input type="hidden" name="orderType" value={orderType} />
        <input type="hidden" name="orderTypeId" value={orderTypeId} />
        <input type="hidden" name="qtyQuery" value={qtyQuery} />
        {/* <input
          type="hidden"
          name="walletId"
          value={!isEmpty(walletsAmount) ? walletsAmount[0].id : ""}
        /> */}
        <Layout
          padding={1}
          display={Display.Flex}
          flexDirection={FlexDirection.Column}
        >
          <Layout margin={1}>
            <MessageSuccessHtml message={message} success={success} />
          </Layout>

          {/* TODO type, ad, e.t.c */}
          {ad && (
            <Layout style={{ flex: 1 }}>
              <Accordion
                initialOpenIndex={0}
                items={[
                  {
                    header: {
                      title: ad.title || ad.subtitle,
                      imageProps: {
                        src: ad.image,
                        alt: ad.title,
                      },
                    },
                    body: {
                      children: (
                        <Layout padding={1} margin={{ right: 4 }}>
                          {/* summary */}

                          {/* Price */}
                          {[orderSummary[0]].map((os) => (
                            <Layout
                              key={os?.name}
                              display={Display.Flex}
                              justifyContent={JustifyContent.Between}
                            >
                              <Title size={TitleSize.ExtraSmall}>
                                {os?.name}
                              </Title>
                              {os?.label}
                            </Layout>
                          ))}

                          {/* QTY */}
                          <Layout
                            display={Display.Flex}
                            justifyContent={JustifyContent.Between}
                            margin={{ top: 1 }}
                          >
                            <Title size={TitleSize.ExtraSmall}>Quantity</Title>
                            <Layout display={Display.Flex}>
                              <Layout style={{ width: '70px' }}>
                                <Input
                                  iconRight
                                  icon={SVGAsset.Document}
                                  size={InputSize.Default}
                                  name="qty"
                                  min={1}
                                  max={1000}
                                  type={InputType.Number}
                                  defaultValue={qtyQuery as any}
                                />
                              </Layout>
                            </Layout>
                          </Layout>

                          {/* Fee */}
                          {[orderSummary[1]].map((os, i) => (
                            <Layout
                              key={os?.name}
                              display={Display.Flex}
                              padding={{ top: 1 }}
                              justifyContent={JustifyContent.Between}
                            >
                              <Title size={TitleSize.ExtraSmall}>
                                {os?.name}
                              </Title>
                              {os?.label}
                            </Layout>
                          ))}

                          <Layout
                            fullWidth
                            padding={{ top: 1 }}
                            display={Display.Flex}
                            justifyContent={JustifyContent.Between}
                          >
                            <Title size={TitleSize.ExtraSmall}>Total</Title>
                            <Layout display={Display.Flex}>
                              <Layout margin={{ right: 1 }}>
                                <Title size={TitleSize.Small}>
                                  {totalAmount}
                                </Title>
                              </Layout>
                              <Title size={TitleSize.Small}>USD</Title>
                            </Layout>
                          </Layout>

                          {rates &&
                            walletscurrencies.map((currency) => (
                              <Layout
                                key={currency}
                                // padding={{ top: 1 }}
                                display={Display.Flex}
                                justifyContent={JustifyContent.Between}
                              >
                                <Title size={TitleSize.ExtraSmall} />
                                <Layout display={Display.Flex}>
                                  <Layout margin={{ right: 1 }}>
                                    <Title size={TitleSize.Small}>
                                      {(
                                        getRate(currency) * totalAmount
                                      ).toFixed(8)}
                                    </Title>
                                  </Layout>

                                  <Title size={TitleSize.Small}>
                                    {currency}
                                  </Title>
                                </Layout>
                              </Layout>
                            ))}

                          <Layout margin={{ top: 1 }}>
                            <FormGroup label="Wallet">
                              <Select
                                size={InputSize.Large}
                                defaultValue={
                                  !isEmpty(walletsAmount)
                                    ? walletsAmount[0].id
                                    : ''
                                }
                                id="walletId"
                                name="walletId"
                              >
                                {walletsAmount.map((wallet) => (
                                  <option key={wallet.id} value={wallet.id}>
                                    {wallet.amount.toFixed(8)} {wallet.currency}{' '}
                                    ({niceDec(wallet.amountUsd)})
                                  </option>
                                ))}
                              </Select>
                            </FormGroup>
                          </Layout>

                          <Layout margin={{ top: 1 }}>
                            <FormGroup label="Order Details">
                              <TextArea
                                size={InputSize.Large}
                                placeholder="Enter order details"
                                defaultValue={details}
                                name="details"
                                id="details"
                                rows={5}
                              />
                            </FormGroup>
                          </Layout>

                          {/* walletsAmount */}
                          <Layout padding={1}>
                            <Button
                              fullWidth
                              type="submit"
                              size={ButtonSize.Large}
                              variant={ButtonType.Success}
                            >
                              Checkout
                            </Button>
                          </Layout>
                        </Layout>
                      ),
                    },
                  },
                ]}
              />
            </Layout>
          )}
        </Layout>
      </form>
    </Container>
  );
};

export default OrderCheckoutHtml;
