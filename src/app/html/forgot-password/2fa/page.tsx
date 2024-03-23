import { cookies } from 'next/headers';

import { ApolloWrapper } from '@/lib/apollo-wrapper.client';

import ForgotPwPage from '../forgot-password';

export default async function ForgotPw2FApage() {
  const cookieStore = cookies();
  const success = cookieStore.get('success')?.value === 'true';
  const message = cookieStore.get('message')?.value;
  const userId = cookieStore.get('userId')?.value;
  const encryptedCode = cookieStore.get('encryptedCode')?.value;
  const codeId = cookieStore.get('codeId')?.value;
  const useMnemonic = cookieStore.get('useMnemonic')?.value === 'true';

  return (
    <ApolloWrapper>
      <ForgotPwPage
        success={success}
        userId={userId}
        useMnemonic={useMnemonic}
        encryptedCode={encryptedCode}
        codeId={codeId}
        message={message}
        verified={false}
      />
    </ApolloWrapper>
  );
}
