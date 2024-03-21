import { useMutation, useQuery } from '@apollo/client';
import {
  GENERATE_WALLET_ADDRESS_MUTATION,
  MY_WALLET_QUERY,
  TRANSACTIONS_QUERY,
} from '@roadmanjs/wallet-client';
import {
  AlignItems,
  Button,
  ButtonSize,
  ComboInput,
  CoreButtonType,
  CoreText,
  Display,
  FlexDirection,
  InputSize,
  InputType,
  JustifyContent,
  Layout,
  SVGAsset,
} from '@uuixjs/uuixweb';
import { BorderRadius } from '@uuixjs/uuixweb-lib';
import React, { useEffect } from 'react';

import { currencies } from './MyWallets';

// TODO proper styling, proper config

interface AddMoneyDialogProps {
  amount: number;
  isOpen: boolean;
  onClose: () => void;
}

interface AddMoneyProps {
  amount: number;
  isOpen: boolean;
  setAmount: (amount: number) => void;
  onClose: () => void;
}

interface Props {
  setCurrency: (currency: string) => void;
}

// TODO styling
const CryptoWallets = ({ setCurrency }: Props) => {
  const walletscurrencies = currencies.slice(1, currencies.length); // BTC, XMR

  // const wallets = useWallets(currencies.slice(1, currencies.length), true);
  // const { amount, isOpen, setAmount, onClose } = props;

  const { data, refetch, loading } = useQuery(MY_WALLET_QUERY, {
    variables: { currency: walletscurrencies, createNew: true },
  });

  const { data: dataTransactions } = useQuery(TRANSACTIONS_QUERY, {
    variables: { filters: 'currency=BTC' },
  });

  console.log('dataTransactions', dataTransactions);

  const [generateAddress, { data: generateAddressData }] = useMutation(
    GENERATE_WALLET_ADDRESS_MUTATION,
  );

  useEffect(() => {
    if (!generateAddressData) return;
    refetch();
  }, [generateAddressData]);

  const wallets = (data && data.data) || [];

  console.log('generated address', generateAddressData);

  // const isAboveMinimum = props.amount >= 8;

  return (
    <Layout
      display={Display.Flex}
      flexDirection={FlexDirection.Column}
      padding={1}
    >
      <Layout fullWidth>
        {wallets.map((wallet) => (
          <Layout
            border={BorderRadius.Rounded}
            key={wallet.currency}
            display={Display.Flex}
            padding={1}
            justifyContent={JustifyContent.Center}
            alignItems={AlignItems.Center}
          >
            <CoreText padding={{ left: 1 }} as="h4">
              {wallet.currency}
            </CoreText>
            <CoreText padding={{ left: 1, right: 1 }} as="h3">
              {wallet.amount.toFixed(8)}
            </CoreText>

            <ComboInput
              type={InputType.Text}
              size={InputSize.Large}
              // buttonProps={{ children: "Copy", type: CoreButtonType.Primary, icon: SVGAsset.Copy }}
              buttonProps={{
                children: wallet.address ? 'Copy' : 'Generate address',
                type: CoreButtonType.Primary,
                icon: wallet.address ? SVGAsset.Copy : SVGAsset.Refresh,
                onClick: () => {
                  if (!wallet.address) {
                    // TODO generate address
                    console.log('generate address');
                    return generateAddress({
                      variables: {
                        currency: wallet.currency,
                        forceGenerate: true,
                      },
                    });
                  }
                  navigator.clipboard.writeText(wallet.address.id);
                },
              }}
              value={wallet.address ? wallet.address.id : 'Generate address'}
              disabled={!wallet.address}
            />

            {wallet.address && (
              <Layout padding={{ left: 1 }}>
                <Button
                  disabled
                  size={ButtonSize.Large}
                  icon={SVGAsset.Refresh}
                >
                  New
                </Button>
              </Layout>
            )}

            {/* <Layout padding={{ left: 2 }}>
              <Button onClick={() => setCurrency(wallet.currency)}>Transactions</Button>
            </Layout> */}
          </Layout>
        ))}
      </Layout>
    </Layout>
  );
};

export default CryptoWallets;
