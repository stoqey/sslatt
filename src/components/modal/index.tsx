import { Button } from '@uuixjs/uuixweb';
import { styled } from '@uuixjs/uuixweb-lib';
import React from 'react';

const ModalWrapper = styled.div`
  dialog {
    display: block;
  }

  dialog:not(:target):not([open]) {
    display: none;
  }

  dialog::backdrop {
    background: rgba(0, 0, 0, 0.3);
  }

  .content {
    background: blue;
  }

  .background {
    background: red;
    top: 0;
    margin-top: -20vh;
    height: 120vh;
    width: 100vw;
    z-index: 1;
    opacity: 0.5;
  }
`;

export const Modal = ({
  trigger,
  children,
  id: dialogId = 'dialog',
  fullWidth = false,
}: any) => {
  return (
    <ModalWrapper>
      <div>
        <p>
          <a href={`#${dialogId}`}>{trigger || <Button>Open</Button>}</a>
        </p>

        <dialog
          className={`${fullWidth ? '' : 'relative'} h-full w-full`}
          id={dialogId}
        >
          <a
            href="#!"
            className="background absolute"
            style={fullWidth ? {} : { width: '150vw', left: '-50vh' }}
          />

          <div
            className="content absolute z-10"
            style={fullWidth ? { width: '100vw', minHeight: '50vh' } : {}}
          >
            {children}
          </div>
        </dialog>
      </div>
    </ModalWrapper>
  );
};
