import { cookies } from 'next/headers';

import { ApolloWrapper } from '@/lib/apollo-wrapper.client';

import { MnemonicForm } from './mnemonic.form';

export default async function MnemonicPage() {
  const cookieStore = cookies();
  const mnemonic = cookieStore.get('mnemonic')?.value;

  return (
    <ApolloWrapper>
      <MnemonicForm mnemonic={mnemonic as string} />
    </ApolloWrapper>
  );
}
