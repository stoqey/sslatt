'use server';

import { cookies } from 'next/headers';

const knownCookieNames = [
  'userId',
  'codeId',
  'refresh',
  'confirmCode',
  'encryptedCode',
  'newEncryptedCode',
  'mnemonic',
  'newPassword',
  'newPasswordRepeat',
  'useMnemonic',
  'mnemonic',
  'publicKey',
  'newPublicKey',
  'oldPublicKey',

  'accessToken',
  'refreshToken',
  'username',

  'message',
  'success',
];

export async function GET() {
  const cookieStore = cookies();
  // clear all cookies
  knownCookieNames.forEach((cookieName) => {
    cookieStore.delete(cookieName);
  });

  const res = new Response(null, {
    headers: {
      Refresh: '0; url=/html/login',
    },
  });

  return res;
}
