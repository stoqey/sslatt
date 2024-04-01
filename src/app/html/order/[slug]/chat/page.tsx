import { cookies } from 'next/headers';

import type { OrderTypeOutput, UserType } from '@/components/types.generated';
import { getClient } from '@/lib/apollo-wrapper.server';
import { GET_ORDER } from '@/lib/gql';
import { fetchChatMessages, startChatFromOrder } from '@/lib/hooksServer/chat';
import { getMe } from '@/lib/hooksServer/user';
import { getVendor } from '@/lib/hooksServer/vendor';

import OrderViewActionPage from './view';

const OrderViewPage = async ({ params }: { params: { slug: string } }) => {
  const id = params.slug;
  const cookieStore = cookies();

  let vendor;
  let convo;
  let messages;
  const message = cookieStore.get('message')?.value;
  const success = cookieStore.get('success')?.value === 'true';

  const { data: orderData } = await getClient().query<{
    data: OrderTypeOutput;
  }>({
    query: GET_ORDER,
    variables: { id },
  });
  const order = orderData.data;

  const user = await getMe();
  if (order && user) {
    vendor = await getVendor();

    convo = await startChatFromOrder({
      order,
      user,
    });
    
    // convo = await startChatFromUsers({
    //   friends: [order.seller as UserType],
    //   user,
    // });

    const messagesPage = convo
      ? await fetchChatMessages({
          convoId: convo.convoId as string,
          before: new Date(),
          limit: 100,
        })
      : { items: [] };

    messages = messagesPage?.items || [];

    // console.log("OrderViewPage", {
    //   messagesPage,
    //   // order,
    //   // user,
    //   // vendor,
    //   convo,
    //   messages,
    // });
  }

  return (
    <OrderViewActionPage
      id={id}
      label="order"
      actionId="order"
      message={message}
      success={success}
      order={order}
      user={user}
      messages={messages}
      convo={convo}
      vendor={vendor}
    />
  );
};

export default OrderViewPage;
