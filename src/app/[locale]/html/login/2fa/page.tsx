import { cookies } from 'next/headers';

import { ApolloWrapper } from '@/lib/apollo-wrapper.client';

import { LoginForm2FA } from './2fa.form';

export default async function Auth2FApage() {
  const cookieStore = cookies();
  const message = cookieStore.get('message')?.value;
  const encryptedCode = cookieStore.get('encryptedCode')?.value;
  const codeId = cookieStore.get('codeId')?.value;

  return (
    <ApolloWrapper>
      <LoginForm2FA
        encryptedCode={encryptedCode}
        codeId={codeId}
        message={message}
      />
    </ApolloWrapper>
  );
}
