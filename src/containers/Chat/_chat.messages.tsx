import { Avatar, CoreText, Layout } from '@uuixjs/uuixweb';
import React from 'react';

export const ChatMessageBubbles = () => (
  <>
    <div className="chat chat-start">
      <div className="chat-image avatar">
        <div>
          <Avatar alt="sdfsdf" userLogin="xxxxxxx" size={40} />
        </div>
      </div>
      <div className="chat-header flex">
        <CoreText>Obi-Wan Kenobi</CoreText>
        <Layout padding={{ left: 1, right: 1 }}>
          <CoreText className="opacity-50">12:45</CoreText>
        </Layout>
      </div>
      <div className="chat-bubble">
        <CoreText>
          You were the Chosen One! It was said that you would destroy the Sith,
          not join them. You were to bring balance to the force, not leave it in
          darkness.
        </CoreText>
      </div>
      <div className="chat-footer opacity-50">
        <CoreText>Delivered</CoreText>
      </div>
    </div>
    <div className="chat chat-end">
      <div className="chat-image avatar">
        <div>
          <Avatar alt="sdfsdf" userLogin="22222222" size={40} />
        </div>
      </div>
      <div className="chat-header flex">
        <CoreText>You</CoreText>
        <Layout padding={{ left: 1, right: 1 }}>
          <CoreText className="opacity-50">12:46</CoreText>
        </Layout>
      </div>
      <div className="chat-bubble">
        <CoreText>
          Really? I thought it was the other way around.
          sdkjfgnsdfkjgnsdfgljndsfgfg sdfgsdfkjg sdfkjg sdkjfg sdkfg
          sdfgksdfgsdfg sdfgskdfg sdkfg skdjfg ksd
          fgkjsdfgnsdfgkjsndfgkjnsdkjfgnkjsdfngkjsdfngkjsdnfjkgnsdfkjg sdfgks
          dfgkjsd fn
        </CoreText>
      </div>

      <div className="chat-footer opacity-50">
        <CoreText>Seen at 12:46</CoreText>
      </div>
    </div>
  </>
);

export default ChatMessageBubbles;
