import { CalloutActions, Layout, Modal, ModalSize } from '@uuixjs/uuixweb';
import isEmpty from 'lodash/isEmpty';
import React, { useState } from 'react';

import AdsEditor from '../AdEditor';

interface Props {
  id?: string;
  close?: () => void;
  children?: any;
}

interface State {
  open: boolean;
}

export const AdsCreateAdminContainer = (props: Props) => {
  const { id: existingId = 'new', close = () => {}, children } = props;

  const [state, setState] = useState<State>({
    open: false,
  });
  const { open } = state;
  const toggleOpen = () => setState({ ...state, open: !open });

  const closeModal = () => {
    toggleOpen();
    if (close) close();
  };

  const child = !isEmpty(children)
    ? React.cloneElement(React.Children.only(children), {
        onClick: () => toggleOpen(),
      })
    : null;

  return (
    <Layout margin={2}>
      <>
        <Modal
          show={open}
          onRequestClose={() => closeModal()}
          size={ModalSize.Large}
        >
          <AdsEditor postId={existingId} onClose={closeModal} />
        </Modal>

        {children ? (
          child
        ) : (
          <CalloutActions
            primaryButton={{
              children: 'Create Ad',
              onClick: () => toggleOpen(),
            }}
          />
        )}
      </>
    </Layout>
  );
};

export default AdsCreateAdminContainer;
