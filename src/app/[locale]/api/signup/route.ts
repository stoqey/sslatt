'use server';

import { awaitTo } from '@stoqey/client-graphql/dist/utils/awaitTo';
import { addSeconds } from 'date-fns';
import { isEmpty } from 'lodash';
import { cookies } from 'next/headers';
import { type NextRequest } from 'next/server';

import type { SignUpResponse } from '@/components/types.generated';
import { getClient } from '@/lib/apollo-wrapper.server';
import { SIGNUP_MUTATION } from '@/lib/gql/auth';
import { isAuth } from '@/middlewares';

export async function GET() {
  console.log('get signup api');

  const res = new Response(null, {
    headers: {
      // 'Set-Cookie': 'refresh=true; path=/; HttpOnly; SameSite=Strict; Secure',
      Refresh: '0; url=/html/signup',
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

    const _csrf = formData.get('_csrf') as string;
    if (isEmpty(_csrf)) throw new Error('Invalid, please try again');

    const [errorCsrf, csrf] = await awaitTo(isAuth(_csrf));
    if (errorCsrf) throw new Error('Invalid, please try again');
    if (!csrf) throw new Error('Invalid, please try again');

    const username = formData.get('username');
    const password = formData.get('password');

    console.log('signup api args', {
      username,
      password,
    });

    const data = await getClient().mutate<{ data: SignUpResponse }>({
      mutation: SIGNUP_MUTATION,
      variables: {
        username,
        password,
      },
    });

    console.error('signup api data', data);

    const dataRes = data.data?.data;
    const success = dataRes?.success;
    const message = dataRes?.message;

    if (success) {
      const mnemonic = dataRes?.mnemonic;
      const accessToken = dataRes?.accessToken;
      const refreshToken = dataRes?.refreshToken;
      cookieStore.set('mnemonic', mnemonic as string, { expires: in3Secs });
      cookieStore.set('accessToken', accessToken as string);
      cookieStore.set('refreshToken', refreshToken as string);

      const res = new Response(null, {
        headers: {
          // 'Set-Cookie': 'refresh=true; path=/; HttpOnly; SameSite=Strict; Secure',
          Refresh: '0; url=/html/signup/mnemonic',
        },
      });
      return res;
    }
    if (message) {
      throw new Error(message);
    } else {
      throw new Error('Failed to signup');
    }
  } catch (error: any) {
    console.error(error);
    const message = (error && error?.message) || `Failed to Signup`;
    const res = new Response(null, {
      headers: {
        Refresh: `0; url=/html/signup`,
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
