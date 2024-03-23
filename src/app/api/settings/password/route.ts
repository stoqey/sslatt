'use server';

import { addMinutes, addSeconds } from 'date-fns';
import { cookies } from 'next/headers';
import { type NextRequest } from 'next/server';

import type { ResType } from '@/components/types.generated';
import { getClient } from '@/lib/apollo-wrapper.server';
import { PW_CHANGE_CONFIRM_MUTATION } from '@/lib/gql/auth';

export async function GET() {
  const res = new Response(null, {
    headers: {
      // 'Set-Cookie': 'refresh=true; path=/; HttpOnly; SameSite=Strict; Secure',
      Refresh: '0; url=/html/settings/password',
    },
  });

  return res;
}

export async function POST(req: NextRequest) {
  const in3Secs = addSeconds(new Date(), 5);
  const in3Min = addMinutes(new Date(), 5);
  const in3SecsStr = in3Secs.toUTCString();

  try {
    const formData = await req.formData();
    const cookieStore = cookies();

    const useMnemonic = formData.get('useMnemonic');
    const mnemonic = formData.get('mnemonic');
    const confirmCode = formData.get('confirmCode');
    const codeId = formData.get('codeId');
    const encryptedCode = formData.get('encryptedCode');
    const oldPassword = formData.get('oldPassword');
    const newPassword = formData.get('newPassword');

    const newPasswordRepeat = formData.get('newPasswordRepeat');

    cookieStore.set('useMnemonic', useMnemonic as string, { expires: in3Min });
    cookieStore.set('codeId', codeId as string, { expires: in3Min });
    cookieStore.set('encryptedCode', encryptedCode as string, {
      expires: in3Min,
    });

    if (newPassword !== newPasswordRepeat) {
      throw new Error('Passwords do not match');
    }

    console.log('change password', {
      useMnemonic,
      mnemonic,
      confirmCode,
      codeId,
      encryptedCode,
      oldPassword,
      newPassword,
    });

    const data = await getClient().mutate<{ data: ResType }>({
      mutation: PW_CHANGE_CONFIRM_MUTATION,
      variables: {
        codeId,
        confirmCode,
        mnemonic,
        newPassword,
        oldPassword,
      },
    });

    const dataRes = data.data?.data;
    const message = dataRes?.message;

    if (dataRes?.success) {
      cookieStore.delete('useMnemonic');
      cookieStore.delete('codeId');
      cookieStore.delete('confirmCode');
      cookieStore.delete('encryptedCode');
      cookieStore.delete('mnemonic');

      cookieStore.set('success', 'true', { expires: in3Secs });
      cookieStore.set('message', 'Successfully changed password', {
        expires: in3Secs,
      });
    } else if (message) {
      throw new Error(message);
    } else {
      throw new Error('Failed to login');
    }

    const res = new Response(null, {
      headers: {
        Refresh: '0; url=/html/settings',
      },
    });

    return res;
  } catch (error: any) {
    console.error(error);
    const message = (error && error?.message) || `Failed to reset password`;
    console.log('change password error', message);
    const res = new Response(null, {
      headers: {
        Refresh: `0; url=/html/settings/password`,
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
