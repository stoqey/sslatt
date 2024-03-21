import type { LoginResponseType } from '@stoqey/client-graphql';
import {
  AlertBanner,
  AlertBannerType,
  AlignItems,
  Button,
  ButtonSize,
  CoreText,
  Display,
  FlexDirection,
  FormGroup,
  Input,
  InputSize,
  InputType,
  JustifyContent,
  Layout,
  SVGAsset,
  TextArea,
  Title,
} from '@uuixjs/uuixweb';
import { isEmpty } from 'lodash';
import React from 'react';

import type { SignUpResponse } from '@/components/types.generated';

import { MessageSuccessHtml } from '../actions.html';

interface LoginForm {
  success?: boolean;
  message?: string;
  mnemonic?: string;
  confirmCode?: string;
  codeId?: string;
  encryptedCode?: string;
}

interface ForgotPasswordForm extends LoginForm {
  oldPassword?: string;
  newPassword?: string;
  newPasswordRepeat?: string;
  verified?: boolean;
  useMnemonic?: boolean;
}

export type ChangePasswordFormProps = LoginForm &
  ForgotPasswordForm & {
    title?: string;
    auth?: LoginResponseType | SignUpResponse;
  };

export function ChangePasswordForm(props: ChangePasswordFormProps) {
  const {
    codeId,
    useMnemonic = false,
    message = '',
    encryptedCode,
    success = false,
  } = props;

  return (
    <Layout id="change-pw-form" padding={2}>
      <Layout margin={{ bottom: 2 }} fullWidth>
        <Layout
          display={Display.Flex}
          flexDirection={FlexDirection.Column}
          alignItems={AlignItems.Center}
          justifyContent={JustifyContent.Center}
        >
          <Title>Change Password</Title>
        </Layout>

        <Layout margin={{ bottom: 1, top: 1 }} fullWidth>
          <MessageSuccessHtml message={message} success={success} />
        </Layout>

        <form action="/api/settings/password" method="POST">
          <input type="hidden" name="codeId" value={codeId} />
          <input type="hidden" name="useMnemonic" value={`${useMnemonic}`} />

          {/* New Password  */}
          <Layout padding={{ bottom: 1 }}>
            <FormGroup
              label={
                <CoreText bold display={Display.Flex}>
                  Current password
                </CoreText>
              }
            >
              <Input
                size={InputSize.Large}
                type={InputType.Password}
                icon={SVGAsset.Lock}
                name="oldPassword"
              />
            </FormGroup>

            <FormGroup
              label={
                <CoreText bold display={Display.Flex}>
                  New password
                </CoreText>
              }
            >
              <Input
                size={InputSize.Large}
                type={InputType.Password}
                icon={SVGAsset.Lock}
                name="newPassword"
              />
            </FormGroup>

            <FormGroup
              label={
                <CoreText bold display={Display.Flex}>
                  Repeat new password
                </CoreText>
              }
            >
              <Input
                size={InputSize.Large}
                type={InputType.Password}
                icon={SVGAsset.Lock}
                name="newPasswordRepeat"
              />
            </FormGroup>

            {/* 2FA */}
            {!isEmpty(encryptedCode) && !useMnemonic && (
              <>
                {/* 2FA Form */}
                <Layout
                  fullWidth
                  display={Display.Flex}
                  flexDirection={FlexDirection.Column}
                  alignItems={AlignItems.Center}
                  justifyContent={JustifyContent.Center}
                >
                  {/* Some text about copy */}
                  <Layout margin={{ top: 2, bottom: 2 }} fullWidth>
                    <AlertBanner
                      type={AlertBannerType.Info}
                      status="Please please decrypt your 2FA code and enter it below."
                      message="Code expires in 5 minutes"
                    />
                    <Layout margin={{ top: 1, bottom: 1 }} fullWidth>
                      <FormGroup label="2FA Code">
                        <TextArea
                          fullWidth
                          rows={7}
                          size={InputSize.Large}
                          type={InputType.Text}
                          icon={SVGAsset.Email}
                          name="encryptedCode"
                          value={encryptedCode} // encrypted 2FA code
                          readOnly
                        />
                      </FormGroup>
                    </Layout>

                    <FormGroup label="Enter Code">
                      <Input
                        size={InputSize.Large}
                        type={InputType.Text}
                        icon={SVGAsset.Lock}
                        name="confirmCode"
                      />
                    </FormGroup>
                  </Layout>
                </Layout>
              </>
            )}

            {useMnemonic && (
              <Layout padding={{ bottom: 1, top: 2 }}>
                <FormGroup
                  label={
                    <CoreText bold display={Display.Flex}>
                      Mnemonic
                    </CoreText>
                  }
                >
                  <Input
                    size={InputSize.Large}
                    type={InputType.Password}
                    icon={SVGAsset.Lock}
                    name="mnemonic"
                  />
                </FormGroup>
              </Layout>
            )}

            <Layout margin={{ top: 3 }}>
              <Button fullWidth size={ButtonSize.Large} type="submit">
                Change password
              </Button>
            </Layout>
          </Layout>
        </form>
      </Layout>
    </Layout>
  );
}

export default ForgotPasswordForm;
