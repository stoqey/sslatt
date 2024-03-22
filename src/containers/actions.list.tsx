import { useLazyQuery } from '@apollo/client';
import {
  Background,
  Button,
  ButtonType,
  CoreText,
  Display,
  FlexDirection,
  Icon,
  JustifyContent,
  Layout,
  Modal,
  ModalSize,
  SVGAsset,
  useDialogState,
} from '@uuixjs/uuixweb';
import {
  get as _get,
  isEmpty,
  mapValues,
  reduce,
  upperFirst,
  values,
} from 'lodash';
import React, { useEffect } from 'react';

import type { CreateActionProps, ViewActionProps } from './actions';
import {
  CancelAction,
  ConfirmAction,
  CreateAction,
  ViewAction,
} from './actions';

export interface ListItemProps<T> {
  item: T;
  onClickView?: () => void;
  onClickCancel: () => void;
  onClickReject: () => void;
  onClickAccept: () => void;
}

export interface ActionType {
  name: string;
  label?: string;
  query: any;
  model?: null | React.FC<any>;
}

export interface ActionListProps<T> {
  view?: ViewActionProps<T>;

  create?: CreateActionProps<T>;

  list: ActionType & {
    itemComponent: React.FC<ListItemProps<T>>;
  };

  listDefault?: {
    data: { data: { items: T[] } };
    refetch: () => void;
  };

  actions: ActionType[];
}

export function ActionList<T>({
  list,
  actions,
  create,
  view,
  listDefault,
}: ActionListProps<T>) {
  // const actions = ["cancel", "confirm"];
  // TODO const create¸
  const { label } = list;
  const defaultActions = ['cancel', 'confirm'];

  const extraActions = actions.filter((a) => !defaultActions.includes(a.name));

  /**
   * { verify: { anchorProps: { onClick: () => void }, dialogProps: { onRequestClose: () => void } }
   */
  const extraDialogs = reduce(
    extraActions.map((a) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const dialog = useDialogState();
      return { [a.name]: dialog };
    }),
    (res, val) => ({ ...res, ...val }),
    {},
  );

  const extraDialogsShows = mapValues(extraDialogs, (v: any, key) =>
    v && v.dialogProps ? v.dialogProps.show : false,
  );
  const extraDialogsShowsValues = values(extraDialogsShows);

  const [selected, setSelected] = React.useState<T & { id: string }>(
    null as any,
  );
  const [confirm, setConfirm] = React.useState(true);

  const { anchorProps: viewAnchorProps, dialogProps: viewDialogProps } =
    useDialogState();

  const { anchorProps: cancelAnchorProps, dialogProps: cancelDialogProps } =
    useDialogState();

  const { anchorProps: createAnchorProps, dialogProps: createDialogProps } =
    useDialogState();

  const { anchorProps: confirmAnchorProps, dialogProps: confirmDialogProps } =
    useDialogState();

  const isPreloaded = listDefault && listDefault.data && listDefault.refetch;

  const [getListApi, { data, loading, refetch }] = useLazyQuery(list.query);

  useEffect(() => {
    if (createDialogProps.show || isPreloaded) {
      return;
    }

    getListApi({
      variables: { before: new Date() },
    });
  }, [createDialogProps.show]);

  const items = isPreloaded
    ? _get(listDefault, 'data.data.items', [])
    : data?.data?.items || [];

  const orderTabs = [
    { name: 'All', value: 'all' },
    { name: 'Active', value: 'active' },
    { name: 'Cancelled', value: 'cancelled' },
    { name: 'Completed', value: 'completed' },
  ];

  useEffect(() => {
    if (
      !viewDialogProps.show ||
      !cancelDialogProps.show ||
      !confirmDialogProps.show ||
      extraDialogsShowsValues.includes(true)
    ) {
      if (isPreloaded) {
        listDefault.refetch();
      } else {
        refetch();
      }
    }
  }, [
    viewDialogProps.show,
    cancelDialogProps.show,
    confirmDialogProps.show,
    ...extraDialogsShowsValues,
  ]);

  return (
    <Layout
      display={Display.Flex}
      flexDirection={FlexDirection.Column}
      fullWidth
    >
      {/* MODELS -> Rate, Verify, Confirm, Cancel */}
      {actions.map((action) => {
        switch (action.name) {
          case 'confirm':
            return (
              <Modal
                key={action.name}
                {...confirmDialogProps}
                size={ModalSize.Large}
              >
                <ConfirmAction
                  {...action}
                  label={label}
                  confirm={confirm}
                  id={selected && selected.id}
                  close={() => confirmDialogProps.onRequestClose()}
                />
              </Modal>
            );
          case 'cancel':
            return (
              <Modal {...cancelDialogProps} size={ModalSize.Large}>
                <CancelAction
                  {...action}
                  label={label}
                  id={selected && selected.id}
                  close={() => cancelDialogProps.onRequestClose()}
                />
              </Modal>
            );

          default:
            if (!extraDialogs[action.name]) {
              return undefined;
            }
            return (
              <Modal
                {...extraDialogs[action.name].dialogProps}
                size={ModalSize.Large}
              >
                <action.model
                  {...action}
                  {...selected}
                  label={label}
                  id={selected && selected.id}
                  close={() =>
                    extraDialogs[action.name].dialogProps.onRequestClose()
                  }
                />
              </Modal>
            );
        }
      })}

      {/* VIEW MODEL */}
      {view && (
        <Modal {...viewDialogProps} size={ModalSize.Large}>
          <ViewAction
            {...view}
            label={label}
            id={selected && selected.id}
            item={selected}
            close={() => viewDialogProps.onRequestClose()}
          />
        </Modal>
      )}

      {/* CREATE MODEL */}
      {create && (
        <Modal {...createDialogProps} size={ModalSize.Large}>
          <CreateAction<T>
            {...create}
            label={label}
            close={() => createDialogProps.onRequestClose()}
          />
        </Modal>
      )}

      {/* Lists Header */}
      <Layout display={Display.Flex} justifyContent={JustifyContent.Between}>
        {/* {!isEmpty(list.label) && <Title>{list.label}</Title>} */}

        {/* CreateButton */}
        {create && create.CreateButton && (
          <create.CreateButton
            onClick={() => {
              createAnchorProps.onClick();
            }}
          />
        )}

        {create && !create.CreateButton && (
          <Layout display={Display.Flex} justifyContent={JustifyContent.Center}>
            <Button
              onClick={() => {
                createAnchorProps.onClick();
              }}
              variant={ButtonType.Success}
            >
              Create {list.label}
            </Button>
          </Layout>
        )}
      </Layout>

      {/* TABS */}
      {/* <Layout fullWidth>
        <Tabs
          activeTabIndex={0}
          tabs={orderTabs.map((tab) => ({
            linkTo: "#",
            label: tab.name,
          }))}
        />
      </Layout> */}

      {/* Lists */}
      {items.map((o: T & { id: string }) => {
        let extraProps = {};

        const extraActionsProps = extraActions.map((a) => ({
          [`onClick${upperFirst(a.name)}`]: () => {
            setSelected(o);
            extraDialogs[a.name]?.anchorProps?.onClick();
          },
        }));

        extraProps = reduce(
          extraActionsProps,
          (res, val) => {
            return { ...res, ...val };
          },
          {},
        );

        // TODO edit action
        return (
          <list.itemComponent
            item={o}
            key={o.id}
            onClickView={() => {
              setSelected(o);
              viewAnchorProps.onClick();
            }}
            onClickCancel={() => {
              setSelected(o);
              cancelAnchorProps.onClick();
            }}
            onClickAccept={() => {
              setSelected(o);
              confirmAnchorProps.onClick();
              setConfirm(true);
            }}
            onClickReject={() => {
              setSelected(o);
              confirmAnchorProps.onClick();
              setConfirm(false);
            }}
            {...extraProps}
          />
        );
      })}

      {/* No Items */}
      {isEmpty(items) && (
        <Layout
          background={Background.Alt}
          style={{
            height: '150px',
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
          }}
          fullWidth
        >
          <Icon
            asset={SVGAsset.Document}
            style={{ width: '50px', height: '50px' }}
          />
          <CoreText as="h5">no items found, please try again</CoreText>
        </Layout>
      )}
    </Layout>
  );
}
