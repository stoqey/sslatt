import { useApolloClient, useQuery } from '@apollo/client';
import { awaitTo } from '@stoqey/client-graphql';
import {
  CoreText,
  InFeatureNotification,
  JustifyContent,
  Layout,
  NotificationType,
  Tabs,
} from '@uuixjs/uuixweb';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';

import type { ChatConvo, OrderTypeOutput } from '@/components/types.generated';
import { GET_ORDER } from '@/lib/gql';
import { startChatFromOrder, useMeApi } from '@/lib/hooks';

import { createConvoProps } from '../Chat/Chat.interfaces';
import ChatMessages from '../Chat/ChatMessage';
import OrderList from './order.list';

interface OrderChatMessagesProps {
  order: OrderTypeOutput;
}
const OrderChatMessages = (props: OrderChatMessagesProps) => {
  const { order } = props;
  const client = useApolloClient();
  const [convo, setConvo] = React.useState<ChatConvo>();

  const getChatConvo = async () => {
    // const checkIfLoggedIn = await loginCheck(window.location.pathname, router);
    // if (!checkIfLoggedIn) {
    //   return;
    // }
    // Check if user is loggedin
    const [errorconvo, chatConvo] = await awaitTo(
      startChatFromOrder(order, client),
    );
    if (chatConvo) {
      const convoId = chatConvo.id;
      console.log('convoId', convoId);
      if (convoId && chatConvo) {
        setConvo(chatConvo as any);
      }
    }
  };

  useEffect(() => {
    if (!order) return;
    getChatConvo();
  }, [order]);

  const convoProps = convo && convo.id ? createConvoProps(convo as any) : null;

  return (
    convoProps && (
      <ChatMessages
        viewType="order"
        convo={convoProps}
        hideMessages={() => {}}
      />
    )
  );
};

export const OrderFeedback = (props: OrderTypeOutput) => {
  return (
    <Layout fullWidth>
      <CoreText>Coming soon</CoreText>
    </Layout>
  );
};

export const OrderDetails = (props: OrderTypeOutput) => {
  return (
    <Layout fullWidth>
      <InFeatureNotification
        message={{
          title: 'Encrypted Order Details',
          description: props.details as string,
        }}
        type={NotificationType.Info}
      />
    </Layout>
  );
};

export const OrderDetailsContainer = () => {
  const { slug } = useParams();

  const [tabsIndex, setTabIndex] = React.useState(0);

  const user = useMeApi();
  const { data, loading, refetch } = useQuery<{ data: OrderTypeOutput }>(
    GET_ORDER,
    {
      variables: {
        id: slug,
      },
    },
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data?.data) {
    return undefined;
  }

  return (
    <>
      {/* Order Item */}
      <OrderList user={user} orders={[data.data as any]} refetch={refetch} />

      {/* Order Summary */}
      {/* <ViewAction
        fields={orderViewFields}
        item={data.data as any}
        showAmounts={false}
      /> */}

      {/* Order Tabs
    // TODO | Dispute
        Details | Chat | Feedback
    */}

      <Layout fullWidth>
        <Tabs
          justifyContent={JustifyContent.Center}
          activeTabIndex={tabsIndex}
          tabs={[
            { children: <div>Details</div>, onClick: () => setTabIndex(0) },
            { children: <div>Chat</div>, onClick: () => setTabIndex(1) },
            { children: <div>Feedback</div>, onClick: () => setTabIndex(2) },
          ]}
        />
        <Layout padding={{ top: 2 }}>
          {tabsIndex === 0 && <OrderDetails {...data.data} />}
          {tabsIndex === 1 && <OrderChatMessages order={data.data} />}
          {tabsIndex === 2 && <OrderFeedback {...data.data} />}
        </Layout>
      </Layout>
    </>
  );
};

export default OrderDetailsContainer;
