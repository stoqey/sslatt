'use server';

import { addSeconds } from 'date-fns';
import { cookies } from 'next/headers';
import { type NextRequest } from 'next/server';

import type { LoginResponse } from '@/components/types.generated';
import { getClient } from '@/lib/apollo-wrapper.server';
import { LOGIN_2AUTH_MUTATION } from '@/lib/gql/auth';

export async function GET() {
  const res = new Response(null, {
    headers: {
      // 'Set-Cookie': 'refresh=true; path=/; HttpOnly; SameSite=Strict; Secure',
      Refresh: '0; url=/html/login/2fa',
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

    const confirmCode = formData.get('confirmCode');
    const codeId = formData.get('codeId');

    console.log('login 2FA', {
      confirmCode,
      codeId,
    });

    const data = await getClient().mutate<{ data: LoginResponse }>({
      mutation: LOGIN_2AUTH_MUTATION,
      variables: {
        codeId,
        confirmCode,
      },
    });

    const dataRes = data.data?.data;
    const message = dataRes?.message;
    const accessToken = dataRes?.accessToken;
    const refreshToken = dataRes?.refreshToken;

    if (dataRes?.success && accessToken && refreshToken) {
      cookieStore.delete('encryptedCode');
      cookieStore.delete('codeId');

      cookieStore.set('accessToken', accessToken);
      cookieStore.set('refreshToken', refreshToken);
    } else if (message) {
      throw new Error(message);
    } else {
      throw new Error('Failed to login');
    }

    console.log('login api data', { message, accessToken, refreshToken });

    const res = new Response(null, {
      headers: {
        Refresh: '0; url=/html/',
      },
    });

    return res;
  } catch (error: any) {
    console.error(error);
    const message = (error && error?.message) || `Failed to login`;
    const res = new Response(null, {
      headers: {
        Refresh: `0; url=/html/login/2fa`,
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
