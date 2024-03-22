/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import {
  AlignItems,
  ButtonState,
  ButtonType,
  CoreText,
  Display,
  FlexDirection,
  FormGroup,
  JustifyContent,
  Layout,
  ModalFooter,
  ModalSize,
  Pill,
  PillType,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextArea,
  Title,
} from '@uuixjs/uuixweb';
import _get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import mapValues from 'lodash/mapValues';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { IStatus } from '@/lib/gql';

interface Props {
  id: string;
  close?: () => void;
  query: any;
  label: string;
}

// Create / Edit
// Action

export const CancelAction = (props: Props) => {
  const { id, close, query, label } = props;

  const [reason, setReason] = useState<string>('');

  const [cancelOrderApi, { loading, data }] = useMutation(query);

  const submit = () => {
    cancelOrderApi({ variables: { id, reason } });
  };

  const cancelled = _get(data, 'data.success', null);
  const message = _get(data, 'data.message');

  useEffect(() => {
    if (typeof cancelled === 'boolean') {
      const closeTimeout = setTimeout(() => {
        if (close) close();
        cancelled
          ? toast.success(`${label} cancelled successfully`)
          : toast.error(message);
      }, 1000);
      return () => clearTimeout(closeTimeout);
    }
  }, [cancelled]);

  return (
    <Layout margin={2}>
      <>
        <Title>Cancel {label}</Title>
        {/* <CoreText>{id}</CoreText> */}

        <Layout margin={{ top: 2 }}>
          <FormGroup label="Reason">
            <TextArea
              disabled={loading}
              name="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value as any)}
            />
          </FormGroup>
        </Layout>

        {/* Save / Cancel */}
        <ModalFooter
          size={ModalSize.Medium}
          primaryButtonProps={{
            children: `Cancel ${label}`,
            state: loading ? ButtonState.Loading : ButtonState.Default,
            onClick: () => submit(),
          }}
          secondaryButtonProps={{
            children: 'Close',
            onClick: () => close(),
          }}
        />
      </>
    </Layout>
  );
};

interface ConfirmActionProps extends Props {
  confirm: boolean;
}

// Accept / Reject
export const ConfirmAction = (props: ConfirmActionProps) => {
  const { id, close, confirm, query, label } = props;

  const [confirmedOrderApi, { loading, data }] = useMutation(query);

  const [reason, setReason] = useState<string>('');

  const submitAccept = () => {
    confirmedOrderApi({ variables: { id, confirm: true } });
  };

  const submitCancel = () => {
    confirmedOrderApi({ variables: { id, reason, confirm: false } });
  };

  const confirmedOrder = _get(data, 'data.success');
  const message = _get(data, 'data.message');

  useEffect(() => {
    if (typeof confirmedOrder === 'boolean') {
      const closeTimeout = setTimeout(() => {
        if (close) close();
        confirmedOrder
          ? toast.success(
              `${label} successfully ${confirm ? 'Accepted' : 'Rejected'}`,
            )
          : toast.error(message);
      }, 1000);
      return () => clearTimeout(closeTimeout);
    }
  }, [confirmedOrder]);

  return (
    <Layout margin={2}>
      <>
        <Title>{`${confirm ? 'Confirm' : 'Reject'} ${label}`}</Title>

        {!confirm && (
          <Layout margin={{ top: 2 }}>
            <FormGroup label="Reason">
              <TextArea
                name="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value as any)}
              />
            </FormGroup>
          </Layout>
        )}

        {/* Accept / Cancel */}
        {/* {confirm ? (): ()} */}
        {confirm ? (
          <ModalFooter
            size={ModalSize.Medium}
            primaryButtonProps={{
              children: `Accept ${label}`,
              variant: ButtonType.Success,
              state: loading ? ButtonState.Loading : ButtonState.Default,
              onClick: () => submitAccept(),
            }}
            secondaryButtonProps={{
              children: 'Cancel',
              state: loading ? ButtonState.Loading : ButtonState.Default,
              onClick: () => close(),
            }}
          />
        ) : (
          <ModalFooter
            size={ModalSize.Medium}
            primaryButtonProps={{
              children: `"Reject ${label}"`,
              variant: ButtonType.Alert,
              state: loading ? ButtonState.Loading : ButtonState.Default,
              onClick: () => submitCancel(),
            }}
            secondaryButtonProps={{
              children: 'Cancel',
              state: loading ? ButtonState.Loading : ButtonState.Default,
              onClick: () => close(),
            }}
          />
        )}
      </>
    </Layout>
  );
};

export interface CreateActionFormProps<T> {
  state: T;
  setState: (state: T) => void;
  save?: () => void;
}

export interface CreateActionProps<T> {
  id?: string;
  close?: () => void;
  query: any;
  mutate: any;
  label: string;
  CreateButton?: any;
  FormItem: React.FC<CreateActionFormProps<T>>;
}

export function CreateAction<T>(props: CreateActionProps<T>) {
  const { id = '', close, query, mutate, label, FormItem } = props;

  const isNew = isEmpty(id);

  const [upsertApi, { loading, data }] = useMutation(mutate);
  const success = _get(data, 'data.success');
  const message = _get(data, 'data.message');

  const [getApi, { loading: loadingGet, data: dataGet }] = useLazyQuery(query);

  const [state, setState] = useState<T>();

  const submitUpsert = () => {
    const parsedState = mapValues(state as any, (value) => {
      const isNumber =
        typeof value === 'number' || !Number.isNaN(Number(value));
      switch (true) {
        case isNumber:
          return Number(value);
        default:
          return value;
      }
    });

    upsertApi({ variables: { args: parsedState } });
  };

  useEffect(() => {
    if (!isEmpty(id)) {
      getApi({ variables: { id } });
    }
  }, [id]);

  useEffect(() => {
    if (!isEmpty(dataGet)) {
      setState(dataGet.data);
    }
  }, [dataGet]);

  useEffect(() => {
    if (typeof success === 'boolean') {
      const closeTimeout = setTimeout(() => {
        if (success) {
          toast.success(
            `${label} successfully ${isNew ? 'Created' : 'Updated'}`,
          );
          close();
        } else {
          toast.error(message);
        }
      }, 1000);
      return () => clearTimeout(closeTimeout);
    }
  }, [success]);

  return (
    <Layout margin={2}>
      <>
        <Title>{`${isNew ? 'Create' : 'Update'} ${label}`}</Title>

        <Layout margin={{ top: 2 }}>
          <FormItem save={submitUpsert} state={state} setState={setState} />
        </Layout>

        {isNew ? (
          <ModalFooter
            size={ModalSize.Medium}
            primaryButtonProps={{
              children: `Create ${label}`,
              variant: ButtonType.Success,
              state: loading ? ButtonState.Loading : ButtonState.Default,
              onClick: () => submitUpsert(),
            }}
            secondaryButtonProps={{
              children: 'Cancel',
              state: loading ? ButtonState.Loading : ButtonState.Default,
              onClick: () => close(),
            }}
          />
        ) : (
          <ModalFooter
            size={ModalSize.Medium}
            primaryButtonProps={{
              children: `Update ${label}`,
              variant: ButtonType.Alert,
              state: loading ? ButtonState.Loading : ButtonState.Default,
              onClick: () => submitUpsert(),
            }}
            secondaryButtonProps={{
              children: 'Cancel',
              state: loading ? ButtonState.Loading : ButtonState.Default,
              onClick: () => close(),
            }}
          />
        )}
      </>
    </Layout>
  );
}

export const getStatusColor = (status: keyof typeof IStatus) => {
  switch (status) {
    // success, pending,  e.t.c
    case IStatus.cancelled:
      return PillType.Alert;

    case IStatus.accepted:
      return PillType.Notification;

    case IStatus.completed:
    case 'success' as any:
      return PillType.Success;

    case IStatus.requested:
    default:
      return PillType.Info;
  }
};
interface ViewFields<T> {
  label: string;
  view: (item?: T) => React.ReactNode;
}

export interface ViewActionProps<T> {
  id?: string;
  close?: () => void;
  query?: any;
  item?: any;
  label: string;
  fields: ViewFields<T>[];
  showAmounts?: boolean;
}

export function ViewAction<T>(props: ViewActionProps<T>) {
  const { close, query, label, fields, item, showAmounts = true } = props;

  // optional with item
  const { loading, data } = item
    ? { data: item, loading: false }
    : // eslint-disable-next-line react-hooks/rules-of-hooks
      useQuery(query);

  const dataItem: T & any = _get(data, 'data', item);

  const getFeeAmounts = () => {
    const feePerc = dataItem?.feePerc;

    const price = dataItem?.price || dataItem?.amount;
    const quantity = dataItem?.quantity || 1;

    if (!feePerc) {
      const total = Math.round(price) ? price : (+price).toFixed(8);
      return { fee: '-', total };
    }

    const totalPrice = price * quantity;
    const fee = (feePerc / 100) * totalPrice;
    const netTotal = totalPrice + fee;

    const total = Math.round(netTotal) ? netTotal : (+netTotal).toFixed(8);
    return { fee, total };
  };

  const amts = [
    {
      label: 'Amount',
      view: () => <CoreText as="h4">{getFeeAmounts().total}</CoreText>,
    },
    {
      label: 'Fee',
      view: () => <CoreText as="h4">{getFeeAmounts().fee}</CoreText>,
    },
    {
      label: 'Status',
      view: () => (
        <CoreText as="h4">
          <Pill
            type={getStatusColor(dataItem?.status)}
            label={dataItem?.status}
          />
        </CoreText>
      ),
    },
  ];

  return (
    <Layout margin={2}>
      <>
        <Layout
          // padding={1}
          display={Display.Flex}
          justifyContent={JustifyContent.Center}
        >
          {!isEmpty(label) && <Title>{`${label} Details`}</Title>}
        </Layout>

        {showAmounts && (
          <Layout
            display={Display.Flex}
            justifyContent={JustifyContent.Between}
            padding={2}
          >
            {amts.map((ite) => (
              <Layout
                key={ite.label}
                flexDirection={FlexDirection.Column}
                display={Display.Flex}
                alignItems={AlignItems.Center}
              >
                <CoreText>{ite.label}</CoreText>
                {ite.view()}
              </Layout>
            ))}
          </Layout>
        )}

        {/* Order view some table */}
        <Table alternateRows>
          <TableBody>
            {fields.map((ite) => (
              <TableRow key={ite.label}>
                <TableCell>{ite.label}</TableCell>
                <TableCell>
                  <Layout
                    display={Display.Flex}
                    justifyContent={JustifyContent.End}
                  >
                    {ite.view(dataItem)}
                  </Layout>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {close && (
          <ModalFooter
            size={ModalSize.Medium}
            primaryButtonProps={{
              children: 'Close',
              state: loading ? ButtonState.Loading : ButtonState.Default,
              onClick: () => close(),
            }}
          />
        )}
      </>
    </Layout>
  );
}
