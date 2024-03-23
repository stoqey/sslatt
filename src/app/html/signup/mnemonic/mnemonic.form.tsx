'use client';

import {
  AlertBanner,
  AlertBannerType,
  AlignItems,
  Button,
  ButtonSize,
  ButtonType,
  CoreText,
  Display,
  FlexDirection,
  JustifyContent,
  Layout,
  Pill,
  PillType,
  Title,
} from '@uuixjs/uuixweb';
import Link from 'next/link';

import { Container } from '@/components/container';

interface MnemonicProps {
  mnemonic: string;
}

export function MnemonicForm(args: MnemonicProps) {
  const { mnemonic } = args;

  return (
    <Container>
      <Layout
        fullWidth
        display={Display.Flex}
        flexDirection={FlexDirection.Column}
        alignItems={AlignItems.Center}
        justifyContent={JustifyContent.Center}
      >
        <Layout margin={{ bottom: 1, top: 1 }}>
          <Title>Mnemonic key</Title>
        </Layout>

        <AlertBanner
          type={AlertBannerType.Info}
          status="Please copy your mnemonic key and keep it safe. You will need it to
        recover your account. This page will be displayed only once."
          message=""
        />

        {/* Some text about copy */}
        <Layout margin={{ top: 3, bottom: 2 }}>
          <Pill
            type={PillType.New}
            label={mnemonic}
            style={{ fontSize: '20px' }}
          />
        </Layout>

        <Layout>
          <CoreText as="h5" style={{ opacity: 0.7, textAlign: 'center' }}>
            Remember that the login page will never ask for your mnemonic key.
            Be careful. If you lose your 2FA private key and your mnemonic key,
            you will lose access to your account
          </CoreText>
        </Layout>

        <Layout margin={{ top: 1 }}>
          <Link href="/html">
            <Button
              fullWidth
              size={ButtonSize.Large}
              variant={ButtonType.Primary}
            >
              Continue
            </Button>
          </Link>
        </Layout>
      </Layout>
    </Container>
  );
}
