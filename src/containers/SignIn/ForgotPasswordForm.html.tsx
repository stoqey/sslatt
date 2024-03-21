import type { LoginResponseType } from '@stoqey/client-graphql';
import {
  AlertBanner,
  AlertBannerType,
  AlignItems,
  Button,
  ButtonSize,
  ButtonType,
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
  username?: string;
  mnemonic?: string;
  confirmCode?: string;
  codeId?: string;
  encryptedCode?: string;
}

interface ForgotPasswordForm extends LoginForm {
  userId?: string;
  newPassword?: string;
  newPasswordRepeat?: string;
  verified?: boolean;
  useMnemonic?: boolean;
  message?: string;
  success?: boolean;
}

export type ForgotPasswordFormHtmlProps = LoginForm &
  ForgotPasswordForm & {
    title?: string;
    auth?: LoginResponseType | SignUpResponse;
    csrfToken?: string;
  };

export function ForgotPasswordFormHtml(state: ForgotPasswordFormHtmlProps) {
  const {
    success = false,
    message = '',
    username,
    newPassword,
    newPasswordRepeat,
    confirmCode,
    codeId,
    verified: isVerified,
    mnemonic,
    useMnemonic,
    encryptedCode,
    userId,
    csrfToken = '',
  } = state;

  return (
    <Layout id="forgot-pw-form" padding={2}>
      <Layout margin={{ bottom: 2 }} fullWidth>
        <Layout
          display={Display.Flex}
          flexDirection={FlexDirection.Column}
          alignItems={AlignItems.Center}
          justifyContent={JustifyContent.Center}
        >
          <Title>{state.title}</Title>
        </Layout>

        <Layout margin={{ bottom: 1, top: 1 }} fullWidth>
          <MessageSuccessHtml message={message} success={success} />
        </Layout>

        {/* Reset PW */}
        {isEmpty(encryptedCode) && !useMnemonic && (
          <Layout>
            <form action="/api/forgot-password" method="POST">
              <input type="hidden" name="_csrf" value={csrfToken} />
              <Layout padding={{ bottom: 1 }}>
                <FormGroup label={<CoreText bold>Username</CoreText>}>
                  <Input
                    size={InputSize.Large}
                    type={InputType.Text}
                    icon={SVGAsset.Email}
                    name="username"
                  />
                </FormGroup>
              </Layout>

              <Button fullWidth size={ButtonSize.Large} type="">
                Forgot Password
              </Button>
            </form>
          </Layout>
        )}

        {/* 2FA */}
        {!isVerified && !isEmpty(encryptedCode) && !useMnemonic && (
          <form action="/api/forgot-password/2fa" method="POST">
            <input type="hidden" name="codeId" value={codeId} />
            <input type="hidden" name="userId" value={userId} />

            {/* 2FA Form */}
            <Layout
              fullWidth
              display={Display.Flex}
              flexDirection={FlexDirection.Column}
              alignItems={AlignItems.Center}
              justifyContent={JustifyContent.Center}
            >
              <AlertBanner
                type={AlertBannerType.Info}
                status="Please please decrypt your 2FA code and enter it below."
                message="Code expires in 5 minutes"
              />

              {/* Some text about copy */}
              <Layout margin={{ top: 3, bottom: 2 }} fullWidth>
                <FormGroup label="2FA Code">
                  <TextArea
                    fullWidth
                    rows={7}
                    size={InputSize.Large}
                    type={InputType.Text}
                    icon={SVGAsset.Email}
                    defaultValue={state.encryptedCode} // encrypted 2FA code
                    name="encryptedCode" // encrypted 2FA code
                    readOnly
                  />
                </FormGroup>
                <FormGroup label="Enter Code">
                  <Input
                    size={InputSize.Large}
                    type={InputType.Text}
                    icon={SVGAsset.Lock}
                    name="confirmCode"
                  />
                </FormGroup>
              </Layout>

              <Layout margin={{ top: 1 }}>
                <Button
                  fullWidth
                  size={ButtonSize.Large}
                  variant={ButtonType.Primary}
                >
                  Confirm code
                </Button>
              </Layout>
            </Layout>
          </form>
        )}

        {!isVerified && useMnemonic && (
          <Layout padding={{ bottom: 1 }}>
            <form action="/api/forgot-password/2fa" method="POST">
              <input type="hidden" name="userId" value={userId} />
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

              <Layout margin={{ top: 1 }}>
                <Button fullWidth size={ButtonSize.Large}>
                  Confirm mnemonic
                </Button>
              </Layout>
            </form>
          </Layout>
        )}

        {/* New Password  */}
        {isVerified && (
          <Layout padding={{ bottom: 1 }}>
            <form action="/api/forgot-password/reset" method="POST">
              <input type="hidden" name="userId" value={userId} />
              <input type="hidden" name="codeId" value={codeId} />
              <input
                type="hidden"
                name="useMnemonic"
                value={`${useMnemonic}`}
              />
              <input type="hidden" name="confirmCode" value={confirmCode} />
              <input type="hidden" name="mnemonic" value={mnemonic} />

              <FormGroup
                label={
                  <CoreText bold display={Display.Flex}>
                    Password
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

              <Layout margin={{ top: 1 }}>
                <Button fullWidth size={ButtonSize.Large} type="submit">
                  Save password
                </Button>
              </Layout>
            </form>
          </Layout>
        )}
      </Layout>
    </Layout>
  );
}

export default ForgotPasswordForm;
