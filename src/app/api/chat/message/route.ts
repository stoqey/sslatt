import { CREATE_CHAT_MESSAGE_MUTATION } from '@roadmanjs/chat-client';
import { addSeconds } from 'date-fns';
import _get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';

import type { ResType } from '@/components/types.generated';
import { getClient } from '@/lib/apollo-wrapper.server';
import { escapeText } from '@/lib/utils/text';

const baseUrl = '/html/chat';

export async function GET() {
  const res = new Response(null, {
    headers: {
      Refresh: `10; url=${baseUrl}`,
    },
  });

  return res;
}

export async function POST(req: NextRequest) {
  // TODO generic messages
  const cookieStore = cookies();
  const in3Secs = addSeconds(new Date(), 5);
  const in3SecsStr = in3Secs.toUTCString();

  let pathname = baseUrl;
  let chatMessage = '';

  try {
    const formData = await req.formData();
    pathname = isEmpty(formData.get('pathname'))
      ? baseUrl
      : (formData.get('pathname') as string);
    chatMessage = formData.get('message') as any;
    if (isEmpty(chatMessage)) throw new Error('Message cannot be empty');
    chatMessage = escapeText(chatMessage);
    const convoId = formData.get('convoId');
    if (isEmpty(convoId)) throw new Error('Invalid conversation');
    const owner = formData.get('owner');
    if (isEmpty(owner)) throw new Error('Invalid sender');

    // TODO vendor data
    const variables = {
      args: {
        owner,
        convoId,
        message: chatMessage,
      },
    };

    const api = await getClient().mutate<{ data: ResType }>({
      mutation: CREATE_CHAT_MESSAGE_MUTATION as any,
      variables,
    });

    if (isEmpty(api.data?.data)) throw api.errors as any;

    const success = _get(api, 'data.data.success', false);
    const message = _get(api, 'data.data.message', '');

    if (!success) throw new Error(message);

    cookieStore.set('refresh', 'true', { expires: in3Secs });
    cookieStore.set('message', 'Successfully sent message', {
      expires: in3Secs,
    });
    cookieStore.set('success', `${success}`, { expires: in3Secs });

    return new Response(null, {
      headers: {
        Refresh: `0; url=${pathname}`,
      },
    });
  } catch (error: any) {
    console.log('error sending message', error);
    const message = (error && error?.message) || `Failed to send message`;
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
