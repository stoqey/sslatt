import type { ChatConvo } from '@stoqey/client-graphql';
import isEmpty from 'lodash/isEmpty';
import moment from 'moment';

import type { UserType } from '@/components/types.generated';

export type ChatMessageType = 'text' | 'image' | 'video' | 'audio' | 'loading';

export type ChatMessageAlign = 'left' | 'center' | 'right';

export interface ChatMessageItem {
  id: string; // "1234dfadsf56dfdsf";
  type: ChatMessageType;
  name?: string; // "Madre"
  align?: ChatMessageAlign;
  text: string; // "Where are you, I am waiting….! ";
  time: string; // "11:07";
  imageUri?: string; // "";
  owner: UserType;
}

export interface ConvoItemProps {
  id: string;
  name?: string;
  avatar?: string;
  photo?: string;
  text?: string;
  unread?: number;
  time?: string;
}

export const createConvoProps = (convo: ChatConvo): ConvoItemProps => {
  const convoId = convo.convoId || '';
  const myself = convo.owner;
  const members = convo.members || [];
  // const isGroup = convo.group;
  const { unread } = convo;
  const { lastMessage } = convo;
  // const lastMessageAttachment = null; // TODO convo.lastMessage?.attachments;
  const lastTime = new Date(convo.updatedAt || new Date());

  const oppositeUsers = members.filter((member) => member.id !== myself.id);

  // todo create a mult 4-3 avatar image
  // TODO for now just use one opposite user
  // TODO remove the demo old avatars
  const convoAvatar = convo.avatar;
  const convoName = convo.name;
  const oppositeUserAvatar = oppositeUsers[0] && oppositeUsers[0].avatar;
  const oppositeUserName = oppositeUsers[0] && oppositeUsers[0].username;

  // console.log("oppositeUsers", oppositeUsers)

  return {
    id: convoId,
    name: !isEmpty(convoName) ? convoName : oppositeUserName,
    avatar: convoAvatar || oppositeUserAvatar, // TODO re-enable avatars
    // photo: lastMessageAttachment,
    text: lastMessage?.message,
    unread,
    time: moment(lastTime).fromNow(),
  };
};
