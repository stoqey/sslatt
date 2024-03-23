import { isEmpty } from 'lodash';
import { cookies } from 'next/headers';

import {
  fetchChatConvoById,
  fetchChatConvos,
  fetchChatMessages,
} from '@/lib/hooksServer/chat';
import { getMe } from '@/lib/hooksServer/user';
import { getVendor } from '@/lib/hooksServer/vendor';

import ChatPage from './chat';

export const ChatPageIndex = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const cookieStore = cookies();
  const slug = params?.slug;
  // all props are passed to the ChatPage component
  // convos,
  // if slug, get convo by slug, get it's messages

  const selectedConvoId = !isEmpty(params?.slug);
  let convos: any = [];
  let convo;
  let messages;
  let user;
  let vendor;
  let message;
  let success;

  message = cookieStore.get('message')?.value;
  success = cookieStore.get('success')?.value === 'true';

  user = await getMe();
  if (user) {
    vendor = await getVendor();

    const convosPage = await fetchChatConvos({
      userId: user.id as string,
    });
    convos = convosPage?.items || [];

    if (selectedConvoId) {
      convo = await fetchChatConvoById(slug);
      const messagePage = await fetchChatMessages({
        convoId: slug as string,
      });
      messages = messagePage?.items || [];
    }
  }

  // console.log("ChatPageIndex", {
  //   // convos,
  //   convo,
  //   messages,
  //   // user,
  //   // vendor,
  //   slug,
  // });

  return (
    <ChatPage
      vendor={vendor as any}
      viewType="chat"
      messages={messages as any}
      convo={convo as any}
      convos={convos}
      user={user as any}
      message={message}
      success={success}
    />
  );
};

export default ChatPageIndex;
