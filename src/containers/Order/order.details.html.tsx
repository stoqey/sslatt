'use client';

import { CoreText, JustifyContent, Layout, Tabs } from '@uuixjs/uuixweb';
import { includes } from 'lodash';
import { useParams, usePathname } from 'next/navigation';
import React from 'react';

import { Container } from '@/components/container';
import type { OrderTypeOutput, UserType } from '@/components/types.generated';

import type { ActionHtmlProps } from '../actions.html';
import { ViewActionHtml } from '../actions.html';
import { createConvoProps } from '../Chat/Chat.interfaces';
import type { ChatMessagesHtmlProps } from '../Chat/ChatMessage.html';
import ChatMessagesHtml from '../Chat/ChatMessage.html';
import { OrderDetails } from './order.details';
import { orderViewFields } from './order.list';

interface OrderChatMessagesProps extends ChatMessagesHtmlProps {
  // eslint-disable-next-line react/no-unused-prop-types
  order: OrderTypeOutput;
}
const OrderChatMessagesHtml = (props: OrderChatMessagesProps) => {
  const { messages, convo, message, success, user } = props;
  const convoProps = convo && convo.id ? createConvoProps(convo as any) : null;

  return (
    convoProps && (
      <ChatMessagesHtml
        viewType="order"
        convo={convoProps}
        messages={messages}
        message={message}
        success={success}
        user={user}
      />
    )
  );
};

export const OrderFeedbackHtml = () => {
  return (
    <Layout fullWidth>
      <CoreText>Coming soon</CoreText>
    </Layout>
  );
};

export interface OrderDetailsContainerHtmlProps extends ChatMessagesHtmlProps {
  user?: UserType;
  order?: OrderTypeOutput;
}

export const OrderDetailsContainerHtml = (
  props: OrderDetailsContainerHtmlProps & Partial<ActionHtmlProps>,
) => {
  const { slug } = useParams();
  const pathname = usePathname();

  const tabs = {
    details: `/html/order/${slug}`,
    chat: `/html/order/${slug}/chat`,
    feedback: `/html/order/${slug}/feedback`,
  };

  const tabsIndexByPath = () => {
    if (includes(pathname, 'chat')) return 1;
    if (includes(pathname, 'feedback')) return 2;
    return 0;
  };

  const tabsIndex = tabsIndexByPath();

  const { order } = props;

  if (!order) return undefined;

  const removeFields = ['Details', 'Type'];
  const orderFields = orderViewFields.filter(
    (field) => !removeFields.includes(field.label),
  );

  return (
    <Layout>
      {/* Order Item */}
      <Container>
        {/* <OrderListHtml user={user} orders={[order]} /> */}
        <ViewActionHtml fields={orderFields} item={order} />
      </Container>

      {/* Order Summary */}

      {/* Order Tabs
    // TODO | Dispute
        Details | Chat | Feedback
    */}

      <Layout fullWidth margin={{ top: 2 }}>
        <Tabs
          justifyContent={JustifyContent.Center}
          activeTabIndex={tabsIndex}
          tabs={[
            { children: <div>Details</div>, linkTo: tabs.details },
            { children: <div>Chat</div>, linkTo: tabs.chat },
            // { children: <div>Feedback</div>, linkTo: tabs.feedback },
          ]}
        />

        {/* 
            {tabsIndex === 0 && <OrderDetails {...order} />}
            {tabsIndex === 1 && <OrderChatMessagesHtml {...props} />}
            {tabsIndex === 2 && <OrderFeedback {...order} />}
        */}
        <Container size={9}>
          <Layout padding={{ top: 2 }}>
            {tabsIndex === 0 && <OrderDetails {...order} />}
            {tabsIndex === 1 && <OrderChatMessagesHtml {...props} />}
          </Layout>
        </Container>
      </Layout>
    </Layout>
  );
};

export default OrderDetailsContainerHtml;
