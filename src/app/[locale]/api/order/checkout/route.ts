import { addSeconds } from 'date-fns';
import _get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';

import type { ResType } from '@/components/types.generated';
import { getClient } from '@/lib/apollo-wrapper.server';
import { CHECKOUT_ORDER } from '@/lib/gql';

const baseUrl = '/html/order';

export async function GET(req: NextRequest) {
  const cookieStore = cookies();
  const query = req.nextUrl.searchParams;
  const pathname = query.get('pathname');
  const type = query.get('type');
  const typeId = query.get('typeId');
  const qty = query.get('qty');

  if (isEmpty(type) || isEmpty(typeId) || isEmpty(qty)) {
    const in3Secs = addSeconds(new Date(), 5);
    cookieStore.set('message', 'Invalid order details', { expires: in3Secs });
    cookieStore.set('success', 'false', { expires: in3Secs });

    const redirectUrl = isEmpty(pathname) ? baseUrl : pathname;
    return new Response(null, {
      headers: {
        Refresh: `0; url=${redirectUrl}`,
      },
    });
  }

  const checkoutLink = `/html/order/checkout/new?type=${type}&typeId=${typeId}&qty=${qty}`;

  const res = new Response(null, {
    headers: {
      Refresh: `0; url=${checkoutLink}`,
    },
  });

  return res;
}

export async function POST(req: NextRequest) {
  const cookieStore = cookies();
  const in3Secs = addSeconds(new Date(), 5);
  const in3SecsStr = in3Secs.toUTCString();

  let pathname = baseUrl;

  try {
    // TODO pin verification

    const formData = await req.formData();
    const walletId = formData.get('walletId');
    pathname = isEmpty(formData.get('pathname'))
      ? baseUrl
      : (formData.get('pathname') as string);
    const details = formData.get('details');
    const orderType = formData.get('orderType');
    const orderTypeId = formData.get('orderTypeId');
    const qty = formData.get('qty');

    const variables = {
      walletId,
      order: {
        details,
        typeId: orderTypeId,
        type: orderType,
        quantity: +(qty || 1),
      },
    };

    pathname = `/html/order/checkout/new?type=${orderType}&typeId=${orderTypeId}&qty=${qty}`;

    const api = await getClient().mutate<{ data: ResType }>({
      mutation: CHECKOUT_ORDER,
      variables,
    });

    if (isEmpty(api.data?.data)) throw api.errors;

    const success = _get(api, 'data.data.success', false);
    const message = _get(api, 'data.data.message', '');

    if (!success) throw new Error(message);

    cookieStore.set('refresh', 'true', { expires: in3Secs });
    cookieStore.set('message', message, { expires: in3Secs });
    cookieStore.set('success', `${success}`, { expires: in3Secs });

    return new Response(null, {
      headers: {
        Refresh: `0; url=${baseUrl}`,
      },
    });
  } catch (error: any) {
    console.log('error creating checking out', error);
    const message = (error && error?.message) || `Failed to checkout`;
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
