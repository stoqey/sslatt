import { useQuery } from '@apollo/client';
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
import { get as _get } from 'lodash';
import isEmpty from 'lodash/isEmpty';
import React, { useEffect, useState } from 'react';

import type { FeePrices, WithdrawRequest } from '@/lib/gql';
import { GET_FEE_PRICES } from '@/lib/gql';
import { niceDec } from '@/lib/utils/number';

import type { CreateActionFormProps } from '../actions';
import { useWalletTotalUsd } from '../Wallet/MyWallets';

export function CreateWithdrawForm(
  props: CreateActionFormProps<WithdrawRequest>,
) {
  const { state = {}, setState, save } = props;
  const { data } = useQuery(GET_FEE_PRICES);
  const feePrices: FeePrices = _get(data, 'data', {
    withdrawMin: {
      BTC: 0,
    },
    withdrawFeePerc: 0,
    checkoutFeePerc: 0,
  });

  const [errors, setErrors] = useState({
    amount: '',
    receiver: '',
  });

  const { amount: amountError, receiver: receiverError } = errors;
  const setAmountError = (amtE: string) =>
    setErrors({ ...errors, amount: amtE });

  const { walletsAmount: wallets } = useWalletTotalUsd();

  const handleChange = (field: string) => {
    return (val: any) => {
      setState({ ...state, [field]: val });
    };
  };

  useEffect(() => {
    if (!isEmpty(wallets) && isEmpty(state.walletId)) {
      setState({
        ...state,
        walletId: _get(wallets, '[0].id'),
        currency: _get(wallets, '[0].currency'),
      });
    }
  }, [wallets]);

  const { amount = 0, walletId = '', receiver = '', currency } = state;

  const walletBalance = (
    wallets?.find((w) => w.id === walletId)?.amount || 0
  ).toFixed(8);

  const withdrawFeePerc = feePrices.withdrawFeePerc || 0;
  const withdrawFee = (withdrawFeePerc / 100) * amount;
  const netTotal = amount - withdrawFee;

  const withdrawMinCur = feePrices.withdrawMin[state.currency];
  const withdrawMinCurFeeMin = (withdrawFeePerc / 100) * withdrawMinCur;
  const withdrawMin = (withdrawMinCurFeeMin + withdrawMinCur).toFixed(8);

  return (
    <Layout margin={{ top: 2 }}>
      <FormGroup label="Wallet">
        {/* Select wallet */}
        <Select
          defaultValue={!isEmpty(wallets) ? wallets[0].id : ''}
          value={walletId}
          id="wallet"
          name="wallet"
          onChange={(e: any) => {
            const newWallet = e.target.value as any;
            const wallet = wallets?.find((w) => w.id === e.target.value);
            const newCurrency = wallet ? wallet.currency : null;
            setState({
              ...state,
              walletId: newWallet,
              currency: newCurrency,
            });
          }}
        >
          {wallets.map((wallet) => (
            <option key={wallet.id} value={wallet.id}>
              {wallet.amount.toFixed(8)} {wallet.currency} (
              {niceDec(wallet.amountUsd)})
            </option>
          ))}
        </Select>
      </FormGroup>

      <FormGroup label="Amount" error={amountError}>
        <Input
          size={InputSize.Large}
          type={InputType.Number}
          name="amount"
          min={withdrawMin}
          max={walletBalance as any}
          value={amount as any}
          onChange={(e: any) => {
            const requestedAmount = +e.target.value as any;
            let amtE = '';

            const wthdrwMinCur = feePrices.withdrawMin[state.currency];
            const wthdrwMinCurFeeMin =
              (feePrices.withdrawFeePerc / 100) * wthdrwMinCur;
            const wthdrwMin = (wthdrwMinCurFeeMin + wthdrwMinCur).toFixed(8);

            if (requestedAmount < wthdrwMin) {
              amtE = `Min amount is ${wthdrwMin}`;
            }

            if (requestedAmount > walletBalance) {
              amtE = `Max amount is ${walletBalance}`;
            }
            setAmountError(amtE);
            setState({ ...state, amount: requestedAmount });
          }}
        />
      </FormGroup>

      {/* TODO Type crypto */}
      {/* receiver */}
      <FormGroup label="Address (receiver)" error={receiverError}>
        <Input
          size={InputSize.Large}
          type={InputType.Text}
          name="receiver"
          value={receiver}
          onChange={(e: any) => {
            const receiv: any = e.target.value;
            let receiverErr = '';

            // TODO how many
            if (receiv.length < 5) {
              receiverErr = 'Not a valid address';
            }

            setErrors({ ...errors, receiver: receiverErr });
            handleChange('receiver')(receiv);
          }}
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
