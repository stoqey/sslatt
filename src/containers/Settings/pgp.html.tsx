import {
  Button,
  ButtonSize,
  ButtonType,
  ComboInput,
  Display,
  FormGroup,
  Input,
  InputSize,
  InputType,
  JustifyContent,
  Layout,
  Overflow,
  SVGAsset,
  TextArea,
} from '@uuixjs/uuixweb';
import isEmpty from 'lodash/isEmpty';
import React from 'react';

import { MessageSuccessHtml } from '../actions.html';

export interface PgpSettingsProps {
  verified?: boolean;
  publicKey?: string;
  newPublicKey?: string;
  encryptedCode?: string;
  newEncryptedCode?: string;
  confirmCode?: string;
  newConfirmCode?: string;
  codeId?: string;
  newCodeId?: string;
  message?: string;
  success?: boolean;
}

export const PgpSettingsHtml = (props: PgpSettingsProps) => {
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
    message = '',
    success = false,
  } = props;

  return (
    <form
      action={`/api/settings/pgp/${isEmpty(codeId) ? 'add' : 'verify'}`}
      method="POST"
    >
      <input type="hidden" name="codeId" value={codeId} />
      <input type="hidden" name="newCodeId" value={newCodeId} />
      <Layout overflow={Overflow.Scroll}>
        {/* Steps and Step Content */}
        <Layout padding={{ left: 2, right: 2 }}>
          <MessageSuccessHtml message={message} success={success} />
          <Layout margin={{ top: 2 }}>
            <Layout padding={{ bottom: 2 }}>
              <FormGroup label="Public key">
                <TextArea
                  readOnly={verified}
                  defaultValue={publicKey}
                  name="publicKey"
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
                    readonly
                    name="encryptedCode"
                    defaultValue={encryptedCode}
                    type={InputType.Text}
                    size={InputSize.Large}
                    // disabled
                    buttonProps={{
                      icon: SVGAsset.Copy,
                      type: 'button',
                    }}
                  />
                </FormGroup>

                <Layout fullWidth>
                  <FormGroup label="Confirm Code">
                    <Input
                      name="confirmCode"
                      type={InputType.Password}
                      defaultValue={confirmCode}
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
                    name="newPublicKey"
                    defaultValue={newPublicKey}
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
                    defaultValue={newEncryptedCode}
                    type={InputType.Text}
                    size={InputSize.Large}
                    buttonProps={{
                      icon: SVGAsset.Copy,
                      type: 'button',
                    }}
                  />
                </FormGroup>

                <Layout fullWidth>
                  <FormGroup label="New Confirm Code">
                    <Input
                      name="newConfirmCode"
                      type={InputType.Password}
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
            <Layout padding={{ bottom: 2 }}>
              <Button
                type="submit"
                icon={SVGAsset.Edit}
                size={ButtonSize.Large}
                variant={ButtonType.Primary}
              >
                {isEmpty(newCodeId) ? 'Add New Key' : 'Verify all codes'}
              </Button>
            </Layout>
          </Layout>
        ) : (
          <Layout
            display={Display.Flex}
            justifyContent={JustifyContent.Center}
            fullWidth
            padding={{ bottom: 2 }}
          >
            <Layout padding={{ bottom: 2 }}>
              <Button
                type="submit"
                icon={SVGAsset.Edit}
                size={ButtonSize.Large}
                variant={ButtonType.Primary}
              >
                {isEmpty(codeId) ? 'Add Key' : 'Verify code'}
              </Button>
            </Layout>
          </Layout>
        )}
      </Layout>
    </form>
  );
};

export default PgpSettingsHtml;
