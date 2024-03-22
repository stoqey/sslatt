'use client';

import { usePathname } from 'next/navigation';

import type { ActionHtmlProps } from '@/containers/actions.html';
import type { ActionHtmlType } from '@/containers/actions.list.html';
import { orderActions } from '@/containers/Order/order.list.html.names';

import { transactionActions } from './Wallet/Transactions.html.names';
import { withdrawActions } from './Withdraw/withdraw.actions.html.names';

export interface ActionPageProps extends Partial<ActionHtmlProps> {
  actionName?: string;
  message?: string;
  success?: boolean;
  [x: string]: any;
}

export const ActionPage = (props: ActionPageProps) => {
  const { actionId = 'order', ...prps } = props;
  const pathname = usePathname();

  const lastPath = pathname.split('/').pop() || '';
  const actionName = lastPath.length < 10 ? lastPath : 'view';

  const backLink =
    props.backLink ||
    pathname.replace(props.id, '').replace(`/${actionName}`, '');
  const submitLink = `/api/${actionId}/${actionName}`;

  console.log('ActionPage', {
    pathname,
    actionId,
    actionName,
    backLink,
    submitLink,
    // ...(prps as any),
  });

  const allActions: any = {
    order: orderActions,
    transactions: transactionActions,
    withdraw: withdrawActions,
  };

  const actions = allActions[actionId];

  const currentAction = actions.find(
    (a: ActionHtmlType) => a.id === actionName,
  );

  if (!currentAction) {
    return undefined;
  }

  const { Action: ActionComp, ...otherProps } = currentAction || {};

  if (!ActionComp) {
    return undefined;
  }

  // alert status using message

  return (
    <ActionComp
      {...otherProps}
      {...prps}
      actionId={actionId}
      actionName={actionName}
      label={actionId}
      backLink={backLink}
      submitLink={submitLink}
    />
  );
};
