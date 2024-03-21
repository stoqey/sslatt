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
import { isEmpty } from 'lodash';
import Link from 'next/link';
import React from 'react';

import type { ChatConvo } from '@/components/types.generated';
import { cdnPath } from '@/lib/utils/api.utils';

import type { ConvoItemProps } from './Chat.interfaces';
import { createConvoProps } from './Chat.interfaces';

export function ConvoItemHtml(item: ConvoItemProps) {
  const { id, name, avatar, text, unread = 0, time } = item;

  // TODO add some tiny state to toggle the typing
  const isPhoto = item.photo;
  const isUnread = unread > 0;

  const onClickToChat = `/html/chat/${id}`;

  return (
    <Link href={onClickToChat}>
      <Layout
        fullWidth
        display={Display.Flex}
        padding={{ bottom: 2 }}
        border={BorderRadius.None}
      >
        <Layout padding={1}>
          <Avatar
            alt={name || 'sender'}
            src={!isEmpty(avatar) ? cdnPath(avatar) : null}
            size={40}
            userLogin={id}
            presenceIndicator
            presenceStatus={PresenceStatus.Online}
          />
        </Layout>

        <div style={{ flex: 1 }}>
          <Layout display={Display.Flex} flexDirection={FlexDirection.Column}>
            <CoreText as="h4" lines={1}>
              {name}
            </CoreText>
            <CoreText as="h5" lines={2}>
              {text}
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
    </Link>
  );
}

export interface ChatListHtmlProps {
  convos: ChatConvo[];
}

export function ChatListHtml(props: ChatListHtmlProps) {
  const convos = props.convos || [];

  if (isEmpty(convos)) return undefined;

  const convoItems: ConvoItemProps[] = convos.map((convo: ChatConvo) =>
    createConvoProps(convo as any),
  );

  // fetch useChatConvo
  return (
    <>
      {convoItems.map((item) => (
        <ConvoItemHtml key={item.id} {...item} />
      ))}
    </>
  );
}

export default ChatListHtml;
