'use client';

import { Display, Layout } from '@uuixjs/uuixweb';

import { Container } from '@/components/container';
import type { ActionPageProps } from '@/containers/action.page.html';
import { ActionPage } from '@/containers/action.page.html';
import { transactionsFields } from '@/containers/Wallet/Transactions.html';

interface Props extends ActionPageProps {
  item: any;
}

const TransactionViewActionPage = async (props: Props) => {
  const backLink = '/html/wallet/transactions';
  const actionId = 'transactions';
  const actionName = 'view';

  return (
    <Layout display={Display.Flex} fullWidth>
      <Layout fullWidth>
        <Container size={7}>
          <ActionPage
            {...props}
            actionId={actionId}
            actionName={actionName}
            fields={transactionsFields}
            backLink={backLink}
          />
        </Container>
      </Layout>
    </Layout>
  );
};

export default TransactionViewActionPage;
