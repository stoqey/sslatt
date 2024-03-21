import type { UserType } from '@roadmanjs/auth-client';
import {
  AlignItems,
  Avatar,
  CoreText,
  Display,
  FlexDirection,
  JustifyContent,
  Layout,
  Pill,
  PillType,
  PresenceStatus,
} from '@uuixjs/uuixweb';
import { BorderRadius } from '@uuixjs/uuixweb-lib';
import isEmpty from 'lodash/isEmpty';
import React, { useEffect } from 'react';

import type { OnChatMessage } from '@/lib/hooks';
import { useConvoData, useConvoSubscription } from '@/lib/hooks';
import { cdnPath } from '@/lib/utils/api.utils';

import type { ConvoItemProps } from './Chat.interfaces';
import { createConvoProps } from './Chat.interfaces';

interface ConvoListItemProps extends ConvoItemProps {
  convoSub: OnChatMessage[];
  onSelected: (selected: ConvoItemProps) => void;
}

export function ConvoItem(props: ConvoListItemProps) {
  const { onSelected, convoSub, ...item } = props;
  const { id, name, avatar, text, unread, time } = item;

  // TODO add some tiny state to toggle the typing
  const isPhoto = item.photo;
  const isUnread = item.unread;

  const isTyping = () => {
    const isThisMsg = convoSub.find((convo) => convo.convoId === id);

    if (isThisMsg) {
      const convoTyping = isThisMsg.typing;
      return !!convoTyping;
    }
    return false;
  };

  const typing = isTyping();

  return (
    <Layout
      fullWidth
      display={Display.Flex}
      padding={{ bottom: 2 }}
      border={BorderRadius.None}
      onClick={() => onSelected(item)}
    >
      <Layout padding={1}>
        <Avatar
          // CDN url
          alt={name || 'sender'}
          src={cdnPath(avatar)}
          size={50}
          userLogin={name}
          presenceIndicator
          presenceStatus={PresenceStatus.Online}
        />
      </Layout>

      <div style={{ flex: 1 }}>
        <Layout display={Display.Flex} flexDirection={FlexDirection.Column}>
          <CoreText as="h4">{name}</CoreText>
          <CoreText as="h5" lines={2}>
            {typing ? 'typing...' : text}
          </CoreText>
        </Layout>
      </div>

      <Layout
        display={Display.Flex}
        flexDirection={FlexDirection.Column}
        justifyContent={JustifyContent.Center}
        alignItems={AlignItems.Center}
        padding={1}
      >
        <CoreText as="h5" bold>
          {time}
        </CoreText>
        {isUnread && (
          <Pill
            type={PillType.Brand}
            style={{ fontSize: '15px' }}
            label={`${unread}`}
          />
        )}
      </Layout>
    </Layout>
  );
}

interface ChatListProps {
  filterIntent?: string; // filter depending on app
  onSelected: (selected: ConvoItemProps) => void;
  startChatWith: (users: UserType[]) => Promise<any>;
  listProps?: any;
}

export function ChatList(props: ChatListProps) {
  const { onSelected, startChatWith } = props;

  const listProps = props.listProps || {};

  // TODO pass filter
  const {
    convos = [],
    fetchOlder,
    fetchNew,
    hasEarlier,
  } = useConvoData({ before: new Date(), limit: 10 });

  const convosSub = useConvoSubscription();

  // TODO quick effect to test, after move it to hook
  useEffect(() => {
    const hasNewMessages = convosSub.filter((cb) => !!cb.message);
    if (!isEmpty(hasNewMessages)) {
      // fetch for new convos
      fetchNew();
    }
  }, [convosSub]);

  const convoItems: ConvoItemProps[] = convos.map((convo) =>
    createConvoProps(convo),
  );

  // fetch useChatConvo
  return (
    <>
      {convoItems.map((item) => (
        <ConvoItem
          key={item.id}
          onSelected={onSelected}
          {...item}
          convoSub={convosSub}
        />
      ))}

      {/* Screen goes here */}
      {/* <FlatList
        ListHeaderComponent={() => <ChatListOptions startChatWith={startChatWith} />}
        ItemSeparatorComponent={() => <View style={{ width: 20, height: 20 }} />}
        data={convoItems}
        extraData={extraConv}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <ConvoItem onSelected={onSelected} {...item} convoSub={convosSub} />}
        onEndReached={() => {
          if (hasEarlier) {
            fetchOlder()
          }
        }}
        onEndReachedThreshold={0.5}
        removeClippedSubviews
        onScrollEndDrag={() => console.log("end")}
        onScrollBeginDrag={() => console.log("start")}
        {...listProps}
      /> */}
    </>
  );
}

export default ChatList;
