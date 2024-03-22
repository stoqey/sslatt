import {
  Button,
  Layout,
  Modal,
  ModalSize,
  TransitionType,
  useDialogState,
} from '@uuixjs/uuixweb';
import React, { useState } from 'react';

import { APPEVENTS } from '@/lib/AppEvent';
import { useAppEvent } from '@/lib/hooks/useAppEvent';
// import { type SignInFormProps } from "./SignInForm";
import { loginCheck } from '@/lib/utils/auth.utils';

import SignIn from '.';

interface State {
  loggedIn: boolean;
  // isOpen: boolean;
}

export const LoginWrapper = () => {
  const { anchorProps, dialogProps } = useDialogState();
  const onClose = dialogProps.onRequestClose;
  const isOpen = dialogProps.show;
  const onOpen = anchorProps.onClick;

  const [state, setState] = useState<State>({ loggedIn: false });
  const { loggedIn } = state;

  // Initial check if user is not loggedIn
  React.useEffect(() => {
    (async () => {
      const isLoggedIn = await loginCheck();
      setState({ loggedIn: isLoggedIn });
    })();
  }, []);

  if (!loggedIn) {
    return (
      <>
        <Modal
          show={isOpen}
          onRequestClose={() => onClose()}
          size={ModalSize.Large}
          transitionType={TransitionType.SlideOverBottom}
        >
          <SignIn afterLoginRefresh />
        </Modal>

        <Layout>
          <Button onClick={onOpen}> Login </Button>
        </Layout>
      </>
    );
  }

  return undefined;
};

interface WithLoginWrapperProps {
  TriggerComponent?: any;
  children: any;
}

export const WithLoginWrapper = (props: WithLoginWrapperProps) => {
  const { TriggerComponent, children, ...otherProps } = props;
  const { anchorProps, dialogProps } = useDialogState();
  const onClose = dialogProps.onRequestClose;
  const isOpen = dialogProps.show;
  const onOpen = anchorProps.onClick;
  const [state, setState] = useState<State>({ loggedIn: false });
  const { loggedIn } = state;

  /**
   * Small helper function for any nested component wrapper by this
   * even if it's not the calling component itself
   */
  const userAuthEvent = useAppEvent(APPEVENTS.AUTH);

  const checkIfLoggedIn = async () => {
    const isLoggedIn = await loginCheck();
    setState({ loggedIn: isLoggedIn });
  };

  // Initial check if user is not loggedIn
  React.useEffect(() => {
    (async () => checkIfLoggedIn())();
  }, [userAuthEvent]);

  if (!loggedIn) {
    return (
      <>
        <Modal
          show={isOpen}
          onRequestClose={() => onClose()}
          size={ModalSize.Large}
          transitionType={TransitionType.SlideOverBottom}
        >
          <SignIn
            afterLoginStall
            afterLoginStallCallback={(res, err) => {
              // TODO error handling in modal with message
              if (!err) {
                setState({ loggedIn: true });
              }
            }}
            {...otherProps}
          />
        </Modal>

        {TriggerComponent && <TriggerComponent onPress={onOpen} />}
      </>
    );
  }

  return children;
};
