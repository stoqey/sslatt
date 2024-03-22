'use client';

import {
  AlertBannerType,
  AlignItems,
  Button,
  ButtonSize,
  ButtonType,
  CoreText,
  Display,
  FlexDirection,
  FormGroup,
  JustifyContent,
  Layout,
  Pill,
  PillType,
  SVGAsset,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextArea,
  Title,
} from '@uuixjs/uuixweb';
import _get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import * as uuid from 'uuid';

import { Alert } from '@/components/Alert';
import { Container } from '@/components/container';
import { IStatus } from '@/lib/gql';

export interface ActionHtmlProps {
  id: string;
  backLink: string;
  submitLink: string;
  actionId: string;
  actionName: string;
  label: string;
  success?: boolean;
  message?: string;
}

export const actionBtnStyle: any = {
  padding: 1,
  justifyContent: JustifyContent.Center,
};

export const MessageSuccessHtml = (props: {
  // @deprecated
  title?: string;
  message: string;
  success: boolean;
}) => {
  const { message, success } = props;

  return (
    <Layout margin={{ top: 1 }}>
      <Alert
        status=""
        message={message}
        type={success ? AlertBannerType.Success : AlertBannerType.Error}
      />
    </Layout>
  );
};
// Create / Edit
// Action

export const CancelActionHtml = (props: ActionHtmlProps) => {
  const {
    id,
    backLink,
    submitLink,
    label,
    actionName,
    actionId,
    message = '',
  } = props;
  const pathname = usePathname();
  const success = props.success || false;

  return (
    <Container>
      <Layout margin={2}>
        <>
          <Title>Cancel {label}</Title>

          <MessageSuccessHtml
            title={`Cancel ${label}`}
            message={message}
            success={success}
          />

          <form action={submitLink} method="POST">
            <input type="hidden" name="pathname" value={pathname} />
            <input type="hidden" name="actionId" value={actionId} />
            <input type="hidden" name="actionName" value={actionName} />
            <input type="hidden" name="id" value={id} />
            <Layout>
              <Layout margin={{ top: 2 }}>
                <FormGroup label="Reason">
                  <TextArea name="reason" rows={5} />
                </FormGroup>
              </Layout>

              {/* Save / Cancel */}

              <Layout display={Display.Flex} {...actionBtnStyle}>
                <Layout margin={{ left: 1, right: 1 }}>
                  <Button
                    type="submit"
                    icon={SVGAsset.Edit}
                    size={ButtonSize.Large}
                    variant={ButtonType.Primary}
                  >
                    {`Cancel ${label}`}
                  </Button>
                </Layout>

                <Layout margin={{ right: 1 }}>
                  <Link href={backLink}>
                    <Button
                      size={ButtonSize.Large}
                      icon={SVGAsset.Close}
                      variant={ButtonType.Secondary}
                      type="button"
                    >
                      Close
                    </Button>
                  </Link>
                </Layout>
              </Layout>
            </Layout>
          </form>
        </>
      </Layout>
    </Container>
  );
};

interface ConfirmActionProps extends ActionHtmlProps {
  confirm: boolean;
}

// Accept / Reject
export const ConfirmActionHtml = (props: ConfirmActionProps) => {
  const {
    id,
    confirm,
    backLink,
    submitLink,
    label,
    actionId,
    actionName,
    message = '',
    success = false,
  } = props;
  const pathname = usePathname();
  return (
    <Container>
      <Layout margin={2}>
        <>
          <Title>{`${confirm ? 'Confirm' : 'Reject'} ${label}`}</Title>

          <MessageSuccessHtml
            title={`${confirm ? 'Confirm' : 'Reject'} ${label}`}
            message={message}
            success={success}
          />

          <form action={submitLink} method="POST">
            <input type="hidden" name="pathname" value={pathname} />
            <input type="hidden" name="actionId" value={actionId} />
            <input type="hidden" name="actionName" value={actionName} />
            <input type="hidden" name="id" value={id} />
            {!confirm && (
              <Layout margin={{ top: 2 }}>
                <FormGroup label="Reason">
                  <TextArea name="reason" rows={5} />
                </FormGroup>
              </Layout>
            )}

            {/* Accept / Cancel */}
            {/* {confirm ? (): ()} */}
            {confirm ? (
              <Layout display={Display.Flex} {...actionBtnStyle}>
                <Layout margin={{ left: 1, right: 1 }}>
                  <Button
                    type="submit"
                    icon={SVGAsset.Check}
                    size={ButtonSize.Large}
                    variant={ButtonType.Success}
                  >
                    {`Accept ${label}`}
                  </Button>
                </Layout>

                <Layout margin={{ right: 1 }}>
                  <Link href={backLink}>
                    <Button
                      size={ButtonSize.Large}
                      icon={SVGAsset.Close}
                      variant={ButtonType.Secondary}
                      type="button"
                    >
                      Cancel
                    </Button>
                  </Link>
                </Layout>
              </Layout>
            ) : (
              <Layout display={Display.Flex} {...actionBtnStyle}>
                <Layout margin={{ left: 1, right: 1 }}>
                  <Button
                    type="submit"
                    icon={SVGAsset.Edit}
                    size={ButtonSize.Large}
                    variant={ButtonType.Alert}
                  >
                    {`Reject ${label}`}
                  </Button>
                </Layout>

                <Layout margin={{ right: 1 }}>
                  <Link href={backLink}>
                    <Button
                      size={ButtonSize.Large}
                      icon={SVGAsset.Close}
                      variant={ButtonType.Secondary}
                      type="button"
                    >
                      Cancel
                    </Button>
                  </Link>
                </Layout>
              </Layout>
            )}
          </form>
        </>
      </Layout>
    </Container>
  );
};

export interface CreateActionFormProps<T> {
  item?: T;
}

export interface CreateActionHtmlProps<T> extends ActionHtmlProps {
  label: string;
  item?: T;
  CreateButton?: any;
  FormItem: React.FC<CreateActionFormProps<T>>;
}

export function CreateActionHtml<T>(props: CreateActionHtmlProps<T>) {
  const {
    id,
    label,
    FormItem,
    item,
    submitLink,
    backLink,
    actionId,
    actionName,
    success = false,
    message = '',
  } = props;

  const pathname = usePathname();

  const existingId: any = id || _get(item, 'id', '');

  const isNew = !uuid.validate(existingId);

  return (
    <Layout margin={2}>
      <>
        <Title>{`${isNew ? 'Create' : 'Update'} ${label}`}</Title>

        <MessageSuccessHtml
          title={`${isNew ? 'Create' : 'Update'} ${label}`}
          message={message}
          success={success}
        />

        <form action={submitLink} method="POST">
          <input type="hidden" name="pathname" value={pathname} />
          <input type="hidden" name="actionId" value={actionId} />
          <input type="hidden" name="actionName" value={actionName} />
          <input type="hidden" name="id" value={existingId} />

          {FormItem && (
            <Layout margin={{ top: 2 }}>
              <FormItem item={item} {...props} />
            </Layout>
          )}

          {isNew ? (
            <Layout display={Display.Flex} {...actionBtnStyle}>
              <Layout margin={{ left: 1, right: 1 }}>
                <Button
                  type="submit"
                  icon={SVGAsset.Edit}
                  size={ButtonSize.Large}
                  variant={ButtonType.Success}
                >
                  {`Create ${label}`}
                </Button>
              </Layout>

              <Layout margin={{ right: 1 }}>
                <Link href={backLink}>
                  <Button
                    size={ButtonSize.Large}
                    icon={SVGAsset.Close}
                    variant={ButtonType.Secondary}
                    type="button"
                  >
                    Cancel
                  </Button>
                </Link>
              </Layout>
            </Layout>
          ) : (
            <Layout display={Display.Flex} {...actionBtnStyle}>
              <Layout margin={{ left: 1, right: 1 }}>
                <Button
                  type="submit"
                  icon={SVGAsset.Edit}
                  size={ButtonSize.Large}
                  variant={ButtonType.Success}
                >
                  {`Update ${label}`}
                </Button>
              </Layout>

              <Layout margin={{ right: 1 }}>
                <Link href={backLink}>
                  <Button
                    size={ButtonSize.Large}
                    icon={SVGAsset.Close}
                    variant={ButtonType.Secondary}
                    type="button"
                  >
                    Cancel
                  </Button>
                </Link>
              </Layout>
            </Layout>
          )}
        </form>
      </>
    </Layout>
  );
}

export const getStatusColor = (status: keyof typeof IStatus) => {
  switch ((status || '').toLowerCase()) {
    // success, pending,  e.t.c
    case IStatus.cancelled:
      return PillType.Notification;

    case IStatus.accepted:
      return PillType.Warn;

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

export interface ViewActionProps<T> extends ActionHtmlProps {
  item?: any;
  fields?: ViewFields<T>[];
}

export function ViewActionHtml<T>(props: ViewActionProps<T>) {
  const { label = '', fields = [], item, backLink } = props;

  const dataItem: T & any = item;

  if (isEmpty(dataItem)) return undefined;

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

  const { total, fee } = getFeeAmounts();

  const amts = [
    {
      label: 'Amount',
      view: () => <CoreText as="h4">{total}</CoreText>,
    },
    {
      label: 'Fee',
      view: () => <CoreText as="h4">{fee}</CoreText>,
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
    <Layout>
      {/* TITLES */}
      {!isEmpty(label) && (
        <Layout
          padding={1}
          display={Display.Flex}
          justifyContent={JustifyContent.Center}
        >
          <Title>{`${label.toLocaleUpperCase()} Details`}</Title>
        </Layout>
      )}

      {/* AMTS */}
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
      {/* Order view some table */}
      <Table alternateRows>
        <TableBody>
          {fields.map((field) => (
            <TableRow key={field.label}>
              <TableCell>{field.label}</TableCell>
              <TableCell>
                <Layout
                  display={Display.Flex}
                  justifyContent={JustifyContent.End}
                >
                  {field.view(dataItem)}
                </Layout>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* BTNS */}
      {!isEmpty(backLink) && (
        <Layout display={Display.Flex} {...actionBtnStyle}>
          <Layout margin={{ right: 1 }}>
            <Link href={backLink}>
              <Button
                type="button"
                size={ButtonSize.Large}
                icon={SVGAsset.Close}
                variant={ButtonType.Primary}
              >
                Close
              </Button>
            </Link>
          </Layout>
        </Layout>
      )}
    </Layout>
  );
}
