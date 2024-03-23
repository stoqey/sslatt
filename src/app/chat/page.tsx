import { ApolloWrapper } from '@/lib/apollo-wrapper.client';

import ChatPage from './chat';

const ChatPageIndex = async () => {
  return (
    <ApolloWrapper>
      <ChatPage />;
    </ApolloWrapper>
  );
};

export default ChatPageIndex;
