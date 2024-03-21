import { useApolloClient } from '@apollo/client';
import {
  ON_CHAT_MESSAGE_SUBSCRIPTION,
  ON_CONVOS_SUBSCRIPTION,
} from '@roadmanjs/chat-client';
import type {
  ChatConvo,
  ChatMessage,
  ChatMessageType,
  UserType,
} from '@stoqey/client-graphql';
import { awaitTo } from '@stoqey/client-graphql';
import includes from 'lodash/includes';
import isEmpty from 'lodash/isEmpty';
import uniqBy from 'lodash/uniqBy';
import { useEffect, useState } from 'react';

import { userCacheManager } from '../storage/deviceStorage';
import type { ChatConvoArgs, ChatMessagesQueryArgs } from './apiChat';
import {
  fetchChatConvo,
  fetchChatMessageQuery,
  sendChatMessageMutation,
  startChatFromUsers,
} from './apiChat';
import { useMyData } from './useProfileApi';

interface ChatMessagesState {
  messages: ChatMessage[];
  loading: boolean;
  hasNext?: boolean;
  hasEarlier?: boolean;
  hasNew?: boolean;
}

/**
 * The biggest hook, with chat messages, loading state, fetchedEarlier e.t.c
 * @param props
 * @returns {ChatMessagesState, sendMessage: () => {}}
 */
export const useChatMessageQuery = (args: ChatMessagesQueryArgs) => {
  const { convoId, ...allOtherArgs } = args;
  const client = useApolloClient();
  const currentUser = useMyData(); // no api call
  const owner = currentUser.id;

  const [state, setState] = useState<ChatMessagesState>({
    messages: [],
    loading: false,
    hasNext: true,
    hasEarlier: true,
  });

  const { messages } = state;

  const setMessages = (msgs: ChatMessage[]) =>
    setState({ ...state, messages: msgs });

  const getMessages = async (params: ChatMessagesQueryArgs) => {
    const [error, data] = await awaitTo(
      fetchChatMessageQuery({
        client,
        args: params,
      }),
    );

    if (data) {
      const newMsg = data.items;
      const hasNext = data.hasNext || false;

      let newhasEarlier = state.hasEarlier;
      let newhasNew = state.hasNew;
      let combinedMessages: ChatMessage[] = [];
      // TODO Avoid sorting, just concat

      if (params.before) {
        // hasEarlier
        combinedMessages = [...messages, ...newMsg];
        newhasEarlier = hasNext;
      } else {
        // hasNew when after
        combinedMessages = [...newMsg, ...messages];
        newhasNew = hasNext;
      }

      combinedMessages = uniqBy(combinedMessages, 'id');

      // only set state for current convo
      // selecting a new convo remove previous messages
      const currentConvoMessages = combinedMessages.filter(
        (msg) => msg.convoId === convoId,
      );

      setState({
        ...state,
        messages: currentConvoMessages,
        hasEarlier: newhasEarlier,
        hasNew: newhasNew,
      });
    }

    if (error) {
      console.log('error', error);
    }
  };

  const getOlderMessages = async () => {
    // get last item in posts, pass it as new arg
    const lastPost = messages[messages.length - 1];

    const olderFetchProps: ChatMessagesQueryArgs = {
      convoId,
      before: lastPost.createdAt,
      limit: args.limit, // re-use same og args
    };

    await getMessages(olderFetchProps);
  };

  const getNewMessages = async () => {
    const firstMessage = messages[0];

    if (firstMessage && firstMessage.createdAt) {
      const args: ChatMessagesQueryArgs = {
        convoId,
        after: firstMessage.createdAt,
      };
      await getMessages(args);
    }
  };

  const getCurrentMessages = () => messages;

  // send chat message method
  const sendMessage = async (
    chatMessage: Partial<ChatMessageType>,
  ): Promise<boolean> => {
    const [error, dataResponse] = await awaitTo(
      sendChatMessageMutation({
        client,
        args: { convoId, ...chatMessage },
      }),
    );

    if (dataResponse) {
      const { data } = dataResponse;
      // TODO use from api response
      data.owner = await userCacheManager.get(); // get the current user

      const newMessageToPush: ChatMessage = data;

      const newMessages = messages;
      newMessages.unshift(newMessageToPush);
      setMessages(newMessages);
      return true;
    }

    console.error(error);
    return false;
  };

  // Initially we fetch the initial messages,
  useEffect(() => {
    // the past messages are called when user scrolls
    if (!isEmpty(convoId)) {
      getMessages({
        convoId,
        ...allOtherArgs,
      });
    }
  }, [convoId]);

  // Subscription when newMessage
  useEffect(() => {
    const subscription = client.subscribe({
      query: ON_CHAT_MESSAGE_SUBSCRIPTION,
      variables: { convoId, owner },
      fetchPolicy: 'network-only',
    });

    const results = subscription.subscribe((data) => {
      const dataResponse = data && data.data.data;
      const newMessage = dataResponse.message;

      if (newMessage) {
        setTimeout(() => getNewMessages(), 500);
      }
    });

    return () => {
      results.unsubscribe();
    };
  }, [convoId, owner, messages]);

  return {
    owner,
    state,
    getOlderMessages,
    getNewMessages,
    sendMessage,
    getCurrentMessages,
  };
};

interface UseChatTyping {
  owner: string;
  convoId: string;
}

/**
 * Use Chat Typing boolean
 * TODO in future return array of people typing
 * @param args
 * @returns
 */
export const useChatTyping = (args: UseChatTyping): boolean => {
  const { convoId, owner } = args;
  const client = useApolloClient();

  const [typing, setTyping] = useState<boolean>(false);

  const setIsTyping = () => {
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
    }, 1000);
  };

  useEffect(() => {
    const subscription = client.subscribe({
      query: ON_CHAT_MESSAGE_SUBSCRIPTION,
      variables: { convoId, owner },
      fetchPolicy: 'network-only',
    });

    const results = subscription.subscribe((data) => {
      const dataResponse = data && data.data.data;
      const usersTyping = dataResponse.typing;
      if (!includes(usersTyping, owner)) {
        setIsTyping();
      }
    });

    return () => {
      results.unsubscribe();
    };
  }, [convoId, owner]);

  return typing;
};

interface UseChatSubscription {
  onTyping?: (msg: any) => Promise<void>;
  onNewMessage?: (msg: any) => Promise<void>;
}

// TODO import from chat-client
export interface OnChatMessage {
  convoId: string;
  owner: string;
  typing: string;
  time: Date;
  message: string;
}
/**
 * A more generic subscription like for ChatConvo list to update convo list in realtime
 * @sets subscription or normal hooks value
 * @param args
 */
export const useConvoSubscription = (
  args: UseChatSubscription = {},
): OnChatMessage[] => {
  const client = useApolloClient();
  const user = useMyData();
  const owner = user.id;

  const [onChatMsgs, setOnChatMsgs] = useState<OnChatMessage[]>([]);

  const addMsgs = (msg: OnChatMessage) => {
    // todo check if exists
    // add it
    const newMsgs = [...onChatMsgs, msg];
    setOnChatMsgs(newMsgs);
  };

  const removeMsgs = (msg: OnChatMessage) => {
    // TODO use id per each msg
    const newMsgs = onChatMsgs.filter((ms) => ms.convoId !== msg.convoId);
    setOnChatMsgs(newMsgs);
  };

  const whenNewMessage = (msg: OnChatMessage) => {
    addMsgs(msg);
    setTimeout(() => {
      removeMsgs(msg);
    }, 1000);
  };

  useEffect(() => {
    if (!owner) return () => {};

    const subscription = client.subscribe({
      query: ON_CONVOS_SUBSCRIPTION,
      variables: { owner },
      fetchPolicy: 'network-only',
    });

    const results = subscription.subscribe((data) => {
      const dataResponse = data && data.data.data;
      const usersTyping = dataResponse.typing;
      const newMessage = dataResponse.message;

      // Check if i am not the one typing obviously
      if (!includes(usersTyping, owner)) {
        if (args.onTyping) {
          args.onTyping(dataResponse);
        }
      }

      // check if this is for a new message
      if (newMessage) {
        if (args.onNewMessage) {
          args.onNewMessage(dataResponse);
        }
      }

      whenNewMessage(dataResponse);
    });

    return () => {
      results.unsubscribe();
    };
  }, [owner]);

  return !onChatMsgs ? ({} as any) : onChatMsgs;
};

/**
 * A hook to start a new chat convo or retrieve an existing chat convo
 * @param user
 * @returns
 */
export function useStartConvo(user: UserType): ChatConvo {
  const [convoData, setConvo] = useState<ChatConvo>(null as any);
  const client = useApolloClient();

  useEffect(() => {
    const getChatConvo = async () => {
      const chatConvo = await startChatFromUsers({
        client,
        friends: [user],
      });

      if (chatConvo) {
        // TODO pause re-renders if chatConvo already exists.
        setConvo(chatConvo);
      }
    };

    getChatConvo();
  }, [user]);

  return !convoData ? (null as any) : convoData;
}

interface UseConvoDataState {
  convos: ChatConvo[];
  hasNew?: boolean;
  hasEarlier?: boolean;
}
interface UseConvoDataProps extends UseConvoDataState {
  fetchNew: () => Promise<any>;
  fetchOlder: () => Promise<any>;
}

/**
 * Hook to search for Posts from GraphQL API
 * New to older posts
 * @param FetchPosts
 * @returns
 */
export function useConvoData(args: ChatConvoArgs): UseConvoDataProps {
  const [state, setState] = useState<UseConvoDataState>({
    convos: [],
    hasNew: false,
    hasEarlier: false,
  });
  const { hasNew, hasEarlier, convos } = state;

  const client = useApolloClient();

  const getConvos = async (props: ChatConvoArgs) => {
    const [error, data] = await awaitTo(
      fetchChatConvo({
        client,
        args: props,
      }),
    );

    if (data) {
      const newConvos = data.items || [];
      const { hasNext } = data;

      let newhasEarlier = state.hasEarlier;
      let newhasNew = state.hasNew;
      let combinedConvos: ChatConvo[] = [];

      // TODO Avoid sorting, just concat

      if (props.before) {
        // hasEarlier
        combinedConvos = [...convos, ...newConvos];
        newhasEarlier = hasNext;
      } else {
        combinedConvos = [...newConvos, ...convos];
        newhasNew = hasNext;
      }
      combinedConvos = uniqBy(combinedConvos, 'id');

      setState({
        ...state,
        convos: combinedConvos,
        hasEarlier: newhasEarlier,
        hasNew: newhasNew,
      });
    }
    if (error) {
      console.log('error', error);
    }
  };

  const getOlderConvos = async () => {
    // get last item in posts, pass it as new arg
    const lastPost = convos[convos.length - 1];

    const olderFetchProps: ChatConvoArgs = {
      before: lastPost.createdAt,
      limit: args.limit, // re-use same og args
    };

    await getConvos(olderFetchProps);
  };

  const getNewConvos = async () => {
    const firstConvo = convos[0];

    if (firstConvo) {
      // todo use first item
      const newFetchProps: ChatConvoArgs = {
        after: firstConvo.updatedAt, // TODO use top item for after
        limit: args.limit, // re-use same og args
      };

      await getConvos(newFetchProps);
    }
  };

  // Component did mount issue
  useEffect(() => {
    getConvos(args); // use args to fetch more
  }, []);

  return {
    convos,
    fetchNew: getNewConvos,
    fetchOlder: getOlderConvos,
    hasEarlier,
    hasNew,
  };
}
