import { useApolloClient } from '@apollo/client';
import {
  AlignItems,
  Avatar,
  Background,
  Button,
  ComboInput,
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
import { BorderRadius } from '@uuixjs/uuixweb-lib';
import { isEmpty } from 'lodash';
import moment from 'moment';
import React, { useState } from 'react';

import { sendTyping, useChatMessageQuery } from '@/lib/hooks';
import { cdnPath } from '@/lib/utils/api.utils';

import type {
  ChatMessageItem,
  ChatMessageType,
  ConvoItemProps,
} from './Chat.interfaces';
import ChatItem from './ChatItem';

interface ChatInputProps {
  owner: string;
  convoId: string;
  sendMessage: (message: Partial<ChatMessageType>) => Promise<boolean>;
}

interface ChatInputState {
  message: string;
  // attachments: string[]; // TODO
  loading?: boolean;
  typing?: boolean; // TODO in the future it's gonna be an array of member of the chat
}

export const ChatInput = (props: ChatInputProps) => {
  const client = useApolloClient();
  const { sendMessage, convoId, owner } = props;

  // TODO chat attachments
  const [state, setState] = useState<ChatInputState>({
    message: '',
    // typing: false,
  });

  const { message } = state;

  const sendIsTyping = () => {
    sendTyping({
      client,
      args: {
        convoId,
      },
    });
  };
  const setMessage = (msg: string) => {
    setState({ ...state, message: msg });
    sendIsTyping();
  };

  const sendingMessage = async (): Promise<void> => {
    if (isEmpty(message)) {
      return;
    }

    const sent = await sendMessage({
      message,
    } as any);

    if (sent) {
      setMessage(''); // empty the input field
    }
  };

  // input combo
  return (
    <Layout fullWidth display={Display.Flex} background={Background.Base}>
      {/* TODO typing */}
      <ComboInput
        value={message}
        onChange={(v: any) => setMessage(v.target?.value)}
        size={InputSize.Large}
        type={InputType.Text}
        placeholder="Type a message"
        name="message"
        buttonProps={{
          children: 'Send',
          icon: SVGAsset.Faceit,
          onClick: () => sendingMessage(),
        }}
      />
    </Layout>
  );
};

interface ChatHeaderProps {
  convo: ConvoItemProps;
  hideMessages: () => void;
}

const ChatHeader = (props: ChatHeaderProps) => {
  const { hideMessages, convo } = props;

  if (!convo) return undefined;

  const { avatar = '', name = '' } = convo;

  return (
    <Layout
      display={Display.Flex}
      justifyContent={JustifyContent.Between}
      border={BorderRadius.None}
    >
      <Layout
        display={Display.Flex}
        flexDirection={FlexDirection.Row}
        justifyContent={JustifyContent.Center}
        alignItems={AlignItems.Center}
      >
        {/* Back */}
        <Layout display={Display.Flex} alignItems={AlignItems.Center}>
          <Button
            onClick={() => hideMessages()}
            overlay
            icon={SVGAsset.ArrowLeft}
          />
        </Layout>

        {/* Avatar */}
        <Layout padding={1}>
          <Avatar
            alt={name}
            src={cdnPath(avatar)}
            size={50}
            userLogin={name}
            presenceIndicator
            presenceStatus={PresenceStatus.Online}
          />
        </Layout>

        {/* Receiver name */}
        <Layout display={Display.Flex} flexDirection={FlexDirection.Column}>
          <CoreText as="h4">{name}</CoreText>
          <CoreText as="h5">Online</CoreText>
        </Layout>
      </Layout>
      <Layout
        display={Display.Flex}
        flexDirection={FlexDirection.Row}
        justifyContent={JustifyContent.Center}
        alignItems={AlignItems.Center}
      >
        <Button overlay icon={SVGAsset.More} />
      </Layout>
    </Layout>
  );
};

interface Props {
  viewType: 'order' | 'chat';
  convo: ConvoItemProps;
  hideMessages: () => void;
}

export function ChatMessages(props: Props) {
  const { convo, hideMessages, viewType = 'chat' } = props;
  const convoId = convo.id;

  // const layoutDispatch = useLayoutDispatch();
  const { state, sendMessage, getOlderMessages, owner } = useChatMessageQuery({
    convoId,
    limit: 10,
    before: new Date(),
  });
  const { messages, hasEarlier } = state;

  const isMyMessage = (msgOwner: string) => msgOwner === owner;

  // @ts-ignore
  const chatMessages: ChatMessageItem[] = messages.map((msg) => ({
    id: msg.id,
    type: 'text', // TODO when attachments
    name: msg.owner.fullname,
    align: isMyMessage(msg.owner.id) ? 'right' : 'left',
    owner: msg.owner,
    text: msg.message,
    time: moment(new Date(msg.createdAt || new Date())).fromNow(),
  }));

  if (viewType === 'order') {
    return (
      <>
        {/* Chat Header */}
        {/* TODO custom header */}

        {/* Chat Messages */}
        <Layout
          fullWidth
          className="relative"
          style={{
            height: '30vh',
            overflow: 'scroll',
          }}
        >
          {chatMessages.map((item) => (
            <ChatItem key={item.id} {...item} />
          ))}
        </Layout>

        {/* Message Input */}
        <Layout
          style={
            {
              // position: "absolute",
              // bottom: 0,
              // width: "-webkit-fill-available",
            }
          }
        >
          {owner && (
            <ChatInput
              owner={owner}
              convoId={convoId}
              sendMessage={sendMessage}
            />
          )}
        </Layout>
      </>
    );
  }

  return (
    <>
      {/* <ChatHeader convo={convo} hideMessages={hideMessages} />
      <FlatList
        // refreshing={true}
        // ListHeaderComponent={() => <View style={{ width: 20, backgroundColor: "blue", height: 20 }} />}
        ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
        ListHeaderComponent={() => <View style={{ height: 50 }} />}
        ListFooterComponent={() => <View style={{ height: 50 }} />}
        data={chatMessages}
        // @ts-ignore
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ChatItem item={item} />}
        // onRefresh={() => {
        //   console.log("on refresh")
        // }}
        inverted
        onEndReached={() => {
          if (hasEarlier) {
            getOlderMessages();
          }
        }}
        onEndReachedThreshold={0.5}
        removeClippedSubviews // for performance
        onScrollEndDrag={() => console.log("end")}
        onScrollBeginDrag={() => console.log("start")}
      />

      {owner && (
        <ChatInput owner={owner} convoId={convoId} sendMessage={sendMessage} />
      )} */}

      {/* Chat Header */}
      <Layout
        style={{
          width: '-webkit-fill-available',
        }}
      >
        <ChatHeader convo={convo} hideMessages={hideMessages} />
      </Layout>

      {/* Chat Messages */}
      <Layout
        fullWidth
        className="relative"
        style={{
          height: '90vh',
          overflow: 'scroll',
        }}
      >
        {chatMessages.map((item) => (
          <ChatItem key={item.id} {...item} />
        ))}
      </Layout>

      {/* Message Input */}
      <Layout
        style={{
          position: 'absolute',
          bottom: 0,
          width: '-webkit-fill-available',
        }}
      >
        {owner && (
          <ChatInput
            owner={owner}
            convoId={convoId}
            sendMessage={sendMessage}
          />
        )}
      </Layout>
    </>
  );
}

export default ChatMessages;
