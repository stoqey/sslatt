import { Avatar, CoreText, Layout } from '@uuixjs/uuixweb';
import { isEmpty } from 'lodash';
import React from 'react';

import { cdnPath } from '@/lib/utils/api.utils';

import type { ChatMessageItem } from './Chat.interfaces';

export function ChatItem(props: ChatMessageItem) {
  const { align, name = '', time, text, owner } = props;
  const isRight = align === 'right';

  const avatar = cdnPath(owner.avatar || '');

  return (
    <div className={`chat chat-${isRight ? 'end' : 'start'}`}>
      <div className="chat-image avatar">
        <div>
          <Avatar
            src={!isEmpty(avatar) && avatar}
            alt={owner.username}
            userLogin={owner.username}
            size={40}
          />
        </div>
      </div>
      <div className="chat-header flex">
        <CoreText>{name}</CoreText>
        <Layout padding={{ left: 1, right: 1 }}>
          <CoreText className="opacity-50">{time}</CoreText>
        </Layout>
      </div>
      <div className="chat-bubble">
        <CoreText
          dangerouslySetInnerHTML={{
            __html: (text || '').replaceAll('\n', '<br />'),
          }}
        />
      </div>
      {/* <div className="chat-footer opacity-50">
        <CoreText>Delivered ? Seen</CoreText>
      </div> */}
    </div>
  );
}

export default ChatItem;
