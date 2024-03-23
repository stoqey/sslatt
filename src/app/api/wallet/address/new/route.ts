import { GENERATE_WALLET_ADDRESS_MUTATION } from '@roadmanjs/wallet-client';
import { addSeconds } from 'date-fns';
import _get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';

import type { ResType } from '@/components/types.generated';
import { getClient } from '@/lib/apollo-wrapper.server';

const baseUrl = '/html/wallet';

export async function GET() {
  const res = new Response(null, {
    headers: {
      Refresh: `10; url=${baseUrl}`,
    },
  });

  return res;
}

export async function POST(req: NextRequest) {
  const in3Secs = addSeconds(new Date(), 5);
  const in3SecsStr = in3Secs.toUTCString();

  let pathname = baseUrl;

  try {
    const cookieStore = cookies();

    const formData = await req.formData();
    pathname = isEmpty(formData.get('pathname'))
      ? baseUrl
      : (formData.get('pathname') as string);

    const currency = formData.get('currency');
    if (isEmpty(currency)) throw new Error('Invalid currency');

    const api = await getClient().mutate<{ data: ResType }>({
      mutation: GENERATE_WALLET_ADDRESS_MUTATION,
      variables: {
        currency,
        forceGenerate: false,
      },
    });

    if (isEmpty(api.data?.data)) throw api.errors;

    const success = _get(api, 'data.data.success', false);
    const message = _get(api, 'data.data.message', '');

    if (!success) throw new Error(message);

    cookieStore.set('refresh', 'true', { expires: in3Secs });
    cookieStore.set('message', 'Successfully generated new address', {
      expires: in3Secs,
    });
    cookieStore.set('success', `${success}`, { expires: in3Secs });

    return new Response(null, {
      headers: {
        Refresh: `0; url=${pathname}`,
      },
    });
  } catch (error: any) {
    console.log('error generating address', error);
    const message =
      (error && error?.message) || `Failed to generating new address`;
    const res = new Response(null, {
      headers: {
        Refresh: `0; url=${pathname}`,
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
