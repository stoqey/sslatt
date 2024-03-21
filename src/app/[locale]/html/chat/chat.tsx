'use client';

import type { ChatContainerHtmlProps } from '@/containers/Chat/ChatContainer.html';
import ChatContainer from '@/containers/Chat/ChatContainer.html';

export function ChatPage(props: ChatContainerHtmlProps) {
  return <ChatContainer {...props} />;
}

export default ChatPage;
