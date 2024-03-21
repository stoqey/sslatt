import { ViewActionHtml } from '../actions.html';
import type { ActionHtmlType } from '../actions.list.html';

export const transactionActions: ActionHtmlType[] = [
  {
    id: 'view',
    Action: (p: any) => <ViewActionHtml {...p} label={p.actionId} />,
  },
];
