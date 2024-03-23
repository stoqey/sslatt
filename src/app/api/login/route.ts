'use server';

import awaitTo from '@stoqey/client-graphql/dist/utils/awaitTo';
import { addSeconds } from 'date-fns';
import isEmpty from 'lodash/isEmpty';
import { cookies } from 'next/headers';
import { type NextRequest } from 'next/server';

import type { LoginResponse } from '@/components/types.generated';
import { getClient } from '@/lib/apollo-wrapper.server';
import { LOGIN_MUTATION } from '@/lib/gql/auth';
import { isAuth } from '@/middlewares';

export async function GET() {
  console.log('get login api');

  const res = new Response(null, {
    headers: {
      // 'Set-Cookie': 'refresh=true; path=/; HttpOnly; SameSite=Strict; Secure',
      Refresh: '0; url=/html/login',
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
    const password = formData.get('password');

    // eslint-disable-next-line no-underscore-dangle, @typescript-eslint/naming-convention
    const _csrf = formData.get('_csrf') as string;
    if (isEmpty(_csrf)) throw new Error('Invalid, please try again');

    const [errorCsrf, csrf] = await awaitTo(isAuth(_csrf));
    if (errorCsrf) throw new Error('Invalid, please try again');
    if (!csrf) throw new Error('Invalid, please try again');

    console.log('login api args', {
      csrf,
      username,
      password,
    });

    const data = await getClient().mutate<{ data: LoginResponse }>({
      mutation: LOGIN_MUTATION,
      variables: {
        username,
        password,
      },
    });

    console.error('login api data', data);

    const dataRes = data.data?.data;
    const success = dataRes?.success;
    const message = dataRes?.message;

    const auth2 = dataRes?.auth2 || false;

    if (success) {
      if (auth2) {
        const { encryptedCode } = dataRes;
        const { codeId } = dataRes;
        cookieStore.set('encryptedCode', encryptedCode as string);
        cookieStore.set('codeId', codeId as string);

        const res = new Response(null, {
          headers: {
            Refresh: `0; url=/html/login/2fa`,
          },
        });
        return res;
      }

      // no 2FA
      const accessToken = dataRes?.accessToken;
      const refreshToken = dataRes?.refreshToken;
      cookieStore.set('accessToken', accessToken as string);
      cookieStore.set('refreshToken', refreshToken as string);
      const res = new Response(null, {
        headers: {
          // 'Set-Cookie': 'refresh=true; path=/; HttpOnly; SameSite=Strict; Secure',
          Refresh: '0; url=/html/',
        },
      });
      return res;
    }
    if (message) {
      throw new Error(message);
    } else {
      throw new Error('Failed to login');
    }
  } catch (error: any) {
    console.error(error);
    const message = (error && error?.message) || `Failed to login`;
    const res = new Response(null, {
      headers: {
        Refresh: `0; url=/html/login`,
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
