import {
  Column,
  Display,
  FlexDirection,
  Grid,
  GridGutterSize,
  InjectLayout,
} from '@uuixjs/uuixweb';
import { BorderRadius } from '@uuixjs/uuixweb-lib';
// import ChatMessage from "./ChatMessage";
import React from 'react';

import type { ConvoItemProps } from './Chat.interfaces';
import { createConvoProps } from './Chat.interfaces';
import type { ChatListHtmlProps } from './ChatList.html';
import ChatList from './ChatList.html';
import type { ChatMessagesHtmlProps } from './ChatMessage.html';
import ChatMessage from './ChatMessage.html';

// import ChatList, { ConvoItemProps, createConvoProps } from "./ChatList";

export interface ChatContainerHtmlProps
  extends ChatListHtmlProps,
    ChatMessagesHtmlProps {
  selected?: ConvoItemProps;
}

/**
 * @mobile super easy
 * @desktop create some custom css
 * @returns
 */
export const ChatContainerHtml = (props?: ChatContainerHtmlProps) => {
  const { ...otherProps } = props;

  const selected = props?.convo ? createConvoProps(props.convo as any) : null;

  const cols = selected
    ? { default: 12, xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }
    : { default: 12 };

  return (
    <InjectLayout
      display={Display.Flex}
      fullHeight
      fullWidth
      id="chat-container"
      className="chat-container"
    >
      <Grid gutterSize={GridGutterSize.None}>
        {/* Convo list */}

        <InjectLayout
          display={Display.Hide}
          flexDirection={FlexDirection.Column}
          breakpointExtraSmall={
            selected ? { display: Display.Hide } : { display: Display.Flex }
          }
          breakpointSmall={
            selected ? { display: Display.Hide } : { display: Display.Flex }
          }
          breakpointMedium={{ display: Display.Flex }}
          breakpointLarge={{ display: Display.Flex }}
          breakpointExtraLarge={{ display: Display.Flex }}
          border={BorderRadius.None}
        >
          <Column
            cols={cols}
            style={{
              height: '100vh !important',
              flex: 1,
              overflow: 'scroll !important',
            }}
          >
            <ChatList {...otherProps} />

            {/* <div className="w-full h-20 bg-red-950" style={{ height: "1000px"}} />  */}
          </Column>
        </InjectLayout>

        {/* Chat messages */}
        {selected && (
          <Column cols={cols}>
            <ChatMessage {...otherProps} convo={selected} />
          </Column>
        )}
      </Grid>
    </InjectLayout>
  );
};

export default ChatContainerHtml;
