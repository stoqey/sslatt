'use server';

import awaitTo from '@stoqey/client-graphql/dist/utils/awaitTo';
import { addSeconds } from 'date-fns';
import isEmpty from 'lodash/isEmpty';
import { cookies } from 'next/headers';
import { type NextRequest } from 'next/server';

import type { ForgotPasswordResponse } from '@/components/types.generated';
import { getClient } from '@/lib/apollo-wrapper.server';
import { FORGOT_PW_MUTATION } from '@/lib/gql/auth';
import { isAuth } from '@/middlewares';

export async function GET() {
  console.log('get forgot password api');

  const res = new Response(null, {
    headers: {
      // 'Set-Cookie': 'refresh=true; path=/; HttpOnly; SameSite=Strict; Secure',
      Refresh: '0; url=/html/forgot-password',
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

    const username = formData.get('username');

    const _csrf = formData.get('_csrf') as string;
    if (isEmpty(_csrf)) throw new Error('Invalid, please try again');

    const [errorCsrf, csrf] = await awaitTo(isAuth(_csrf));
    if (errorCsrf) throw new Error('Invalid, please try again');
    if (!csrf) throw new Error('Invalid, please try again');

    console.log('forgot password api args', {
      _csrf,
      username,
    });

    const data = await getClient().mutate<{ data: ForgotPasswordResponse }>({
      mutation: FORGOT_PW_MUTATION,
      variables: {
        username,
      },
    });

    console.error('forgot password api data', data);

    const dataRes = data.data?.data;
    const success = dataRes?.success;
    const message = dataRes?.message;

    const auth2 = dataRes?.auth2 || false;

    if (success) {
      const userId = dataRes.userId as string;
      cookieStore.set('userId', userId);

      if (auth2) {
        const { encryptedCode } = dataRes;
        const { codeId } = dataRes;

        cookieStore.set('encryptedCode', encryptedCode as string);
        cookieStore.set('codeId', codeId as string);

        const res = new Response(null, {
          headers: {
            Refresh: `0; url=/html/forgot-password/2fa`,
          },
        });
        return res;
      }

      const { useMnemonic } = dataRes;
      cookieStore.set('useMnemonic', `${useMnemonic}`);

      const res = new Response(null, {
        headers: {
          Refresh: `0; url=/html/forgot-password/2fa`,
        },
      });
      return res;
    }
    if (message) {
      throw new Error(message);
    } else {
      throw new Error('Failed to reset password');
    }
  } catch (error: any) {
    console.error(error);
    const message = (error && error?.message) || `Failed to reset password`;
    const res = new Response(null, {
      headers: {
        Refresh: `0; url=/html/forgot-password`,
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
