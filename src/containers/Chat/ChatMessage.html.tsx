import {
  AlignItems,
  Avatar,
  Background,
  Button,
  ButtonType,
  ComboInput,
  CoreButtonType,
  CoreText,
  Display,
  FlexDirection,
  InputSize,
  InputType,
  JustifyContent,
  Layout,
  PresenceStatus,
  SVGAsset,
} from '@uuixjs/uuixweb';
import { styled } from '@uuixjs/uuixweb-lib';
import isEmpty from 'lodash/isEmpty';
import moment from 'moment';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import type {
  ChatMessage,
  UserType,
  VendorType,
} from '@/components/types.generated';
import { cdnPath } from '@/lib/utils/api.utils';

import { MessageSuccessHtml } from '../actions.html';
import type { ChatMessageItem, ConvoItemProps } from './Chat.interfaces';
import ChatItem from './ChatItem';

interface ChatInputHtmlProps {
  owner: string;
  convoId: string;
}

export const ChatInputHtml = (props: ChatInputHtmlProps) => {
  const { convoId, owner } = props;
  const pathname = usePathname();

  return (
    <form action="/api/chat/message" method="POST">
      <input hidden defaultValue={pathname} name="pathname" />
      <input hidden defaultValue={convoId} name="convoId" />
      <input hidden defaultValue={owner} name="owner" />
      <Layout fullWidth display={Display.Flex} background={Background.Base}>
        {/* TODO typing */}

        <ComboInput
          // TODO default value from cookie
          size={InputSize.Large}
          type={InputType.Text}
          placeholder="Type a message"
          name="message"
          buttonProps={{
            children: 'Send',
            icon: SVGAsset.Faceit,
            type: CoreButtonType.Primary,
            // type: "submit",
          }}
        />
      </Layout>
    </form>
  );
};

export interface ChatHeaderHtmlProps {
  convo?: ConvoItemProps;
}

export const ChatHeaderHtml = (props: ChatHeaderHtmlProps) => {
  const { convo } = props;

  if (!convo) return undefined;

  const { avatar = '', name = '' } = convo;

  return (
    <Layout display={Display.Flex} justifyContent={JustifyContent.Between}>
      <Layout
        display={Display.Flex}
        flexDirection={FlexDirection.Row}
        justifyContent={JustifyContent.Center}
        alignItems={AlignItems.Center}
        padding={{ left: 1, right: 1 }}
      >
        {/* Back */}
        <Layout display={Display.Flex} alignItems={AlignItems.Center}>
          <Link href="/html/chat">
            <Button
              type="button"
              variant={ButtonType.Text}
              icon={SVGAsset.ChatSettingsBack}
            />
          </Link>
        </Layout>

        {/* Avatar */}
        <Layout padding={1}>
          <Avatar
            alt={name}
            src={!isEmpty(avatar) ? cdnPath(avatar) : null}
            size={50}
            userLogin={name}
            presenceIndicator
            presenceStatus={PresenceStatus.Online}
          />
        </Layout>

        {/* Receiver name */}
        <Layout display={Display.Flex} flexDirection={FlexDirection.Column}>
          <CoreText as="h4">{name}</CoreText>
          {/* <CoreText as="h5">Online</CoreText> */}
        </Layout>
      </Layout>
      <Layout
        display={Display.Flex}
        flexDirection={FlexDirection.Row}
        justifyContent={JustifyContent.Center}
        alignItems={AlignItems.Center}
      >
        <Button variant={ButtonType.Text} icon={SVGAsset.More} />
      </Layout>
    </Layout>
  );
};

export interface ChatMessagesHtmlProps {
  viewType?: 'order' | 'chat';
  vendor?: VendorType;
  user?: UserType;
  convo?: ConvoItemProps;
  messages: ChatMessage[];
  message?: string;
  success?: boolean;
}

const MessageInputLayout = styled(Layout)`
  width: -moz-available; /* WebKit-based browsers will ignore this. */
  width: -webkit-fill-available; /* Mozilla-based browsers will ignore this. */
  width: fill-available;
`;

export function ChatMessagesHtml(props: ChatMessagesHtmlProps) {
  const {
    convo,
    viewType = 'chat',
    messages = [],
    user,
    message = '',
    success = false,
  } = props;
  const convoId = convo?.id;

  const owner = user?.id;
  const isMyMessage = (msgOwner: string) => msgOwner === owner;

  // @ts-ignore
  const chatMessages: ChatMessageItem[] = messages.map((msg) => ({
    id: msg.id,
    type: 'text', // TODO when attachments
    name: msg.owner?.fullname,
    align: isMyMessage(msg.owner?.id || '') ? 'right' : 'left',
    owner: msg.owner,
    text: msg.message,
    time: moment(new Date(msg.createdAt || new Date())).fromNow(),
  }));
  // .reverse();

  if (viewType === 'order') {
    return (
      <>
        {/* Chat Header */}
        {/* TODO custom header */}

        {/* Chat Messages */}
        <Layout
          padding={{ left: 1, right: 1 }}
          fullWidth
          className="relative"
          style={{
            height: '30vh',
            overflow: 'scroll',
            display: 'flex',
            flexDirection: 'column-reverse',
          }}
        >
          <Layout margin={{ left: 2, right: 2, bottom: 1, top: 1 }}>
            <MessageSuccessHtml success={success} message={message} />
          </Layout>
          {chatMessages.map((item) => (
            <ChatItem key={item.id} {...item} />
          ))}
        </Layout>

        {/* Message Input */}
        <MessageInputLayout>
          {owner && <ChatInputHtml owner={owner} convoId={convoId} />}
        </MessageInputLayout>
      </>
    );
  }

  return (
    <Layout display={Display.Flex} flexDirection={FlexDirection.Column}>
      {/* Chat Header */}
      <Layout
        style={{
          width: '-webkit-fill-available',
        }}
      >
        <ChatHeaderHtml convo={convo} />
      </Layout>

      {/* Chat Messages */}
      <Layout
        padding={{ left: 1, right: 1 }}
        fullWidth
        className="relative"
        style={{
          height: '80.3vh',
          overflow: 'scroll',
          display: 'flex',
          flexDirection: 'column-reverse',
        }}
      >
        <Layout margin={{ left: 2, right: 2, bottom: 1, top: 1 }}>
          <MessageSuccessHtml success={success} message={message} />
        </Layout>
        {chatMessages.map((item) => (
          <ChatItem key={item.id} {...item} />
        ))}
      </Layout>

      {/* Message Input */}
      <MessageInputLayout>
        {owner && <ChatInputHtml owner={owner} convoId={convoId} />}
      </MessageInputLayout>
    </Layout>
  );
}

export default ChatMessagesHtml;
