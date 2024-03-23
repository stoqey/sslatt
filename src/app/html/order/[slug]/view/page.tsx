import { cookies } from 'next/headers';

import type { OrderTypeOutput } from '@/components/types.generated';
import { getClient } from '@/lib/apollo-wrapper.server';
import { GET_ORDER } from '@/lib/gql';
import { getMe } from '@/lib/hooksServer/user';

import OrderViewActionPage from './view';

const OrderViewPage = async ({ params }: { params: { slug: string } }) => {
  const id = params.slug;
  const cookieStore = cookies();
  const message = cookieStore.get('message')?.value;
  const success = cookieStore.get('success')?.value === 'true';

  const user = await getMe();
  // console.log("OrderViewPage", { id });
  const { data: orderData } = await getClient().query<{
    data: OrderTypeOutput;
  }>({
    query: GET_ORDER,
    variables: { id },
  });

  const order = orderData.data;

  // console.log("OrderViewPage order", order);

  return (
    <OrderViewActionPage
      id={id}
      label="order"
      actionId="order"
      message={message}
      success={success}
      order={order}
      user={user}
    />
  );
};

export default OrderViewPage;
