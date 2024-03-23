import { isEmpty } from 'lodash';
import { cookies } from 'next/headers';

import { ApolloWrapper } from '@/lib/apollo-wrapper.client';

import PgpSettingPage from '../pgp';

const verifyPgpPage = async () => {
  const cookieStore = cookies();

  const publicKey = cookieStore.get('publicKey')?.value;
  const oldPublicKey = cookieStore.get('oldPublicKey')?.value;
  const newPublicKey = cookieStore.get('newPublicKey')?.value;

  const encryptedCode = cookieStore.get('encryptedCode')?.value;
  const codeId = cookieStore.get('codeId')?.value;
  const newEncryptedCode = cookieStore.get('newEncryptedCode')?.value;
  const newCodeId = cookieStore.get('newCodeId')?.value;

  const verified = cookieStore.get('verified')?.value === 'true';
  const message = cookieStore.get('message')?.value;
  const success = cookieStore.get('success')?.value === 'true';

  const props = {
    publicKey: verified ? oldPublicKey : publicKey,
    newPublicKey,
    verified,
    encryptedCode,
    codeId,
    newEncryptedCode,
    newCodeId,
    message,
    success,
  };

  const isNotValidRequest = isEmpty(publicKey);

  return (
    <ApolloWrapper>
      {isNotValidRequest && (
        <noscript>
          <meta httpEquiv="refresh" content="0; url=/html/settings/pgp" />
        </noscript>
      )}
      <PgpSettingPage {...props} />;
    </ApolloWrapper>
  );
};

export default verifyPgpPage;
