'use client';

import { Display, Layout } from '@uuixjs/uuixweb';

import { Container } from '@/components/container';
import type { WithdrawRequestOutput } from '@/components/types.generated';
import type { ActionPageProps } from '@/containers/action.page.html';
import { ActionPage } from '@/containers/action.page.html';
import { withdrawFields } from '@/containers/Withdraw/withdraw.list.html';

interface Props extends ActionPageProps {
  item: WithdrawRequestOutput;
}

const WithdrawSlugViewActionPage = async (props: Props) => {
  const backLink = '/html/wallet/withdraw';
  const actionId = 'withdraw';
  const actionName = 'view';

  return (
    <Layout display={Display.Flex} fullWidth>
      <Layout fullWidth>
        <Container size={7}>
          <ActionPage
            {...props}
            actionId={actionId}
            actionName={actionName}
            fields={withdrawFields}
            backLink={backLink}
          />
        </Container>
      </Layout>
    </Layout>
  );
};

export default WithdrawSlugViewActionPage;
