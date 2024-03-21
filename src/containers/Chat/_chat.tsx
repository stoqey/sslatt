import {
  AlignItems,
  Avatar,
  Background,
  Button,
  Column,
  ComboInput,
  CoreText,
  Display,
  FlexDirection,
  Grid,
  GridGutterSize,
  InjectLayout,
  InputSize,
  InputType,
  JustifyContent,
  Layout,
  Pill,
  PillType,
  PresenceStatus,
  SVGAsset,
} from '@uuixjs/uuixweb';
import { BorderRadius } from '@uuixjs/uuixweb-lib';
import React from 'react';

import ChatMessages from './_chat.messages';

interface ChatContainerProps {}

interface ChatContainerState {
  selected: boolean; // ChatItem
}

export const ChatInput = () => {
  // input combo
  return (
    <Layout fullWidth display={Display.Flex} background={Background.Base}>
      <ComboInput
        size={InputSize.Large}
        type={InputType.Text}
        placeholder="Type a message"
        name="message"
        buttonProps={{
          children: 'Send',
          icon: SVGAsset.Faceit,
        }}
      />
    </Layout>
  );
};

const ChatHeader = () => {
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
          <Button overlay icon={SVGAsset.ArrowLeft} />
        </Layout>

        {/* Avatar */}
        <Layout padding={1}>
          <Avatar
            size={50}
            userLogin="xxxxx"
            presenceIndicator
            presenceStatus={PresenceStatus.Online}
          />
        </Layout>

        {/* Receiver name */}
        <Layout display={Display.Flex} flexDirection={FlexDirection.Column}>
          <CoreText as="h4">Reply to name</CoreText>
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

export const ChatConvoItem = () => {
  return (
    <Layout
      fullWidth
      display={Display.Flex}
      padding={{ bottom: 2 }}
      border={BorderRadius.None}
    >
      <Layout padding={1}>
        <Avatar
          size={50}
          userLogin="xxxxx"
          presenceIndicator
          presenceStatus={PresenceStatus.Online}
        />
      </Layout>

      <div style={{ flex: 1 }}>
        <Layout display={Display.Flex} flexDirection={FlexDirection.Column}>
          <CoreText as="h4">My name</CoreText>
          <CoreText as="h5" lines={2}>
            My really long message askdjfnasfdkg dkfjg khdf gkhsdf gks dfgk
            sdfgk sdfgk sdkfjg sdjfknsdfk
            sdfkjnsdljfknsdfljnsdlfnsldfnsldnfljsdnfljsdnfljsdnfjlsd
            sdkfnsdkfjnsldjfnsljdfnljsd sldf sjdfnsjkldfnjsdnfsjkdfs
            dfkjsndfjknsdjfk sdfk skjdf ssr sdkfjnsdfjknsdfjknsd
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
          12:44
        </CoreText>
        <Pill type={PillType.Brand} style={{ fontSize: '15px' }} label="+999" />
      </Layout>
    </Layout>
  );
};

export const ChatContainer = () => {
  const [selected, setSelected] = React.useState(true);

  const cols = selected
    ? { default: 12, xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }
    : { default: 12 };

  return (
    <>
      {/* Mobile back to convo */}
      {selected && (
        <Layout
          breakpointExtraSmall={{ display: Display.Flex }}
          breakpointSmall={{ display: Display.Flex }}
          breakpointMedium={{ display: Display.Hide }}
          breakpointLarge={{ display: Display.Hide }}
          breakpointExtraLarge={{ display: Display.Hide }}
        >
          <Button onClick={() => setSelected(!selected)}>Back to convo </Button>
        </Layout>
      )}

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
              <Button onClick={() => setSelected(!selected)}>
                Select chat
              </Button>

              {new Array(10).fill(0).map((_, i) => (
                <ChatConvoItem key={i} />
              ))}
            </Layout>
          </Column>

          {/* Chat messages */}
          {selected && (
            <Column cols={cols}>
              {/* Chat Header */}
              <Layout
                style={{
                  width: '-webkit-fill-available',
                }}
              >
                <ChatHeader />
              </Layout>
              <Layout
                fullWidth
                className="relative"
                style={{
                  height: '90vh',
                  overflow: 'scroll',
                }}
              >
                {/* Chat Messages */}
                <ChatMessages />
              </Layout>
              {/* Message Input */}
              <Layout
                style={{
                  position: 'absolute',
                  bottom: 0,
                  width: '-webkit-fill-available',
                }}
              >
                <ChatInput />
              </Layout>
            </Column>
          )}
        </Grid>
      </InjectLayout>
    </>
  );
};

export default ChatContainer;
