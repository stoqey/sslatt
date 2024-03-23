import { cookies } from 'next/headers';

import type { WithdrawRequestOutput } from '@/components/types.generated';
import { getClient } from '@/lib/apollo-wrapper.server';
import { GET_WITHDRAW_REQUEST_BY_ID } from '@/lib/gql';

import WithdrawSlugViewActionPage from './view';

const WithdrawRequestViewPage = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const id = params.slug;
  const cookieStore = cookies();
  const message = cookieStore.get('message')?.value;
  const success = cookieStore.get('success')?.value === 'true';

  console.log('WithdrawRequestViewPage', { id });
  const { data: orderData } = await getClient().query<{
    data: WithdrawRequestOutput;
  }>({
    query: GET_WITHDRAW_REQUEST_BY_ID,
    variables: { id },
  });

  const withdraw = orderData.data;

  return (
    <WithdrawSlugViewActionPage
      id={id}
      message={message}
      success={success}
      item={withdraw}
    />
  );
};

export default WithdrawRequestViewPage;
