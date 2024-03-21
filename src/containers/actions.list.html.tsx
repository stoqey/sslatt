'use client';

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
  SVGAsset,
} from '@uuixjs/uuixweb';
import { isEmpty, reduce, upperFirst } from 'lodash';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import type { CreateActionProps } from './actions';

export interface ListItemHtmlProps<T> {
  item: T;
  linkView?: string;
  linkCancel?: string;
  linkReject?: string;
  linkAccept?: string;
}

export interface ActionHtmlType {
  variables?: (formData: FormData) => any;
  Action?: any;
  name?: string;
  label?: string;
  query?: any;
  id: string;
}

export interface ActionListHtmlProps<T> {
  create?: CreateActionProps<T>;

  list: ActionHtmlType & {
    itemComponent: React.FC<ListItemHtmlProps<T>>;
  };

  actions: ActionHtmlType[];

  data: { items?: T[]; hasNext?: boolean };
}

export function ActionList<T>({
  list,
  actions,
  create,
  data = { items: [], hasNext: false },
}: ActionListHtmlProps<T>) {
  const pathname = usePathname();
  const baseUrl = pathname;
  // const actions = ["cancel", "confirm"];
  // TODO const create¸

  const defaultActions = ['cancel', 'confirm'];

  const extraActions = actions.filter(
    (a) => !defaultActions.includes(a?.name || ''),
  );

  const items = data?.items || [];

  const createLink = `${baseUrl}/${list.id}/create`;

  return (
    <Layout
      display={Display.Flex}
      flexDirection={FlexDirection.Column}
      fullWidth
    >
      {/* Lists Header */}
      <Layout display={Display.Flex} justifyContent={JustifyContent.Between}>
        {/* {!isEmpty(list.label) && <Title>{list.label}</Title>} */}

        {/* CreateButton */}
        {create && create.CreateButton && (
          <Link href={createLink}>
            <create.CreateButton />
          </Link>
        )}

        {create && !create.CreateButton && (
          <Layout display={Display.Flex} justifyContent={JustifyContent.Center}>
            <Link href={createLink}>
              <Button variant={ButtonType.Success}>Create {list.label}</Button>
            </Link>
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
          [`link${upperFirst(a.id)}`]: `${baseUrl}/${o.id}/${a.id}`,
        }));

        extraProps = reduce(
          extraActionsProps,
          (res, val) => {
            return { ...res, ...val };
          },
          {},
        );

        return (
          <list.itemComponent
            item={o}
            key={o.id}
            linkView={`${baseUrl}/${o.id}/view`}
            linkCancel={`${baseUrl}/${o.id}/cancel`}
            linkAccept={`${baseUrl}/${o.id}/accept`}
            linkReject={`${baseUrl}/${o.id}/reject`}
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
