import type { WithdrawRequestOutputPagination } from '@/components/types.generated';
import { getClient } from '@/lib/apollo-wrapper.server';
import { GET_MY_WITHDRAW_REQUEST } from '@/lib/gql';
import { getMe } from '@/lib/hooksServer/user';

import WithdrawRequestsListPage from './withdraw.list';

const WithdrawPage = async () => {
  const user = await getMe();

  const withdrawData = await getClient().query<{
    data: WithdrawRequestOutputPagination;
  }>({
    query: GET_MY_WITHDRAW_REQUEST as any,
    variables: { before: new Date() },
  });

  // console.log("withdrawData", withdrawData);

  const withdrawPage = withdrawData.data.data;

  return <WithdrawRequestsListPage user={user} withdrawPage={withdrawPage} />;
};

export default WithdrawPage;
