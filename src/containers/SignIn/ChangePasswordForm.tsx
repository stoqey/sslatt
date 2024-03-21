import { useApolloClient } from '@apollo/client';
import type { LoginResponseType } from '@stoqey/client-graphql';
import {
  AlertBanner,
  AlertBannerType,
  AlignItems,
  Button,
  ButtonSize,
  Color,
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
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import type {
  PasswordChangeResponse,
  ResType,
  SignUpResponse,
} from '@/components/types.generated';
import { PW_CHANGE_CONFIRM_MUTATION, PW_CHANGE_MUTATION } from '@/lib/gql/auth';

interface FormMessage {
  text: string;
  color?: string;
}

interface LoginForm {
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

type State = LoginForm &
  ForgotPasswordForm & {
    title?: string;
    auth?: LoginResponseType | SignUpResponse;
  };

export function ChangePasswordForm() {
  const client = useApolloClient();
  const { push, refresh: reload } = useRouter();

  const [state, setState] = useState<State>({
    mnemonic: '',
    useMnemonic: false,
  });

  const [errors, setErrors] = useState<ForgotPasswordForm>({});

  const clearErrors = () => {
    showMessage(undefined);
    setErrors({
      newPassword: '',
      newPasswordRepeat: '',
    });
  };

  const [message, showMessage] = React.useState<FormMessage | undefined>();

  const {
    oldPassword,
    newPassword,
    newPasswordRepeat,
    confirmCode,
    codeId,
    verified: isVerified,
    mnemonic,
    useMnemonic,
  } = state;

  const handleChange = (name: any) => {
    return (e: any) => {
      const { value } = e.target;
      setState({ ...state, [name]: value });
      clearErrors();
    };
  };

  const changePw = async () => {
    // when done validating form

    const { data: changePwData } = await client.mutate<{
      data: PasswordChangeResponse;
    }>({
      mutation: PW_CHANGE_MUTATION,
    });

    if (!changePwData?.data?.success) {
      return showMessage({
        text: changePwData?.data?.message || 'Something went wrong',
        color: 'red',
      });
    }

    const has2FA = !isEmpty(changePwData?.data?.encryptedCode);

    if (has2FA) {
      return setState({
        ...state,
        encryptedCode: changePwData?.data?.encryptedCode || '',
        codeId: changePwData?.data?.codeId || '',
        title: '2FA Code',
      });
    }
    return setState({
      ...state,
      useMnemonic: true,
      title: 'Enter Mnemonic',
    });
  };

  const changePwConfirm = async () => {
    // when done validating form
    const { data: changePwConfirmData } = await client.mutate<{
      data: ResType;
    }>({
      mutation: PW_CHANGE_CONFIRM_MUTATION,
      variables: {
        oldPassword,
        confirmCode,
        codeId,
        mnemonic,
        newPassword,
      },
    });

    if (!changePwConfirmData?.data?.success) {
      return showMessage({
        text: changePwConfirmData?.data?.message || 'Something went wrong',
        color: 'red',
      });
    }

    return setState({
      ...state,
      verified: true,
      title: 'Create new password',
    });
  };

  useEffect(() => {
    changePw();
  }, []);

  // TODO set input errors
  // const submit = async () => {
  //   let newErrors: ForgotPasswordForm = {} as any;
  //   if (createNew) {
  //     if (isEmpty(password.replace(/\s/g, ""))) {
  //       newErrors.password = "Password is required";
  //     }

  //     if (passwordStrength(password).strength < 2) {
  //       newErrors.password = "Password " + passwordStrength(password).text;
  //     }

  //     if (isEmpty(username.replace(/\s/g, ""))) {
  //       newErrors.username = "Username is required";
  //     }

  //     if (username.replace(/\s/g, "").length < 5) {
  //       newErrors.username = "Username must be at least 5 characters long";
  //     }

  //     if (!username.match(/^[a-zA-Z0-9]+$/)) {
  //       newErrors.username = "Username must be alphanumeric";
  //     }

  //     if (repeatPassword !== password) {
  //       newErrors.repeatPassword = "Passwords do not match";
  //     }
  //   } else {
  //     // login
  //     if (isEmpty(password.replace(/\s/g, ""))) {
  //       newErrors.password = "Password is required";
  //     }

  //     if (isEmpty(username.replace(/\s/g, ""))) {
  //       newErrors.username = "Username is required";
  //     }
  //   }

  //   console.log("newErrors", newErrors);

  //   if (!isEmpty(newErrors)) {
  //     return setErrors({ ...errors, ...newErrors });
  //   }

  //   showMessage(undefined);
  //   await submitForm();
  // };

  return (
    <Layout id="signin-form-pw" padding={2}>
      <Layout margin={{ bottom: 2 }} fullWidth>
        <Layout
          display={Display.Flex}
          flexDirection={FlexDirection.Column}
          alignItems={AlignItems.Center}
          justifyContent={JustifyContent.Center}
        >
          <Title>Change Password</Title>
          {message && (
            <CoreText as="h5" color={Color.Live}>
              {message.text}
            </CoreText>
          )}
        </Layout>

        {/* New Password  */}
        <Layout padding={{ bottom: 1 }}>
          <FormGroup
            label={
              <CoreText bold display={Display.Flex}>
                Current password
              </CoreText>
            }
            error={errors.newPassword}
          >
            <Input
              size={InputSize.Large}
              type={InputType.Password}
              icon={SVGAsset.Lock}
              onChange={handleChange('oldPassword')}
              value={oldPassword}
            />
          </FormGroup>

          <FormGroup
            label={
              <CoreText bold display={Display.Flex}>
                New password
              </CoreText>
            }
            error={errors.newPassword}
          >
            <Input
              size={InputSize.Large}
              type={InputType.Password}
              icon={SVGAsset.Lock}
              onChange={handleChange('newPassword')}
              value={newPassword}
            />
          </FormGroup>

          <FormGroup
            label={
              <CoreText bold display={Display.Flex}>
                Repeat new password
              </CoreText>
            }
            error={errors.newPasswordRepeat}
          >
            <Input
              size={InputSize.Large}
              type={InputType.Password}
              icon={SVGAsset.Lock}
              onChange={handleChange('newPasswordRepeat')}
              value={newPasswordRepeat}
            />
          </FormGroup>

          {/* 2FA */}
          {!isVerified && !isEmpty(state.encryptedCode) && (
            <>
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
                      value={state.encryptedCode} // encrypted 2FA code
                      readOnly
                    />
                  </FormGroup>
                  <FormGroup label="Enter Code" error={errors.confirmCode}>
                    <Input
                      size={InputSize.Large}
                      type={InputType.Text}
                      icon={SVGAsset.Lock}
                      value={state.confirmCode}
                      onChange={handleChange('confirmCode')}
                      name="confirmCode"
                    />
                  </FormGroup>
                </Layout>
              </Layout>
            </>
          )}

          {!isVerified && useMnemonic && (
            <Layout padding={{ bottom: 1, top: 2 }}>
              <FormGroup
                label={
                  <CoreText bold display={Display.Flex}>
                    Mnemonic
                  </CoreText>
                }
                error={errors.mnemonic}
              >
                <Input
                  size={InputSize.Large}
                  type={InputType.Password}
                  icon={SVGAsset.Lock}
                  onChange={handleChange('mnemonic')}
                  value={mnemonic}
                />
              </FormGroup>
            </Layout>
          )}

          <Layout margin={{ top: 3 }}>
            <Button
              fullWidth
              size={ButtonSize.Large}
              onClick={() => {
                if (isEmpty(newPassword)) {
                  return showMessage({
                    text: 'Please enter a valid password',
                  });
                }

                if (isEmpty(newPasswordRepeat)) {
                  return showMessage({
                    text: 'Please enter a valid password',
                  });
                }

                if (newPassword !== newPasswordRepeat) {
                  return showMessage({
                    text: 'Passwords do not match',
                  });
                }

                changePwConfirm();
              }}
            >
              Change password
            </Button>
          </Layout>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default ForgotPasswordForm;
