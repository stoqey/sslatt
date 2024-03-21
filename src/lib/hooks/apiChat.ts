import type { ApolloClient } from '@apollo/client';
import {
  CHAT_TYPING,
  CREATE_CHAT_MESSAGE_MUTATION,
  GET_CHAT_CONVO,
  GET_CHAT_CONVO_BY_ID,
  GET_CHAT_MESSAGE,
  START_CHAT_CONVO_MUTATIONS,
} from '@roadmanjs/chat-client';
import type {
  AdsListingType,
  ChatConvo,
  ChatMessage,
  ChatMessageType,
  ResType,
  UserType,
} from '@stoqey/client-graphql';
import { awaitTo } from '@stoqey/client-graphql';
import { compact, uniq } from 'lodash';
import _get from 'lodash/get';
import identity from 'lodash/identity';
import isEmpty from 'lodash/isEmpty';
import pickBy from 'lodash/pickBy';

import type { OrderTypeOutput } from '@/components/types.generated';

import { userCacheManager } from '../storage/deviceStorage';

interface ChatConvoPagination {
  items: ChatConvo[];
  hasNext: boolean;
  params: any;
}

interface ChatMessagePagination {
  items: ChatMessage[];
  hasNext: boolean;
  params: any;
}

export interface ChatConvoArgs {
  limit?: number;
  before?: Date;
  after?: Date;
}

export interface ChatConvoQueryProps {
  client: ApolloClient<any>;
  args: ChatConvoArgs;
}

export const fetchChatConvo = async (
  props: ChatConvoQueryProps,
): Promise<ChatConvoPagination | undefined> => {
  const { client, args } = props;

  const user = await userCacheManager.get();
  const userId = _get(user, 'id', '');
  if (isEmpty(userId)) {
    return undefined;
  }

  const { limit, before, after } = args;

  const [errorData, data] = await awaitTo(
    client.query<{ data: ChatConvoPagination }>({
      query: GET_CHAT_CONVO,
      variables: pickBy({ limit, before, after, owner: userId }, identity),
      fetchPolicy: 'network-only',
    }),
  );

  if (data?.data) {
    return data.data.data;
  }

  console.error(errorData);

  return undefined;
};

interface ChatConvoByIdQueryProps {
  client: ApolloClient<any>;
  args: {
    convoId: string;
  };
  callback: (data?: ChatConvo | undefined, error?: Error | undefined) => any;
}

export const fetchChatConvoByIdQuery = async <T>(
  props: ChatConvoByIdQueryProps,
): Promise<T> => {
  const { client, args, callback } = props;
  const { convoId } = args;

  const [errorData, data] = await awaitTo<{ data: { data: ChatConvo } }>(
    client.query({
      query: GET_CHAT_CONVO_BY_ID,
      variables: { id: convoId },
      fetchPolicy: 'network-only',
    }),
  );

  if (errorData) {
    return callback(null, errorData);
  }

  if (data && data.data) {
    return callback(data.data.data, null);
  }

  return callback(null, new Error('error getting chatConvo'));
};

export interface ChatMessagesQueryArgs {
  convoId: string;
  limit?: number;
  before?: Date;
  after?: Date;
}
interface ChatMessageQueryProps {
  client: ApolloClient<any>;
  args: ChatMessagesQueryArgs;
}

/**
 * Universal method to be called for querying chat message, can be used in a component or a hook e.g below
 * @param props
 * @returns
 */
export const fetchChatMessageQuery = async (
  props: ChatMessageQueryProps,
): Promise<ChatMessagePagination | undefined> => {
  const { client, args } = props;
  const { limit, before, after, convoId } = args;

  const [errorData, data] = await awaitTo<any>(
    client.query({
      query: GET_CHAT_MESSAGE,
      variables: pickBy({ limit, before, after, convoId }, identity),
      fetchPolicy: 'no-cache',
    }),
  );

  if (data && data.data) {
    return data.data.data;
  }

  console.log(errorData);

  return undefined;
};

interface SendChatMessageProps {
  client: ApolloClient<any>;
  args: Partial<ChatMessageType>;
}

/**
 * Send Chat Message from anything component, or a hook e.g below
 * @param props SendChatMessageProps
 * @returns
 */
export const sendChatMessageMutation = async (
  props: SendChatMessageProps,
): Promise<ResType | undefined> => {
  try {
    const user = await userCacheManager.get();
    const userId = _get(user, 'id', '');

    const args = {
      ...props.args,
      owner: userId,
    };

    const { client } = props;

    const [errorData, data] = await awaitTo(
      client.mutate<{ data: ResType }>({
        mutation: CREATE_CHAT_MESSAGE_MUTATION,
        variables: { args: pickBy(args, identity) },
      }),
    );

    if (data && data.data && data.data) {
      if (data.data.data.success) {
        return data.data.data;
      }
    }

    throw errorData;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export interface CreateChatConvoType {
  name?: string;
  avatar?: string;
  owner: string;
  group?: boolean;
  members?: string[];
}

/**
 * Start chat from anything, e.g. an ad, product e.t.c...
 * @param ad
 * @param client
 * @returns
 */
export const startChatFromAd = async (
  ad: AdsListingType,
  client: ApolloClient<any>,
): Promise<ChatConvo> => {
  const user = await userCacheManager.get();
  const owner = _get(user, 'id', '');

  const item: CreateChatConvoType = {
    name: ad.name,
    avatar: ad.photos ? ad.photos[0] : '',
    owner,
    group: true,
    members: [owner, ad.id],
  };

  const { data } = await client.mutate<ResType>({
    mutation: START_CHAT_CONVO_MUTATIONS,
    variables: { args: item },
    fetchPolicy: 'no-cache',
  });

  if (data && data.data) {
    const chatConvo = data.data.data;
    return chatConvo;
  }

  throw new Error('error getting start convo');
};

/**
 * Start chat from anything, e.g. an ad, product e.t.c...
 * @param order
 * @param client
 * @returns
 */
export const startChatFromOrder = async (
  order: OrderTypeOutput,
  client: ApolloClient<any>,
): Promise<ChatConvo> => {
  const user = await userCacheManager.get();
  const owner = _get(user, 'id', '');

  const members: string[] = uniq(
    compact([order.owner?.id, order.seller?.id, owner]),
  );
  const item: CreateChatConvoType = {
    name: `Order #${order.id}`, // use 4 letters from the order.id
    // avatar: ad.photos ? ad.photos[0] : "",
    owner,
    group: true,
    members,
  };

  const { data } = await client.mutate<{ data: ResType }>({
    mutation: START_CHAT_CONVO_MUTATIONS,
    variables: { args: item },
    fetchPolicy: 'no-cache',
  });

  if (data && data.data) {
    const chatConvo = data.data.data;
    return chatConvo;
  }

  throw new Error('error getting start convo');
};

interface StartChatFromUser {
  friends: UserType[];
  client: ApolloClient<any>;
}
/**
 * Start a chat conversation from user object and current loggedIn user,
 * Can be used from anywhere, a component, hook e.g below.
 * @param friends
 * @param client
 * @returns
 */
export const startChatFromUsers = async ({
  client,
  friends,
}: StartChatFromUser): Promise<ChatConvo> => {
  const user = await userCacheManager.get();
  const owner = _get(user, 'id', '');

  const friendsIds = friends.map((friend) => friend.id);

  const item: CreateChatConvoType = {
    owner,
    group: false,
    members: [owner, ...friendsIds],
  };

  const { data } = await client.mutate<ResType>({
    mutation: START_CHAT_CONVO_MUTATIONS,
    variables: { args: item },
    fetchPolicy: 'no-cache',
  });

  if (data && data.data) {
    const chatConvo = data.data.data;
    return chatConvo;
  }

  throw new Error('error getting start convo');
};

export interface SendingTypingProps {
  client: ApolloClient<any>;
  args: { convoId: string; time?: Date };
}

export const sendTyping = async (
  props: SendingTypingProps,
): Promise<boolean> => {
  const { client, args } = props;

  const user = await userCacheManager.get();
  const userId = _get(user, 'id', '');
  if (isEmpty(userId)) {
    return false;
  }

  const [errorData, data] = await awaitTo(
    client.query<{ data: boolean }>({
      query: CHAT_TYPING,
      variables: pickBy(args, identity),
      fetchPolicy: 'network-only',
    }),
  );

  if (data?.data) {
    return data.data.data;
  }

  console.error(errorData);
  return false;
};
