import { PillType } from '@uuixjs/uuixweb';

import type { ActionType } from '../gql/shared';
import { IStatus } from '../gql/shared';

export const getTradeColor = (profit: number): string => {
  return profit >= 0 ? '#3AA76D' : 'red';
};

export const getProfitColor = (tradeType: ActionType): string => {
  if (tradeType === undefined) return 'grey';
  return tradeType === 'BUY' ? '#3edd95' : '#f22233';
};

export const getColorByProfit = (profit: number): string => {
  if (Number.isNaN(profit) || profit === 0) return 'grey';
  return profit > 0 ? '#3edd95' : '#f22233';
};

// /**
//  * GetTransactionColor from status
//  * @param status
//  * @returns
//  */
// export const getTransactionColor = (status: string) => {
//   const pending = "gold";
//   const success = "#3AA76D";
//   const error = "red";

//   //   TODO add more status from other payment processors
//   switch (true) {
//     case includes(status, "cancel"):
//     case includes(status, "error"):
//     case includes(status, "expire"):
//       return error;

//     case includes(status, "success"):
//       return success;

//     case includes(status, "wait"):
//     case includes(status, "pend"):
//     default:
//       return pending;
//   }
// };

export const getPillStatusColor = (status: keyof typeof IStatus) => {
  switch (status) {
    case IStatus.cancelled:
      return PillType.Alert;

    case IStatus.accepted:
      return PillType.Warn;

    case IStatus.completed:
      return PillType.Success;

    case IStatus.requested:
    default:
      return PillType.Info;
  }
};
