import { GET_ME } from '@roadmanjs/auth-client';
import _get from 'lodash/get';

import type {
  OrderRatingOutputPagination,
  OrderTypeOutput,
} from '@/components/types.generated';
import { getClient } from '@/lib/apollo-wrapper.server';
import { GET_MY_ORDERS } from '@/lib/gql';

import OrderListPage from './order.list';

const OrderPage = async () => {
  const data = await getClient().query({
    query: GET_ME as any,
  });

  const user = data?.data?.me;

  const ordersData = await getClient().query<{
    data: OrderRatingOutputPagination;
  }>({
    query: GET_MY_ORDERS as any,
    variables: {
      before: new Date(),
      limit: 1000,
    },
  });

  const orders: OrderTypeOutput[] = _get(
    ordersData,
    'data.data.items',
    [],
  ) as OrderTypeOutput[];

  return <OrderListPage user={user} orders={orders} />;
};

export default OrderPage;
