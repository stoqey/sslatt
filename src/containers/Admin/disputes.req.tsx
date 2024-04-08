'use client';

import {
  CoreButtonDropdownType,
  CoreText,
  Layout,
  Sorting,
  SplitButton,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeading,
  TableRow,
} from '@uuixjs/uuixweb';
import React from 'react';

import { Container } from '@/components/container';
import type { OrderType, UserType } from '@/components/types.generated';

interface ReqListProps {
  order?: OrderType;
  owner?: UserType;
  status?: string;
  type?: string;
}

const ReqList = () => {
  const reqs: ReqListProps[] = [
    {
      order: {
        id: '1',
        name: 'Order 1',
        price: 100,
        status: 'Disputed',
        type: 'Dispute',
      },
      owner: {
        id: '1',
        fullname: 'User 1',
      },
      status: 'Disputed',
      type: 'Dispute',
    },
    {
      order: {
        id: '2',
        name: 'Order 2',
        price: 100,
        status: 'Disputed',
        type: 'Dispute',
      },
      owner: {
        id: '2',
        fullname: 'User 2',
      },
      status: 'Disputed',
      type: 'Dispute',
    },
    {
      order: {
        id: '3',
        name: 'Order 3',
        price: 100,
        status: 'Disputed',
        type: 'Dispute',
      },
      owner: {
        id: '3',
        fullname: 'User 3',
      },
      status: 'Disputed',
      type: 'Dispute',
    },
    {
      order: {
        id: '4',
        name: 'Order 4',
        price: 100,
        status: 'Disputed',
        type: 'Dispute',
      },
      owner: {
        id: '4',
        fullname: 'User 4',
      },
      status: 'Disputed',
      type: 'Dispute',
    },
  ];
  return (
    <Table alternateRows>
      <TableHeader>
        <TableRow>
          <TableHeading sorting={Sorting.Default}>Order</TableHeading>
          <TableHeading>User</TableHeading>
          <TableHeading>State</TableHeading>
          <TableHeading>Action</TableHeading>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reqs.map((req) => (
          <TableRow key={req.order?.id}>
            <TableCell>{req.order?.name}</TableCell>
            <TableCell>{req.owner?.fullname}</TableCell>
            <TableCell>{req.status}</TableCell>
            <TableCell>
              <SplitButton
                dropdown={{ type: CoreButtonDropdownType.ArrowDown }}
              >
                Action X
              </SplitButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export const DisputesReq = () => {
  return (
    <Layout>
      <Layout
        padding={2}
        display="flex"
        flexDirection="row"
        justifyContent="center"
      >
        <CoreText as="h3" ellipsis>
          Disputes
        </CoreText>
      </Layout>
      <Container size={11}>
        <ReqList />
      </Container>
    </Layout>
  );
};

export default DisputesReq;
