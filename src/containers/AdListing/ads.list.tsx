import { useLazyQuery } from '@apollo/client';
import {
  Button,
  ButtonType,
  Callout,
  CalloutActions,
  Display,
  Layout,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeading,
  TableRow,
  Title,
  useDialogState,
} from '@uuixjs/uuixweb';
// import { PushCreateContainer } from "./push.create";
import _get from 'lodash/get';
import { useRouter } from 'next/router';
// import { PushDelete, PushSend } from "./push.actions";
import React, { useEffect, useState } from 'react';

import type { AdsListingType } from '@/lib/gql/adslisting';
import { ADS_LISTING_PAGE } from '@/lib/gql/adslisting';

import AdsCreateAdminContainer from './ads.create';

export const AdsListAdminContainer = () => {
  const { query } = useRouter();
  const { id } = query;

  const { anchorProps, dialogProps, isOpen } = useDialogState();
  const { anchorProps: deleteAnchorProps, dialogProps: deleteDialogProps } =
    useDialogState();

  const [selectedAds, setSelectedAds] = useState<AdsListingType>();

  const [getAdsListingPage, { loading, data }] = useLazyQuery(ADS_LISTING_PAGE);

  const ads = _get(data, 'data.items', []);
  console.log('AdsData', ads);

  const columns = [
    { id: 'name', head: 'name' },
    { id: 'title', head: 'Title' },
    {
      id: 'id',
      head: 'Actions',
      cell: (val) => {
        return (
          <Layout display={Display.Flex}>
            <Layout margin={{ x: 1 }}>
              <AdsCreateAdminContainer id={val}>
                <Button variant={ButtonType.Primary} children="Edit" />
              </AdsCreateAdminContainer>
            </Layout>

            {/* <Layout margin={{ x: 1 }}>
              <Button
                variant={ButtonType.Primary}
                children={"Delete"}
                // state: loading ? ButtonState.Loading : ButtonState.Default,
                onClick={() => {
                  const seletedP = ads.find((ad) => ad.id === val);
                  setSelectedAds(seletedP);
                }}
              />
            </Layout> */}
          </Layout>
        );
      },
    },
  ];

  useEffect(() => {
    getAdsListingPage({
      variables: {
        after: new Date(),
      },
    });
  }, [dialogProps.show, deleteDialogProps.show]);

  return (
    <Layout>
      {/* CREATE / DELETE / SEND Modals */}

      {/* DELETE */}
      {/* <Modal {...deleteDialogProps} size={ModalSize.Large}>
                <PushDelete id={selectedAds && selectedAds.id} close={() => deleteDialogProps.onRequestClose()} />
            </Modal> */}

      {/* Actions */}
      <Callout
        message={<Title>Ads</Title>}
        actions={
          <CalloutActions
            primaryButton={{
              children: <AdsCreateAdminContainer />,
            }}
          />
        }
      />

      {/* Table */}
      <Table alternateRows>
        <TableHeader>
          <TableRow>
            {columns.map((column) => {
              return (
                <TableHeading key={column.id}>
                  {column.head || column.id}
                </TableHeading>
              );
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {ads.map((spread, i) => {
            const cells = columns.map((column, index) => {
              const cellValue = spread[column.id];
              if (column.cell) {
                return (
                  <TableCell key={index}>{column.cell(cellValue)}</TableCell>
                );
              }
              return <TableCell key={index}>{cellValue}</TableCell>;
            });
            return <TableRow key={i}>{cells}</TableRow>;
          })}
        </TableBody>
      </Table>
    </Layout>
  );
};

export default AdsListAdminContainer;
