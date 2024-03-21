'use client';

import {
  Display,
  FormGroup,
  Input,
  InputSize,
  InputType,
  JustifyContent,
  Layout,
  Select,
  Title,
  TitleSize,
} from '@uuixjs/uuixweb';
import isEmpty from 'lodash/isEmpty';
import React from 'react';

import type {
  FeePrices,
  PairRate,
  WalletOutput,
  WithdrawRequestOutput,
} from '@/components/types.generated';
import { niceDec } from '@/lib/utils/number';

import type { CreateActionHtmlProps } from '../actions.html';
import { useWalletTotalUsdHtml } from '../Wallet/MyWallets.html';

export interface CreateWithdrawFormProps {
  feePrices?: FeePrices;
  wallets: WalletOutput[];
  rates: PairRate[];
  amount: number;
  receiver?: string;
}

export function CreateWithdrawForm(
  props: CreateActionHtmlProps<WithdrawRequestOutput> & CreateWithdrawFormProps,
) {
  const {
    rates = [],
    amount = 0,
    receiver = '',
    message,
    success,
    submitLink,
    backLink,
  } = props;

  // console.log("CreateWithdrawForm", props);

  if (isEmpty(props.wallets)) return undefined;

  // TODO Wallet select
  const wallet = props.wallets[0];
  const walletId = wallet.id;
  const currency: any = wallet.currency || '';

  const feePrices: FeePrices = props.feePrices || {
    withdrawMin: {
      BTC: 0,
    },
    withdrawFeePerc: 0,
    checkoutFeePerc: 0,
  };

  const { walletsAmount: wallets } = useWalletTotalUsdHtml({
    wallets: props.wallets,
    rates,
  });

  const walletBalance = (
    wallets?.find((w) => w.id === walletId)?.amount || 0
  ).toFixed(8);

  const withdrawFeePerc = feePrices.withdrawFeePerc || 0;
  const withdrawFee = (withdrawFeePerc / 100) * amount;
  const netTotal = amount - withdrawFee;

  const withdrawMinCur = (feePrices.withdrawMin as any)[currency];
  const withdrawMinCurFeeMin = (withdrawFeePerc / 100) * withdrawMinCur;
  const withdrawMin = (withdrawMinCurFeeMin + withdrawMinCur).toFixed(8);

  return (
    <Layout margin={{ top: 2 }}>
      <input type="hidden" name="useCookies" value="true" />
      <input type="hidden" name="actionPath" value="wallet/withdraw" />
      <input type="hidden" name="currency" value={currency} />
      <FormGroup label="Wallet">
        {/* Select wallet */}
        <Select defaultValue={walletId as any} id="wallet" name="wallet">
          {wallets.map((wallet) => (
            <option key={wallet.id} value={wallet.id}>
              {wallet.amount.toFixed(8)} {wallet.currency} (
              {niceDec(wallet.amountUsd)})
            </option>
          ))}
        </Select>
      </FormGroup>

      <FormGroup label="Amount">
        <Input
          size={InputSize.Large}
          type={InputType.Number}
          name="amount"
          defaultValue={amount as any}
          min={withdrawMin}
          max={walletBalance as any}
        />
      </FormGroup>

      {/* TODO Type crypto */}
      {/* receiver */}
      <FormGroup label="Address (receiver)">
        <Input
          size={InputSize.Large}
          type={InputType.Text}
          name="receiver"
          defaultValue={receiver as any}
        />
      </FormGroup>

      <Layout
        fullWidth
        padding={{ top: 1 }}
        display={Display.Flex}
        justifyContent={JustifyContent.Between}
      >
        <Title size={TitleSize.ExtraSmall}>Fee</Title>
        <Layout display={Display.Flex}>
          <Layout margin={{ right: 2 }} display={Display.Flex}>
            <Title size={TitleSize.Small}>{withdrawFee.toFixed(8)}</Title>
          </Layout>
          <Title
            size={TitleSize.Small}
          >{`${feePrices.withdrawFeePerc}%`}</Title>
        </Layout>
      </Layout>

      <Layout
        fullWidth
        padding={{ top: 1 }}
        display={Display.Flex}
        justifyContent={JustifyContent.Between}
      >
        <Title size={TitleSize.ExtraSmall}>Net Total</Title>
        <Layout display={Display.Flex}>
          <Layout margin={{ right: 1 }}>
            <Title size={TitleSize.Small}>{netTotal.toFixed(8)}</Title>
          </Layout>
          <Title size={TitleSize.Small}>{currency}</Title>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default CreateWithdrawForm;
