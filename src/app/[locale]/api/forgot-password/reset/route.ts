'use server';

import { addSeconds } from 'date-fns';
import { cookies } from 'next/headers';
import { type NextRequest } from 'next/server';

import type { LoginResponse } from '@/components/types.generated';
import { getClient } from '@/lib/apollo-wrapper.server';
import { PW_RESET_MUTATION } from '@/lib/gql/auth';

export async function GET() {
  const res = new Response(null, {
    headers: {
      // 'Set-Cookie': 'refresh=true; path=/; HttpOnly; SameSite=Strict; Secure',
      Refresh: '0; url=/html/forgot-password/2fa',
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

    const userId = formData.get('userId');
    const mnemonic = formData.get('mnemonic');
    const confirmCode = formData.get('confirmCode');
    const codeId = formData.get('codeId');
    const newPassword = formData.get('newPassword');
    const newPasswordRepeat = formData.get('newPasswordRepeat');

    if (newPassword !== newPasswordRepeat) {
      throw new Error('Passwords do not match');
    }

    console.log('reset password', {
      userId,
      mnemonic,
      confirmCode,
      codeId,
      newPassword,
    });

    const data = await getClient().mutate<{ data: LoginResponse }>({
      mutation: PW_RESET_MUTATION,
      variables: {
        codeId,
        confirmCode,
        mnemonic,
        userId,
        newPassword,
      },
    });

    const dataRes = data.data?.data;
    const message = dataRes?.message;
    const accessToken = dataRes?.accessToken;
    const refreshToken = dataRes?.refreshToken;

    if (dataRes?.success && accessToken && refreshToken) {
      cookieStore.delete('userId');
      cookieStore.delete('codeId');
      cookieStore.delete('confirmCode');
      cookieStore.delete('userId');
      cookieStore.delete('mnemonic');

      cookieStore.set('success', 'true', { expires: in3Secs });
      cookieStore.set('message', 'Password successfully reset', {
        expires: in3Secs,
      });

      cookieStore.set('accessToken', accessToken);
      cookieStore.set('refreshToken', refreshToken);
    } else if (message) {
      throw new Error(message);
    } else {
      throw new Error('Failed to login');
    }

    const res = new Response(null, {
      headers: {
        Refresh: '0; url=/html',
      },
    });

    return res;
  } catch (error: any) {
    console.error(error);
    const message = (error && error?.message) || `Failed to reset password`;
    const res = new Response(null, {
      headers: {
        Refresh: `0; url=html/forgot-password/2fa`,
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
