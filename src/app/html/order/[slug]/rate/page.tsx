import _get from 'lodash/get';
import { cookies } from 'next/headers';

import type { OrderRatingOutput } from '@/components/types.generated';
import { ActionPage } from '@/containers/action.page.html';
import { getClient } from '@/lib/apollo-wrapper.server';
import { GET_ORDER_RATING_ID } from '@/lib/gql';

const OrderRatingActionPage = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const id = params.slug;
  const cookieStore = cookies();
  const message = cookieStore.get('message')?.value;
  const success = cookieStore.get('success')?.value === 'true';

  const { data: existingRating } = await getClient().query<{
    data: OrderRatingOutput;
  }>({
    query: GET_ORDER_RATING_ID,
    variables: { orderId: id },
  });

  console.log('OrderRatingActionPage', { existingRating, id });

  const rating = _get(existingRating, 'data.rating', 0);
  const review = _get(existingRating, 'data.review', '');

  return (
    <ActionPage
      id={id}
      label="order"
      actionId="order"
      message={message}
      success={success}
      review={review}
      rating={rating}
    />
  );
};

export default OrderRatingActionPage;
