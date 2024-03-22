import { ButtonType, SVGAsset } from '@uuixjs/uuixweb';
import includes from 'lodash/includes';

export enum Statuses {
  pending = 'pending',
  success = 'success',
  error = 'error',
}

export const StatusColors = {
  pending: ButtonType.Warning,
  success: ButtonType.Success,
  error: ButtonType.Alert,
};

export const StatusIcon = {
  pending: SVGAsset.Refresh,
  success: SVGAsset.Check,
  error: SVGAsset.NotificationError,
};

/**
 * GetTransactionStatus from status
 * @param status
 * @returns
 */
export const getStatus = (status?: string) => {
  //   TODO add more status from other payment processors
  switch (true) {
    case includes(status, 'cancel'):
    case includes(status, 'error'):
    case includes(status, 'expire'):
      return Statuses.error;

    case includes(status, 'success'):
      return Statuses.success;

    case includes(status, 'wait'):
    case includes(status, 'pend'):
    default:
      return Statuses.pending;
  }
};

export const isStatusSuccess = (status: string) => {
  const currentStatus = getStatus(status);
  return currentStatus === Statuses.success;
};

export const isStatusPending = (status: string) => {
  const currentStatus = getStatus(status);
  return currentStatus === Statuses.pending;
};

/**
 * GetTransactionColor from status
 * @param status
 * @returns
 */
export const getTransactionColor = (status?: string) => {
  const currentStatus = getStatus(status);
  return StatusColors[currentStatus];
};

export const getTransactionIcon = (status: string) => {
  const currentStatus = getStatus(status);
  return StatusIcon[currentStatus];
};
