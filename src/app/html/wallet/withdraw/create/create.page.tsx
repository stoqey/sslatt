'use client';

import { Display, Layout } from '@uuixjs/uuixweb';
import isEmpty from 'lodash/isEmpty';

import { Container } from '@/components/container';
import type { ActionPageProps } from '@/containers/action.page.html';
import { ActionPage } from '@/containers/action.page.html';
import { MessageSuccessHtml } from '@/containers/actions.html';
import type { CreateWithdrawFormProps } from '@/containers/Withdraw/withdraw.actions.html';

interface Props extends ActionPageProps, CreateWithdrawFormProps {}

const CreateWithdrawActionPage = async (props: Props) => {
  const backLink = '/html/wallet/withdraw';
  const actionId = 'withdraw';
  const actionName = 'create';

  if (isEmpty(props.wallets))
    return (
      <Container>
        <MessageSuccessHtml
          success={false}
          message="Generate an address for your wallet, and try again"
        />
      </Container>
    );

  return (
    <Layout display={Display.Flex} fullWidth>
      <Layout fullWidth>
        <Container size={7}>
          <ActionPage
            {...props}
            actionId={actionId}
            actionName={actionName}
            backLink={backLink}
          />
        </Container>
      </Layout>
    </Layout>
  );
};

export default CreateWithdrawActionPage;
