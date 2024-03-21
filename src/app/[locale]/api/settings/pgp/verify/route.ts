'use server';

import { addSeconds } from 'date-fns';
import { cookies } from 'next/headers';
import { type NextRequest } from 'next/server';

import type { ResType } from '@/components/types.generated';
import { getClient } from '@/lib/apollo-wrapper.server';
import { VERIFY_NEW_KEY_MUTATION } from '@/lib/gql/auth';

export async function GET() {
  const res = new Response(null, {
    headers: {
      // 'Set-Cookie': 'refresh=true; path=/; HttpOnly; SameSite=Strict; Secure',
      Refresh: '0; url=/html/settings/pgp/verify',
    },
  });

  return res;
}

export async function POST(req: NextRequest) {
  const in3Secs = addSeconds(new Date(), 5);
  const in3SecsStr = in3Secs.toUTCString();

  try {
    const formData = await req.formData();
    const cookieStore = cookies();

    const verified = false; // get key some verified

    const confirmCode = formData.get('confirmCode');
    const codeId = formData.get('codeId');
    const newConfirmCode = formData.get('newConfirmCode');
    const newCodeId = formData.get('newCodeId');

    // console.log("verify pgp", {
    //   confirmCode,
    //   newConfirmCode,
    //   codeId,
    //   newCodeId
    // })

    const variables: any = {
      codeId,
      confirmCode,
    };

    if (verified) {
      variables.newCodeId = newCodeId;
      variables.newConfirmCode = newConfirmCode;
    }

    const data = await getClient().mutate<{ data: ResType }>({
      mutation: VERIFY_NEW_KEY_MUTATION,
      variables,
    });

    const dataRes = data.data?.data;
    const message = dataRes?.message;

    if (dataRes?.success) {
      cookieStore.delete('codeId');
      cookieStore.delete('newCodeId');
      cookieStore.delete('confirmCode');
      cookieStore.delete('newConfirmCode');
      cookieStore.delete('encryptedCode');
      cookieStore.delete('newEncryptedCode');
      cookieStore.delete('publicKey');
      cookieStore.delete('newPublicKey');

      cookieStore.set('success', 'true', { expires: in3Secs });
      cookieStore.set(
        'message',
        `Successfully ${verified ? 'replaced' : 'added'} public key`,
        { expires: in3Secs },
      );
    } else if (message) {
      throw new Error(message);
    } else {
      throw new Error('Failed to verify pgp key');
    }

    const res = new Response(null, {
      headers: {
        Refresh: '0; url=/html/settings/pgp',
      },
    });

    return res;
  } catch (error: any) {
    console.error(error);
    const message = (error && error?.message) || `Failed to verify pgp key`;
    const res = new Response(null, {
      headers: {
        Refresh: `0; url=/html/settings/pgp/verify`,
        'Set-Cookie': `message=${message}; path=/; expires=${in3SecsStr}`,
      },
    });

    res.headers.append(
      'Set-Cookie',
      `success=false; path=/; expires=${in3SecsStr}`,
    );
    return res;
  }
}
