'use server';

import { awaitTo } from '@stoqey/client-graphql';
import { addMinutes, addSeconds } from 'date-fns';
import _get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { cookies } from 'next/headers';
import { type NextRequest } from 'next/server';

import type { PgpPublicKey, ResType } from '@/components/types.generated';
import { getClient } from '@/lib/apollo-wrapper.server';
import { ADD_NEW_KEY_MUTATION } from '@/lib/gql/auth';
import { GET_PGP_KEY } from '@/lib/gql/auth/auth.query';

export async function GET() {
  const res = new Response(null, {
    headers: {
      // 'Set-Cookie': 'refresh=true; path=/; HttpOnly; SameSite=Strict; Secure',
      Refresh: '0; url=/html/settings/pgp/add',
    },
  });

  return res;
}

export async function POST(req: NextRequest) {
  const in3Secs = addSeconds(new Date(), 5);
  const in3Min = addMinutes(new Date(), 3);
  const in3SecsStr = in3Secs.toUTCString();

  try {
    const [, pgpKey] = await awaitTo(
      getClient().query<{ data: PgpPublicKey }>({
        query: GET_PGP_KEY,
      }),
    );

    const verified = _get(pgpKey, 'data.data.verified', false);

    const formData = await req.formData();
    const cookieStore = cookies();

    const publicKey = formData.get('publicKey');
    // console.log("publicKey", { publicKey, pgpKey, verified });

    if (!verified && isEmpty(publicKey)) {
      throw new Error('No public key provided');
    }

    const newPublicKey = formData.get('newPublicKey');
    if (verified && isEmpty(newPublicKey)) {
      throw new Error('No new public key provided');
    }

    // console.log("add pgp key", {
    //   verified,
    //   publicKey,
    //   newPublicKey
    // })

    const data = await getClient().mutate<{ data: ResType }>({
      mutation: ADD_NEW_KEY_MUTATION,
      variables: {
        publicKey: verified ? newPublicKey : publicKey,
      },
    });

    const dataRes: any = data.data?.data;
    const message = dataRes?.message;

    // console.log("dataRes", dataRes);

    if (dataRes?.success) {
      cookieStore.set('verified', `${verified}`, { expires: in3Min });
      cookieStore.set('success', 'true', { expires: in3Min });
      cookieStore.set(
        'message',
        `Added public key, please confirm code${verified ? 's' : ''}`,
        { expires: in3Min },
      );

      if (verified) {
        const oldPublicKey = _get(dataRes, 'data.oldPublicKey.key', '');
        const newPublicKeyX = _get(dataRes, 'data.newPublicKey.key', '');
        const oldEncryptedCode = _get(dataRes, 'data.oldEncryptedCode', '');
        const oldCodeId = _get(dataRes, 'data.oldCodeId', '');
        const newEncryptedCode = _get(dataRes, 'data.newEncryptedCode', '');
        const newCodeId = _get(dataRes, 'data.newCodeId', '');

        cookieStore.set('oldPublicKey', oldPublicKey, { expires: in3Min });
        cookieStore.set('newPublicKey', newPublicKeyX, { expires: in3Min });

        cookieStore.set('encryptedCode', oldEncryptedCode, { expires: in3Min });
        cookieStore.set('codeId', oldCodeId, { expires: in3Min });

        cookieStore.set('newEncryptedCode', newEncryptedCode, {
          expires: in3Min,
        });
        cookieStore.set('newCodeId', newCodeId, { expires: in3Min });
      } else {
        const currentPublicKey = _get(dataRes, 'data.publicKey.key', '');
        const encryptedCode = _get(dataRes, 'data.encryptedCode', '');
        const codeId = _get(dataRes, 'data.codeId', '');

        cookieStore.set('publicKey', currentPublicKey, { expires: in3Min });
        cookieStore.set('encryptedCode', encryptedCode, { expires: in3Min });
        cookieStore.set('codeId', codeId, { expires: in3Min });
      }
    } else if (message) {
      throw new Error(message);
    } else {
      throw new Error('Failed to add public key');
    }

    const res = new Response(null, {
      headers: {
        Refresh: '0; url=/html/settings/pgp/verify',
      },
    });

    return res;
  } catch (error: any) {
    console.error(error);
    const message = (error && error?.message) || `Failed to add pgp key`;
    const res = new Response(null, {
      headers: {
        Refresh: `0; url=/html/settings/pgp`,
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
