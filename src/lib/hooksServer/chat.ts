import {
  GET_CHAT_CONVO,
  GET_CHAT_CONVO_BY_ID,
  GET_CHAT_MESSAGE,
  START_CHAT_CONVO_MUTATIONS,
} from '@roadmanjs/chat-client';
import { awaitTo } from '@stoqey/client-graphql';
import { compact, uniq } from 'lodash';
import _get from 'lodash/get';
import identity from 'lodash/identity';
import isEmpty from 'lodash/isEmpty';
import pickBy from 'lodash/pickBy';

import type {
  ChatConvo,
  ChatConvoPagination,
  ChatMessagePagination,
  OrderTypeOutput,
  UserType,
} from '@/components/types.generated';

import { getClient } from '../apollo-wrapper.server';
import type { ResType } from '../gql';
import type { CreateChatConvoType } from '../hooks/apiChat';

interface ChatConvoArgs {
  userId: string;
  limit?: number;
  before?: Date;
  after?: Date;
}

/**
 * Server side
 * @param props
 * @returns
 */
export const fetchChatConvos = async (
  args: ChatConvoArgs,
): Promise<ChatConvoPagination | undefined> => {
  const { limit = 1000, before = new Date(), after, userId } = args;

  if (isEmpty(userId)) {
    return undefined;
  }

  const [errorData, data] = await awaitTo(
    getClient().query<{ data: ChatConvoPagination }>({
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

export const fetchChatConvoById = async (
  convoId: string,
): Promise<ChatConvo | undefined> => {
  const [errorData, data] = await awaitTo<{ data: { data: ChatConvo } }>(
    getClient().query({
      query: GET_CHAT_CONVO_BY_ID,
      variables: { id: convoId },
      fetchPolicy: 'network-only',
    }),
  );

  if (errorData) {
    console.error(errorData);
  }

  if (data && data.data) {
    return data.data.data;
  }

  return undefined;
};

export interface ChatMessagesQuery {
  convoId: string;
  limit?: number;
  before?: Date;
  after?: Date;
}
/**
 * Universal method to be called for querying chat message, can be used in a component or a hook e.g below
 * @param props
 * @returns
 */
export const fetchChatMessages = async (
  props: ChatMessagesQuery,
): Promise<ChatMessagePagination | undefined> => {
  const { limit = 100, before = new Date(), after, convoId } = props;

  const [errorData, data] = await awaitTo<any>(
    getClient().query({
      query: GET_CHAT_MESSAGE,
      variables: pickBy({ limit, before, after, convoId }, identity),
      fetchPolicy: 'no-cache',
    }),
  );

  if (errorData) {
    console.error(errorData);
  }

  if (data && data.data) {
    return data.data.data;
  }

  return undefined;
};

export interface StartChatFromOrderProps {
  order: OrderTypeOutput;
  user: UserType;
}

/**
 * @param order
 * @param client
 * @returns
 */
export const startChatFromOrder = async (
  props: StartChatFromOrderProps,
): Promise<ChatConvo> => {
  const { order, user } = props;
  const owner = _get(user, 'id', '') || '';

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

  const { data } = await getClient().mutate<{ data: ResType }>({
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
  user: UserType;
}

export const startChatFromUsers = async ({
  friends,
  user,
}: StartChatFromUser): Promise<ChatConvo> => {
  const owner = _get(user, 'id', '') as any;

  const friendsIds = friends.map((friend) => friend.id);

  const item: CreateChatConvoType = {
    owner,
    group: false,
    members: [owner, ...friendsIds],
  };

  const { data } = await getClient().mutate<{ data: ResType }>({
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
