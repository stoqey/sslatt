'use server';

// eslint-disable-next-line import/no-extraneous-dependencies
import { addSeconds } from 'date-fns';
import { cookies } from 'next/headers';
import { type NextRequest } from 'next/server';

import type { ResType } from '@/components/types.generated';
import { getClient } from '@/lib/apollo-wrapper.server';
import { FORGOT_PW_CONFIRM_MUTATION } from '@/lib/gql/auth';

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

    console.log('forgot password 2FA', {
      userId,
      mnemonic,
      confirmCode,
      codeId,
    });

    const data = await getClient().mutate<{ data: ResType }>({
      mutation: FORGOT_PW_CONFIRM_MUTATION,
      variables: {
        codeId,
        confirmCode,
        mnemonic,
        userId,
      },
    });

    const dataRes = data.data?.data;
    const message = dataRes?.message;

    if (dataRes?.success) {
      cookieStore.set('userId', userId as string);
      cookieStore.set('codeId', codeId as string);
      cookieStore.set('confirmCode', confirmCode as string);
      cookieStore.set('userId', userId as string);
      cookieStore.set('mnemonic', mnemonic as string);

      cookieStore.set('success', 'true', { expires: in3Secs });
      cookieStore.set('message', 'Please enter your new password', {
        expires: in3Secs,
      });
    } else if (message) {
      throw new Error(message);
    } else {
      throw new Error('Failed to reset password');
    }

    const res = new Response(null, {
      headers: {
        Refresh: '0; url=/html/forgot-password/reset',
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
