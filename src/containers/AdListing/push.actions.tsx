import { useLazyQuery, useMutation } from '@apollo/client';
import {
  ButtonState,
  CoreText,
  FormGroup,
  Input,
  InputType,
  Layout,
  ModalFooter,
  ModalSize,
  Title,
} from '@uuixjs/uuixweb';
import _get from 'lodash/get';
import React, { useEffect, useState } from 'react';

import type { PushNotification } from '@/lib/gql/push';
import { PUSH_NOTIF_DELETE, VUGA_SEND_PUSH_NOTIF } from '@/lib/gql/push';

interface PushDeleteProps {
  id: string;
  close?: () => void;
}

export const PushDelete = (props: PushDeleteProps) => {
  const { id, close } = props;

  const [deletedApi, { loading, data }] = useMutation(PUSH_NOTIF_DELETE);

  const submit = () => {
    deletedApi({ variables: { id } });
  };

  const deleted = _get(data, 'data.success');

  useEffect(() => {
    if (deleted) {
      const closeTimeout = setTimeout(() => close(), 1000);
      return () => clearTimeout(closeTimeout);
    }
  }, [deleted]);

  return (
    <Layout margin={2}>
      <>
        <Title>Delete Push</Title>
        <CoreText>{id}</CoreText>

        {/* Save / Cancel */}
        <ModalFooter
          size={ModalSize.Small}
          primaryButtonProps={{
            children: 'Delete',
            state: loading ? ButtonState.Loading : ButtonState.Default,
            onClick: () => submit(),
          }}
          secondaryButtonProps={{
            children: 'Cancel',
            onClick: () => close(),
          }}
        />
      </>
    </Layout>
  );
};

interface PushSendProps extends PushDeleteProps {
  push?: PushNotification;
}
export const PushSend = (props: PushSendProps) => {
  const { id, close, push } = props;

  const [topic, setTopic] = useState<string>('Tv');
  const [vugaSendPush, { loading, data }] = useLazyQuery(VUGA_SEND_PUSH_NOTIF);

  const submit = () => {
    vugaSendPush({ variables: { id, topic } });
  };

  const pushSent = _get(data, 'data', false);

  useEffect(() => {
    if (pushSent) {
      const closeTimeout = setTimeout(() => close(), 1000);
      return () => clearTimeout(closeTimeout);
    }
  }, [pushSent]);

  return (
    <Layout margin={2}>
      <>
        <Title>Send Push</Title>

        <CoreText>{id}</CoreText>
        <CoreText>{push && push.title}</CoreText>
        <CoreText>{push && push.message}</CoreText>
        <CoreText>{push && push.type}</CoreText>
        <CoreText>{push && push.typeId}</CoreText>

        <FormGroup label="Topic">
          <Layout>
            <Input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              type={InputType.Text}
              placeholder="Topic"
            />
          </Layout>
        </FormGroup>

        {/* Save / Cancel */}
        <ModalFooter
          size={ModalSize.Small}
          primaryButtonProps={{
            children: 'Send push',
            state: loading ? ButtonState.Loading : ButtonState.Default,
            onClick: () => submit(),
          }}
          secondaryButtonProps={{
            children: 'Cancel',
            onClick: () => close(),
          }}
        />
      </>
    </Layout>
  );
};
