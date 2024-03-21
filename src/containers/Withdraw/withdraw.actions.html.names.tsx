import {
  CANCEL_WITHDRAW_REQUEST_MUTATION,
  CREATE_WITHDRAW_REQUEST_BY_WALLET_MUTATION,
} from '@/lib/gql';

import {
  CancelActionHtml,
  CreateActionHtml,
  ViewActionHtml,
} from '../actions.html';
import { CreateWithdrawForm } from './withdraw.actions.html';

export const withdrawActions = [
  {
    id: 'view',
    Action: (p: any) => <ViewActionHtml {...p} label={p.actionId} />,
  },
  {
    id: 'cancel',
    Action: CancelActionHtml,
    query: CANCEL_WITHDRAW_REQUEST_MUTATION,
    variables: (fd: FormData) => [
      {
        name: 'id',
        value: fd.get('id'),
        required: true,
        message: 'withdraw id is required',
      },
      {
        name: 'reason',
        value: fd.get('reason'),
        required: true,
        message: 'Enter a valid reason for cancellation',
      },
    ],
  },
  {
    id: 'create',
    FormItem: CreateWithdrawForm,
    Action: CreateActionHtml,
    query: CREATE_WITHDRAW_REQUEST_BY_WALLET_MUTATION,
    variables: (fd: FormData) => [
      {
        name: 'args',
        value: {
          walletId: fd.get('wallet'),
          amount: +(fd.get('amount') || ''),
          receiver: fd.get('receiver'),
          currency: fd.get('currency'),
        },
        required: true,
        // TODO validate message
        message: 'invalid input',
      },
    ],
  },
];
