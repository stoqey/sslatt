/* eslint-disable no-nested-ternary */
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import type { BtcpayserverRate } from '@roadmanjs/wallet-client';
import { FETCH_RATES_QUERY } from '@roadmanjs/wallet-client';
import type { ColumnValues } from '@uuixjs/uuixweb';
import {
  Accordion,
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
  LoadingButton,
  LoadingStatus,
  Select,
  SVGAsset,
  TextArea,
  Title,
  TitleSize,
} from '@uuixjs/uuixweb';
import { endsWith, get as _get, sumBy } from 'lodash';
import isEmpty from 'lodash/isEmpty';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { Container } from '@/components/container';
import { walletscurrenciesSSr } from '@/lib/const';
import type { AdsListingType, FeePrices } from '@/lib/gql';
import { CHECKOUT_ORDER, GET_AD_LISTING, GET_FEE_PRICES } from '@/lib/gql';
import { niceDec } from '@/lib/utils/number';

import { parseAdItem } from '../../components/AdLists/ads.item';
import { useWalletTotalUsd } from '../Wallet/MyWallets';

interface State {
  walletId: string;
  details: string;
  quantity: number;
}
/**
 * order/checkout/new?type=ad&ad=ad_id
 * order/checkout/id finalize
 * @returns
 */
const OrderCheckout = () => {
  const router = useRouter();
  const { push } = router;
  const { slug } = useParams();
  const query = useSearchParams();
  const qtyQuery = +(query.get('qty') || 0);
  const orderType = query.get('type') || '';
  const orderTypeId = query.get('typeId') || '';

  const isNew = slug === 'new';

  const [state, setState] = useState<State>({
    walletId: '',
    details: '',
    quantity: +qtyQuery || 1,
  });

  const { data: dataFeePrices } = useQuery(GET_FEE_PRICES);
  const feePrices: FeePrices = _get(dataFeePrices, 'data', {
    withdrawMin: {
      BTC: 0,
    },
    withdrawFeePerc: 0,
    checkoutFeePerc: 0,
  });

  const { walletsAmount } = useWalletTotalUsd();

  const [fetchRatesApi, { data: ratesData }] = useLazyQuery<{
    data: BtcpayserverRate[];
  }>(FETCH_RATES_QUERY, {
    fetchPolicy: 'network-only',
  });

  const [getAdListing, { loading = true, data: adItemData, called }] =
    useLazyQuery<{
      data: AdsListingType;
    }>(GET_AD_LISTING, {
      fetchPolicy: 'network-only',
    });

  const [checkoutOrder, { loading: loadingCheckoutOrder, data }] =
    useMutation(CHECKOUT_ORDER);

  const submit = async () => {
    const variables = {
      walletId: !isEmpty(state.walletId)
        ? state.walletId
        : !isEmpty(walletsAmount)
          ? walletsAmount[0].id
          : '',
      order: {
        details: state.details,
        typeId: orderTypeId,
        type: orderType,
      },
    };

    await checkoutOrder({
      variables,
    });
  };

  const rates = ratesData?.data;
  const createdOrder = _get(data, 'data.success');
  const message = _get(data, 'data.message');

  useEffect(() => {
    if (typeof createdOrder === 'boolean') {
      const closeTimeout = setTimeout(() => {
        if (createdOrder) {
          toast.success(`Order successfully created.`);
          push('/order');
        } else {
          toast.error(message);
        }
      }, 1000);
      return () => clearTimeout(closeTimeout);
    }
  }, [createdOrder]);

  useEffect(() => {
    if (!isEmpty(orderTypeId) && !called) {
      getAdListing({ variables: { id: orderTypeId } });
    }
  }, [orderTypeId]);

  useEffect(() => {
    if (adItemData && adItemData.data && !rates) {
      fetchRatesApi({
        variables: { pairs: 'USD_BTC' },
      });
    }
  }, [adItemData]);

  const orderSummary = [];

  if (adItemData && adItemData.data) {
    const price = adItemData.data.price * state.quantity;

    orderSummary.push({
      name: 'Price',
      label: (
        <Layout display={Display.Flex} margin={{ top: 1 }}>
          <Layout margin={{ right: 1 }}>
            <Title size={TitleSize.Small}>{adItemData.data.price}</Title>
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
    const rate = ratesData?.data.find((rat) => endsWith(rat.pair, currency));
    return rate?.rate;
  };

  const ad =
    adItemData && adItemData.data ? parseAdItem(adItemData.data as any) : null;

  const cols: ColumnValues = { default: 12, sm: 12, lg: 6, md: 6 };
  const colsSm: ColumnValues = { default: 10, sm: 10, lg: 6, md: 6 };

  return (
    <Container>
      {/* Checkout */}
      {/* <Title size={TitleSize.Default}>Checkout</Title> */}
      <Layout
        padding={1}
        display={Display.Flex}
        flexDirection={FlexDirection.Column}
      >
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
                        {[orderSummary[0]].map((os, i) => (
                          <Layout
                            key={os.name}
                            display={Display.Flex}
                            justifyContent={JustifyContent.Between}
                          >
                            <Title size={TitleSize.ExtraSmall}>{os.name}</Title>
                            {os.label}
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
                                value={state.quantity}
                                onChange={(e: any) =>
                                  setState({
                                    ...state,
                                    quantity: e.target.value,
                                  })
                                }
                              />
                            </Layout>
                          </Layout>
                        </Layout>

                        {/* Fee */}
                        {[orderSummary[1]].map((os, i) => (
                          <Layout
                            key={os.name}
                            display={Display.Flex}
                            padding={{ top: 1 }}
                            justifyContent={JustifyContent.Between}
                          >
                            <Title size={TitleSize.ExtraSmall}>{os.name}</Title>
                            {os.label}
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
                          walletscurrenciesSSr().map((currency) => (
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
                                    {(getRate(currency) * totalAmount).toFixed(
                                      8,
                                    )}
                                  </Title>
                                </Layout>

                                <Title size={TitleSize.Small}>{currency}</Title>
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
                              value={state.walletId}
                              id="wallet"
                              onChange={(e: any) =>
                                setState({ ...state, walletId: e.target.value })
                              }
                            >
                              {walletsAmount.map((wallet) => (
                                <option key={wallet.id} value={wallet.id}>
                                  {wallet.amount.toFixed(8)} {wallet.currency} (
                                  {niceDec(wallet.amountUsd)})
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
                              value={state.details}
                              id="details"
                              onChange={(e: any) =>
                                setState({ ...state, details: e.target.value })
                              }
                              rows={5}
                            />
                          </FormGroup>
                        </Layout>

                        {/* walletsAmount */}
                        <Layout padding={1}>
                          <LoadingButton
                            fullWidth
                            size={ButtonSize.Large}
                            variant={ButtonType.Success}
                            onClick={() => submit()}
                            loadingStatus={
                              loadingCheckoutOrder
                                ? LoadingStatus.Loading
                                : LoadingStatus.Default
                            }
                          >
                            Checkout
                          </LoadingButton>
                        </Layout>
                      </Layout>
                    ),
                  },
                },
              ]}
            />
          </Layout>
        )}
        {/* form */}
        {/* <FormGroup label="XXX">
              <ComboInput
                size={InputSize.Large}
                type={InputType.Text}
                buttonProps={{ children: "Save" }}
              />
            </FormGroup> */}
        {/* form actions */}
      </Layout>
    </Container>
  );
};

export default OrderCheckout;
