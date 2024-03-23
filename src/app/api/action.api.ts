import { addSeconds } from 'date-fns';
import _get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';

import type { ResType } from '@/components/types.generated';
import { orderActions } from '@/containers/Order/order.list.html.names';
import { withdrawActions } from '@/containers/Withdraw/withdraw.actions.html.names';
import { getClient } from '@/lib/apollo-wrapper.server';
import { escapeText } from '@/lib/utils/text';

const actions: any = {
  order: orderActions,
  withdraw: withdrawActions,
};

export async function GET(_req: NextRequest) {
  const res = new Response(null, {
    headers: {
      Refresh: '0; url=/html',
    },
  });

  return res;
}

export async function POST(req: NextRequest) {
  // TODO generic messages
  const cookieStore = cookies();
  const in3Secs = addSeconds(new Date(), 5);
  const in3SecsStr = in3Secs.toUTCString();

  let id = '';
  let actionId = '';
  let actionName = '';
  let useCookies = false;
  let pathname = '';
  let refreshLink = '';

  try {
    const formData = await req.formData();

    useCookies = (formData.get('useCookies') as string) === 'true';
    pathname = formData.get('pathname') as string;

    refreshLink = pathname;

    // const backLink =
    // props.backLink ||
    // pathname.replace(props.id, "").replace("/" + actionName, "");

    id = formData.get('id') as string;
    if (isEmpty(id)) {
      throw new Error('Invalid order id');
    }

    actionName = formData.get('actionName') as string;
    if (!actionName || isEmpty(actionName))
      throw new Error('Invalid actionName');

    actionId = formData.get('actionId') as string;
    if (!actionId || isEmpty(actionId)) throw new Error('Invalid actionId');

    const apiActions = actions[actionId];

    const action = apiActions.find((a: any) => a.id === actionName);

    if (!action) throw new Error('Invalid action');

    const variablesArray = action.variables(formData);

    // console.log("variablesArray", {
    //     variablesArray
    // })

    const variablesRequiredIsEmpty = variablesArray.filter(
      (v: any) => v.required && isEmpty([v.value]),
    );

    const variablesRequiredError = isEmpty(variablesRequiredIsEmpty)
      ? ''
      : variablesRequiredIsEmpty.map((v: any) => v.message).join(', ');

    if (!isEmpty(variablesRequiredError))
      throw new Error(variablesRequiredError);

    const variables = variablesArray.reduce((acc: any, v: any) => {
      acc[v.name] = escapeText(v.value);
      return acc;
    }, {});

    const api = await getClient().mutate<{ data: ResType }>({
      mutation: action.query,
      variables,
    });

    if (useCookies) {
      variablesArray.forEach((v: any) => {
        cookieStore.set(v.name, v.value, { expires: in3Secs });
      });
    }

    if (isEmpty(api.data?.data)) throw api.errors as any;

    const success = _get(api, 'data.data.success', false);
    const message = _get(api, 'data.data.message', '');

    if (!success) throw new Error(message);

    cookieStore.set('refresh', 'true', { expires: in3Secs });
    cookieStore.set('message', message, { expires: in3Secs });
    cookieStore.set('success', `${success}`, { expires: in3Secs });

    refreshLink = pathname.replace(id as any, '').replace(`/${actionName}`, '');

    console.log('refreshLink', {
      pathname,
      refreshLink,
      actionName,
    });

    return new Response(null, {
      headers: {
        Refresh: `0; url=${refreshLink}`,
      },
    });
  } catch (error: any) {
    console.log('error', error);
    const message =
      (error && error?.message) || `Failed to ${actionName} ${actionId}`;
    const refreshUrl = !isEmpty(refreshLink) ? refreshLink : `/html`;

    const res = new Response(null, {
      headers: {
        Refresh: `0; url=${refreshUrl}`,
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
