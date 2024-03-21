/**
   const { loading: loadingReviews = true, data: reviewsData } =
    await getClient().query<{
      data: OrderRatingOutputPagination;
    }>({
      query: GET_ORDER_RATINGS,
      variables: { typeId: adId },
    });
 */

import type {
  OrderRatingOutputPagination,
  OrderTypeOutputPagination,
} from '@/components/types.generated';

import { getClient } from '../apollo-wrapper.server';
import { GET_MY_ORDERS, GET_ORDER_RATINGS } from '../gql';

// todo add args
export const getMyOrders = async (): Promise<
  OrderTypeOutputPagination | undefined
> => {
  try {
    const data = await getClient().query<{
      data: OrderTypeOutputPagination;
    }>({
      query: GET_MY_ORDERS as any,
    });

    const user = data?.data?.data;
    return user;
  } catch (error) {
    console.log('getMyOrders error', error);
    return undefined;
  }
};

export const getOrderReviews = async (
  variables: any,
): Promise<OrderRatingOutputPagination | undefined> => {
  try {
    const data = await getClient().query<{
      data: OrderRatingOutputPagination;
    }>({
      query: GET_ORDER_RATINGS as any,
      variables,
    });

    const ratingsPage = data?.data?.data;
    return ratingsPage;
  } catch (error) {
    console.log('getOrderReviews error', error);
    return undefined;
  }
};
