import {
  AlignItems,
  Button,
  ButtonSize,
  ButtonType,
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
import { isEmpty } from 'lodash';
import { usePathname } from 'next/navigation';
import React from 'react';

import type { WalletOutput } from '@/components/types.generated';

interface CryptoWalletsProps {
  wallets: WalletOutput[];
}

// TODO styling
const CryptoWallets = (props: CryptoWalletsProps) => {
  const { wallets } = props;
  const pathname = usePathname();
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
            justifyContent={JustifyContent.Between}
            alignItems={AlignItems.Center}
            margin={{ bottom: 1 }}
          >
            <Layout padding={{ left: 1 }} display={Display.Flex}>
              <CoreText padding={{ left: 1 }} as="h4">
                {wallet.currency}
              </CoreText>
              <CoreText padding={{ left: 1, right: 1 }} as="h3">
                {wallet.amount.toFixed(8)}
              </CoreText>
            </Layout>

            <Layout style={{ flex: 1 }} display={Display.Flex}>
              {!isEmpty(wallet.address) ? (
                <ComboInput
                  type={InputType.Text}
                  size={InputSize.Large}
                  buttonProps={{
                    children: 'Copy',
                    type: CoreButtonType.Primary,
                    icon: wallet.address ? SVGAsset.Copy : SVGAsset.Refresh,
                  }}
                  defaultValue={wallet.address.id as any}
                  readOnly
                />
              ) : (
                <form method="POST" action="/api/wallet/address/generate">
                  <input type="hidden" name="pathname" value={pathname} />
                  <input
                    type="hidden"
                    name="currency"
                    value={wallet.currency}
                  />
                  <ComboInput
                    type={InputType.Text}
                    size={InputSize.Large}
                    buttonProps={{
                      children: 'Generate address',
                      type: CoreButtonType.Primary,
                      icon: SVGAsset.Refresh,
                    }}
                    defaultValue="address will appear here"
                    readOnly
                  />
                </form>
              )}

              {wallet.address && (
                <Layout padding={{ left: 1 }}>
                  <form method="POST" action="/api/wallet/address/new">
                    <input type="hidden" name="pathname" value={pathname} />
                    <input
                      type="hidden"
                      name="currency"
                      value={wallet.currency}
                    />
                    <Button
                      type={ButtonType.Primary}
                      size={ButtonSize.Large}
                      icon={SVGAsset.Refresh}
                    >
                      New
                    </Button>
                  </form>
                </Layout>
              )}
            </Layout>

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
