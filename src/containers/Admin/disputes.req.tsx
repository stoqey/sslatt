"use client";

import { Container } from "@/components/container";
import {
  CoreText,
  Layout,
  ProgressBar,
  Sorting,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeading,
  TableRow,
} from "@uuixjs/uuixweb";
import React from "react";

const ReqList = () => (
  <Table alternateRows>
    <TableHeader>
      <TableRow>
        <TableHeading sorting={Sorting.Default}>Country</TableHeading>
        <TableHeading>Views</TableHeading>
        <TableHeading>Percent</TableHeading>
        <TableHeading>Graph</TableHeading>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell>United States</TableCell>
        <TableCell>200</TableCell>
        <TableCell>26%</TableCell>
        <TableCell>
          <ProgressBar value={26} mask />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Germany</TableCell>
        <TableCell>148</TableCell>
        <TableCell>14%</TableCell>
        <TableCell>
          <ProgressBar value={14} mask />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Netherlands</TableCell>
        <TableCell>120</TableCell>
        <TableCell>10%</TableCell>
        <TableCell>
          <ProgressBar value={10} mask />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Brazil</TableCell>
        <TableCell>100</TableCell>
        <TableCell>8%</TableCell>
        <TableCell>
          <ProgressBar value={8} mask />
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
);

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
