import { addSeconds } from 'date-fns';
import isEmpty from 'lodash/isEmpty';
import type { NextRequest } from 'next/server';

import { startChatFromUsers } from '@/lib/hooksServer/chat';
import { getMe } from '@/lib/hooksServer/user';

const baseUrl = '/html/chat';

export async function GET(_req: NextRequest) {
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
    const formData = await req.formData();
    pathname = isEmpty(formData.get('pathname'))
      ? baseUrl
      : (formData.get('pathname') as string);

    const friendId = formData.get('friendId');
    if (isEmpty(friendId)) throw new Error('Invalid receiver');

    const user = await getMe();
    if (!user) throw new Error('Invalid session');

    const api = await startChatFromUsers({
      friends: [{ id: friendId as string }],
      user,
    });

    if (!api) throw new Error('Failed to start chat');

    const { convoId } = api;
    if (isEmpty(convoId)) throw new Error('Failed to start chat');

    return new Response(null, {
      headers: {
        Refresh: `0; url=/html/chat/${convoId}`,
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
