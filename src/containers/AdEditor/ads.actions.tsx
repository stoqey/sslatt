import { useMutation } from '@apollo/client';
import {
  ButtonState,
  ButtonType,
  Layout,
  ModalFooter,
  ModalSize,
  Title,
} from '@uuixjs/uuixweb';
import _get from 'lodash/get';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';

import { DELETE_AD_LISTING_MUTATION } from '@/lib/gql';

interface DeleteActionProps {
  id: string;
  close: () => void;
}

export const DeleteAdAction = (props: DeleteActionProps) => {
  const { id, close } = props;

  const [deleteAdApi, { loading, data }] = useMutation(
    DELETE_AD_LISTING_MUTATION,
  );

  const submit = () => {
    deleteAdApi({ variables: { id } });
  };

  const confirmedOrder = _get(data, 'data.success');
  const message = _get(data, 'data.message');

  useEffect(() => {
    if (typeof confirmedOrder === 'boolean') {
      const closeTimeout = setTimeout(() => {
        close();
        confirmedOrder
          ? toast.success(`Ad successfully deleted`)
          : toast.error(message);
      }, 1000);
      return () => clearTimeout(closeTimeout);
    }
  }, [confirmedOrder]);

  return (
    <Layout margin={2}>
      <>
        <Title>Are you sure you want to delete</Title>

        {/* Accept / Cancel */}
        {/* {confirm ? (): ()} */}
        <ModalFooter
          size={ModalSize.Medium}
          primaryButtonProps={{
            children: `Delete Ad`,
            variant: ButtonType.Alert,
            state: loading ? ButtonState.Loading : ButtonState.Default,
            onClick: () => submit(),
          }}
          secondaryButtonProps={{
            children: 'Cancel',
            state: loading ? ButtonState.Loading : ButtonState.Default,
            onClick: () => close(),
          }}
        />
      </>
    </Layout>
  );
};
