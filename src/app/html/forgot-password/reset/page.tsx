import { cookies } from 'next/headers';

import { ApolloWrapper } from '@/lib/apollo-wrapper.client';

import ForgotPwPage from '../forgot-password';

export default async function ForgotPw2FApage() {
  const cookieStore = cookies();

  const success = cookieStore.get('success')?.value === 'true';
  const message = cookieStore.get('message')?.value;
  const userId = cookieStore.get('userId')?.value;
  const codeId = cookieStore.get('codeId')?.value;
  const useMnemonic = cookieStore.get('useMnemonic')?.value === 'true';
  const mnemonic = cookieStore.get('mnemonic')?.value;
  const confirmCode = cookieStore.get('confirmCode')?.value;

  return (
    <ApolloWrapper>
      <ForgotPwPage
        success={success}
        userId={userId}
        confirmCode={confirmCode}
        mnemonic={mnemonic}
        verified
        useMnemonic={useMnemonic}
        codeId={codeId}
        message={message}
      />
    </ApolloWrapper>
  );
}
