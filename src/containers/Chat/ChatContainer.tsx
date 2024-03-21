import { useApolloClient } from '@apollo/client';
// import ChatList, { ConvoItemProps, createConvoProps } from "./ChatList";
import type { UserType } from '@stoqey/client-graphql';
import { awaitTo } from '@stoqey/client-graphql';
import {
  Column,
  Display,
  FlexDirection,
  Grid,
  GridGutterSize,
  InjectLayout,
  Layout,
} from '@uuixjs/uuixweb';
import isEmpty from 'lodash/isEmpty';
// import ChatMessage from "./ChatMessage";
import React from 'react';

import { startChatFromUsers } from '@/lib/hooks/apiChat';

import type { ConvoItemProps } from './Chat.interfaces';
import { createConvoProps } from './Chat.interfaces';
import ChatList from './ChatList';
import ChatMessage from './ChatMessage';

interface Props {
  filterIntent?: string; // any app
}

/**
 * @mobile super easy
 * @desktop create some custom css
 * @returns
 */
export const ChatContainer = (props?: Props) => {
  const client = useApolloClient();
  const [selected, setSelected] = React.useState<ConvoItemProps>();

  const isChatSelected = !isEmpty(selected);

  const startChatWith = async (users: UserType[]) => {
    // find if convo exists
    // else create a new convo
    const [errorCreatingConvo, createdConvo] = await awaitTo(
      startChatFromUsers({ client, friends: users }),
    );

    if (createdConvo && createdConvo.convoId) {
      const newSelectedConvoProps = createConvoProps(createdConvo);
      setSelected(newSelectedConvoProps);
    }
    // TODO throw some error to UI
  };

  const hideMessages = () => setSelected(undefined);

  const cols = selected
    ? { default: 12, xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }
    : { default: 12 };

  //   <ChatList startChatWith={startChatWith} onSelected={(item) => setSelectedConvo(item)} />
  //   <ChatList startChatWith={startChatWith} onSelected={(item) => setSelectedConvo(item)} />
  //   <ChatMessage convo={selectedConvo} hideMessages={hideMessages} />
  return (
    <>
      {/* Mobile back to convo */}
      {/* {selectedConvo && (
        <Layout
          breakpointExtraSmall={{ display: Display.Flex }}
          breakpointSmall={{ display: Display.Flex }}
          breakpointMedium={{ display: Display.Hide }}
          breakpointLarge={{ display: Display.Hide }}
          breakpointExtraLarge={{ display: Display.Hide }}
        >
          <Button onClick={() => setSelected(!selected)}>Back to convo </Button>
        </Layout>
      )} */}

      <InjectLayout
        display={Display.Flex}
        fullHeight
        fullWidth
        id="chat-container"
        className="chat-container"
      >
        <Grid gutterSize={GridGutterSize.None}>
          {/* Convo list */}

          <Column cols={cols}>
            <Layout
              display={Display.Flex}
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
              style={{ height: '100vh', flex: 1, overflow: 'scroll' }}
            >
              <ChatList
                startChatWith={startChatWith}
                onSelected={(item) => setSelected(item)}
              />
            </Layout>
          </Column>

          {/* Chat messages */}
          {selected && (
            <Column cols={cols}>
              <ChatMessage convo={selected} hideMessages={hideMessages} />
            </Column>
          )}
        </Grid>
      </InjectLayout>
    </>
  );
};

export default ChatContainer;
