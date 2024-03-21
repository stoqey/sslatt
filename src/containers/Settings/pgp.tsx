import { useApolloClient, useQuery } from '@apollo/client';
import {
  Button,
  ButtonSize,
  ButtonType,
  ComboInput,
  CoreButtonType,
  Display,
  FormGroup,
  Input,
  InputSize,
  InputType,
  JustifyContent,
  Layout,
  LoadingButton,
  Overflow,
  SVGAsset,
  TextArea,
} from '@uuixjs/uuixweb';
import isEmpty from 'lodash/isEmpty';
import React, { useEffect, useState } from 'react';

import type { PgpPublicKey, ResType } from '@/components/types.generated';
import { ADD_NEW_KEY_MUTATION, VERIFY_NEW_KEY_MUTATION } from '@/lib/gql/auth';
import { GET_PGP_KEY } from '@/lib/gql/auth/auth.query';

interface FormData {
  verified?: boolean;
  publicKey?: string;
  newPublicKey?: string;
  encryptedCode?: string;
  newEncryptedCode?: string;
  confirmCode?: string;
  newConfirmCode?: string;
  codeId?: string;
  newCodeId?: string;
}

interface Props {
  //
  isNew: boolean;
}

export const PgpSettings = (props: Props) => {
  const client = useApolloClient();

  const [form, setForm] = useState<FormData>({
    verified: false,
  });

  const { data: pgpData } = useQuery<{
    data: PgpPublicKey;
  }>(GET_PGP_KEY);

  const existingPgp = pgpData?.data;

  const handle = (field: string) => {
    return (val: any) => {
      setForm({ ...form, [field]: val.target.value });
    };
  };

  const {
    encryptedCode = '',
    newEncryptedCode = '',
    publicKey = '',
    newPublicKey = '',
    confirmCode = '',
    newConfirmCode = '',
    codeId = '',
    newCodeId = '',
    verified,
  } = form;

  const addNewKey = async () => {
    const { data, errors } = await client.mutate<{ data: ResType }>({
      mutation: ADD_NEW_KEY_MUTATION,
      variables: {
        publicKey: verified ? newPublicKey : publicKey,
      },
    });

    // TODO show errors
    if (errors) {
      console.log('addNewKey errors', { errors });
    }

    // { encryptedCode, codeId }
    const dataRes = data?.data.data;
    const newState = {
      ...form,
    };

    if (verified) {
      newState.encryptedCode = dataRes?.oldEncryptedCode;
      newState.codeId = dataRes?.oldCodeId;
      newState.newEncryptedCode = dataRes?.newEncryptedCode;
      newState.newCodeId = dataRes?.newCodeId;
    } else {
      newState.encryptedCode = dataRes?.encryptedCode;
      newState.codeId = dataRes?.codeId;
    }
    console.log('addNewKey newState', { dataRes, newState });
    setForm(newState);
  };

  const verifyNewKey = async () => {
    const variables: any = {
      codeId,
      confirmCode,
    };

    if (verified) {
      variables.newCodeId = newCodeId;
      variables.newConfirmCode = newConfirmCode;
    }

    console.log('verifyNewKey variables', { variables });

    const { data } = await client.mutate<{ data: ResType }>({
      mutation: VERIFY_NEW_KEY_MUTATION,
      variables,
    });

    // { encryptedCode, codeId }
    const dataRes = data?.data.data;
    // const success = data?.data.success;
    // if(!success) {
    //   // refresh
    // } else {
    // }
    // TODO status message
    console.log('verifyNewKey dataRes', { dataRes, verified });
  };

  // TODO not new, get existing pgp
  useEffect(() => {
    if (isEmpty(existingPgp)) return;
    setForm({
      publicKey: existingPgp.key,
      verified: true,
    });
  }, [existingPgp]);

  return (
    <Layout overflow={Overflow.Scroll}>
      {/* Steps and Step Content */}
      <Layout padding={{ left: 2, right: 2 }}>
        <Layout margin={{ top: 2 }}>
          <Layout padding={{ bottom: 2 }}>
            <FormGroup label="Public key">
              <TextArea
                readOnly={verified}
                value={publicKey}
                onChange={handle('publicKey')}
                rows={10}
              />
            </FormGroup>
          </Layout>
        </Layout>
        {/* Encrypted code and confirm code */}
        {!isEmpty(codeId) && (
          <Layout>
            <Layout padding={{ bottom: 2 }}>
              <FormGroup label="Encrypted Code">
                {/* ComboInput */}
                <ComboInput
                  name="encryptedCode"
                  value={encryptedCode}
                  onChange={handle('encryptedCode')}
                  type={InputType.Text}
                  buttonProps={{
                    icon: SVGAsset.Copy,
                    onClick: () => {
                      navigator.clipboard.writeText(encryptedCode);
                    },
                  }}
                  size={InputSize.Large}
                />
              </FormGroup>

              <Layout fullWidth>
                <FormGroup label="Confirm Code">
                  <Input
                    name="confirmCode"
                    type={InputType.Password}
                    value={confirmCode}
                    onChange={handle('confirmCode')}
                    size={InputSize.Large}
                  />
                </FormGroup>
              </Layout>
            </Layout>
          </Layout>
        )}

        {/* if Verified */}
        {verified && (
          <Layout margin={{ top: 2 }}>
            <Layout padding={{ bottom: 2 }}>
              <FormGroup label="New Public key">
                <TextArea
                  readOnly={!isEmpty(newCodeId)}
                  value={newPublicKey}
                  onChange={handle('newPublicKey')}
                  rows={10}
                  placeholder="Enter new public key to replace existing one"
                />
              </FormGroup>
            </Layout>
          </Layout>
        )}

        {/* new codeId and confirmId */}
        {!isEmpty(newCodeId) && (
          <Layout>
            <Layout padding={{ bottom: 2 }}>
              <FormGroup label="New Encrypted Code">
                {/* ComboInput */}
                <ComboInput
                  name="newEncryptedCode"
                  value={newEncryptedCode}
                  onChange={handle('newEncryptedCode')}
                  type={InputType.Text}
                  buttonProps={{
                    icon: SVGAsset.Copy,
                    onClick: () => {
                      navigator.clipboard.writeText(newEncryptedCode);
                    },
                  }}
                  size={InputSize.Large}
                />
              </FormGroup>

              <Layout fullWidth>
                <FormGroup label="New Confirm Code">
                  <Input
                    name="newConfirmCode"
                    type={InputType.Password}
                    value={newConfirmCode}
                    onChange={handle('newConfirmCode')}
                    size={InputSize.Large}
                  />
                </FormGroup>
              </Layout>
            </Layout>
          </Layout>
        )}
      </Layout>

      {/* Actions */}
      {/* if Verified */}
      {verified ? (
        <Layout
          display={Display.Flex}
          justifyContent={JustifyContent.Center}
          fullWidth
          padding={{ bottom: 2 }}
        >
          {isEmpty(newCodeId) ? (
            <Layout padding={{ bottom: 2 }}>
              <Button
                icon={SVGAsset.Edit}
                size={ButtonSize.Large}
                variant={ButtonType.Primary}
                onClick={() => addNewKey()}
              >
                Add New Key
              </Button>
            </Layout>
          ) : (
            <LoadingButton
              size={ButtonSize.Large}
              icon={SVGAsset.Faceit}
              variant={CoreButtonType.Primary}
              onClick={() => verifyNewKey()}
            >
              Verify all codes
            </LoadingButton>
          )}
        </Layout>
      ) : (
        <Layout
          display={Display.Flex}
          justifyContent={JustifyContent.Center}
          fullWidth
          padding={{ bottom: 2 }}
        >
          {isEmpty(codeId) ? (
            <Layout padding={{ bottom: 2 }}>
              <Button
                icon={SVGAsset.Edit}
                size={ButtonSize.Large}
                variant={ButtonType.Primary}
                onClick={() => addNewKey()}
              >
                Add Key
              </Button>
            </Layout>
          ) : (
            <LoadingButton
              size={ButtonSize.Large}
              icon={SVGAsset.Faceit}
              variant={CoreButtonType.Primary}
              // size={ButtonSize.Large}
              onClick={() => verifyNewKey()}
              // loadingStatus={
              //   loading ? LoadingStatus.Loading : LoadingStatus.Default
              // }
            >
              Verify code
            </LoadingButton>
          )}
        </Layout>
      )}
    </Layout>
  );
};

export default PgpSettings;
